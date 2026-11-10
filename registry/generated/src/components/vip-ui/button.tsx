"use client";

import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
} from "react-aria-components";
import { type ButtonVariant, buttonLabel, buttonStyles } from "./button-styles";
import { type Size, useSize } from "./size";

export interface ButtonProps extends AriaButtonProps {
  ref?: React.Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: Size;
  iconOnly?: boolean;
  static?: boolean;
}

const pressStyles = "motion-safe:pressed:not-aria-expanded:scale-[0.96]";

export function Button({
  className,
  children,
  variant = "default",
  size: sizeProp,
  iconOnly = false,
  static: isStatic = false,
  ...props
}: ButtonProps) {
  const size = useSize(sizeProp) ?? "md";
  return (
    <AriaButton
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly || undefined}
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
    </AriaButton>
  );
}
