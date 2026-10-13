"use client";

import { barY, defineChart, ruleY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { Chart } from "@tanstack/charts/react";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const rows = [
  { month: "2025-10", change: 12400 },
  { month: "2025-11", change: 8150 },
  { month: "2025-12", change: -3200 },
  { month: "2026-01", change: 15900 },
  { month: "2026-02", change: 9700 },
  { month: "2026-03", change: 11300 },
  { month: "2026-04", change: -1850 },
  { month: "2026-05", change: 7600 },
  { month: "2026-06", change: 13200 },
  { month: "2026-07", change: -4750 },
  { month: "2026-08", change: 10900 },
  { month: "2026-09", change: 14300 },
];

const gain = "var(--ts-chart-2)";
const loss = "var(--ts-chart-5)";

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const monthYearFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const formatMonth = (month: string) => monthFormat.format(new Date(month));
const formatMonthYear = (month: string) =>
  monthYearFormat.format(new Date(month));
const formatCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
}).format;
const formatChange = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  signDisplay: "exceptZero",
}).format;

const definition = defineChart({
  marks: [
    barY(rows, {
      x: "month",
      y: "change",
      fill: (row) => (row.change < 0 ? loss : gain),
      inset: 3,
      radius: { end: 4 },
    }),
    decorative(ruleY([0], { stroke: "var(--muted-foreground)" })),
  ],
  scales: {
    x: {
      scale: () => scaleBand().padding(0.15),
      axis: {
        ticks: { format: formatMonth },
        tickLabels: {
          thin: false,
          opacity: ({ index, bandwidth }) =>
            bandwidth < 30 && index % 2 === 1 ? 0 : undefined,
        },
      },
    },
    y: {
      scale: scaleLinear().domain([-10000, 20000]),
      grid: true,
      axis: { ticks: { count: 4, format: formatCompact } },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: formatMonthYear(point.datum.month),
      rows: [
        {
          label: "Net new MRR",
          value: formatChange(point.datum.change),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartBarNegative() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Net new MRR</ChartTitle>
        <ChartDescription>
          New and expansion revenue minus churn, by month
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Monthly net new recurring revenue in dollars, October 2025 to September 2026, with gains above zero and losses below"
      />
      <ChartLegend
        items={[
          { label: "Gain", color: gain },
          { label: "Loss", color: loss },
        ]}
      />
      <ChartTable
        caption="Net new monthly recurring revenue, in dollars"
        columns={["Month", "Net new MRR"]}
        rows={rows.map((row) => [
          formatMonthYear(row.month),
          formatChange(row.change),
        ])}
      />
    </ChartFrame>
  );
}
