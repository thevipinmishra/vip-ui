"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { type Size, SizeProvider, useSize } from "./size";

export interface ButtonGroupProps extends ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  size?: Size;
}

export function ButtonGroup({
  orientation = "horizontal",
  size: sizeProp,
  className,
  ...props
}: ButtonGroupProps) {
  const size = useSize(sizeProp);
  return (
    <SizeProvider size={size}>
      {/* biome-ignore lint/a11y/useSemanticElements: Independent actions do not belong in a fieldset. */}
      <div
        {...props}
        role="group"
        data-slot="button-group"
        data-orientation={orientation}
        data-size={size}
        className={cn(
          "inline-flex w-fit max-w-full items-stretch rounded-lg border border-border bg-card shadow-(--shadow-card) data-[size=xs]:rounded-md data-[size=xl]:rounded-xl",
          "[&>:not(output)]:relative [&>:not(output)]:min-w-0 [&>:not(output)]:shrink [&>:not(output)]:rounded-none [&>:not(output)]:border-0 [&>:not(output)]:shadow-none *:data-icon-only:shrink-0 *:[:focus-visible]:z-10",
          "orientation-horizontal:[&>:not(output)~:not(output)]:border-s orientation-horizontal:[&>:nth-child(1_of_:not(output))]:rounded-s-[inherit] orientation-horizontal:[&>:nth-last-child(1_of_:not(output))]:rounded-e-[inherit]",
          "orientation-vertical:flex-col orientation-vertical:[--touch-target:100%] orientation-vertical:[&>:not(output)~:not(output)]:border-t orientation-vertical:[&>:nth-child(1_of_:not(output))]:rounded-t-[inherit] orientation-vertical:[&>:nth-last-child(1_of_:not(output))]:rounded-b-[inherit]",
          "[&>:not(output)~:not(output)]:border-border",
          className,
        )}
      />
    </SizeProvider>
  );
}
