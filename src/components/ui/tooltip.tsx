"use client";

import {
  Tooltip as AriaTooltip,
  type TooltipProps as AriaTooltipProps,
  TooltipTrigger as AriaTooltipTrigger,
  composeRenderProps,
  type TooltipTriggerComponentProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

type TooltipProps = AriaTooltipProps;

export function TooltipTrigger({
  delay = 400,
  ...props
}: TooltipTriggerComponentProps) {
  return <AriaTooltipTrigger {...props} delay={delay} />;
}

export function Tooltip({ className, offset = 8, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      data-slot="tooltip-content"
      offset={offset}
      className={composeRenderProps(className, (className) =>
        cn(
          "max-w-[min(14rem,calc(100vw-1.5rem))] overflow-auto overscroll-contain rounded-md bg-foreground px-3 py-2 text-xs leading-5 text-background [overflow-wrap:anywhere] shadow-[var(--shadow-float)] outline-none forced-colors:border",
          // React Aria sets data-entering and data-exiting once the placement is
          // known, then waits for these transitions before it unmounts the tooltip.
          "origin-(--trigger-anchor-point) transition-[opacity,scale,translate] duration-180 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "placement-top:[--tooltip-shift:0_3px] placement-bottom:[--tooltip-shift:0_-3px] placement-left:[--tooltip-shift:3px_0] placement-right:[--tooltip-shift:-3px_0]",
          "entering:opacity-0 motion-safe:entering:scale-98 motion-safe:entering:[translate:var(--tooltip-shift)]",
          "exiting:opacity-0 exiting:duration-120 motion-safe:exiting:scale-99 motion-safe:exiting:[translate:var(--tooltip-shift)]",
          className,
        ),
      )}
    />
  );
}

export const TooltipContent = Tooltip;
