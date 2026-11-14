import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function DescriptionList({ className, ...props }: ComponentProps<"dl">) {
  return (
    <dl
      data-slot="description-list"
      className={cn(
        "grid items-baseline gap-x-4 gap-y-1 sm:grid-cols-[min(10rem,40%)_minmax(0,1fr)] sm:gap-y-3",
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
        "min-w-0 text-sm text-muted-foreground wrap-anywhere not-first:max-sm:mt-2 sm:col-start-1",
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
        "min-w-0 text-sm font-medium text-foreground wrap-anywhere sm:col-start-2",
        className,
      )}
      {...props}
    />
  );
}
