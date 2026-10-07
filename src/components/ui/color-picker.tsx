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
import { Button } from "./button";
import { ColorField } from "./color-field";
import { ColorSwatch } from "./color-swatch";
import { Popover } from "./popover";

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
  const reduceMotion = useReducedMotion();
  return (
    <AriaColorPicker {...props} data-slot="color-picker">
      {children ?? (
        <DialogTrigger>
          <Button variant="outline">
            <ColorSwatch className="size-6" />
            {label}
          </Button>
          <Popover placement="bottom start" className="w-64 p-4">
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
                className="aspect-square w-full rounded-lg"
              >
                <ColorThumb
                  data-slot="color-picker-area-thumb"
                  className="relative size-5 rounded-full border-2 border-card shadow-[var(--shadow-card)] ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {({ isDragging }) => (
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-1 rounded-full ring-2 ring-primary/40"
                      initial={false}
                      animate={{
                        opacity: isDragging ? 1 : 0,
                        scale: isDragging ? 1 : 0.85,
                      }}
                      transition={{ duration: reduceMotion ? 0 : 0.16 }}
                    />
                  )}
                </ColorThumb>
              </ColorArea>
              <ColorSlider
                data-slot="color-picker-hue"
                colorSpace="hsb"
                channel="hue"
                className="grid gap-2"
              >
                <Label className="text-sm font-medium">Hue</Label>
                <SliderTrack className="relative h-5 rounded-full">
                  <ColorThumb
                    data-slot="color-picker-hue-thumb"
                    className="relative size-6 rounded-full border-2 border-card shadow-[var(--shadow-card)] ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {({ isDragging }) => (
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-1 rounded-full ring-2 ring-primary/40"
                        initial={false}
                        animate={{
                          opacity: isDragging ? 1 : 0,
                          scale: isDragging ? 1 : 0.85,
                        }}
                        transition={{ duration: reduceMotion ? 0 : 0.16 }}
                      />
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
