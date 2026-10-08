"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import {
  Popover as AriaPopover,
  composeRenderProps,
  type PopoverProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

function edgeOffset(placement: string | null) {
  switch (placement) {
    case "top":
      return { x: 0, y: 5 };
    case "left":
      return { x: 5, y: 0 };
    case "right":
      return { x: -5, y: 0 };
    default:
      return { x: 0, y: -5 };
  }
}

type StyledPopoverProps = PopoverProps & { "data-slot"?: string };

export function Popover({
  className,
  "data-slot": dataSlot = "popover",
  ...props
}: StyledPopoverProps) {
  const reduceMotion = useReducedMotion();
  return (
    <AriaPopover
      {...props}
      data-slot={dataSlot}
      render={
        props.render ??
        ((domProps, { placement, isExiting }) => (
          <motion.div
            {...(domProps as HTMLMotionProps<"div">)}
            initial={
              reduceMotion || props.shouldSkipAnimation
                ? false
                : { opacity: 0, ...edgeOffset(placement), scale: 0.98 }
            }
            animate={
              isExiting
                ? {
                    opacity: 0,
                    ...(reduceMotion ? {} : edgeOffset(placement)),
                    scale: reduceMotion ? 1 : 0.99,
                  }
                : { opacity: 1, x: 0, y: 0, scale: 1 }
            }
            transition={{
              duration: reduceMotion ? 0 : isExiting ? 0.14 : 0.2,
              ease: [0.23, 1, 0.32, 1],
            }}
          />
        ))
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "max-w-[calc(100vw-2rem)] overflow-auto overscroll-contain rounded-xl border border-border bg-popover p-5 text-popover-foreground shadow-[var(--shadow-float)] outline-none data-[placement=top]:origin-bottom data-[placement=bottom]:origin-top data-[placement=left]:origin-right data-[placement=right]:origin-left",
          className,
        ),
      )}
    />
  );
}
