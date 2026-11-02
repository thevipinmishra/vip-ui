"use client";

import { type ReactNode, useContext } from "react";
import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  SliderTrack as AriaSliderTrack,
  composeRenderProps,
  Label,
  SliderFill,
  SliderOutput,
  SliderStateContext,
  SliderThumb,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { fieldLabelStyles } from "./field-styles";

export interface SliderProps
  extends Omit<AriaSliderProps, "children" | "className"> {
  label?: string;
  /** Names each handle for screen readers, in value order. Use it when the slider has more than one handle. */
  thumbLabels?: string[];
  /** Values to label along the track. */
  marks?: number[];
  /** The value the fill starts from. Set it to 0 when the range goes below zero. */
  fillOffset?: number;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaSliderProps["className"];
  children?: AriaSliderProps["children"];
}

export function Slider({
  label,
  thumbLabels,
  marks,
  fillOffset,
  className,
  children,
  ...props
}: SliderProps) {
  const track = (
    <SliderTrack>
      {({ state }) => (
        <>
          <SliderRail>
            <SliderRange offset={fillOffset} />
          </SliderRail>
          {state.values.map((_, index) => (
            <SliderHandle
              // biome-ignore lint/suspicious/noArrayIndexKey: a handle is its index.
              key={index}
              index={index}
              aria-label={thumbLabels?.[index]}
            />
          ))}
        </>
      )}
    </SliderTrack>
  );
  return (
    <AriaSlider
      {...props}
      data-slot="slider"
      className={composeRenderProps(className, (className, { orientation }) =>
        cn(
          "group/slider grid min-w-0 grid-cols-1 gap-1 disabled:opacity-50",
          orientation === "vertical"
            ? "h-56 w-fit grid-rows-[auto_minmax(0,1fr)] justify-items-center"
            : "w-full",
          className,
        ),
      )}
    >
      {children ?? (
        <>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 justify-self-stretch">
            {label && <SliderLabel>{label}</SliderLabel>}
            <SliderValue />
          </div>
          {marks && props.orientation === "vertical" ? (
            <div className="flex min-h-0 gap-1">
              {track}
              <SliderMarks values={marks} offset={fillOffset} />
            </div>
          ) : (
            <>
              {track}
              {marks && <SliderMarks values={marks} offset={fillOffset} />}
            </>
          )}
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
      className={composeRenderProps(className, (className, { orientation }) =>
        cn(
          "relative cursor-pointer touch-none before:absolute disabled:cursor-default",
          orientation === "vertical"
            ? "my-2.5 w-11 before:inset-x-0 before:-inset-y-2.5"
            : "mx-2.5 h-11 before:inset-y-0 before:-inset-x-2.5",
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
  const vertical = useContext(SliderStateContext)?.orientation === "vertical";
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="slider-rail"
      className={cn(
        "pointer-events-none absolute rounded-full bg-muted-foreground/20 shadow-[var(--shadow-inset)] forced-colors:bg-[ButtonBorder]",
        vertical
          ? "-inset-y-2.5 left-1/2 w-1.5 -translate-x-1/2 py-2.5"
          : "-inset-x-2.5 top-1/2 h-1.5 -translate-y-1/2 px-2.5",
        className,
      )}
    >
      <div className="relative size-full">{children}</div>
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
      className={composeRenderProps(className, (className, { orientation }) =>
        cn(
          "box-content rounded-full bg-primary forced-colors:bg-[Highlight]",
          orientation === "vertical" ? "-mb-2.5 py-2.5" : "-ms-2.5 px-2.5",
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
          "group/thumb top-1/2 left-1/2 size-5 cursor-grab rounded-full outline-none outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint dragging:cursor-grabbing disabled:cursor-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2",
          className,
        ),
      )}
    >
      {composeRenderProps(children, (content) => (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-card shadow-[var(--shadow-card)] ring-1 ring-input transition-[scale,box-shadow] duration-350 ease-spring group-hover/thumb:scale-106 group-hover/thumb:ring-primary/60 group-dragging/thumb:scale-114 group-dragging/thumb:shadow-[var(--shadow-float)] group-dragging/thumb:ring-primary/60 motion-reduce:transition-[box-shadow] forced-colors:bg-[ButtonText]"
          />
          {content}
        </>
      ))}
    </SliderThumb>
  );
}

export interface SliderMarksProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** The values to label, in the slider's units. */
  values: number[];
  /** Renders each label. Without it, the slider's formatOptions format the value. */
  children?: (value: number) => ReactNode;
  /** The fill offset of the matching SliderRange, so the right labels light up. */
  offset?: number;
}

export function SliderMarks({
  values,
  children,
  offset,
  className,
  ...props
}: SliderMarksProps) {
  const state = useContext(SliderStateContext);
  if (!state) return null;
  const vertical = state.orientation === "vertical";
  const first = state.values[0];
  const last = state.values[state.values.length - 1];
  const start =
    state.values.length > 1 ? first : (offset ?? state.getThumbMinValue(0));
  const low = Math.min(start, last);
  const high = Math.max(start, last);
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="slider-marks"
      className={cn(
        "relative text-xs tabular-nums text-muted-foreground",
        vertical ? "my-2.5 min-w-8" : "mx-2.5 -mt-1.5 h-4",
        className,
      )}
    >
      {values.map((value) => {
        const percent = state.getValuePercent(value) * 100;
        const edge = percent <= 0 ? "start" : percent >= 100 ? "end" : null;
        return (
          <span
            key={value}
            data-slot="slider-mark"
            data-active={(value >= low && value <= high) || undefined}
            style={
              vertical
                ? { bottom: `${percent}%` }
                : { insetInlineStart: `${percent}%` }
            }
            className={cn(
              "absolute whitespace-nowrap leading-4 transition-colors duration-150 ease-out-quint data-active:text-foreground",
              vertical
                ? cn(
                    "start-0",
                    edge === "start" && "-mb-2.5",
                    edge === "end" && "mb-2.5 translate-y-full",
                    !edge && "translate-y-1/2",
                  )
                : cn(
                    "top-0",
                    edge === "start" && "-ms-2.5",
                    edge === "end" &&
                      "ms-2.5 -translate-x-full rtl:translate-x-full",
                    !edge && "-translate-x-1/2 rtl:translate-x-1/2",
                  ),
            )}
          >
            {children ? children(value) : state.getFormattedValue(value)}
          </span>
        );
      })}
    </div>
  );
}
