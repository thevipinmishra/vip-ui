"use client";

import {
  ColorPicker as AriaColorPicker,
  type ColorPickerProps as AriaColorPickerProps,
  Dialog as AriaDialog,
  ColorArea,
  ColorSlider,
  DialogTrigger,
  SliderTrack,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ColorField } from "./color-field";
import { ColorSwatch } from "./color-swatch";
import { ColorThumb } from "./color-thumb";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import { Popover } from "./popover";

const triggerStyles =
  "[--swatch-size:1.5rem] [--swatch-inset:0.5625rem] data-[size=xs]:[--swatch-size:1rem] data-[size=xs]:[--swatch-inset:0.3125rem] data-[size=sm]:[--swatch-size:1.25rem] data-[size=sm]:[--swatch-inset:0.4375rem] data-[size=lg]:[--swatch-size:1.75rem] data-[size=xl]:[--swatch-size:2rem] data-[size=xl]:[--swatch-inset:0.6875rem] ps-(--swatch-inset)";

const surfaceRadius =
  "rounded-[max(var(--radius-sm),calc(var(--radius-xl)-1px-0.75rem))]";

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
          <Button
            variant="outline"
            data-slot="color-picker-trigger"
            className={triggerStyles}
          >
            <ColorSwatch className="size-(--swatch-size) rounded-[calc(var(--radius)*0.4)]" />
            {label}
          </Button>
          <Popover
            data-slot="color-picker-popover"
            placement="bottom start"
            className="w-64 overflow-visible p-3"
          >
            <AriaDialog
              aria-label={`${label} controls`}
              className="grid gap-3 outline-none"
            >
              <ColorArea
                data-slot="color-picker-area"
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness"
                aria-label="Saturation and brightness"
                className={cn(
                  surfaceRadius,
                  "aspect-square w-full ring-1 ring-inset ring-foreground/20",
                )}
              >
                <ColorThumb data-slot="color-picker-area-thumb" />
              </ColorArea>
              <ColorSlider
                data-slot="color-picker-hue"
                colorSpace="hsb"
                channel="hue"
                aria-label="Hue"
                className="py-0.5"
              >
                <SliderTrack className="relative h-5 rounded-full ring-1 ring-inset ring-foreground/20">
                  <ColorThumb
                    data-slot="color-picker-hue-thumb"
                    className="top-1/2"
                  />
                </SliderTrack>
              </ColorSlider>
              <ColorField aria-label="Hex" size="sm">
                <InputGroup>
                  <InputGroupAddon aria-hidden="true">Hex</InputGroupAddon>
                  <InputGroupInput className="min-w-0 font-mono tabular-nums" />
                </InputGroup>
              </ColorField>
            </AriaDialog>
          </Popover>
        </DialogTrigger>
      )}
    </AriaColorPicker>
  );
}
