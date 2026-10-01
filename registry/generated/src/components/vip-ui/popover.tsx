"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import {
  Popover as AriaPopover,
  composeRenderProps,
  type PopoverProps,
} from "react-aria-components";
import { cn } from "./utils";

export function Popover({ className, ...props }: PopoverProps) {
  const reduceMotion = useReducedMotion();
  return (
    <AriaPopover
      {...props}
      data-slot="popover"
      render={
        props.render ??
        ((domProps) => (
          <motion.div
            {...(domProps as HTMLMotionProps<"div">)}
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
          />
        ))
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "max-w-[calc(100vw-2rem)] motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-out motion-safe:data-[exiting]:opacity-0 rounded-xl border border-border bg-popover p-5 text-popover-foreground shadow-[var(--shadow-float)] outline-none",
          className,
        ),
      )}
    />
  );
}
