"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface PageSection {
  id: string;
  label: string;
}

interface LineSpan {
  top: number;
  height: number;
}

export function OnThisPage() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [visibleIds, setVisibleIds] = useState<string[]>([]);
  const [lineSpan, setLineSpan] = useState<LineSpan | null>(null);
  const [layoutTick, setLayoutTick] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-discover sections after client-side navigation
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    let observer: IntersectionObserver | undefined;

    const scan = () => {
      observer?.disconnect();
      const nodes = Array.from(
        main.querySelectorAll<HTMLElement>("section[id]"),
      ).filter(
        (node) =>
          !node.hasAttribute("data-toc-skip") &&
          !node.closest("[inert]") &&
          !node.closest('[data-slot="code-frame"]'),
      );
      const found = nodes
        .map((node) => ({
          id: node.id,
          label:
            node.dataset.tocLabel ??
            node.querySelector("h2, h3")?.textContent?.trim() ??
            node.getAttribute("aria-label") ??
            node.id,
        }))
        .filter((section) => section.id && section.label);

      setSections(found);
      setVisibleIds([]);
      setLineSpan(null);
      if (found.length === 0) return;

      setCurrentId(found[0].id);

      const visible = new Set<string>();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }
          const nextVisible = found
            .filter((section) => visible.has(section.id))
            .map((section) => section.id);
          setVisibleIds(nextVisible);
          if (nextVisible[0]) setCurrentId(nextVisible[0]);
        },
        { rootMargin: "-24px 0px -12% 0px", threshold: 0 },
      );

      for (const node of nodes) observer.observe(node);
    };

    const hasSection = (node: Node) =>
      node instanceof HTMLElement &&
      (node.matches("section[id]") || node.querySelector("section[id]"));
    const mutations = new MutationObserver((records) => {
      if (
        records.some(
          (record) =>
            Array.from(record.addedNodes).some(hasSection) ||
            Array.from(record.removedNodes).some(hasSection),
        )
      )
        scan();
    });

    scan();
    mutations.observe(main, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() =>
      setLayoutTick((tick) => tick + 1),
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: layoutTick re-measures after container resizes
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || visibleIds.length === 0) return;
    const first = itemRefs.current.get(visibleIds[0]);
    const last = itemRefs.current.get(visibleIds[visibleIds.length - 1]);
    if (!first || !last) return;
    const containerTop = container.getBoundingClientRect().top;
    const top = first.getBoundingClientRect().top - containerTop;
    const height = last.getBoundingClientRect().bottom - containerTop - top;
    setLineSpan((previous) =>
      previous &&
      Math.abs(previous.top - top) < 0.5 &&
      Math.abs(previous.height - height) < 0.5
        ? previous
        : { top, height },
    );
  }, [visibleIds, layoutTick]);

  if (sections.length < 2) return null;

  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-xs font-medium text-muted-foreground">
        On this page
      </p>
      <div ref={containerRef} className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 start-0 w-px bg-border/60"
        />
        {lineSpan && (
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ y: lineSpan.top, height: lineSpan.height }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", duration: 0.36, bounce: 0.16 }
            }
            className="pointer-events-none absolute top-0 start-[-0.5px] w-0.5 rounded-full bg-foreground"
          />
        )}
        <ul className="grid gap-0.5">
          {sections.map((section) => {
            const isCurrent = section.id === currentId;
            const isHighlighted = isCurrent || visibleIds.includes(section.id);
            return (
              <li key={section.id}>
                <a
                  ref={(node) => {
                    if (node) itemRefs.current.set(section.id, node);
                    else itemRefs.current.delete(section.id);
                  }}
                  href={`#${section.id}`}
                  aria-current={isCurrent ? "location" : undefined}
                  onClick={() => setCurrentId(section.id)}
                  className={cn(
                    "relative flex items-start rounded-sm py-1 ps-4 pe-1 text-[13px] leading-5 transition-[color] duration-150 ease-out-quint hover:text-foreground",
                    isHighlighted ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
