"use client";

import { defineChart, lineY } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "@/components/ui/chart";

const rows = [
  { month: "2025-10", mrr: 64400 },
  { month: "2025-11", mrr: 72550 },
  { month: "2025-12", mrr: 69350 },
  { month: "2026-01", mrr: 85250 },
  { month: "2026-02", mrr: 94950 },
  { month: "2026-03", mrr: 106250 },
  { month: "2026-04", mrr: 104400 },
  { month: "2026-05", mrr: 112000 },
  { month: "2026-06", mrr: 125200 },
  { month: "2026-07", mrr: 120450 },
  { month: "2026-08", mrr: 131350 },
  { month: "2026-09", mrr: 145650 },
];

const latest = rows[rows.length - 1].mrr;
const previous = rows[rows.length - 2].mrr;

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
const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;
const formatCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
}).format;
const formatChange = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
  signDisplay: "always",
}).format;

const definition = defineChart({
  marks: [
    lineY(rows, {
      x: "month",
      y: "mrr",
      stroke: "var(--ts-chart-1)",
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: { scale: scalePoint, axis: { ticks: { format: formatMonth } } },
    y: {
      scale: scaleLinear().domain([0, 160000]),
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
          label: "MRR",
          value: formatMoney(point.datum.mrr),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartLineDefault() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Monthly recurring revenue</ChartTitle>
        <ChartValue>{formatMoney(latest)}</ChartValue>
        <ChartDescription>
          {formatChange((latest - previous) / previous)} from August
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Monthly recurring revenue in dollars, October 2025 to September 2026"
      />
      <ChartTable
        caption="Monthly recurring revenue, in dollars"
        columns={["Month", "MRR"]}
        rows={rows.map((row) => [formatMonthYear(row.month), row.mrr])}
      />
    </ChartFrame>
  );
}
