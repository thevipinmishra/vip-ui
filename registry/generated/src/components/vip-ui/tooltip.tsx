"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import {
  Tooltip as AriaTooltip,
  type TooltipProps as AriaTooltipProps,
  TooltipTrigger as AriaTooltipTrigger,
  composeRenderProps,
  type TooltipTriggerComponentProps,
} from "react-aria-components";
import { cn } from "./utils";

type TooltipProps = AriaTooltipProps;

export function TooltipTrigger({
  delay = 400,
  ...props
}: TooltipTriggerComponentProps) {
  return <AriaTooltipTrigger {...props} delay={delay} />;
}

function edgeOffset(placement: string | null) {
  switch (placement) {
    case "top":
      return { x: 0, y: 3 };
    case "left":
      return { x: 3, y: 0 };
    case "right":
      return { x: -3, y: 0 };
    default:
      return { x: 0, y: -3 };
  }
}

export function Tooltip({ className, offset = 8, ...props }: TooltipProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AriaTooltip
      {...props}
      data-slot="tooltip-content"
      offset={offset}
      render={
        props.render ??
        ((domProps, { placement, isExiting }) => (
          <motion.div
            {...(domProps as HTMLMotionProps<"div">)}
            initial={
              reduceMotion
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
              duration: reduceMotion ? 0 : isExiting ? 0.12 : 0.18,
              ease: [0.23, 1, 0.32, 1],
            }}
          />
        ))
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "max-w-56 rounded-md bg-foreground px-3 py-2 text-xs leading-5 text-background shadow-[var(--shadow-float)] outline-none",
          className,
        ),
      )}
    />
  );
}

export const TooltipContent = Tooltip;
