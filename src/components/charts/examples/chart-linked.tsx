"use client";

import { barY, defineChart, lineY } from "@tanstack/charts";
import { crosshair } from "@tanstack/charts/crosshair";
import { createChartCursor, cursorHost } from "@tanstack/charts/cursor";
import { scaleBand } from "@tanstack/charts/scales/band";
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
} from "@/components/ui/chart";

const rows = [
  { day: "2026-10-05", requests: 412, errors: 0.21 },
  { day: "2026-10-06", requests: 468, errors: 0.18 },
  { day: "2026-10-07", requests: 455, errors: 0.24 },
  { day: "2026-10-08", requests: 481, errors: 0.19 },
  { day: "2026-10-09", requests: 503, errors: 1.42 },
  { day: "2026-10-10", requests: 377, errors: 0.65 },
  { day: "2026-10-11", requests: 341, errors: 0.22 },
  { day: "2026-10-12", requests: 489, errors: 0.2 },
  { day: "2026-10-13", requests: 526, errors: 0.17 },
  { day: "2026-10-14", requests: 534, errors: 0.23 },
  { day: "2026-10-15", requests: 547, errors: 0.19 },
  { day: "2026-10-16", requests: 552, errors: 0.88 },
  { day: "2026-10-17", requests: 402, errors: 0.26 },
  { day: "2026-10-18", requests: 365, errors: 0.2 },
];

const days = rows.map((row) => row.day);
const tickDays = days.filter((_, index) => index % 3 === 0);

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const fullDayFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const formatDay = (day: string) => dayFormat.format(new Date(day));
const formatFullDay = (day: string) => fullDayFormat.format(new Date(day));
const formatRequests = (value: number) => `${value}k`;
const formatRate = (value: number) => `${value.toFixed(2)}%`;

const margin = { left: 44, right: 12 };

const cursor = {
  use: cursorHost,
  controller: createChartCursor<string, number>(),
  mode: "focus" as const,
  match: "x" as const,
};

const requestsDefinition = defineChart({
  marks: [
    barY(rows, {
      x: "day",
      y: "requests",
      key: "day",
      fill: "var(--ts-chart-1)",
      inset: 2,
      radius: { end: 3 },
    }),
  ],
  scales: {
    x: {
      scale: () => scaleBand<string>().domain(days).padding(0.2),
      axis: false,
    },
    y: {
      scale: scaleLinear().domain([0, 600]),
      grid: true,
      axis: { ticks: { count: 3, format: formatRequests } },
    },
  },
  margin,
  cursor,
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: formatFullDay(point.datum.day),
      rows: [
        {
          label: "Requests",
          value: formatRequests(point.datum.requests),
          color: point.color,
        },
        { label: "Error rate", value: formatRate(point.datum.errors) },
      ],
    }),
  },
});

const errorsDefinition = defineChart({
  marks: [
    lineY(rows, {
      x: "day",
      y: "errors",
      key: "day",
      stroke: "var(--ts-chart-5)",
      strokeWidth: 2,
    }),
    crosshair({ x: true, y: false }),
  ],
  scales: {
    x: {
      scale: () => scalePoint<string>().domain(days).padding(0.6),
      axis: { ticks: { values: tickDays, format: formatDay } },
    },
    y: {
      scale: scaleLinear().domain([0, 1.5]),
      grid: true,
      axis: { ticks: { count: 3, format: formatRate } },
    },
  },
  margin,
  focus: "group-x",
  maxFocusDistance: Number.POSITIVE_INFINITY,
  cursor,
  tooltip: false,
});

export function ChartLinked() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Requests and error rate</ChartTitle>
        <ChartDescription>
          Both charts follow the same day. Hover or focus either chart.
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={requestsDefinition}
        height={140}
        initialWidth={520}
        ariaLabel="Daily API requests in thousands, October 5 to 18, 2026"
      />
      <Chart
        definition={errorsDefinition}
        height={120}
        initialWidth={520}
        ariaLabel="Daily error rate, October 5 to 18, 2026"
      />
      <ChartTable
        caption="Daily API requests and error rate, October 2026"
        columns={["Day", "Requests", "Error rate"]}
        rows={rows.map((row) => [
          formatFullDay(row.day),
          formatRequests(row.requests),
          formatRate(row.errors),
        ])}
      />
    </ChartFrame>
  );
}
