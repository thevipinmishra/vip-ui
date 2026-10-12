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
import { springSnappy, transitionFor } from "./motion";
import { cn } from "./utils";
import { fieldLabelStyles } from "./field-styles";

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
        cn("group grid w-full gap-1 disabled:opacity-50", className),
      )}
    >
      {children ?? (
        <>
          <div className="flex items-baseline gap-3">
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
      className={cn(fieldLabelStyles, className)}
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
          "ms-auto font-mono text-sm tabular-nums text-muted-foreground",
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
          "relative mx-2.5 h-11 cursor-pointer touch-none before:absolute before:inset-y-0 before:-inset-x-2.5 disabled:cursor-default",
          className,
        ),
      )}
    />
  );
}

export function SliderRail({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="slider-rail"
      className={cn(
        "pointer-events-none absolute -inset-x-2.5 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-secondary px-2.5 shadow-[var(--shadow-inset)] forced-colors:bg-[ButtonBorder]",
        className,
      )}
    >
      <div className="relative h-full">{children}</div>
    </div>
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
        cn(
          "-ms-2.5 box-content rounded-full bg-primary px-2.5 forced-colors:bg-[Highlight]",
          className,
        ),
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
  return (
    <SliderThumb
      {...props}
      data-slot="slider-handle"
      className={composeRenderProps(className, (className) =>
        cn(
          "top-1/2 size-5 cursor-grab rounded-full outline-none dragging:cursor-grabbing disabled:cursor-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring",
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
              className={cn(
                "pointer-events-none absolute inset-0 rounded-full bg-card ring-1 transition-[box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] forced-colors:bg-[ButtonText]",
                !isDisabled && (isDragging || isHovered)
                  ? "ring-primary/60"
                  : "ring-border",
                !isDisabled && isDragging
                  ? "shadow-[var(--shadow-float)]"
                  : "shadow-[var(--shadow-card)]",
              )}
              initial={false}
              animate={{
                scale:
                  !isDisabled && isDragging
                    ? 1.14
                    : !isDisabled && isHovered
                      ? 1.06
                      : 1,
              }}
              transition={transitionFor(reduceMotion, springSnappy)}
            />
            {content}
          </>
        ),
      )}
    </SliderThumb>
  );
}
