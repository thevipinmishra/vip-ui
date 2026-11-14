"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { duration, easeOut, springPop, transitionFor } from "./motion";
import { cn } from "./utils";

export interface IconSwapProps
  extends Omit<ComponentProps<"span">, "children"> {
  contentKey: string | number;
  children: ReactNode;
}

export function IconSwap({
  contentKey,
  children,
  className,
  ...props
}: IconSwapProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span
      aria-hidden="true"
      {...props}
      data-slot="icon-swap"
      className={cn(
        "inline-grid shrink-0 place-items-center align-middle *:col-start-1 *:row-start-1",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={contentKey}
          className="inline-flex"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, scale: 0.5, filter: "blur(4px)" }
          }
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transitionEnd: { filter: "none" },
          }}
          exit={
            reduceMotion
              ? { opacity: 0, transition: { duration: 0 } }
              : {
                  opacity: 0,
                  scale: 0.5,
                  filter: "blur(4px)",
                  transition: { duration: duration.fast, ease: easeOut },
                }
          }
          transition={transitionFor(reduceMotion, {
            ...springPop,
            opacity: { duration: duration.base, ease: easeOut },
            filter: { duration: duration.base, ease: easeOut },
          })}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
