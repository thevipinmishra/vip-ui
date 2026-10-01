import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// TanStack Charts reads these variables from its host. The fallbacks work in
// shadcn themes that have not defined the optional --chart-* palette yet.
const chartStyle = {
  "--ts-chart-1": "var(--chart-1, var(--primary))",
  "--ts-chart-2": "var(--chart-2, var(--success, var(--foreground)))",
  "--ts-chart-3": "var(--chart-3, var(--warning, var(--foreground)))",
  "--ts-chart-4": "var(--chart-4, var(--accent-foreground))",
  "--ts-chart-5": "var(--chart-5, var(--muted-foreground))",
  "--ts-chart-6": "var(--chart-6, var(--foreground))",
  "--ts-chart-tooltip-background": "var(--popover)",
  "--ts-chart-tooltip-color": "var(--popover-foreground)",
  "--ts-chart-tooltip-border": "1px solid var(--border)",
  "--ts-chart-tooltip-border-radius": "calc(var(--radius) - 0.375rem)",
  "--ts-chart-tooltip-max-width": "min(20rem, 90%)",
  "--ts-chart-tooltip-padding": "0.75rem 1rem",
  "--ts-chart-tooltip-font":
    "400 0.8125rem/1.5 var(--font-sans, system-ui, sans-serif)",
  "--ts-chart-tooltip-active-row-font-weight": "600",
  "--ts-chart-tooltip-active-row-background": "var(--muted)",
  "--ts-chart-tooltip-active-row-border-radius": "0.375rem",
  "--ts-chart-tooltip-active-row-shadow": "none",
  "--ts-chart-tooltip-shadow":
    "var(--shadow-float, 0 8px 24px rgb(0 0 0 / 0.12))",
} as CSSProperties;

export function ChartFrame({
  className,
  style,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <figure
      data-slot="chart-frame"
      className={cn(
        "min-w-0 rounded-xl bg-card p-4 text-card-foreground sm:p-6 [&_[class^=ts-chart-tooltip][class$=rows]]:grid [&_[class^=ts-chart-tooltip][class$=rows]]:gap-0.5 [&_[class^=ts-chart-tooltip][class$=row]]:-mx-2 [&_[class^=ts-chart-tooltip][class$=row]]:px-2 [&_[class^=ts-chart-tooltip][class$=row]]:py-1 [&_[class^=ts-chart-tooltip][class$=title]]:text-muted-foreground",
        className,
      )}
      style={{ ...chartStyle, ...style }}
      {...props}
    />
  );
}

export function ChartCaption({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <figcaption
      data-slot="chart-caption"
      className={cn("mb-5 grid gap-1", className)}
      {...props}
    />
  );
}

export function ChartTitle({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="chart-title"
      className={cn("block text-sm font-semibold", className)}
      {...props}
    />
  );
}

export function ChartDescription({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="chart-description"
      className={cn("block text-xs leading-5 text-muted-foreground", className)}
      {...props}
    />
  );
}
