"use client";

import {
  type HTMLMotionProps,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

export interface MaskRevealProps
  extends Omit<
    HTMLMotionProps<"div">,
    "ref" | "children" | "initial" | "animate" | "transition"
  > {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  trigger?: "mount" | "in-view";
  duration?: number;
}

const covered = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(0 0 100% 0)",
  down: "inset(100% 0 0 0)",
};

export function MaskReveal({
  direction = "left",
  trigger = "in-view",
  duration = 0.65,
  children,
  className,
  ...props
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const visible = reducedMotion || trigger === "mount" || inView;
  return (
    <motion.div
      {...props}
      ref={ref}
      data-slot="mask-reveal"
      className={cn(className)}
      inert={!visible}
      initial={reducedMotion ? false : { clipPath: covered[direction] }}
      animate={{ clipPath: visible ? "inset(0 0 0 0)" : covered[direction] }}
      transition={{
        duration: reducedMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
