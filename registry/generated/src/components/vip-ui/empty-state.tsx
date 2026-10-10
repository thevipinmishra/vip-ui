import type { ComponentProps } from "react";
import { cn } from "./utils";

export function EmptyState({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-12 text-center",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyStateIcon({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="empty-state-icon"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
    />
  );
}

export function EmptyStateTitle({
  as: Heading = "h3",
  className,
  ...props
}: ComponentProps<"h3"> & { as?: "h2" | "h3" | "h4" }) {
  return (
    <Heading
      data-slot="empty-state-title"
      className={cn(
        "max-w-full text-base font-semibold tracking-[-0.025em] [overflow-wrap:anywhere] [text-wrap:balance]",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyStateDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn(
        "max-w-sm text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere] [text-wrap:pretty]",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyStateActions({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-actions"
      className={cn("mt-1 flex flex-wrap justify-center gap-3", className)}
      {...props}
    />
  );
}
