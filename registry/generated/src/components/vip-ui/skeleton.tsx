"use client";

import type { ComponentProps } from "react";
import { cn } from "./utils";

export function Skeleton({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="skeleton"
      className={cn(
        "relative isolate overflow-hidden rounded-md bg-muted forced-colors:bg-[GrayText]",
        className,
      )}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-card/60 to-transparent rtl:-scale-x-100 dark:via-foreground/[0.06] motion-safe:animate-skeleton motion-reduce:hidden" />
    </div>
  );
}
