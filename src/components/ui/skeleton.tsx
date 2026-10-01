"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="skeleton"
      className={cn("relative overflow-hidden rounded-md bg-muted", className)}
    >
      {children}
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-card/55 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        />
      )}
    </div>
  );
}
