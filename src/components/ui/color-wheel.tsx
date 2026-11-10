"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  ColorWheel as AriaColorWheel,
  type ColorWheelProps as AriaColorWheelProps,
  ColorWheelTrack,
  composeRenderProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { ColorThumb } from "./color-thumb";

export interface ColorWheelProps
  extends Omit<
    AriaColorWheelProps,
    "outerRadius" | "innerRadius" | "children"
  > {
  outerRadius?: number;
  innerRadius?: number;
  children?: ReactNode;
}

export function ColorWheel({
  outerRadius = 96,
  innerRadius = outerRadius - 24,
  className,
  style,
  children,
  ...props
}: ColorWheelProps) {
  return (
    <AriaColorWheel
      {...props}
      outerRadius={outerRadius}
      innerRadius={innerRadius}
      data-slot="color-wheel"
      className={composeRenderProps(className, (className) =>
        cn("relative size-fit shrink-0 disabled:opacity-50", className),
      )}
      style={composeRenderProps(
        style,
        (style) =>
          ({
            "--color-wheel-inner-size": `${innerRadius * 2}px`,
            ...style,
          }) as CSSProperties,
      )}
    >
      <ColorWheelTrack
        data-slot="color-wheel-track"
        className="cursor-pointer rounded-full before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:ring-1 before:ring-foreground/20 before:ring-inset after:pointer-events-none after:absolute after:inset-0 after:m-auto after:size-(--color-wheel-inner-size) after:rounded-full after:ring-1 after:ring-foreground/20 disabled:cursor-default"
      />
      {children != null && (
        <div
          data-slot="color-wheel-center"
          className="absolute inset-0 m-auto grid size-(--color-wheel-inner-size) place-items-center"
        >
          {children}
        </div>
      )}
      <ColorThumb data-slot="color-wheel-thumb" />
    </AriaColorWheel>
  );
}
