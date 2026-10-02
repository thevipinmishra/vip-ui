"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

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
      className={cn("relative inline-grid align-baseline", className)}
    >
      <span className="sr-only">{value}</span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
          transition={{
            duration: reduceMotion ? 0 : 0.18,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
