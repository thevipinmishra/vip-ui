"use client";

import { UploadSimpleIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
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
          "group/drop-zone flex min-h-32 min-w-0 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-input bg-card p-5 text-center text-sm text-foreground outline-offset-4 outline-transparent [overflow-wrap:anywhere] transition-[background-color,border-color,outline-color,outline-offset,scale] duration-200 ease-out-quint drop-target:border-solid drop-target:border-primary drop-target:bg-[color-mix(in_oklab,var(--accent)_70%,var(--card))] motion-safe:drop-target:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 motion-reduce:outline-offset-2 forced-colors:drop-target:border-[Highlight]",
          className,
        ),
      )}
    />
  );
}

export function DropZoneIcon({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="drop-zone-icon"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground transition-[translate,background-color,color] duration-350 ease-spring group-drop-target/drop-zone:bg-primary group-drop-target/drop-zone:text-primary-foreground motion-safe:group-drop-target/drop-zone:-translate-y-1 forced-colors:border [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
    >
      {children ?? <UploadSimpleIcon />}
    </span>
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

export function DropZoneDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      {...props}
      data-slot="drop-zone-description"
      className={cn("-mt-2 text-xs leading-5 text-muted-foreground", className)}
    />
  );
}
