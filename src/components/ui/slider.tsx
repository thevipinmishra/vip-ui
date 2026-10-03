"use client";

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
import { cn } from "@/lib/utils";

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
          "rounded-md bg-secondary px-2 py-0.5 font-mono text-xs tabular-nums text-secondary-foreground ring-1 ring-border/60",
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
          "relative h-11 w-full cursor-pointer touch-none disabled:cursor-default disabled:opacity-50",
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
        "pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-secondary shadow-[var(--shadow-inset)] ring-1 ring-border/60 forced-colors:bg-[ButtonBorder]",
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
  ...props
}: React.ComponentProps<typeof SliderThumb>) {
  // React Aria positions the thumb with an inline translate(-50%, -50%).
  // Only set top: 50%; an extra translate utility offsets it twice.
  return (
    <SliderThumb
      {...props}
      data-slot="slider-handle"
      className={composeRenderProps(className, (className) =>
        cn(
          "top-1/2 size-6 cursor-grab rounded-full border-[3px] border-card bg-primary shadow-[var(--shadow-float),0_0_0_1px_var(--primary)] outline-none dragging:cursor-grabbing disabled:cursor-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-3 focus-visible:outline-ring forced-colors:border-[ButtonFace] forced-colors:bg-[Highlight] motion-safe:transition-[scale,box-shadow] motion-safe:duration-150 motion-safe:dragging:scale-110",
          className,
        ),
      )}
    />
  );
}
