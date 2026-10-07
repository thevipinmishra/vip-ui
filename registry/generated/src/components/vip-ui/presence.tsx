"use client";

import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";
import { cn } from "./utils";

export interface PresenceProps
  extends Omit<
    HTMLMotionProps<"div">,
    "ref" | "children" | "initial" | "animate" | "exit" | "transition"
  > {
  show: boolean;
  children: ReactNode;
  as?: "div" | "span";
  distance?: number;
  duration?: number;
}

function PresenceContent({
  as,
  children,
  className,
  distance = 8,
  duration = 0.22,
  ...props
}: Omit<PresenceProps, "show">) {
  const isPresent = useIsPresent();
  const reducedMotion = useReducedMotion();
  const Element = as === "span" ? motion.span : motion.div;

  return (
    <Element
      {...props}
      data-slot="presence"
      className={cn(className)}
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      initial={reducedMotion ? false : { opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -distance }}
      transition={{
        duration: reducedMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Element>
  );
}

export function Presence({ show, ...props }: PresenceProps) {
  return (
    <AnimatePresence initial={false}>
      {show && <PresenceContent key="content" {...props} />}
    </AnimatePresence>
  );
}
