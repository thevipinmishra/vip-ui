"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ColorThumb as AriaColorThumb,
  type ColorThumbProps,
  composeRenderProps,
} from "react-aria-components";
import { duration, easeOut } from "./motion";
import { cn } from "./utils";

export function ColorThumb({ className, ...props }: ColorThumbProps) {
  return (
    <AriaColorThumb
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "size-6 cursor-grab rounded-full border-2 border-white shadow-[var(--shadow-card)] ring-1 ring-black/50 outline-none outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint dragging:cursor-grabbing disabled:cursor-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2",
          className,
        ),
      )}
    >
      {({ isDragging }) => <ThumbDragRing isDragging={isDragging} />}
    </AriaColorThumb>
  );
}

function ThumbDragRing({ isDragging }: { isDragging: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-1 rounded-full ring-2 ring-primary/60"
      initial={false}
      animate={{ opacity: isDragging ? 1 : 0, scale: isDragging ? 1 : 0.85 }}
      transition={{ duration: reduceMotion ? 0 : duration.fast, ease: easeOut }}
    />
  );
}
