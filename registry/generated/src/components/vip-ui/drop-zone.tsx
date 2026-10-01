"use client";

import {
  DropZone as AriaDropZone,
  composeRenderProps,
  type DropZoneProps,
  Text,
  type TextProps,
} from "react-aria-components";
import { cn } from "./utils";

export function DropZone({ className, ...props }: DropZoneProps) {
  return (
    <AriaDropZone
      {...props}
      data-slot="drop-zone"
      className={composeRenderProps(className, (className) =>
        cn(
          "flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm text-foreground outline-none data-[drop-target]:border-primary data-[drop-target]:bg-accent data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-ring",
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
