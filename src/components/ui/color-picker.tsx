"use client";

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
                  className="size-5 rounded-full border-2 border-card shadow-[var(--shadow-card)] ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </ColorArea>
              <ColorSlider
                data-slot="color-picker-hue"
                colorSpace="hsb"
                channel="hue"
                className="grid gap-2"
              >
                <Label className="text-[13px] font-medium">Hue</Label>
                <SliderTrack className="relative h-5 rounded-full">
                  <ColorThumb
                    data-slot="color-picker-hue-thumb"
                    className="size-6 rounded-full border-2 border-card shadow-[var(--shadow-card)] ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
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
