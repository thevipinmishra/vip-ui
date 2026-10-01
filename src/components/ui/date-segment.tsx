"use client";

import {
  DateSegment as AriaDateSegment,
  composeRenderProps,
  type DateSegmentProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

/** Keep the active segment legible across date and time fields and pickers. */
export function DateSegment({ className, ...props }: DateSegmentProps) {
  return (
    <AriaDateSegment
      {...props}
      data-slot="date-segment"
      className={composeRenderProps(className, (className) =>
        cn(
          "rounded-md px-1 py-0.5 tabular-nums outline-none caret-transparent placeholder:text-muted-foreground invalid:text-destructive [&[data-type=literal]]:px-0 [&:focus]:bg-primary [&:focus]:text-primary-foreground forced-colors:[&:focus]:bg-[Highlight] forced-colors:[&:focus]:text-[HighlightText]",
          className,
        ),
      )}
    />
  );
}
