import type { ComponentProps, ElementType } from "react";
import {
  type ButtonSize,
  type ButtonVariant,
  buttonLinkStyles,
} from "./button-styles";

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  as?: ElementType;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({
  children,
  className,
  as: Element = "a",
  variant = "default",
  size = "default",
  ...props
}: ButtonLinkProps) {
  return (
    <Element
      {...props}
      data-slot="button-link"
      data-variant={variant}
      data-size={size}
      className={buttonLinkStyles({ variant, size, className })}
    >
      {children}
    </Element>
  );
}
