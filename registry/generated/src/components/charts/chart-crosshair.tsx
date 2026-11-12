"use client";

import { bandX, defineChart, lineY, whenFocused } from "@tanstack/charts";
import { crosshair } from "@tanstack/charts/crosshair";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scaleUtc } from "@tanstack/charts/scales/time";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "../vip-ui/chart";

const rows = [
  { id: "2026-10-01", date: new Date(Date.UTC(2026, 9, 1)), users: 1820 },
  { id: "2026-10-02", date: new Date(Date.UTC(2026, 9, 2)), users: 1875 },
  { id: "2026-10-03", date: new Date(Date.UTC(2026, 9, 3)), users: 1770 },
  { id: "2026-10-04", date: new Date(Date.UTC(2026, 9, 4)), users: 1640 },
  { id: "2026-10-05", date: new Date(Date.UTC(2026, 9, 5)), users: 1595 },
  { id: "2026-10-06", date: new Date(Date.UTC(2026, 9, 6)), users: 1960 },
  { id: "2026-10-07", date: new Date(Date.UTC(2026, 9, 7)), users: 2040 },
  { id: "2026-10-08", date: new Date(Date.UTC(2026, 9, 8)), users: 2125 },
  { id: "2026-10-09", date: new Date(Date.UTC(2026, 9, 9)), users: 2080 },
  { id: "2026-10-10", date: new Date(Date.UTC(2026, 9, 10)), users: 1930 },
  { id: "2026-10-11", date: new Date(Date.UTC(2026, 9, 11)), users: 1710 },
  { id: "2026-10-12", date: new Date(Date.UTC(2026, 9, 12)), users: 1680 },
  { id: "2026-10-13", date: new Date(Date.UTC(2026, 9, 13)), users: 2180 },
  { id: "2026-10-14", date: new Date(Date.UTC(2026, 9, 14)), users: 2260 },
  { id: "2026-10-15", date: new Date(Date.UTC(2026, 9, 15)), users: 2310 },
  { id: "2026-10-16", date: new Date(Date.UTC(2026, 9, 16)), users: 2245 },
  { id: "2026-10-17", date: new Date(Date.UTC(2026, 9, 17)), users: 2110 },
  { id: "2026-10-18", date: new Date(Date.UTC(2026, 9, 18)), users: 1840 },
  { id: "2026-10-19", date: new Date(Date.UTC(2026, 9, 19)), users: 1795 },
  { id: "2026-10-20", date: new Date(Date.UTC(2026, 9, 20)), users: 2385 },
];

const ticks = rows.map((row) => row.date);

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const fullDayFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const countFormat = new Intl.NumberFormat("en-US");

const formatDay = (date: Date) => dayFormat.format(date);
const formatFullDay = (date: Date) => fullDayFormat.format(date);
const formatCount = (value: number) => countFormat.format(value);

const definition = defineChart({
  marks: [
    whenFocused(
      bandX(rows, {
        x: "date",
        fill: "var(--ts-chart-1)",
        fillOpacity: 0.08,
        width: 22,
      }),
      { match: "x" },
    ),
    lineY(rows, {
      x: "date",
      y: "users",
      stroke: "var(--ts-chart-1)",
      strokeWidth: 2,
    }),
    crosshair({ x: { label: true }, y: false }),
  ],
  scales: {
    x: {
      scale: scaleUtc,
      axis: { ticks: { values: ticks, format: formatDay } },
    },
    y: {
      scale: scaleLinear().domain([0, 2600]),
      grid: true,
      axis: { ticks: { count: 4, format: formatCount } },
    },
  },
  focus: "group-x",
  maxFocusDistance: Number.POSITIVE_INFINITY,
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: formatFullDay(point.datum.date),
      rows: [
        {
          label: "Daily active users",
          value: formatCount(point.datum.users),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartCrosshair() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Daily active users</ChartTitle>
        <ChartDescription>
          Twenty days in October 2026. Hover or focus the chart to inspect a
          day.
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Daily active users from October 1 to October 20, 2026, with a crosshair for each day"
      />
      <ChartTable
        caption="Daily active users, October 2026"
        columns={["Date", "Daily active users"]}
        rows={rows.map((row) => [
          formatFullDay(row.date),
          formatCount(row.users),
        ])}
      />
    </ChartFrame>
  );
}
