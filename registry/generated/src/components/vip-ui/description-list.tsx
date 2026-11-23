import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { cn } from "./utils";

const descriptionListStyles = tv({
  base: "@container/description-list grid min-w-0 grid-cols-[min(10rem,40%)_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1",
  variants: {
    layout: {
      auto: "",
      columns:
        "gap-y-3 [&>dd]:col-start-2 [&>dt]:col-end-2 [&>dt]:not-first:mt-0",
    },
  },
});

export function DescriptionList({
  className,
  layout = "auto",
  ...props
}: ComponentProps<"dl"> & { layout?: "auto" | "columns" }) {
  return (
    <dl
      data-slot="description-list"
      className={descriptionListStyles({ layout, className })}
      {...props}
    />
  );
}

export function DescriptionTerm({ className, ...props }: ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-term"
      className={cn(
        "col-start-1 col-end-3 min-w-0 text-sm text-muted-foreground wrap-anywhere not-first:mt-2 @min-[22rem]/description-list:col-end-2",
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
        "col-start-1 col-end-3 min-w-0 text-sm font-medium text-foreground wrap-anywhere @min-[22rem]/description-list:col-start-2",
        className,
      )}
      {...props}
    />
  );
}
