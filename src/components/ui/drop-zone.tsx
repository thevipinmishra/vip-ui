"use client";

import {
  DropZone as AriaDropZone,
  composeRenderProps,
  type DropZoneProps,
  Text,
  type TextProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function DropZone({ className, ...props }: DropZoneProps) {
  return (
    <AriaDropZone
      {...props}
      data-slot="drop-zone"
      className={composeRenderProps(className, (className) =>
        cn(
          "flex min-h-40 min-w-0 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm text-foreground outline-none [overflow-wrap:anywhere] transition-[background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] drop-target:border-solid drop-target:border-primary drop-target:bg-accent drop-target:ring-2 drop-target:ring-primary/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 forced-colors:drop-target:border-[Highlight]",
          className,
        ),
      )}
    />
  );
}

export function DropZoneLabel({ className, ...props }: TextProps) {
  return (
    <Text
      {...props}
      slot="label"
      data-slot="drop-zone-label"
      className={cn("text-sm font-medium text-foreground", className)}
    />
  );
}
