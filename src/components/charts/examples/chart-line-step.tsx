"use client";

import { defineChart, lineY } from "@tanstack/charts";
import { d3Curve } from "@tanstack/charts/d3/shape";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { curveStepAfter } from "d3-shape";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const changes = [
  { date: "2026-09-14", percent: 1, note: "Staff only" },
  { date: "2026-09-16", percent: 5, note: "First customers" },
  { date: "2026-09-21", percent: 25, note: "Increased" },
  { date: "2026-09-23", percent: 10, note: "Rolled back for payment errors" },
  { date: "2026-09-28", percent: 25, note: "Fix released" },
  { date: "2026-10-02", percent: 50, note: "Increased" },
  { date: "2026-10-07", percent: 100, note: "All users" },
  { date: "2026-10-12", percent: 100, note: "Current" },
];

const rows = changes.map((change) => ({
  ...change,
  time: Date.parse(change.date),
}));

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const formatDay = (time: number) => dayFormat.format(time);

const week = 7 * 24 * 60 * 60 * 1000;
const start = rows[0].time;
const end = rows[rows.length - 1].time;
const weeklyTicks = Array.from(
  { length: Math.floor((end - start) / week) + 1 },
  (_, index) => start + index * week,
);

const definition = defineChart({
  marks: [
    lineY(rows, {
      x: "time",
      y: "percent",
      stroke: "var(--ts-chart-4)",
      strokeWidth: 2,
      curve: d3Curve(curveStepAfter),
      points: true,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([start, end]),
      axis: { ticks: { values: weeklyTicks, format: formatDay } },
    },
    y: {
      scale: scaleLinear().domain([0, 100]),
      grid: true,
      axis: { ticks: { count: 4, format: (value: number) => `${value}%` } },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: formatDay(point.datum.time),
      rows: [
        {
          label: "Users",
          value: `${point.datum.percent}%`,
          color: point.color,
        },
        { label: "Note", value: point.datum.note },
      ],
    }),
  },
});

export function ChartLineStep() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>New checkout rollout</ChartTitle>
        <ChartDescription>
          Share of users with the new checkout
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Rollout of the new checkout from 1 percent of users on September 14 to all users on October 7, with a rollback on September 23"
      />
      <ChartTable
        caption="Share of users with the new checkout"
        columns={["Date", "Users", "Note"]}
        rows={rows.map((row) => [
          formatDay(row.time),
          `${row.percent}%`,
          row.note,
        ])}
      />
    </ChartFrame>
  );
}
