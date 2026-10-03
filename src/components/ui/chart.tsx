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
  "--ts-chart-tooltip-border-radius": "var(--radius-md, var(--radius))",
  "--ts-chart-tooltip-max-width": "min(18rem, 90%)",
  "--ts-chart-tooltip-padding": "0.5rem 0.75rem",
  "--ts-chart-tooltip-font":
    "400 0.8125rem/1.5 var(--font-sans, system-ui, sans-serif)",
  "--ts-chart-tooltip-active-row-font-weight": "600",
  "--ts-chart-tooltip-active-row-background": "var(--muted)",
  "--ts-chart-tooltip-active-row-border-radius":
    "var(--radius-sm, var(--radius))",
  "--ts-chart-tooltip-active-row-shadow": "none",
  "--ts-chart-tooltip-shadow": "var(--shadow-float, var(--shadow-lg))",
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
        "min-w-0 rounded-xl bg-card p-4 text-card-foreground sm:p-6 [&_.ts-chart:is(:focus):not(:focus-visible)]:outline-none [&_.ts-chart:focus-visible]:outline-2 [&_.ts-chart:focus-visible]:outline-ring [&_.ts-chart:focus-visible]:outline-offset-2 [&_.ts-chart-tooltip__title]:text-xs [&_.ts-chart-tooltip__title]:text-muted-foreground [&_.ts-chart-tooltip__rows]:grid [&_.ts-chart-tooltip__rows]:gap-0.5 [&_.ts-chart-tooltip__row]:-mx-1.5 [&_.ts-chart-tooltip__row]:px-1.5 [&_.ts-chart-tooltip__row]:py-0.5 [&_.ts-chart-tooltip__row>span:nth-child(2)]:text-muted-foreground [&_.ts-chart-tooltip__row>span:last-child]:font-semibold",
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
