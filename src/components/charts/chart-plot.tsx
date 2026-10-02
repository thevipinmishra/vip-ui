"use client";

import type { ChartPoint, ChartTooltipContent } from "@tanstack/charts";
import { motion } from "@tanstack/charts/motion";
import type { ReactNode } from "react";
import { ChartCaption, ChartFrame, ChartTitle } from "@/components/ui/chart";

// One renderer for every gallery chart. Initial SVG is already present in the
// server response; only interaction and subsequent changes need motion.
export const galleryRenderer = motion({
  initial: false,
  transition: { type: "spring", stiffness: 420, damping: 38 },
});

export function valueTooltip(
  title: string,
  label: string,
  value: string,
  color?: string,
): ChartTooltipContent {
  return { title, rows: [{ label, value, color }] };
}

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
    <ChartFrame className="w-full bg-transparent p-0">
      <ChartCaption className="sr-only">
        <ChartTitle>{title}</ChartTitle>
      </ChartCaption>
      <div className="min-w-0">{children}</div>
      {legend && (
        <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {legend.map((item) => (
            <li key={item.label} className="inline-flex items-center gap-2">
              <span
                className="size-2.5 rounded-[3px]"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              {item.label}
            </li>
          ))}
        </ul>
      )}
      <div className="sr-only">
        <table>
          <caption>{title}: exact values</caption>
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
              <tr key={String(row[0])}>
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
    </ChartFrame>
  );
}
