"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ComponentProps, useEffect, useState } from "react";
import { loop } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="skeleton"
      className={cn(
        "relative isolate overflow-hidden rounded-md bg-muted forced-colors:bg-[GrayText]",
        className,
      )}
    >
      {children}
      {mounted && !reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-card/60 to-transparent rtl:-scale-x-100 dark:via-foreground/[0.06]"
          initial={{ transform: "translateX(-100%)" }}
          animate={{ transform: "translateX(100%)" }}
          transition={{
            duration: loop.sweep,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
}
