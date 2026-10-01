"use client";

import {
  Separator as AriaSeparator,
  type SeparatorProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const separatorStyles = tv({
  base: "shrink-0 border-0 bg-border forced-colors:bg-[ButtonBorder]",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px self-stretch",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <AriaSeparator
      {...props}
      data-slot="separator"
      orientation={orientation}
      className={separatorStyles({ orientation, className })}
    />
  );
}
