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
        "[&>:not(output)]:relative [&>:not(output)]:min-w-0 [&>:not(output)]:shrink [&>:not(output)]:rounded-none [&>:not(output)]:border-0 [&>:not(output)]:shadow-none [&>[data-size=icon]]:shrink-0 [&>:focus-visible]:z-10",
        "data-[orientation=horizontal]:[&>:not(output)~:not(output)]:border-s data-[orientation=horizontal]:[&>:nth-child(1_of_:not(output))]:rounded-s-lg data-[orientation=horizontal]:[&>:nth-last-child(1_of_:not(output))]:rounded-e-lg",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:[&>:not(output)~:not(output)]:border-bs data-[orientation=vertical]:[&>:nth-child(1_of_:not(output))]:rounded-ss-lg data-[orientation=vertical]:[&>:nth-child(1_of_:not(output))]:rounded-se-lg data-[orientation=vertical]:[&>:nth-last-child(1_of_:not(output))]:rounded-es-lg data-[orientation=vertical]:[&>:nth-last-child(1_of_:not(output))]:rounded-ee-lg",
        "[&>:not(output)~:not(output)]:border-border",
        className,
      )}
    />
  );
}
