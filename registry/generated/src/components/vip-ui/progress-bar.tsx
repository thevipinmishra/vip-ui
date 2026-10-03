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
              <motion.div
                data-slot="progress-bar-fill"
                className="h-full rounded-full bg-primary"
                initial={false}
                animate={
                  isIndeterminate
                    ? {
                        width: "33.333%",
                        x: reduceMotion ? "0%" : ["0%", "200%"],
                        opacity: reduceMotion ? 1 : [0.65, 1, 0.65],
                      }
                    : { width: `${percentage}%`, x: "0%", opacity: 1 }
                }
                transition={
                  isIndeterminate && !reduceMotion
                    ? {
                        opacity: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        x: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        width: { duration: 0 },
                      }
                    : { duration: reduceMotion ? 0 : 0.2 }
                }
              />
            </div>
          </>
        ))}
    </AriaProgressBar>
  );
}
