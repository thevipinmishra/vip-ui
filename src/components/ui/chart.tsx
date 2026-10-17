import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

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
  "--ts-chart-tooltip-max-width": "18rem",
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
        "flex min-w-0 flex-wrap items-start gap-x-4 rounded-xl bg-card p-4 text-card-foreground sm:p-5 *:min-w-0 *:basis-full *:data-[slot=chart-action]:ml-auto *:data-[slot=chart-action]:basis-auto *:data-[slot=chart-caption]:grow *:data-[slot=chart-caption]:basis-48",
        "[&_.ts-chart:is(:focus):not(:focus-visible)]:outline-none [&_.ts-chart:focus-visible]:outline-2 [&_.ts-chart:focus-visible]:outline-ring [&_.ts-chart:focus-visible]:outline-offset-2 [&_.ts-chart-tooltip]:w-max [&_.ts-chart-tooltip]:min-w-36 [&_.ts-chart-tooltip]:[overflow-wrap:normal]!",
        String.raw`[&_.ts-chart-tooltip\_\_title]:text-xs [&_.ts-chart-tooltip\_\_title]:text-muted-foreground [&_.ts-chart-tooltip\_\_rows]:grid [&_.ts-chart-tooltip\_\_rows]:gap-0.5 [&_.ts-chart-tooltip\_\_row]:-mx-1.5 [&_.ts-chart-tooltip\_\_row]:gap-x-3! [&_.ts-chart-tooltip\_\_row]:px-1.5 [&_.ts-chart-tooltip\_\_row]:py-0.5 [&_.ts-chart-tooltip\_\_row>span:nth-child(2)]:text-muted-foreground [&_.ts-chart-tooltip\_\_row>span:last-child]:font-semibold`,
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
      className={cn("mb-3 grid gap-1", className)}
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

export function ChartAction({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="chart-action"
      className={cn(
        "mb-3 flex max-w-full flex-wrap items-center gap-2",
        className,
      )}
      {...props}
    />
  );
}

export interface ChartLegendItem {
  label: string;
  color: string;
}

export function ChartLegend({
  items,
  className,
  ...props
}: HTMLAttributes<HTMLUListElement> & {
  items: readonly ChartLegendItem[];
}) {
  return (
    <ul
      data-slot="chart-legend"
      className={cn(
        "mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <li key={item.label} className="inline-flex items-center gap-2">
          <span
            className="size-2.5 shrink-0 rounded-[3px]"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function ChartTable({
  caption,
  columns,
  rows,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly (string | number)[])[];
}) {
  return (
    <div
      data-slot="chart-table"
      className={cn("sr-only", className)}
      {...props}
    >
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((value, index) =>
                index === 0 ? (
                  <th key={columns[index]} scope="row">
                    {value}
                  </th>
                ) : (
                  <td key={columns[index]}>{value}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
