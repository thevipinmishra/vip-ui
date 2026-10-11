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
    // biome-ignore lint/a11y/useSemanticElements: Independent actions do not belong in a fieldset.
    <div
      {...props}
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "inline-flex w-fit max-w-full items-stretch rounded-lg border border-border bg-card shadow-[var(--shadow-card)]",
        "[&>*]:relative [&>*]:rounded-none [&>*]:border-0 [&>*]:shadow-none [&>*:focus-visible]:z-10",
        "data-[orientation=horizontal]:[&>*+*]:border-s data-[orientation=horizontal]:[&>*:first-child]:rounded-s-lg data-[orientation=horizontal]:[&>*:last-child]:rounded-e-lg",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:[&>*+*]:border-t data-[orientation=vertical]:[&>*:first-child]:rounded-t-lg data-[orientation=vertical]:[&>*:last-child]:rounded-b-lg",
        "[&>*+*]:border-border",
        className,
      )}
    />
  );
}
