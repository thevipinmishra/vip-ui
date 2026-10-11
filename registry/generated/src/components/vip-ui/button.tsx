"use client";

import { type MotionProps, motion, useReducedMotion } from "motion/react";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
} from "react-aria-components";
import { springLayout } from "./motion";
import {
  type ButtonSize,
  type ButtonVariant,
  buttonStyles,
} from "./button-styles";

export interface ButtonProps
  extends Omit<
    AriaButtonProps,
    | "style"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
    | "onHoverStart"
    | "onHoverEnd"
  > {
  ref?: React.Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  static?: boolean;
  layout?: MotionProps["layout"];
}

const MotionButton = motion.create(AriaButton);

const pressStyles = "motion-safe:pressed:not-aria-expanded:scale-[0.96]";

export function Button({
  className,
  variant = "default",
  size = "default",
  static: isStatic = false,
  layout,
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  return (
    <MotionButton
      data-slot="button"
      data-variant={variant}
      data-size={size}
      layout={reduceMotion ? false : layout}
      transition={springLayout}
      className={composeRenderProps(className, (className) =>
        buttonStyles({
          variant,
          size,
          className: [!isStatic && pressStyles, className],
        }),
      )}
      {...props}
    />
  );
}
