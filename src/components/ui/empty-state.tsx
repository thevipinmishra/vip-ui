import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex min-w-0 flex-col items-center gap-3 rounded-xl border border-dashed border-border px-5 py-8 text-center",
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
        "mb-1 grid size-12 shrink-0 place-items-center rounded-xl bg-card text-foreground/80 shadow-[var(--shadow-card)] ring-1 ring-border forced-colors:border [&_svg:not([class*='size-'])]:size-6",
        className,
      )}
    />
  );
}

export function EmptyStateTitle({
  as: Heading = "h3",
  className,
  ...props
}: ComponentProps<"h3"> & { as?: "h1" | "h2" | "h3" | "h4" }) {
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
        "-mt-1.5 max-w-sm text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere] [text-wrap:pretty]",
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
      className={cn(
        "mt-1 flex max-w-full flex-wrap justify-center gap-3",
        className,
      )}
      {...props}
    />
  );
}
