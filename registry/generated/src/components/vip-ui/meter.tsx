"use client";

import {
  Meter as AriaMeter,
  type MeterProps as AriaMeterProps,
  composeRenderProps,
  Label,
} from "react-aria-components";
import { cn } from "./utils";

export interface MeterProps
  extends Omit<AriaMeterProps, "className" | "children"> {
  label?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaMeterProps["className"];
  children?: AriaMeterProps["children"];
}

export function Meter({ label, className, children, ...props }: MeterProps) {
  return (
    <AriaMeter
      {...props}
      data-slot="meter"
      className={composeRenderProps(className, (className) =>
        cn("grid w-full gap-2", className),
      )}
    >
      {children ??
        (({ percentage, valueText }) => (
          <>
            <div className="flex items-baseline gap-3 text-sm">
              {label && (
                <Label
                  data-slot="meter-label"
                  className="min-w-0 flex-1 font-medium wrap-anywhere"
                >
                  {label}
                </Label>
              )}
              <span
                data-slot="meter-value"
                className="ms-auto max-w-1/2 shrink-0 text-end font-mono tabular-nums text-muted-foreground wrap-anywhere"
              >
                {valueText}
              </span>
            </div>
            <div
              data-slot="meter-track"
              className="h-2 overflow-hidden rounded-full bg-secondary shadow-(--shadow-inset) forced-colors:border rtl:-scale-x-100"
            >
              <div
                data-slot="meter-fill"
                className="h-full w-full origin-left rounded-full bg-primary forced-colors:bg-[Highlight] transition-[scale] duration-200 ease-out-quint motion-reduce:duration-0"
                style={{ scale: `${percentage / 100} 1` }}
              />
            </div>
          </>
        ))}
    </AriaMeter>
  );
}
