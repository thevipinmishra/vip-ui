"use client";

import { barY, defineChart } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "../vip-ui/chart";

const rows = [
  { month: "2025-10", revenue: 158300 },
  { month: "2025-11", revenue: 171900 },
  { month: "2025-12", revenue: 176400 },
  { month: "2026-01", revenue: 182400 },
  { month: "2026-02", revenue: 189700 },
  { month: "2026-03", revenue: 201300 },
  { month: "2026-04", revenue: 198600 },
  { month: "2026-05", revenue: 212900 },
  { month: "2026-06", revenue: 219400 },
  { month: "2026-07", revenue: 216800 },
  { month: "2026-08", revenue: 228500 },
  { month: "2026-09", revenue: 236200 },
];

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
const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;

const definition = defineChart({
  marks: [
    barY(rows, {
      x: "month",
      y: "revenue",
      fill: "var(--ts-chart-1)",
      inset: 3,
      radius: { end: 4 },
    }),
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
      scale: scaleLinear().domain([0, 250000]),
      grid: true,
      axis: { ticks: { count: 5, format: formatCompact } },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: formatMonthYear(point.datum.month),
      rows: [
        {
          label: "Revenue",
          value: formatMoney(point.datum.revenue),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartBarDefault() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Monthly revenue</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Monthly revenue in dollars, October 2025 to September 2026"
      />
      <ChartTable
        caption="Monthly revenue, in dollars"
        columns={["Month", "Revenue"]}
        rows={rows.map((row) => [formatMonthYear(row.month), row.revenue])}
      />
    </ChartFrame>
  );
}
