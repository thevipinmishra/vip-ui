import type { HTMLAttributes } from "react";
import { cn } from "./utils";

export function EmptyState({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
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

export function EmptyStateIcon({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="empty-state-icon"
      className={cn(
        "grid size-11 place-items-center rounded-lg bg-accent text-accent-foreground",
        className,
      )}
    />
  );
}

export function EmptyStateTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="empty-state-title"
      className={cn("text-base font-semibold tracking-[-0.025em]", className)}
      {...props}
    />
  );
}

export function EmptyStateDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn(
        "max-w-sm text-sm leading-6 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyStateActions({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="empty-state-actions"
      className={cn("flex flex-wrap justify-center gap-3", className)}
      {...props}
    />
  );
}
