"use client";

import { type ComponentProps, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ScrollFadeProps extends ComponentProps<"div"> {
  orientation?: "vertical" | "horizontal";
}

const edgeMask =
  "linear-gradient(var(--scroll-fade-axis, to bottom), transparent, black min(var(--scroll-fade-size), var(--scroll-fade-start, 0px)), black calc(100% - min(var(--scroll-fade-size), var(--scroll-fade-end, 0px))), transparent), linear-gradient(black, black)";

export function ScrollFade({
  orientation = "vertical",
  className,
  style,
  ref,
  children,
  ...props
}: ScrollFadeProps) {
  const local = useRef<HTMLDivElement | null>(null);
  const vertical = orientation === "vertical";

  useEffect(() => {
    const node = local.current;
    if (!node) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const computed = getComputedStyle(node);
      const rtl = computed.direction === "rtl";
      const max = vertical
        ? node.scrollHeight - node.clientHeight
        : node.scrollWidth - node.clientWidth;
      const offset = vertical
        ? node.scrollTop
        : rtl
          ? -node.scrollLeft
          : node.scrollLeft;
      const bar = vertical
        ? node.offsetWidth -
          node.clientWidth -
          parseFloat(computed.borderLeftWidth) -
          parseFloat(computed.borderRightWidth)
        : node.offsetHeight -
          node.clientHeight -
          parseFloat(computed.borderTopWidth) -
          parseFloat(computed.borderBottomWidth);
      const set = (name: string, value: string) =>
        node.style.setProperty(`--scroll-fade-${name}`, value);
      set("start", `${Math.max(0, offset)}px`);
      set("end", `${Math.max(0, max - offset)}px`);
      set("bar", `${Math.max(0, bar)}px`);
      set("axis", vertical ? "to bottom" : rtl ? "to left" : "to right");
      set("bar-side", vertical && rtl ? "left" : "right");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    const observe = () => {
      resize.disconnect();
      resize.observe(node);
      for (const child of node.children) resize.observe(child);
      schedule();
    };
    const mutation = new MutationObserver(observe);
    observe();
    update();
    mutation.observe(node, { childList: true });
    node.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutation.disconnect();
      node.removeEventListener("scroll", schedule);
    };
  }, [vertical]);

  return (
    <div
      {...props}
      ref={(node) => {
        local.current = node;
        if (typeof ref === "function") return ref(node);
        if (ref) ref.current = node;
      }}
      data-slot="scroll-fade"
      data-orientation={orientation}
      className={cn(
        "min-h-0 min-w-0 [--scroll-fade-size:1.5rem]",
        vertical ? "overflow-y-auto" : "overflow-x-auto overflow-y-hidden",
        className,
      )}
      style={{
        maskImage: edgeMask,
        maskSize: vertical
          ? "100% 100%, var(--scroll-fade-bar, 0px) 100%"
          : "100% 100%, 100% var(--scroll-fade-bar, 0px)",
        maskPosition: vertical
          ? "0 0, var(--scroll-fade-bar-side, right) 0"
          : "0 0, 0 100%",
        maskRepeat: "no-repeat",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
