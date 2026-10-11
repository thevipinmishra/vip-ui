"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes, ReactNode } from "react";
import { easeOut, transitionFor } from "@/lib/motion";
import { cn } from "@/lib/utils";

type StaggerAttributes = Omit<
  HTMLAttributes<HTMLElement>,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>;

const MAX_TOTAL_DELAY = 0.6;

export interface StaggerGroupProps extends StaggerAttributes {
  children: ReactNode;
  as?: "div" | "ul" | "ol";
  trigger?: "mount" | "in-view";
  stagger?: number;
}

export function StaggerGroup({
  as = "div",
  trigger = "in-view",
  stagger = 0.08,
  children,
  className,
  ...props
}: StaggerGroupProps) {
  const reducedMotion = useReducedMotion();
  const Element =
    as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;
  const variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: (index: number, total: number) =>
          reducedMotion
            ? 0
            : index *
              Math.min(stagger, MAX_TOTAL_DELAY / Math.max(total - 1, 1)),
      },
    },
  };

  return (
    <Element
      {...props}
      data-slot="stagger-group"
      className={cn(className)}
      variants={variants}
      initial="hidden"
      animate={trigger === "mount" || reducedMotion ? "visible" : undefined}
      whileInView={trigger === "in-view" ? "visible" : undefined}
      viewport={{ once: true, amount: "some" }}
    >
      {children}
    </Element>
  );
}

export interface StaggerItemProps extends StaggerAttributes {
  children: ReactNode;
  as?: "div" | "li";
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerItem({
  as = "div",
  children,
  className,
  ...props
}: StaggerItemProps) {
  const reducedMotion = useReducedMotion();
  const Element = as === "li" ? motion.li : motion.div;
  return (
    <Element
      {...props}
      data-slot="stagger-item"
      className={cn(className)}
      variants={itemVariants}
      transition={transitionFor(reducedMotion, {
        duration: 0.4,
        ease: easeOut,
      })}
    >
      {children}
    </Element>
  );
}
