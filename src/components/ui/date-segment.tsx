"use client";

import {
  DateSegment as AriaDateSegment,
  composeRenderProps,
  type DateSegmentProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

const literalSpace = /[   ]/g;

export function DateSegment({
  className,
  children,
  ...props
}: DateSegmentProps) {
  return (
    <AriaDateSegment
      {...props}
      data-slot="date-segment"
      className={composeRenderProps(className, (className) =>
        cn(
          "rounded-md px-1 py-0.5 tabular-nums outline-none caret-transparent data-[placeholder]:text-muted-foreground invalid:text-destructive [&[data-type=literal]]:px-0 [&:focus]:bg-primary [&:focus]:text-primary-foreground forced-colors:[&:focus]:bg-[Highlight] forced-colors:[&:focus]:text-[HighlightText]",
          className,
        ),
      )}
    >
      {children ??
        (({ text, type }) =>
          type === "literal" ? text.replace(literalSpace, " ") : text)}
    </AriaDateSegment>
  );
}
