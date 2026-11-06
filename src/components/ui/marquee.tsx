"use client";

import { useInView, useReducedMotion } from "motion/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface MarqueeProps extends ComponentProps<"div"> {
  speed?: number;
  reverse?: boolean;
}

interface Loop {
  animation: Animation;
  from: number;
  to: number;
  length: number;
}

function wrap(value: number) {
  return ((value % 1) + 1) % 1;
}

function offsetOf({ animation, from, to, length }: Loop) {
  const time = Number(animation.currentTime ?? 0);
  return from + (to - from) * wrap(time / length);
}

export function Marquee({
  speed = 50,
  reverse = false,
  children,
  className,
  ...props
}: MarqueeProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const firstCopy = useRef<HTMLDivElement>(null);
  const loop = useRef<Loop | null>(null);
  const offset = useRef(0);
  const [size, setSize] = useState({ content: 0, viewport: 0, rtl: false });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inView = useInView(viewport);
  const reducedMotion = useReducedMotion();
  const isStatic = speed <= 0;
  const moving = !isStatic && !reducedMotion && size.content > 0;
  const playing = moving && !paused && !hovered && !focused && inView;
  const copies = isStatic
    ? 1
    : size.content
      ? Math.max(2, Math.ceil(size.viewport / size.content) + 1)
      : 2;

  useEffect(() => {
    const copy = firstCopy.current;
    const node = viewport.current;
    if (!copy || !node) return;
    const observer = new ResizeObserver(() =>
      setSize({
        content: copy.offsetWidth,
        viewport: node.clientWidth,
        rtl: getComputedStyle(node).direction === "rtl",
      }),
    );
    observer.observe(copy);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = track.current;
    if (!node || !moving) {
      offset.current = 0;
      return;
    }
    const distance = size.rtl ? size.content : -size.content;
    const [from, to] = reverse ? [distance, 0] : [0, distance];
    const length = (size.content / speed) * 1000;
    const animation = node.animate(
      [
        { transform: `translateX(${from}px)` },
        { transform: `translateX(${to}px)` },
      ],
      { duration: length, iterations: Infinity, easing: "linear" },
    );
    animation.currentTime =
      wrap((offset.current - from) / (to - from)) * length;
    if (!playing) animation.pause();
    loop.current = { animation, from, to, length };
    return () => {
      if (loop.current) offset.current = offsetOf(loop.current);
      loop.current = null;
      animation.cancel();
    };
  }, [moving, playing, reverse, size.content, size.rtl, speed]);

  function reveal(target: Element) {
    const node = viewport.current;
    const current = loop.current;
    if (!node || !current) return;
    const fade =
      2 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const view = node.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    const shift =
      box.left < view.left + fade
        ? view.left + fade - box.left
        : box.right > view.right - fade
          ? view.right - fade - box.right
          : 0;
    if (!shift) return;
    const { from, to, length, animation } = current;
    const end = size.rtl ? size.content : -size.content;
    const next = Math.min(
      Math.max(offsetOf(current) + shift, Math.min(0, end)),
      Math.max(0, end),
    );
    animation.currentTime = wrap((next - from) / (to - from)) * length;
  }

  const copyClassName = cn(
    "flex shrink-0 items-center gap-[var(--marquee-gap)] pe-[var(--marquee-gap)] motion-reduce:flex-wrap motion-reduce:pe-0",
    isStatic && "flex-wrap pe-0",
  );

  return (
    <div
      {...props}
      data-slot="marquee"
      className={cn("grid gap-2 [--marquee-gap:1.5rem]", className)}
    >
      <div
        ref={viewport}
        className={cn(
          "-my-2 min-w-0 overflow-clip py-2",
          !isStatic &&
            "[mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)] motion-reduce:[mask-image:none]",
        )}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={(event) => {
          setFocused(true);
          reveal(event.target);
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
      >
        <div
          ref={track}
          className={cn(
            "flex w-max motion-reduce:block motion-reduce:w-auto",
            isStatic && "block w-auto",
          )}
        >
          <div ref={firstCopy} className={copyClassName}>
            {children}
          </div>
          {Array.from({ length: copies - 1 }, (_, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: copies are identical and only change in count.
              key={index}
              aria-hidden="true"
              inert
              className={cn(copyClassName, "motion-reduce:hidden")}
            >
              {children}
            </div>
          ))}
        </div>
      </div>
      {!isStatic && (
        <div className="flex justify-start motion-reduce:hidden">
          <Button
            size="xs"
            variant="minimal"
            onPress={() => setPaused((current) => !current)}
          >
            {paused ? "Play motion" : "Pause motion"}
          </Button>
        </div>
      )}
    </div>
  );
}
