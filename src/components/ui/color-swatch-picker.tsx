"use client";

import type { CSSProperties } from "react";
import {
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  type ColorSwatchPickerItemProps,
  type ColorSwatchPickerProps,
  composeRenderProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { ColorSwatch } from "./color-swatch";

export function ColorSwatchPicker({
  className,
  ...props
}: ColorSwatchPickerProps) {
  return (
    <AriaColorSwatchPicker
      {...props}
      data-slot="color-swatch-picker"
      className={composeRenderProps(className, (className) =>
        cn("flex flex-wrap gap-1", className),
      )}
    />
  );
}

export function ColorSwatchPickerItem({
  className,
  style,
  children,
  ...props
}: ColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem
      {...props}
      data-slot="color-swatch-picker-item"
      className={composeRenderProps(className, (className) =>
        cn(
          "group/swatch relative grid size-11 cursor-pointer place-items-center rounded-[calc(var(--radius-lg)+0.375rem)] outline-offset-2 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring disabled:cursor-default disabled:opacity-40 motion-reduce:outline-offset-0",
          "before:pointer-events-none before:absolute before:inset-0.5 before:rounded-[calc(var(--radius-lg)+0.25rem)] before:border-2 before:border-(--swatch-ring) before:opacity-0 before:transition-[opacity,scale] before:duration-150 before:ease-out-quint motion-safe:before:scale-90 selected:before:opacity-100 selected:before:duration-350 selected:before:ease-spring motion-safe:selected:before:scale-100 forced-colors:before:border-[Highlight]",
          className,
        ),
      )}
      style={composeRenderProps(
        style,
        (style, { color }) =>
          ({
            "--swatch-ring": `color-mix(in oklab, ${color.withChannelValue("alpha", 1).toString("css")} 85%, var(--foreground))`,
            ...style,
          }) as CSSProperties,
      )}
    >
      {children ?? (
        <ColorSwatch className="size-8 rounded-lg transition-[scale] duration-150 ease-out-quint motion-safe:group-hover/swatch:scale-[1.08] motion-safe:group-pressed/swatch:scale-95 motion-safe:group-selected/swatch:scale-100 motion-safe:group-disabled/swatch:scale-100" />
      )}
    </AriaColorSwatchPickerItem>
  );
}
