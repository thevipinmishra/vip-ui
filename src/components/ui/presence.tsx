"use client";

import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";
import {
  duration as durations,
  easeOut,
  offset,
  transitionFor,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

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
  collapse?: boolean;
}

function PresenceContent({
  as,
  children,
  className,
  distance = offset.md,
  duration = durations.base,
  collapse = false,
  ...props
}: Omit<PresenceProps, "show">) {
  const isPresent = useIsPresent();
  const reducedMotion = useReducedMotion();
  const Element = as === "span" ? motion.span : motion.div;

  return (
    <Element
      {...props}
      data-slot="presence"
      className={cn(as === "span" && "inline-block", className)}
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: distance,
              ...(collapse && { height: 0, overflow: "clip" }),
            }
      }
      animate={{
        opacity: 1,
        y: 0,
        ...(collapse && {
          height: "auto",
          transitionEnd: { overflow: "visible" },
        }),
      }}
      exit={
        reducedMotion
          ? { opacity: 0, transition: { duration: 0 } }
          : {
              opacity: 0,
              y: collapse ? 0 : -distance,
              ...(collapse && { height: 0, overflow: "clip" }),
              transition: {
                duration: collapse ? duration : duration * 0.7,
                ease: easeOut,
              },
            }
      }
      transition={transitionFor(reducedMotion, { duration, ease: easeOut })}
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
