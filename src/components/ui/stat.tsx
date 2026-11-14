import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/ssr";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Stat({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="stat"
      className={cn(
        "relative min-w-0 rounded-xl bg-card p-4 text-card-foreground shadow-(--shadow-card) ring-1 ring-border/70 forced-colors:border",
        className,
      )}
      {...props}
    />
  );
}

export function StatGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-group"
      className={cn(
        "grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,10rem),1fr))] overflow-hidden rounded-xl bg-card shadow-(--shadow-card) ring-1 ring-border/70 forced-colors:border *:data-[slot=stat]:rounded-none *:data-[slot=stat]:shadow-[-1px_0_0_0_var(--border),0_-1px_0_0_var(--border)] *:data-[slot=stat]:ring-0 forced-colors:*:data-[slot=stat]:border-0",
        className,
      )}
      {...props}
    />
  );
}

export function StatIcon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="stat-icon"
      className={cn(
        "absolute inset-e-4 top-4 grid size-8 place-items-center rounded-lg bg-muted text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
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
        "text-sm text-muted-foreground wrap-anywhere in-has-[>[data-slot=stat-icon]]:pe-10",
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
        "mt-1 text-3xl font-semibold tracking-[-0.045em] tabular-nums wrap-anywhere",
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
      className={cn(
        "mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-muted-foreground wrap-anywhere",
        className,
      )}
      {...props}
    />
  );
}

const trendIcons = {
  up: ArrowUpRightIcon,
  down: ArrowDownRightIcon,
  neutral: ArrowRightIcon,
};

export function StatTrend({
  direction,
  invert = false,
  className,
  children,
  ...props
}: ComponentProps<"span"> & {
  direction: "up" | "down" | "neutral";
  invert?: boolean;
}) {
  const Icon = trendIcons[direction];
  const tone =
    direction === "neutral"
      ? "neutral"
      : (direction === "up") !== invert
        ? "good"
        : "bad";
  return (
    <span
      data-slot="stat-trend"
      data-direction={direction}
      data-tone={tone}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md px-1.5 py-px text-xs font-medium tabular-nums ring-1 ring-inset forced-colors:border",
        tone === "good" &&
          "bg-success-subtle text-success-foreground ring-success/15",
        tone === "bad" && "bg-card text-destructive ring-destructive/25",
        tone === "neutral" && "bg-muted text-muted-foreground ring-border/70",
        className,
      )}
      {...props}
    >
      <Icon size={12} weight="bold" aria-hidden="true" />
      {children}
    </span>
  );
}
