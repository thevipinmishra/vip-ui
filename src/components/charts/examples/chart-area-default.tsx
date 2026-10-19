"use client";

import { areaY, defineChart, lineY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
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
  { date: "2026-09-13", visitors: 1091 },
  { date: "2026-09-14", visitors: 1738 },
  { date: "2026-09-15", visitors: 1818 },
  { date: "2026-09-16", visitors: 1831 },
  { date: "2026-09-17", visitors: 1800 },
  { date: "2026-09-18", visitors: 1736 },
  { date: "2026-09-19", visitors: 1221 },
  { date: "2026-09-20", visitors: 1246 },
  { date: "2026-09-21", visitors: 1845 },
  { date: "2026-09-22", visitors: 1856 },
  { date: "2026-09-23", visitors: 1934 },
  { date: "2026-09-24", visitors: 1806 },
  { date: "2026-09-25", visitors: 1725 },
  { date: "2026-09-26", visitors: 1195 },
  { date: "2026-09-27", visitors: 1246 },
  { date: "2026-09-28", visitors: 1758 },
  { date: "2026-09-29", visitors: 1934 },
  { date: "2026-09-30", visitors: 1898 },
  { date: "2026-10-01", visitors: 1962 },
  { date: "2026-10-02", visitors: 1862 },
  { date: "2026-10-03", visitors: 1241 },
  { date: "2026-10-04", visitors: 1257 },
  { date: "2026-10-05", visitors: 1789 },
  { date: "2026-10-06", visitors: 1867 },
  { date: "2026-10-07", visitors: 1891 },
  { date: "2026-10-08", visitors: 2049 },
  { date: "2026-10-09", visitors: 2079 },
  { date: "2026-10-10", visitors: 1277 },
  { date: "2026-10-11", visitors: 1411 },
  { date: "2026-10-12", visitors: 2004 },
];

const previousTotal = 43_014;
const total = rows.reduce((sum, row) => sum + row.visitors, 0);
const change = (total - previousTotal) / previousTotal;

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const formatDay = (date: string) => dayFormat.format(new Date(date));
const formatCount = (value: number) => value.toLocaleString("en-US");
const formatChange = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
  signDisplay: "always",
}).format;

const weeklyTicks = rows
  .filter((_, index) => (rows.length - 1 - index) % 7 === 0)
  .map((row) => row.date);

const definition = defineChart({
  marks: [
    decorative(
      areaY(rows, {
        x: "date",
        y: "visitors",
        fill: "url(#visitors-fill)",
      }),
    ),
    lineY(rows, {
      x: "date",
      y: "visitors",
      stroke: "var(--ts-chart-1)",
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: {
      scale: scalePoint,
      axis: { ticks: { values: weeklyTicks, format: formatDay } },
    },
    y: {
      scale: scaleLinear().domain([0, 2500]),
      grid: true,
      axis: { ticks: { count: 5, format: formatCount } },
    },
  },
  gradients: [
    {
      id: "visitors-fill",
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: "var(--ts-chart-1)", opacity: 0 },
        { offset: 1, color: "var(--ts-chart-1)", opacity: 0.32 },
      ],
    },
  ],
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: formatDay(point.datum.date),
      rows: [
        {
          label: "Visitors",
          value: formatCount(point.datum.visitors),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartAreaDefault() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Visitors</ChartTitle>
        <ChartValue>{formatCount(total)}</ChartValue>
        <ChartDescription>
          {formatChange(change)} from the previous 30 days
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel={`Daily visitors from ${formatDay(rows[0].date)} to ${formatDay(rows[rows.length - 1].date)}`}
      />
      <ChartTable
        caption="Daily visitors"
        columns={["Date", "Visitors"]}
        rows={rows.map((row) => [formatDay(row.date), row.visitors])}
      />
    </ChartFrame>
  );
}
