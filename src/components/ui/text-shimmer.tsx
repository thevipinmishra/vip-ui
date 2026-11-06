"use client";

import { motion, type Transition, useReducedMotion } from "motion/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { loop } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface TextShimmerProps extends ComponentProps<"span"> {
  duration?: number;
  active?: boolean;
}

function sweep(from: number, to: number) {
  return [`translateX(${from}%)`, `translateX(${to}%)`, `translateX(${to}%)`];
}

export function TextShimmer({
  duration = loop.sweep,
  active = true,
  children,
  className,
  ...props
}: TextShimmerProps) {
  const reduceMotion = useReducedMotion();
  const root = useRef<HTMLSpanElement>(null);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const node = root.current;
    if (node) setDirection(getComputedStyle(node).direction === "rtl" ? -1 : 1);
  }, []);

  const travel = 65 * direction;
  const transition: Transition = {
    duration: duration / 0.75,
    times: [0, 0.75, 1],
    ease: "easeInOut",
    repeat: Infinity,
  };

  return (
    <span
      {...props}
      ref={root}
      data-slot="text-shimmer"
      className={cn(
        "relative inline-block max-w-full text-muted-foreground",
        className,
      )}
    >
      {children}
      {direction !== 0 && active && !reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none overflow-clip [mask-image:linear-gradient(to_right,transparent_35%,black_50%,transparent_65%)] forced-colors:hidden"
          initial={{ transform: `translateX(${-travel}%)` }}
          animate={{ transform: sweep(-travel, travel) }}
          transition={transition}
        >
          <motion.span
            className="absolute inset-0 text-(--text-shimmer-highlight,var(--color-foreground))"
            initial={{ transform: `translateX(${travel}%)` }}
            animate={{ transform: sweep(travel, -travel) }}
            transition={transition}
          >
            {children}
          </motion.span>
        </motion.span>
      )}
    </span>
  );
}
