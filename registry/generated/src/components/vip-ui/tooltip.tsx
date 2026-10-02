"use client";

import {
  Tooltip as AriaTooltip,
  type TooltipProps as AriaTooltipProps,
  composeRenderProps,
  TooltipTrigger,
} from "react-aria-components";
import { cn } from "./utils";

type TooltipProps = AriaTooltipProps;

export { TooltipTrigger };

export function Tooltip({ className, offset = 8, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      data-slot="tooltip-content"
      offset={offset}
      className={composeRenderProps(className, (className) =>
        cn(
          "max-w-56 rounded-md bg-foreground px-3 py-2 text-xs leading-5 text-background shadow-[var(--shadow-float)] outline-none motion-safe:transition-[opacity,transform] motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:data-[entering]:opacity-0 motion-safe:data-[exiting]:opacity-0 motion-safe:data-[exiting]:duration-100 data-[placement=top]:origin-bottom data-[placement=bottom]:origin-top data-[placement=left]:origin-right data-[placement=right]:origin-left motion-safe:data-[placement=top]:data-[entering]:translate-y-1 motion-safe:data-[placement=top]:data-[exiting]:translate-y-1 motion-safe:data-[placement=bottom]:data-[entering]:-translate-y-1 motion-safe:data-[placement=bottom]:data-[exiting]:-translate-y-1 motion-safe:data-[placement=left]:data-[entering]:translate-x-1 motion-safe:data-[placement=left]:data-[exiting]:translate-x-1 motion-safe:data-[placement=right]:data-[entering]:-translate-x-1 motion-safe:data-[placement=right]:data-[exiting]:-translate-x-1",
          className,
        ),
      )}
    />
  );
}

export const TooltipContent = Tooltip;
