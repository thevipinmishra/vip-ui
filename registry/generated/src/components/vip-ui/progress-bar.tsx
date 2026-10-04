"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps,
  composeRenderProps,
  Label,
} from "react-aria-components";
import { cn } from "./utils";

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
            <div className="flex justify-between gap-3 text-sm">
              {label && (
                <Label
                  data-slot="progress-bar-label"
                  className="font-medium text-foreground"
                >
                  {label}
                </Label>
              )}
              {!isIndeterminate && (
                <span
                  data-slot="progress-bar-value"
                  className="font-mono tabular-nums text-muted-foreground"
                >
                  {valueText}
                </span>
              )}
            </div>
            <div
              data-slot="progress-bar-track"
              className="h-2 overflow-hidden rounded-full bg-secondary shadow-[var(--shadow-inset)]"
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
                    duration: reduceMotion ? 0 : 0.22,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                />
              )}
            </div>
          </>
        ))}
    </AriaProgressBar>
  );
}
