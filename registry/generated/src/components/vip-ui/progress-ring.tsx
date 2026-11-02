"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect } from "react";
import { useNumberFormatter } from "react-aria";
import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps,
  composeRenderProps,
  Label,
} from "react-aria-components";
import { duration, easeOut, loop } from "./motion";
import { cn } from "./utils";

export interface ProgressRingProps
  extends Omit<AriaProgressBarProps, "className" | "children"> {
  label: string;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: AriaProgressBarProps["className"];
}

const strokeWidths = { sm: 3.5, md: 3, lg: 2.5 } as const;

function RingValue({ percentage }: { percentage: number }) {
  const reducedMotion = useReducedMotion();
  const formatter = useNumberFormatter({ style: "percent" });
  const shown = useMotionValue(percentage);
  const text = useTransform(shown, (value) =>
    formatter.format(Math.round(value) / 100),
  );

  useEffect(() => {
    const controls = animate(shown, percentage, {
      duration: reducedMotion ? 0 : duration.reveal,
      ease: easeOut,
    });
    return () => controls.stop();
  }, [percentage, reducedMotion, shown]);

  return <motion.span>{text}</motion.span>;
}

export function ProgressRing({
  label,
  size = "md",
  showValue = true,
  className,
  ...props
}: ProgressRingProps) {
  const reducedMotion = useReducedMotion();
  const plainValue =
    props.valueLabel === undefined && props.formatOptions === undefined;
  const strokeWidth = strokeWidths[size];
  return (
    <AriaProgressBar
      {...props}
      data-slot="progress-ring"
      className={composeRenderProps(className, (className) =>
        cn("inline-grid justify-items-center gap-2 text-foreground", className),
      )}
    >
      {({ percentage = 0, valueText, isIndeterminate }) => (
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
              animate={{
                transform: isIndeterminate
                  ? reducedMotion
                    ? "rotate(-50deg)"
                    : ["rotate(0deg)", "rotate(360deg)"]
                  : "rotate(0deg)",
              }}
              transition={
                isIndeterminate && !reducedMotion
                  ? { duration: loop.sweep, ease: "linear", repeat: Infinity }
                  : { duration: 0 }
              }
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-muted-foreground/20 forced-colors:text-[GrayText]"
              />
              <motion.circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                transform="rotate(-90 20 20)"
                className="text-primary forced-colors:text-[Highlight]"
                initial={false}
                animate={{
                  pathLength: isIndeterminate ? 0.28 : percentage / 100,
                  opacity: isIndeterminate || percentage > 0 ? 1 : 0,
                }}
                transition={{
                  duration: reducedMotion ? 0 : duration.reveal,
                  ease: easeOut,
                  opacity: { duration: reducedMotion ? 0 : duration.fast },
                }}
              />
            </motion.svg>
            {showValue && (
              <span
                className={cn(
                  "absolute inset-[15%] grid place-items-center text-center font-semibold leading-tight tabular-nums [overflow-wrap:anywhere]",
                  size === "lg"
                    ? "text-base tracking-tight"
                    : size === "sm"
                      ? "text-[10px]"
                      : "text-xs",
                )}
                aria-hidden="true"
              >
                {isIndeterminate ? (
                  "…"
                ) : plainValue ? (
                  <RingValue percentage={percentage} />
                ) : (
                  valueText
                )}
              </span>
            )}
          </span>
          <Label
            data-slot="progress-ring-label"
            className={cn(
              "max-w-full text-center font-medium [overflow-wrap:anywhere]",
              size === "lg" ? "text-sm" : "text-xs",
            )}
          >
            {label}
          </Label>
        </>
      )}
    </AriaProgressBar>
  );
}
