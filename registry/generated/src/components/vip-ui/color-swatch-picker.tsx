"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import {
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  type ColorSwatchPickerItemProps,
  type ColorSwatchPickerProps,
  composeRenderProps,
} from "react-aria-components";
import { cn } from "./utils";
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
  const reduceMotion = useReducedMotion();
  return (
    <AriaColorSwatchPickerItem
      {...props}
      data-slot="color-swatch-picker-item"
      render={
        props.render ??
        ((domProps, { isPressed, isDisabled }) => (
          <motion.div
            {...(domProps as HTMLMotionProps<"div">)}
            initial={false}
            animate={{ scale: isPressed && !isDisabled ? 0.95 : 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 500, damping: 36 }
            }
          />
        ))
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "grid size-11 cursor-pointer place-items-center rounded-lg border-2 border-transparent hover:border-border data-[selected]:border-primary data-[disabled]:cursor-default data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-ring data-[disabled]:opacity-50",
          className,
        ),
      )}
    >
      {children ?? <ColorSwatch className="size-8" />}
    </AriaColorSwatchPickerItem>
  );
}
