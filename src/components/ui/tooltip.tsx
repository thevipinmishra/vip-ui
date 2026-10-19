"use client";

import {
  Tooltip as AriaTooltip,
  type TooltipProps as AriaTooltipProps,
  TooltipTrigger as AriaTooltipTrigger,
  composeRenderProps,
  OverlayArrow,
  type OverlayArrowProps,
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

export function Tooltip({
  className,
  offset = 8,
  arrowBoundaryOffset = 8,
  ...props
}: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      data-slot="tooltip-content"
      offset={offset}
      arrowBoundaryOffset={arrowBoundaryOffset}
      className={composeRenderProps(className, (className) =>
        cn(
          "max-w-[min(14rem,calc(100vw-1.5rem))] overflow-auto overscroll-contain rounded-md bg-foreground px-3 py-2 text-xs leading-5 text-background [overflow-wrap:anywhere] shadow-[var(--shadow-float)] outline-none forced-colors:border",
          "has-[[data-slot=tooltip-arrow]]:overflow-visible",
          // React Aria sets data-entering and data-exiting once the placement is
          // known, then waits for these transitions before it unmounts the tooltip.
          "origin-(--trigger-anchor-point) transition-[opacity,scale,translate] duration-180 ease-out-quint",
          "placement-top:[--tooltip-shift:0_3px] placement-bottom:[--tooltip-shift:0_-3px] placement-left:[--tooltip-shift:3px_0] placement-right:[--tooltip-shift:-3px_0]",
          "entering:opacity-0 motion-safe:entering:scale-98 motion-safe:entering:[translate:var(--tooltip-shift)]",
          "exiting:opacity-0 exiting:duration-120 motion-safe:exiting:scale-99 motion-safe:exiting:[translate:var(--tooltip-shift)]",
          className,
        ),
      )}
    />
  );
}

export function TooltipArrow({
  className,
  ...props
}: Omit<OverlayArrowProps, "children">) {
  return (
    <OverlayArrow
      {...props}
      data-slot="tooltip-arrow"
      className={composeRenderProps(className, (className) =>
        cn("group/arrow", className),
      )}
    >
      <svg
        width={12}
        height={12}
        viewBox="0 0 12 12"
        aria-hidden="true"
        className="block fill-foreground group-placement-bottom/arrow:rotate-180 group-placement-left/arrow:-rotate-90 group-placement-right/arrow:rotate-90 forced-colors:fill-[Canvas] forced-colors:stroke-[CanvasText]"
      >
        <path d="M0 0 6 6 12 0" />
      </svg>
    </OverlayArrow>
  );
}

export const TooltipContent = Tooltip;
