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
  SliderTrack,
} from "react-aria-components";
import { duration, easeOut } from "./motion";
import { cn } from "./utils";
import { Button } from "./button";
import { ColorField } from "./color-field";
import { ColorSwatch } from "./color-swatch";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import { Popover } from "./popover";

const colorThumbStyles =
  "size-6 rounded-full border-2 border-white shadow-[var(--shadow-card)] ring-1 ring-black/50 outline-none outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2";

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
                aria-label="Hue"
                className="py-0.5"
              >
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
