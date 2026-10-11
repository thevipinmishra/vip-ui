"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Meter as AriaMeter,
  type MeterProps as AriaMeterProps,
  composeRenderProps,
  Label,
} from "react-aria-components";
import { duration, easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface MeterProps
  extends Omit<AriaMeterProps, "className" | "children"> {
  label?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaMeterProps["className"];
  children?: AriaMeterProps["children"];
}

export function Meter({ label, className, children, ...props }: MeterProps) {
  const reduceMotion = useReducedMotion();
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
                  className="min-w-0 font-medium [overflow-wrap:anywhere]"
                >
                  {label}
                </Label>
              )}
              <span
                data-slot="meter-value"
                className="ms-auto min-w-0 text-end font-mono tabular-nums text-muted-foreground"
              >
                {valueText}
              </span>
            </div>
            <div
              data-slot="meter-track"
              className="h-2 overflow-hidden rounded-full bg-secondary shadow-[var(--shadow-inset)] forced-colors:border rtl:-scale-x-100"
            >
              <motion.div
                data-slot="meter-fill"
                className="h-full w-full origin-left rounded-full bg-primary forced-colors:bg-[Highlight]"
                initial={false}
                animate={{ scaleX: percentage / 100 }}
                transition={{
                  duration: reduceMotion ? 0 : duration.base,
                  ease: easeOut,
                }}
              />
            </div>
          </>
        ))}
    </AriaMeter>
  );
}
