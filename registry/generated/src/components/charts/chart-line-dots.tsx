"use client";

import { defineChart, dot, lineY, ruleY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "../vip-ui/chart";

const target = 99.9;

const rows = [
  { date: "2026-09-29", uptime: 100 },
  { date: "2026-09-30", uptime: 100 },
  { date: "2026-10-01", uptime: 99.98 },
  { date: "2026-10-02", uptime: 100 },
  { date: "2026-10-03", uptime: 99.95 },
  { date: "2026-10-04", uptime: 100 },
  { date: "2026-10-05", uptime: 100 },
  { date: "2026-10-06", uptime: 99.72 },
  { date: "2026-10-07", uptime: 99.99 },
  { date: "2026-10-08", uptime: 100 },
  { date: "2026-10-09", uptime: 99.86 },
  { date: "2026-10-10", uptime: 100 },
  { date: "2026-10-11", uptime: 100 },
  { date: "2026-10-12", uptime: 99.97 },
];

const status = [
  { label: "Met target", color: "var(--ts-chart-2)" },
  { label: "Missed target", color: "var(--ts-chart-5)" },
];

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const formatDay = (date: string) => dayFormat.format(new Date(date));
const formatUptime = (value: number) => `${value.toFixed(2)}%`;
const downtime = (uptime: number) => {
  const seconds = Math.round(((100 - uptime) / 100) * 24 * 60 * 60);
  if (seconds < 60) return `${seconds} s`;
  return `${Math.floor(seconds / 60)} min ${seconds % 60} s`;
};

const ticks = rows
  .filter((_, index) => (rows.length - 1 - index) % 2 === 0)
  .map((row) => row.date);

const definition = defineChart({
  marks: [
    decorative(
      ruleY([target], {
        stroke: "var(--muted-foreground)",
        strokeDasharray: "4 4",
      }),
    ),
    decorative(
      lineY(rows, {
        x: "date",
        y: "uptime",
        stroke: "var(--border)",
        strokeWidth: 2,
      }),
    ),
    dot(rows, {
      x: "date",
      y: "uptime",
      color: (row) => (row.uptime < target ? status[1].label : status[0].label),
      r: 4.5,
    }),
  ],
  scales: {
    x: {
      scale: scalePoint,
      axis: { ticks: { values: ticks, format: formatDay } },
    },
    y: {
      scale: scaleLinear().domain([99.6, 100]),
      grid: true,
      axis: { ticks: { count: 4, format: (value: number) => `${value}%` } },
    },
  },
  color: {
    domain: status.map((item) => item.label),
    range: status.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: formatDay(point.datum.date),
      rows: [
        {
          label: "Uptime",
          value: formatUptime(point.datum.uptime),
          color: point.color,
        },
        { label: "Downtime", value: downtime(point.datum.uptime) },
      ],
    }),
  },
});

export function ChartLineDots() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Uptime</ChartTitle>
        <ChartDescription>
          Daily uptime, last 14 days. The dashed line is the {target}% target.
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel={`Daily uptime for the last 14 days, with a ${target} percent target`}
      />
      <ChartLegend>
        {status.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Daily uptime and downtime"
        columns={["Date", "Uptime", "Downtime"]}
        rows={rows.map((row) => [
          formatDay(row.date),
          formatUptime(row.uptime),
          downtime(row.uptime),
        ])}
      />
    </ChartFrame>
  );
}
