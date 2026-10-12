"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";
import { duration, easeOut, transitionFor } from "./motion";
import { cn } from "./utils";

export interface TextSwapProps
  extends Omit<ComponentProps<"span">, "children"> {
  value: string;
}

export function TextSwap({ value, className, ...props }: TextSwapProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span
      {...props}
      data-slot="text-swap"
      className={cn(
        "relative -mx-[0.1em] inline-grid min-w-0 max-w-[calc(100%+0.2em)] align-baseline",
        className,
      )}
    >
      <span className="sr-only">{value}</span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          aria-hidden="true"
          className="min-w-0 overflow-x-clip text-ellipsis px-[0.1em] [overflow-wrap:anywhere]"
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
          transition={transitionFor(reduceMotion, {
            duration: duration.base,
            ease: easeOut,
          })}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
