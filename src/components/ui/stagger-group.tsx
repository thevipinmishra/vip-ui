"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes, ReactNode } from "react";
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

export interface StaggerGroupProps extends StaggerAttributes {
  children: ReactNode;
  as?: "div" | "ul";
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
  const Element = as === "ul" ? motion.ul : motion.div;
  const variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reducedMotion ? 0 : stagger } },
  };

  return (
    <Element
      {...props}
      data-slot="stagger-group"
      className={cn(className)}
      variants={variants}
      initial={reducedMotion ? false : "hidden"}
      animate={trigger === "mount" || reducedMotion ? "visible" : undefined}
      whileInView={trigger === "in-view" ? "visible" : undefined}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </Element>
  );
}

export interface StaggerItemProps extends StaggerAttributes {
  children: ReactNode;
  as?: "div" | "li";
}

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
      variants={{
        hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Element>
  );
}
