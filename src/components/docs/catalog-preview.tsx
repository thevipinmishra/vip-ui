"use client";

import {
  Component,
  type ComponentType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  type CatalogPreviewProps,
  catalogPreviews,
} from "./catalog-preview-registry";

type Preview = ComponentType<CatalogPreviewProps>;

const loaded = new Map<string, Preview>();
const mounts: (() => void)[] = [];
let flushing = false;

function whenIdle(callback: () => void) {
  if (typeof window.requestIdleCallback === "function")
    window.requestIdleCallback(callback, { timeout: 200 });
  else setTimeout(callback, 16);
}

function flushMounts() {
  mounts.shift()?.();
  if (mounts.length) whenIdle(flushMounts);
  else flushing = false;
}

function queueMount(mount: () => void) {
  mounts.push(mount);
  if (flushing) return;
  flushing = true;
  whenIdle(flushMounts);
}

let observer: IntersectionObserver | undefined;
const callbacks = new WeakMap<Element, () => void>();

function observeOnce(element: Element, callback: () => void) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "200px 0px" },
  );
  callbacks.set(element, callback);
  observer.observe(element);
  return () => {
    callbacks.delete(element);
    observer?.unobserve(element);
  };
}

class PreviewBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function CatalogPreview({
  slug,
  active,
}: {
  slug: string;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [Preview, setPreview] = useState<Preview>();
  const entry = catalogPreviews[slug];

  useEffect(() => {
    const node = ref.current;
    if (!node || !entry) return;
    let live = true;
    const stop = observeOnce(node, () => {
      const show = (preview: Preview) =>
        queueMount(() => {
          if (live) setPreview(() => preview);
        });
      const ready = loaded.get(slug);
      if (ready) {
        show(ready);
        return;
      }
      entry
        .load()
        .then(({ default: preview }) => {
          loaded.set(slug, preview);
          show(preview);
        })
        .catch(() => {});
    });
    return () => {
      live = false;
      stop();
    };
  }, [entry, slug]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      inert
      data-catalog-preview={slug}
      data-mounted={Preview ? "" : undefined}
      className="pointer-events-none relative h-36 overflow-clip rounded-lg bg-background inset-ring inset-ring-border/50 select-none"
    >
      {Preview && (
        <PreviewBoundary>
          <div
            className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 justify-items-center transition-opacity duration-300 ease-out-quint starting:opacity-0 motion-reduce:transition-none"
            style={{
              width: entry?.width ?? "18rem",
              scale: entry?.scale ?? 0.8,
            }}
          >
            <Preview active={active} />
          </div>
        </PreviewBoundary>
      )}
    </div>
  );
}
