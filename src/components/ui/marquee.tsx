"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface MarqueeProps extends ComponentProps<"div"> {
  speed?: number;
  reverse?: boolean;
}

export function Marquee({
  speed = 50,
  reverse = false,
  children,
  className,
  ...props
}: MarqueeProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const firstCopy = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ content: 0, viewport: 0, rtl: false });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inView = useInView(viewport);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
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
    if (!moving) {
      x.set(0);
      return;
    }
    const distance = size.rtl ? size.content : -size.content;
    const [from, to] = reverse ? [distance, 0] : [0, distance];
    const loop = size.content / speed;
    const progress = ((((x.get() - from) / (to - from)) % 1) + 1) % 1;
    const animation = animate(x, [from, to], {
      duration: loop,
      ease: "linear",
      repeat: Infinity,
    });
    animation.time = progress * loop;
    if (!playing) animation.pause();
    return () => animation.stop();
  }, [moving, playing, reverse, size.content, size.rtl, speed, x]);

  const copyClassName = cn(
    "flex shrink-0 items-center gap-[var(--marquee-gap)] pr-[var(--marquee-gap)] motion-reduce:flex-wrap motion-reduce:pr-0",
    isStatic && "flex-wrap pr-0",
  );

  return (
    <div
      {...props}
      data-slot="marquee"
      className={cn("grid gap-3 [--marquee-gap:1.5rem]", className)}
    >
      <div
        ref={viewport}
        className={cn(
          "-my-2 overflow-hidden py-2",
          !isStatic &&
            "[mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)] motion-reduce:[mask-image:none]",
        )}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
      >
        <motion.div
          className={cn(
            "flex w-max motion-reduce:block motion-reduce:w-auto",
            isStatic && "block w-auto",
          )}
          style={{ x }}
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
        </motion.div>
      </div>
      {!isStatic && (
        <div className="flex justify-start motion-reduce:hidden">
          <Button
            size="sm"
            variant="secondary"
            onPress={() => setPaused((current) => !current)}
          >
            {paused ? "Play motion" : "Pause motion"}
          </Button>
        </div>
      )}
    </div>
  );
}
