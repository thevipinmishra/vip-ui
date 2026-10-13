"use client";

import { barY, defineChart, group } from "@tanstack/charts";
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

const months = [
  { month: "Jan", lastYear: 141200, thisYear: 182400 },
  { month: "Feb", lastYear: 146900, thisYear: 189700 },
  { month: "Mar", lastYear: 155800, thisYear: 201300 },
  { month: "Apr", lastYear: 152300, thisYear: 198600 },
  { month: "May", lastYear: 163100, thisYear: 212900 },
  { month: "Jun", lastYear: 168400, thisYear: 219400 },
  { month: "Jul", lastYear: 166000, thisYear: 216800 },
  { month: "Aug", lastYear: 172900, thisYear: 228500 },
  { month: "Sep", lastYear: 178100, thisYear: 236200 },
];

const series = [
  {
    label: "2025",
    color: "color-mix(in oklch, var(--ts-chart-1) 40%, var(--card))",
  },
  { label: "2026", color: "var(--ts-chart-1)" },
];

const rows = months.flatMap(({ month, lastYear, thisYear }) => [
  { month, year: "2025", revenue: lastYear },
  { month, year: "2026", revenue: thisYear },
]);

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
const formatChange = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
  signDisplay: "always",
}).format;

const definition = defineChart({
  marks: [
    barY(rows, {
      x: "month",
      y: "revenue",
      z: "year",
      color: "year",
      layout: group({ padding: 0.1 }),
      inset: 1,
      radius: { end: 3 },
    }),
  ],
  scales: {
    x: { scale: () => scaleBand().padding(0.2) },
    y: {
      scale: scaleLinear().domain([0, 250000]),
      grid: true,
      axis: { ticks: { count: 5, format: formatCompact } },
    },
  },
  color: {
    domain: series.map((item) => item.label),
    range: series.map((item) => item.color),
  },
  focus: "group-x",
  tooltip: {
    use: tooltip,
    sort: "color-domain",
    content: (points, { primaryPoint }) => {
      const month = months.find((row) => row.month === points[0].datum.month);
      return {
        title: points[0].datum.month,
        rows: [
          ...points.map((point) => ({
            label: point.groupLabel,
            value: formatMoney(point.datum.revenue),
            color: point.color,
            active: point === primaryPoint,
          })),
          ...(month
            ? [
                {
                  label: "Change",
                  value: formatChange(
                    (month.thisYear - month.lastYear) / month.lastYear,
                  ),
                },
              ]
            : []),
        ],
      };
    },
  },
});

export function ChartBarMultiple() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Revenue, year over year</ChartTitle>
        <ChartDescription>January to September, 2025 and 2026</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Monthly revenue in dollars for 2025 and 2026, January to September"
      />
      <ChartLegend items={series} />
      <ChartTable
        caption="Monthly revenue in 2025 and 2026, in dollars"
        columns={["Month", "2025", "2026"]}
        rows={months.map((row) => [row.month, row.lastYear, row.thisYear])}
      />
    </ChartFrame>
  );
}
