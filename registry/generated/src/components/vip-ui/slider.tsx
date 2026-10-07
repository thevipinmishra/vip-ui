"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  SliderTrack as AriaSliderTrack,
  composeRenderProps,
  Label,
  SliderFill,
  SliderOutput,
  SliderThumb,
} from "react-aria-components";
import { cn } from "./utils";

export interface SliderProps
  extends Omit<AriaSliderProps, "children" | "className"> {
  label?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaSliderProps["className"];
  children?: AriaSliderProps["children"];
}

export function Slider({ label, className, children, ...props }: SliderProps) {
  return (
    <AriaSlider
      {...props}
      data-slot="slider"
      className={composeRenderProps(className, (className) =>
        cn("group grid w-full gap-3", className),
      )}
    >
      {children ?? (
        <>
          <div className="flex items-center justify-between gap-4 text-sm">
            {label && <SliderLabel>{label}</SliderLabel>}
            <SliderValue />
          </div>
          <SliderTrack>
            <SliderRail>
              <SliderRange />
            </SliderRail>
            <SliderHandle />
          </SliderTrack>
        </>
      )}
    </AriaSlider>
  );
}

export function SliderLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="slider-label"
      className={cn("font-medium text-foreground", className)}
    />
  );
}

export function SliderValue({
  className,
  ...props
}: React.ComponentProps<typeof SliderOutput>) {
  return (
    <SliderOutput
      {...props}
      data-slot="slider-value"
      className={composeRenderProps(className, (className) =>
        cn(
          "font-mono text-xs font-medium tabular-nums text-muted-foreground",
          className,
        ),
      )}
    />
  );
}

export function SliderTrack({
  className,
  ...props
}: React.ComponentProps<typeof AriaSliderTrack>) {
  return (
    <AriaSliderTrack
      {...props}
      data-slot="slider-track"
      className={composeRenderProps(className, (className) =>
        cn(
          "relative h-11 w-full cursor-pointer touch-none data-[disabled]:cursor-default data-[disabled]:opacity-50",
          className,
        ),
      )}
    />
  );
}

export function SliderRail({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="slider-rail"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-secondary forced-colors:bg-[ButtonBorder]",
        className,
      )}
    />
  );
}

export function SliderRange({
  className,
  ...props
}: React.ComponentProps<typeof SliderFill>) {
  return (
    <SliderFill
      {...props}
      data-slot="slider-range"
      className={composeRenderProps(className, (className) =>
        cn("rounded-full bg-primary forced-colors:bg-[Highlight]", className),
      )}
    />
  );
}

export function SliderHandle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SliderThumb>) {
  const reduceMotion = useReducedMotion();
  // React Aria owns the thumb's position. Only animate its visual layer.
  return (
    <SliderThumb
      {...props}
      data-slot="slider-handle"
      className={composeRenderProps(className, (className) =>
        cn(
          "relative top-1/2 h-7 w-5 cursor-grab rounded-md outline-none data-[dragging]:cursor-grabbing data-[disabled]:cursor-default data-[focus-visible]:outline-2 data-[focus-visible]:outline-solid data-[focus-visible]:outline-offset-3 data-[focus-visible]:outline-ring",
          className,
        ),
      )}
    >
      {composeRenderProps(
        children,
        (content, { isDragging, isHovered, isDisabled }) => (
          <>
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center gap-0.5 rounded-md bg-primary forced-colors:bg-[Highlight]"
              initial={false}
              animate={{
                scaleX:
                  !isDisabled && isDragging
                    ? 1.18
                    : !isDisabled && isHovered
                      ? 1.07
                      : 1,
                scaleY: !isDisabled && isDragging ? 0.94 : 1,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 420, damping: 32 }
              }
            >
              <span className="h-2 w-px rounded-full bg-primary-foreground/80 forced-colors:bg-[HighlightText]" />
              <span className="h-2 w-px rounded-full bg-primary-foreground/80 forced-colors:bg-[HighlightText]" />
            </motion.span>
            {content}
          </>
        ),
      )}
    </SliderThumb>
  );
}
