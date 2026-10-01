"use client";

import {
  ToggleButtonGroup as AriaToggleButtonGroup,
  composeRenderProps,
  type ToggleButtonGroupProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function ToggleButtonGroup({
  className,
  ...props
}: ToggleButtonGroupProps) {
  return (
    <AriaToggleButtonGroup
      {...props}
      data-slot="toggle-button-group"
      className={composeRenderProps(className, (className) =>
        cn(
          "inline-flex w-fit max-w-full flex-wrap gap-1 rounded-lg border border-border bg-secondary p-1 data-[orientation=vertical]:flex-col",
          className,
        ),
      )}
    />
  );
}
