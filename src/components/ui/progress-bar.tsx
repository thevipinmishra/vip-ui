"use client";

import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps,
  composeRenderProps,
  Label,
} from "react-aria-components";
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
                    className="min-w-0 flex-1 font-medium text-foreground [overflow-wrap:anywhere]"
                  >
                    {label}
                  </Label>
                )}
                {!isIndeterminate && (
                  <span
                    data-slot="progress-bar-value"
                    className="ms-auto max-w-1/2 shrink-0 text-end font-mono tabular-nums text-muted-foreground [overflow-wrap:anywhere]"
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
                <div
                  key="indeterminate"
                  data-slot="progress-bar-fill"
                  className="h-full w-1/3 rounded-full bg-primary forced-colors:bg-[Highlight] motion-safe:animate-progress-indeterminate motion-reduce:translate-x-full"
                />
              ) : (
                <div
                  key="determinate"
                  data-slot="progress-bar-fill"
                  className="h-full w-full origin-left rounded-full bg-primary forced-colors:bg-[Highlight] transition-[scale] duration-200 ease-out-quint motion-reduce:duration-0"
                  style={{ scale: `${(percentage ?? 0) / 100} 1` }}
                />
              )}
            </div>
          </>
        ))}
    </AriaProgressBar>
  );
}
