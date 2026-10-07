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
}

export function Marquee({
  speed = 50,
  children,
  className,
  ...props
}: MarqueeProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const firstCopy = useRef<HTMLDivElement>(null);
  const controls = useRef<ReturnType<typeof animate> | null>(null);
  const [width, setWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inView = useInView(viewport);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);

  useEffect(() => {
    if (!firstCopy.current) return;
    const copy = firstCopy.current;
    const observer = new ResizeObserver(() => {
      setViewportWidth(viewport.current?.clientWidth ?? 0);
      setWidth(copy.offsetWidth);
    });
    observer.observe(copy);
    if (viewport.current) observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!width || speed <= 0 || reducedMotion) {
      x.set(0);
      return;
    }
    x.set(0);
    const animation = animate(x, [0, -width], {
      duration: width / speed,
      ease: "linear",
      repeat: Infinity,
    });
    controls.current = animation;
    return () => {
      animation.stop();
      controls.current = null;
    };
  }, [reducedMotion, speed, width, x]);

  useEffect(() => {
    if (!width) return;
    if (paused || hovered || focused || !inView) controls.current?.pause();
    else controls.current?.play();
  }, [focused, hovered, inView, paused, width]);

  return (
    <div {...props} data-slot="marquee" className={cn("grid gap-3", className)}>
      <div
        ref={viewport}
        className="overflow-hidden"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
      >
        <motion.div className="flex w-max" style={{ x }}>
          <div
            ref={firstCopy}
            style={{ minWidth: viewportWidth }}
            className="flex shrink-0 items-center gap-6 pr-6"
          >
            {children}
          </div>
          <div
            aria-hidden="true"
            inert
            style={{ minWidth: viewportWidth }}
            className="flex shrink-0 items-center gap-6 pr-6 motion-reduce:hidden"
          >
            {children}
          </div>
        </motion.div>
      </div>
      {speed > 0 && (
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
