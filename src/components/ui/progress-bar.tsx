"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps,
  composeRenderProps,
  Label,
} from "react-aria-components";
import { duration, easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface ProgressBarProps
  extends Omit<AriaProgressBarProps, "className" | "children"> {
  label?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaProgressBarProps["className"];
  children?: AriaProgressBarProps["children"];
}

export function ProgressBar({
  label,
  className,
  children,
  ...props
}: ProgressBarProps) {
  const reduceMotion = useReducedMotion();
  return (
    <AriaProgressBar
      {...props}
      data-slot="progress-bar"
      className={composeRenderProps(className, (className) =>
        cn("grid w-full gap-2", className),
      )}
    >
      {children ??
        (({ percentage, valueText, isIndeterminate }) => (
          <>
            {(label || !isIndeterminate) && (
              <div className="flex items-baseline gap-3 text-sm">
                {label && (
                  <Label
                    data-slot="progress-bar-label"
                    className="min-w-0 font-medium text-foreground [overflow-wrap:anywhere]"
                  >
                    {label}
                  </Label>
                )}
                {!isIndeterminate && (
                  <span
                    data-slot="progress-bar-value"
                    className="ms-auto shrink-0 font-mono tabular-nums text-muted-foreground"
                  >
                    {valueText}
                  </span>
                )}
              </div>
            )}
            <div
              data-slot="progress-bar-track"
              className="h-2 overflow-hidden rounded-full bg-secondary shadow-[var(--shadow-inset)] forced-colors:border rtl:-scale-x-100"
            >
              {isIndeterminate ? (
                <motion.div
                  key="indeterminate"
                  data-slot="progress-bar-fill"
                  className="h-full w-1/3 rounded-full bg-primary forced-colors:bg-[Highlight]"
                  initial={false}
                  animate={{ x: reduceMotion ? "100%" : ["-100%", "300%"] }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 1.6, repeat: Infinity, ease: "linear" }
                  }
                />
              ) : (
                <motion.div
                  key="determinate"
                  data-slot="progress-bar-fill"
                  className="h-full w-full origin-left rounded-full bg-primary forced-colors:bg-[Highlight]"
                  initial={false}
                  animate={{ scaleX: (percentage ?? 0) / 100 }}
                  transition={{
                    duration: reduceMotion ? 0 : duration.base,
                    ease: easeOut,
                  }}
                />
              )}
            </div>
          </>
        ))}
    </AriaProgressBar>
  );
}
