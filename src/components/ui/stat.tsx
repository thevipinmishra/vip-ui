import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Stat({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="stat"
      className={cn(
        "min-w-0 rounded-xl bg-card p-5 text-card-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70",
        className,
      )}
      {...props}
    />
  );
}

export function StatLabel({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="stat-label"
      className={cn(
        "text-sm text-muted-foreground [overflow-wrap:anywhere]",
        className,
      )}
      {...props}
    />
  );
}

export function StatValue({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="stat-value"
      className={cn(
        "mt-2 text-3xl font-semibold tracking-[-0.045em] tabular-nums [overflow-wrap:anywhere]",
        className,
      )}
      {...props}
    />
  );
}

export function StatDetail({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="stat-detail"
      className={cn("mt-2 text-xs leading-5 text-muted-foreground", className)}
      {...props}
    />
  );
}
