import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Stat({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="stat"
      className={cn(
        "rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70",
        className,
      )}
      {...props}
    />
  );
}

export function StatLabel({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="stat-label"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function StatValue({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="stat-value"
      className={cn(
        "mt-2 text-3xl font-semibold tracking-[-0.045em] tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

export function StatDetail({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="stat-detail"
      className={cn("mt-2 text-xs leading-5 text-muted-foreground", className)}
      {...props}
    />
  );
}
