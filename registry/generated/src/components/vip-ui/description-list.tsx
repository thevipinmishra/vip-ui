import type { ComponentProps } from "react";
import { cn } from "./utils";

export function DescriptionList({ className, ...props }: ComponentProps<"dl">) {
  return (
    <dl
      data-slot="description-list"
      className={cn(
        "grid items-baseline gap-x-6 gap-y-1 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-y-4",
        className,
      )}
      {...props}
    />
  );
}

export function DescriptionTerm({ className, ...props }: ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-term"
      className={cn(
        "min-w-0 text-sm text-muted-foreground [overflow-wrap:anywhere] not-first:max-sm:mt-3 sm:col-start-1",
        className,
      )}
      {...props}
    />
  );
}

export function DescriptionDetail({
  className,
  ...props
}: ComponentProps<"dd">) {
  return (
    <dd
      data-slot="description-detail"
      className={cn(
        "min-w-0 text-sm font-medium text-foreground [overflow-wrap:anywhere] sm:col-start-2",
        className,
      )}
      {...props}
    />
  );
}
