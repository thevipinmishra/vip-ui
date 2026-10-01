"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
} from "react-aria-components";
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
}

const MotionButton = motion.create(AriaButton);

export function Button({
  className,
  variant = "default",
  size = "default",
  static: isStatic = false,
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  return (
    <MotionButton
      data-slot="button"
      data-variant={variant}
      data-size={size}
      whileTap={isStatic || reduceMotion ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      className={composeRenderProps(className, (className) =>
        buttonStyles({ variant, size, className }),
      )}
      {...props}
    />
  );
}
