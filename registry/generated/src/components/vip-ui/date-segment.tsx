"use client";

import {
  DateSegment as AriaDateSegment,
  composeRenderProps,
  type DateSegmentProps,
} from "react-aria-components";
import { cn } from "./utils";

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
          "rounded-sm px-0.5 py-0.5 tabular-nums outline-none caret-transparent transition-colors duration-150 ease-out-quint data-[placeholder]:text-muted-foreground [&:focus]:duration-0 invalid:text-destructive [&[data-type=literal]]:px-0 [&:focus]:bg-primary [&:focus]:text-primary-foreground forced-colors:[&:focus]:bg-[Highlight] forced-colors:[&:focus]:text-[HighlightText] forced-colors:[&:focus]:forced-color-adjust-none",
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
