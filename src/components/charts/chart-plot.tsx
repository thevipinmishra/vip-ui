"use client";

import type { ChartPoint, ChartTooltipContent } from "@tanstack/charts";
import type { ReactNode } from "react";
import {
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

export function groupTooltip<TDatum>(
  title: string,
  points: readonly ChartPoint<TDatum>[],
  value: (datum: TDatum) => string,
  primary?: ChartPoint,
): ChartTooltipContent {
  return {
    title,
    rows: points.map((point) => ({
      label: point.groupLabel,
      value: value(point.datum),
      color: point.color,
      active: point === primary,
    })),
  };
}

export function ChartPlot({
  title,
  children,
  columns,
  rows,
  legend,
}: {
  title: string;
  children: ReactNode;
  columns: readonly string[];
  rows: readonly (readonly (string | number)[])[];
  legend?: readonly { label: string; color: string }[];
}) {
  return (
    <ChartFrame className="w-full bg-transparent p-0 pb-4 sm:p-0 sm:pb-5">
      <ChartCaption className="sr-only">
        <ChartTitle>{title}</ChartTitle>
      </ChartCaption>
      <div className="mt-3 px-4 sm:mt-4 sm:px-5">{children}</div>
      {legend && (
        <ChartLegend className="mt-3 px-4 sm:px-5">
          {legend.map((item) => (
            <ChartLegendItem key={item.label} color={item.color}>
              {item.label}
            </ChartLegendItem>
          ))}
        </ChartLegend>
      )}
      <ChartTable caption={title} columns={columns} rows={rows} />
    </ChartFrame>
  );
}
