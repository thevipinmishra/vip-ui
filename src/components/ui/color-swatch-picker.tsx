"use client";

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
        cn("flex flex-wrap gap-3", className),
      )}
    />
  );
}

export function ColorSwatchPickerItem({
  className,
  children,
  ...props
}: ColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem
      {...props}
      data-slot="color-swatch-picker-item"
      className={composeRenderProps(className, (className) =>
        cn(
          "grid size-11 cursor-pointer place-items-center rounded-lg border-2 border-transparent transition-[scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-border hover:bg-muted/50 motion-safe:pressed:scale-[0.96] selected:border-primary selected:bg-accent/50 selected:hover:border-primary disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring forced-colors:selected:border-[Highlight]",
          className,
        ),
      )}
    >
      {children ?? <ColorSwatch className="size-8" />}
    </AriaColorSwatchPickerItem>
  );
}
