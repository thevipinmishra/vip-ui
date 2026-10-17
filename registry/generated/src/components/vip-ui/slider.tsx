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
        cn(
          "group grid w-full min-w-0 grid-cols-1 gap-1 disabled:opacity-50",
          className,
        ),
      )}
    >
      {children ?? (
        <>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
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
          "ms-auto text-end font-mono text-sm tabular-nums text-muted-foreground",
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
  return (
    <SliderThumb
      {...props}
      data-slot="slider-handle"
      className={composeRenderProps(className, (className) =>
        cn(
          "group/thumb top-1/2 size-5 cursor-grab rounded-full outline-none outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint dragging:cursor-grabbing disabled:cursor-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2",
          className,
        ),
      )}
    >
      {composeRenderProps(children, (content) => (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-card shadow-[var(--shadow-card)] ring-1 ring-border transition-[scale,box-shadow] duration-350 ease-spring group-hover/thumb:scale-106 group-hover/thumb:ring-primary/60 group-dragging/thumb:scale-114 group-dragging/thumb:shadow-[var(--shadow-float)] group-dragging/thumb:ring-primary/60 motion-reduce:transition-[box-shadow] forced-colors:bg-[ButtonText]"
          />
          {content}
        </>
      ))}
    </SliderThumb>
  );
}
