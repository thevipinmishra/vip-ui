"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ColorPicker as AriaColorPicker,
  type ColorPickerProps as AriaColorPickerProps,
  Dialog as AriaDialog,
  ColorArea,
  ColorSlider,
  ColorThumb,
  DialogTrigger,
  Label,
  SliderTrack,
} from "react-aria-components";
import { duration, easeOut } from "./motion";
import { cn } from "./utils";
import { Button } from "./button";
import { ColorField } from "./color-field";
import { ColorSwatch } from "./color-swatch";
import { fieldLabelStyles } from "./field-styles";
import { Popover } from "./popover";

const colorThumbStyles =
  "size-6 rounded-full border-2 border-white shadow-[var(--shadow-card)] ring-1 ring-black/50 outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring";

export interface ColorPickerProps
  extends Omit<AriaColorPickerProps, "children"> {
  label?: string;
  children?: AriaColorPickerProps["children"];
}

export function ColorPicker({
  label = "Choose color",
  children,
  ...props
}: ColorPickerProps) {
  return (
    <AriaColorPicker {...props}>
      {children ?? (
        <DialogTrigger>
          <Button variant="outline" data-slot="color-picker-trigger">
            <ColorSwatch className="size-6" />
            {label}
          </Button>
          <Popover
            data-slot="color-picker-popover"
            placement="bottom start"
            className="w-64 p-4"
          >
            <AriaDialog
              aria-label={`${label} controls`}
              className="grid gap-4 outline-none"
            >
              <ColorArea
                data-slot="color-picker-area"
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness"
                aria-label="Saturation and brightness"
                className="aspect-square w-full rounded-lg ring-1 ring-inset ring-foreground/20"
              >
                <ColorThumb
                  data-slot="color-picker-area-thumb"
                  className={colorThumbStyles}
                >
                  {({ isDragging }) => (
                    <ThumbDragRing isDragging={isDragging} />
                  )}
                </ColorThumb>
              </ColorArea>
              <ColorSlider
                data-slot="color-picker-hue"
                colorSpace="hsb"
                channel="hue"
                className="grid gap-2"
              >
                <Label className={fieldLabelStyles}>Hue</Label>
                <SliderTrack className="relative h-5 rounded-full ring-1 ring-inset ring-foreground/20">
                  <ColorThumb
                    data-slot="color-picker-hue-thumb"
                    className={cn(colorThumbStyles, "top-1/2")}
                  >
                    {({ isDragging }) => (
                      <ThumbDragRing isDragging={isDragging} />
                    )}
                  </ColorThumb>
                </SliderTrack>
              </ColorSlider>
              <ColorField label="Hex" />
            </AriaDialog>
          </Popover>
        </DialogTrigger>
      )}
    </AriaColorPicker>
  );
}

function ThumbDragRing({ isDragging }: { isDragging: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-1 rounded-full ring-2 ring-primary/60"
      initial={false}
      animate={{ opacity: isDragging ? 1 : 0, scale: isDragging ? 1 : 0.85 }}
      transition={{ duration: reduceMotion ? 0 : duration.fast, ease: easeOut }}
    />
  );
}
