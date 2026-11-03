"use client";

import type { ChartValue as ChartAxisValue } from "@tanstack/charts";
import { motion } from "@tanstack/charts/motion";
import {
  Chart as RendererChart,
  type ChartProps as RendererChartProps,
} from "@tanstack/charts/react/core";
import {
  RendererChart as TooltipRendererChart,
  type RendererChartProps as TooltipRendererChartProps,
} from "@tanstack/charts/react/tooltip";
import {
  type CSSProperties,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
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
        String.raw`[&_.ts-chart\_\_interactive-legend_button]:rounded-md! [&_.ts-chart\_\_interactive-legend_button]:border-transparent! [&_.ts-chart\_\_interactive-legend_button]:bg-transparent! [&_.ts-chart\_\_interactive-legend_button]:px-2.5! [&_.ts-chart\_\_interactive-legend_button]:[font-family:inherit]! [&_.ts-chart\_\_interactive-legend_button]:text-xs! [&_.ts-chart\_\_interactive-legend_button]:leading-none! [&_.ts-chart\_\_interactive-legend_button]:font-medium! [&_.ts-chart\_\_interactive-legend_button]:text-muted-foreground! [&_.ts-chart\_\_interactive-legend_button]:transition-colors [&_.ts-chart\_\_interactive-legend_button]:duration-150 [&_.ts-chart\_\_interactive-legend_button[aria-pressed=true]]:text-foreground! [&_.ts-chart\_\_interactive-legend_button:hover]:bg-accent! [&_.ts-chart\_\_interactive-legend_button:focus-visible]:outline-2 [&_.ts-chart\_\_interactive-legend_button:focus-visible]:outline-solid [&_.ts-chart\_\_interactive-legend_button:focus-visible]:outline-offset-0 [&_.ts-chart\_\_interactive-legend_button:focus-visible]:outline-ring`,
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

export function ChartValue({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="chart-value"
      className={cn(
        "block text-2xl font-semibold tracking-tight tabular-nums",
        className,
      )}
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

export const chartMotion = motion({
  transition: { type: "spring", stiffness: 380, damping: 39 },
});

type ChartEntrance = "idle" | "waiting" | "replay" | "shown";

export type ChartProps<
  TDatum,
  TXValue extends ChartAxisValue = ChartAxisValue,
  TYValue extends ChartAxisValue = ChartAxisValue,
> = Omit<RendererChartProps<TDatum, TXValue, TYValue>, "renderer"> & {
  renderer?: RendererChartProps<TDatum, TXValue, TYValue>["renderer"];
  children?: ReactNode;
};

export type TooltipChartProps<
  TDatum,
  TXValue extends ChartAxisValue = ChartAxisValue,
  TYValue extends ChartAxisValue = ChartAxisValue,
> = Omit<TooltipRendererChartProps<TDatum, TXValue, TYValue>, "renderer"> & {
  renderer?: TooltipRendererChartProps<TDatum, TXValue, TYValue>["renderer"];
  children?: ReactNode;
};

function ChartShell({
  animated,
  children,
}: {
  animated: boolean;
  children: (entrance: ChartEntrance) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [entrance, setEntrance] = useState<ChartEntrance>("idle");

  useEffect(() => {
    const element = ref.current;
    if (
      !animated ||
      !element ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const { top, bottom } = element.getBoundingClientRect();
    if (bottom > 0 && top < innerHeight) return;
    setEntrance("waiting");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) show("replay");
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    const reveal = () => show("shown");
    function show(next: ChartEntrance) {
      observer.disconnect();
      element?.removeEventListener("focusin", reveal);
      setEntrance(next);
    }
    observer.observe(element);
    element.addEventListener("focusin", reveal);
    return () => {
      observer.disconnect();
      element.removeEventListener("focusin", reveal);
    };
  }, [animated]);

  return (
    <div
      ref={ref}
      data-slot="chart-plot"
      data-entrance={animated ? entrance : "idle"}
      className="relative transition-opacity duration-250 ease-out-quint data-[entrance=waiting]:opacity-0 data-[entrance=waiting]:transition-none print:data-[entrance=waiting]:opacity-100"
    >
      {children(entrance)}
    </div>
  );
}

export function Chart<
  TDatum,
  TXValue extends ChartAxisValue = ChartAxisValue,
  TYValue extends ChartAxisValue = ChartAxisValue,
>({
  renderer = chartMotion,
  children,
  ...props
}: ChartProps<TDatum, TXValue, TYValue>) {
  const animated = renderer.id === chartMotion.id;

  return (
    <ChartShell animated={animated}>
      {(entrance) => (
        <>
          <RendererChart
            key={entrance === "replay" ? "replay" : "initial"}
            renderer={renderer}
            {...props}
          />
          {children}
        </>
      )}
    </ChartShell>
  );
}

export function TooltipChart<
  TDatum,
  TXValue extends ChartAxisValue = ChartAxisValue,
  TYValue extends ChartAxisValue = ChartAxisValue,
>({
  renderer = chartMotion,
  renderTooltipBody,
  children,
  ...props
}: TooltipChartProps<TDatum, TXValue, TYValue>) {
  const animated = renderer.id === chartMotion.id;

  return (
    <ChartShell animated={animated}>
      {(entrance) => (
        <>
          <TooltipRendererChart<TDatum, TXValue, TYValue>
            key={entrance === "replay" ? "replay" : "initial"}
            renderer={renderer}
            renderTooltipBody={
              renderTooltipBody &&
              ((context) => (
                <div
                  data-slot="chart-tooltip"
                  className="w-max max-w-(--ts-chart-tooltip-max-width) min-w-36 rounded-(--ts-chart-tooltip-border-radius) border border-border bg-(--ts-chart-tooltip-background) p-(--ts-chart-tooltip-padding) [font:var(--ts-chart-tooltip-font)] text-(--ts-chart-tooltip-color) shadow-(--ts-chart-tooltip-shadow)"
                >
                  {renderTooltipBody(context)}
                </div>
              ))
            }
            {...props}
          />
          {children}
        </>
      )}
    </ChartShell>
  );
}

export function ChartCenter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="chart-center"
      className={cn(
        "pointer-events-none absolute inset-0 grid place-content-center text-center",
        className,
      )}
      {...props}
    />
  );
}

export function ChartLegend({
  className,
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      data-slot="chart-legend"
      className={cn(
        "mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

const legendSwatches = {
  square: "size-2.5 rounded-[3px] bg-(--swatch)",
  line: "h-0.5 w-3.5 rounded-full bg-(--swatch)",
  dashed: "w-3.5 border-t-2 border-dashed border-(--swatch)",
};

export function ChartLegendItem({
  color,
  swatch = "square",
  className,
  children,
  ...props
}: LiHTMLAttributes<HTMLLIElement> & {
  color: string;
  swatch?: keyof typeof legendSwatches;
}) {
  return (
    <li
      data-slot="chart-legend-item"
      className={cn("inline-flex min-w-0 items-center gap-2", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn("shrink-0", legendSwatches[swatch])}
        style={{ "--swatch": color } as CSSProperties}
      />
      {children}
    </li>
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
