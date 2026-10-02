import type { FieldsetHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Fieldset({
  className,
  ...props
}: FieldsetHTMLAttributes<HTMLFieldSetElement>) {
  return (
    <fieldset
      {...props}
      data-slot="fieldset"
      className={cn(
        "min-w-0 rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70 disabled:opacity-60",
        className,
      )}
    />
  );
}

export function FieldsetLegend({
  className,
  ...props
}: HTMLAttributes<HTMLLegendElement>) {
  return (
    <legend
      {...props}
      data-slot="fieldset-legend"
      className={cn("px-1 text-sm font-semibold text-foreground", className)}
    />
  );
}

export function FieldsetDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      data-slot="fieldset-description"
      className={cn("text-xs leading-5 text-muted-foreground", className)}
    />
  );
}
