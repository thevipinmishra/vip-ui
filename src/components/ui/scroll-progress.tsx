"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { type ComponentProps, type RefObject, useState } from "react";
import { cn } from "@/lib/utils";

export interface ScrollProgressProps
  extends Omit<ComponentProps<"div">, "children"> {
  label: string;
  containerRef?: RefObject<HTMLElement | null>;
}

export function ScrollProgress({
  label,
  containerRef,
  className,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({ container: containerRef });
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.round(Math.max(0, Math.min(1, progress)) * 100);
    setPercent((previous) => (previous === next ? previous : next));
  });

  return (
    <div
      {...props}
      data-slot="scroll-progress"
      className={cn("grid gap-2", className)}
    >
      <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>{label}</span>
        <span aria-hidden="true" className="tabular-nums">
          {percent}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-1.5 overflow-hidden rounded-full bg-muted"
      >
        <motion.div
          className="h-full w-full origin-left rounded-full bg-primary"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </div>
  );
}
