"use client";

import {
  ColorSwatch as AriaColorSwatch,
  type ColorSwatchProps,
  composeRenderProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function ColorSwatch({ className, style, ...props }: ColorSwatchProps) {
  return (
    <AriaColorSwatch
      {...props}
      data-slot="color-swatch"
      className={composeRenderProps(className, (className) =>
        cn("size-9 shrink-0 rounded-md ring-1 ring-foreground/10", className),
      )}
      style={composeRenderProps(style, (style, { color }) => ({
        background: `linear-gradient(${color}, ${color}), repeating-conic-gradient(var(--border) 0% 25%, var(--background) 0% 50%) 50% / 12px 12px`,
        ...style,
      }))}
    />
  );
}
