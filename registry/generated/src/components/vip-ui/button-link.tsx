import type { ComponentProps, ElementType } from "react";
import {
  type ButtonVariant,
  buttonLabel,
  buttonLinkStyles,
} from "./button-styles";
import type { Size } from "./size";

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  as?: ElementType;
  variant?: ButtonVariant;
  size?: Size;
  iconOnly?: boolean;
};

export function ButtonLink({
  children,
  className,
  as: Element = "a",
  variant = "default",
  size = "md",
  iconOnly = false,
  ...props
}: ButtonLinkProps) {
  return (
    <Element
      {...props}
      data-slot="button-link"
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly || undefined}
      className={buttonLinkStyles({ variant, size, iconOnly, className })}
    >
      {buttonLabel(children)}
    </Element>
  );
}
