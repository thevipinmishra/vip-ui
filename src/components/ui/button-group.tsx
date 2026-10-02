import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export interface ButtonGroupProps extends ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
}

export function ButtonGroup({
  orientation = "horizontal",
  className,
  ...props
}: ButtonGroupProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: Fieldset is for form controls; these are independent actions.
    <div
      {...props}
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "inline-flex w-fit max-w-full items-center gap-1 rounded-lg border border-border bg-card p-1 shadow-[var(--shadow-card)] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className,
      )}
    />
  );
}
