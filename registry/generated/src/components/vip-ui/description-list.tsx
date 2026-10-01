import type { HTMLAttributes } from "react";
import { cn } from "./utils";

export function DescriptionList({
  className,
  ...props
}: HTMLAttributes<HTMLDListElement>) {
  return (
    <dl
      data-slot="description-list"
      className={cn(
        "grid gap-x-6 gap-y-4 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]",
        className,
      )}
      {...props}
    />
  );
}

export function DescriptionTerm({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <dt
      data-slot="description-term"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function DescriptionDetail({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <dd
      data-slot="description-detail"
      className={cn(
        "min-w-0 text-sm font-medium text-foreground max-sm:-mt-3",
        className,
      )}
      {...props}
    />
  );
}
