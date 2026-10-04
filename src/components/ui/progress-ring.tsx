"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps,
  composeRenderProps,
  Label,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export interface ProgressRingProps
  extends Omit<AriaProgressBarProps, "className" | "children"> {
  label: string;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: AriaProgressBarProps["className"];
}

export function ProgressRing({
  label,
  size = "md",
  showValue = true,
  className,
  ...props
}: ProgressRingProps) {
  const reducedMotion = useReducedMotion();
  return (
    <AriaProgressBar
      {...props}
      data-slot="progress-ring"
      className={composeRenderProps(className, (className) =>
        cn("inline-grid justify-items-center gap-2 text-foreground", className),
      )}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <span
            data-slot="progress-ring-graphic"
            className={cn(
              "relative grid shrink-0 place-items-center",
              size === "sm" ? "size-10" : size === "lg" ? "size-24" : "size-16",
            )}
          >
            <motion.svg
              viewBox="0 0 40 40"
              fill="none"
              className="size-full"
              aria-hidden="true"
              style={{ transformOrigin: "50% 50%" }}
              animate={{ rotate: isIndeterminate && !reducedMotion ? 360 : 0 }}
              transition={
                isIndeterminate && !reducedMotion
                  ? { duration: 1.5, ease: "linear", repeat: Infinity }
                  : { duration: 0 }
              }
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                className="text-secondary forced-colors:text-[GrayText]"
              />
              <motion.circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                transform="rotate(-90 20 20)"
                className="text-primary forced-colors:text-[Highlight]"
                initial={false}
                animate={{
                  pathLength: isIndeterminate ? 0.28 : (percentage ?? 0) / 100,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.3,
                  ease: "easeOut",
                }}
              />
            </motion.svg>
            {showValue && (
              <span
                className={cn(
                  "absolute inset-0 grid place-items-center font-semibold tabular-nums",
                  size === "lg" ? "text-sm" : "text-xs",
                )}
                aria-hidden="true"
              >
                {isIndeterminate ? "…" : valueText}
              </span>
            )}
          </span>
          <Label
            data-slot="progress-ring-label"
            className={cn("font-medium", size === "lg" ? "text-sm" : "text-xs")}
          >
            {label}
          </Label>
        </>
      )}
    </AriaProgressBar>
  );
}
