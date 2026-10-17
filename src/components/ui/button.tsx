"use client";

import { type MotionProps, motion, useReducedMotion } from "motion/react";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
} from "react-aria-components";
import { springLayout } from "@/lib/motion";
import { type ButtonVariant, buttonLabel, buttonStyles } from "./button-styles";
import { type Size, useSize } from "./size";

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
  size?: Size;
  iconOnly?: boolean;
  static?: boolean;
  layout?: MotionProps["layout"];
}

const MotionButton = motion.create(AriaButton);

const pressStyles = "motion-safe:pressed:not-aria-expanded:scale-[0.96]";

export function Button({
  className,
  children,
  variant = "default",
  size: sizeProp,
  iconOnly = false,
  static: isStatic = false,
  layout,
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const size = useSize(sizeProp) ?? "md";
  return (
    <MotionButton
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly || undefined}
      layout={reduceMotion ? false : layout}
      transition={springLayout}
      className={composeRenderProps(className, (className) =>
        buttonStyles({
          variant,
          size,
          iconOnly,
          className: [!isStatic && pressStyles, className],
        }),
      )}
      {...props}
    >
      {composeRenderProps(children, buttonLabel)}
    </MotionButton>
  );
}
