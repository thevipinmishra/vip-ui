"use client";

import { defineChart, lineY } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTitle,
} from "@/components/ui/chart";

const rows = [
  { week: "Week 1", minutes: 42 },
  { week: "Week 2", minutes: 37 },
  { week: "Week 3", minutes: 39 },
  { week: "Week 4", minutes: 31 },
  { week: "Week 5", minutes: 28 },
  { week: "Week 6", minutes: 24 },
] as const;

const responseChart = defineChart({
  marks: [
    lineY(rows, {
      x: "week",
      y: "minutes",
      stroke: "var(--ts-chart-2)",
      strokeWidth: 2.5,
    }),
  ],
  scales: {
    x: { scale: scalePoint },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { label: "Minutes" },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.week,
      rows: [
        {
          label: "Median response",
          value: `${point.datum.minutes} min`,
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartLineDemo() {
  return (
    <ChartFrame className="w-full max-w-2xl ring-1 ring-border/70">
      <ChartCaption>
        <ChartTitle>Support response time</ChartTitle>
        <ChartDescription>
          Weekly median, last six weeks, in minutes
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={responseChart}
        height={260}
        initialWidth={600}
        ariaLabel="Median support response time in minutes over six weeks"
      />
      <table className="sr-only">
        <caption>Weekly median support response time in minutes</caption>
        <thead>
          <tr>
            <th scope="col">Week</th>
            <th scope="col">Minutes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.week}>
              <th scope="row">{row.week}</th>
              <td>{row.minutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ChartFrame>
  );
}
