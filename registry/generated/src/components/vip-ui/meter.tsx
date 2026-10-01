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
            <div className="flex justify-between gap-3 text-[13px]">
              {label && (
                <Label data-slot="meter-label" className="font-medium">
                  {label}
                </Label>
              )}
              <span
                data-slot="meter-value"
                className="font-mono tabular-nums text-muted-foreground"
              >
                {valueText}
              </span>
            </div>
            <div
              data-slot="meter-track"
              className="h-2 overflow-hidden rounded-full bg-secondary shadow-[var(--shadow-inset)]"
            >
              <div
                data-slot="meter-fill"
                className="h-full rounded-full bg-primary"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </>
        ))}
    </AriaMeter>
  );
}
