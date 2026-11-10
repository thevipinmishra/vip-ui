"use client";

import {
  type ReactElement,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { duration, easeOut, springSnappyEasing } from "./motion";
import { cn } from "./utils";

const collectionItems =
  "[role=option], [role=menuitem], [role=menuitemradio], [role=menuitemcheckbox], [role=row]";

export const itemHighlightRing =
  "focus-visible:outline-1 focus-visible:outline-solid focus-visible:-outline-offset-1 focus-visible:outline-ring in-data-[item-highlight=ring]:focus-visible:outline-none forced-colors:focus-visible:outline-2 forced-colors:focus-visible:outline-solid forced-colors:focus-visible:-outline-offset-2";

const focusVisible =
  ":is([data-rac][data-focus-visible], :not([data-rac]):focus-visible)";

const fadeTiming = {
  duration: duration.fast * 1000,
  easing: `cubic-bezier(${easeOut.join(", ")})`,
} satisfies KeyframeAnimationOptions;

const glideTiming = {
  duration: springSnappyEasing.duration * 1000,
  easing: springSnappyEasing.easing,
} satisfies KeyframeAnimationOptions;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotionPreference() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

type Move = "glide" | "snap";

type Point = { x: number; y: number };

type Box = Point & { width: number; height: number; radius: string };

type Layer =
  | { kind: "hidden" }
  | { kind: "leaving" }
  | { kind: "shown"; target: HTMLElement; box: Box; ring: boolean };

type Pointer = Point & {
  over: EventTarget | null;
  item: HTMLElement | null;
};

const translate = ({ x, y }: Point) => `translate(${x}px, ${y}px)`;

const running = (animation: Animation | null): animation is Animation =>
  animation?.playState === "running";

export interface ItemHighlightProps {
  items?: string;
  placement?: "over" | "under";
  ring?: boolean;
  className?: string;
}

export function ItemHighlight({
  items = collectionItems,
  placement = "over",
  ring = false,
  className,
}: ItemHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotionPreference();

  useLayoutEffect(() => {
    const layer = ref.current;
    const container = layer?.parentElement;
    if (!layer || !container) return;
    if (
      placement === "under" &&
      container.parentElement?.closest(
        ":has(> [data-slot=item-highlight][data-placement=under])",
      )
    )
      return;
    const rest = placement === "under" ? "under" : "fill";
    const focusedItem = `:is(${items})${focusVisible}`;
    const virtualItem = `:is(${items})[data-focused]`;
    let focused: HTMLElement | null = null;
    let last: "pointer" | "focus" = "focus";
    let pointer: Pointer | null = null;
    let state: Layer = { kind: "hidden" };
    let glide: Animation | null = null;
    let sizing: Animation | null = null;
    let fading: Animation | null = null;

    const owned = (node: Element | null): node is HTMLElement =>
      node instanceof HTMLElement &&
      node.closest("[data-item-highlight], [data-empty]") === container &&
      !container.hasAttribute("data-empty");
    const itemAt = (node: Element, previous: HTMLElement | null) => {
      const item = node.closest(items);
      if (!item) return node.querySelector(items) ? previous : null;
      return owned(item) &&
        !item.matches("[data-disabled], [aria-disabled=true]")
        ? item
        : null;
    };
    const live = (item?: HTMLElement | null) =>
      item && container.contains(item) ? item : null;

    const measure = (target: HTMLElement, origin: Element, radius: string) => {
      let x = 0;
      let y = 0;
      for (let node: HTMLElement | null = target; node && node !== origin; ) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
        if (node && node !== origin) {
          x += node.clientLeft;
          y += node.clientTop;
        }
      }
      return {
        x,
        y,
        width: target.offsetWidth,
        height: target.offsetHeight,
        radius,
      };
    };

    const slide = (to: Point, from: Point | null, move: Move) => {
      if (from && to.x === from.x && to.y === from.y) return;
      let start = from;
      if (running(glide)) {
        const { m41, m42 } = new DOMMatrixReadOnly(
          getComputedStyle(layer).transform,
        );
        start = { x: m41, y: m42 };
      }
      glide?.cancel();
      glide = null;
      layer.style.transform = translate(to);
      if (start && move === "glide" && !reduceMotion)
        glide = layer.animate(
          { transform: [translate(start), translate(to)] },
          glideTiming,
        );
    };

    const resizeTo = (box: Box, from: Box | null, move: Move) => {
      if (from && box.width === from.width && box.height === from.height)
        return;
      let start = from && {
        width: `${from.width}px`,
        height: `${from.height}px`,
      };
      if (running(sizing)) {
        const { width, height } = getComputedStyle(layer);
        start = { width, height };
      }
      sizing?.cancel();
      sizing = null;
      layer.style.width = `${box.width}px`;
      layer.style.height = `${box.height}px`;
      if (start && move === "glide" && !reduceMotion)
        sizing = layer.animate(
          {
            width: [start.width, `${box.width}px`],
            height: [start.height, `${box.height}px`],
          },
          glideTiming,
        );
    };

    const fadeTo = (opacity: number) => {
      const start = getComputedStyle(layer).opacity;
      fading?.cancel();
      layer.style.opacity = String(opacity);
      fading = layer.animate({ opacity: [start, String(opacity)] }, fadeTiming);
      return fading.finished.then(
        () => true,
        () => false,
      );
    };

    const place = (box: Box, from: Box | null, move: Move) => {
      slide(box, from, move);
      resizeTo(box, from, move);
      if (!from || box.radius !== from.radius)
        layer.style.borderRadius = box.radius;
    };

    const paintRing = (on: boolean) => {
      if (on === (state.kind === "shown" && state.ring)) return;
      layer.toggleAttribute("data-ring", on);
      container.setAttribute("data-item-highlight", on ? "ring" : rest);
    };

    const resize = new ResizeObserver((entries) => {
      const unchanged = entries.every(
        ({ target, borderBoxSize: [size] }) =>
          state.kind === "shown" &&
          target === state.target &&
          Math.round(size.inlineSize) === state.box.width &&
          Math.round(size.blockSize) === state.box.height,
      );
      if (!unchanged) render("glide");
    });

    const hide = () => {
      if (state.kind !== "shown") return;
      paintRing(false);
      resize.unobserve(state.target);
      const leaving: Layer = { kind: "leaving" };
      state = leaving;
      void fadeTo(0).then((finished) => {
        if (!finished || state !== leaving) return;
        state = { kind: "hidden" };
        sizing?.cancel();
        layer.style.width = "0px";
        layer.style.height = "0px";
      });
    };

    const render = (move: Move) => {
      const origin = layer.offsetParent;
      const target =
        origin &&
        (last === "pointer"
          ? (live(pointer?.item) ?? live(focused))
          : (live(focused) ?? live(pointer?.item)));
      if (!target) return hide();
      const kept =
        state.kind === "shown" && state.target === target ? state : null;
      const same = kept !== null;
      const box = measure(
        target,
        origin,
        kept?.box.radius ?? getComputedStyle(target).borderRadius,
      );
      place(
        box,
        state.kind === "shown" ? state.box : null,
        same ? "snap" : move,
      );
      if (state.kind !== "shown") void fadeTo(1);
      if (!same) {
        if (state.kind === "shown") resize.unobserve(state.target);
        resize.observe(target);
      }
      const onTarget =
        ring && target === focused && target.matches(focusVisible);
      paintRing(onTarget);
      state = { kind: "shown", target, box, ring: onTarget };
    };

    const first = (selector: string) => {
      for (const node of container.querySelectorAll(selector))
        if (owned(node)) return node;
      return null;
    };
    const syncFocus = () => {
      const next =
        first(focusedItem) ??
        (container.contains(document.activeElement)
          ? null
          : first(virtualItem));
      if (next !== focused) {
        focused = next;
        last = "focus";
      }
      render("glide");
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (pointer?.over === event.target && last === "pointer") {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        return;
      }
      pointer = {
        x: event.clientX,
        y: event.clientY,
        over: event.target,
        item:
          event.target instanceof Element
            ? itemAt(event.target, pointer?.item ?? null)
            : null,
      };
      last = "pointer";
      render("glide");
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = null;
      render("glide");
    };
    const onScroll = () => {
      if (!pointer) return;
      const over = document.elementFromPoint(pointer.x, pointer.y);
      if (over === pointer.over) return;
      const item =
        over && container.contains(over) ? itemAt(over, pointer.item) : null;
      const moved = item !== pointer.item;
      pointer = { ...pointer, over, item };
      if (moved) render("snap");
    };

    const mutations = new MutationObserver(syncFocus);
    container.setAttribute("data-item-highlight", rest);
    mutations.observe(container, {
      subtree: true,
      childList: true,
      attributeFilter: ["data-focus-visible", "data-focused"],
    });
    resize.observe(container);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("focusin", syncFocus);
    container.addEventListener("focusout", syncFocus);
    document.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });
    syncFocus();
    return () => {
      mutations.disconnect();
      resize.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("focusin", syncFocus);
      container.removeEventListener("focusout", syncFocus);
      document.removeEventListener("scroll", onScroll, { capture: true });
      container.removeAttribute("data-item-highlight");
      layer.removeAttribute("data-ring");
      for (const animation of [glide, sizing, fading]) animation?.cancel();
      layer.style.opacity = "0";
      layer.style.width = "0px";
      layer.style.height = "0px";
    };
  }, [items, placement, ring, reduceMotion]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-slot="item-highlight"
      data-placement={placement}
      className={cn(
        "pointer-events-none absolute top-0 left-0 bg-highlight opacity-0 forced-colors:hidden data-ring:outline-1 data-ring:outline-solid data-ring:-outline-offset-1 data-ring:outline-[color-mix(in_oklab,var(--ring),var(--foreground)_20%)]",
        placement === "over" ? "z-10" : "-z-10",
        className,
      )}
    />
  );
}

type DivRender<T> = (
  props: React.JSX.IntrinsicElements["div"],
  renderProps: T,
) => ReactElement;

export function withItemHighlight<T>(
  render: DivRender<T> | undefined,
  highlight?: ItemHighlightProps,
): DivRender<T> {
  return (props, renderProps) => {
    const next = {
      ...props,
      className: cn("relative isolate", props.className),
      children: (
        <>
          <ItemHighlight {...highlight} />
          {props.children}
        </>
      ),
    };
    return render ? render(next, renderProps) : <div {...next} />;
  };
}
