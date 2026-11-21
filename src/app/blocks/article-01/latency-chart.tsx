"use client";

import { barY, defineChart, group } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
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
} from "@/components/ui/chart";

export const latency = [
  { percentile: "p50", before: 1900, after: 410 },
  { percentile: "p95", before: 2600, after: 690 },
  { percentile: "p99", before: 3400, after: 980 },
];

const series = [
  {
    label: "Before",
    color: "color-mix(in oklab, var(--ts-chart-1) 40%, var(--card))",
  },
  { label: "After", color: "var(--ts-chart-1)" },
];

const rows = latency.flatMap(({ percentile, before, after }) => [
  { percentile, release: "Before", ms: before },
  { percentile, release: "After", ms: after },
]);

const formatMs = (value: number) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)} s` : `${value} ms`;

const definition = defineChart({
  marks: [
    barY(rows, {
      x: "percentile",
      y: "ms",
      z: "release",
      color: "release",
      layout: group({ padding: 0.1 }),
      inset: 1,
      radius: { end: 3 },
    }),
  ],
  scales: {
    x: { scale: () => scaleBand().padding(0.3) },
    y: {
      scale: scaleLinear().domain([0, 3500]),
      grid: true,
      axis: { ticks: { count: 4, format: formatMs } },
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
    content: (points, { primaryPoint }) => ({
      title: `${points[0].datum.percentile} cold start`,
      rows: points.map((point) => ({
        label: point.groupLabel,
        value: formatMs(point.datum.ms),
        color: point.color,
        active: point === primaryPoint,
      })),
    }),
  },
});

export function LatencyChart() {
  return (
    <ChartFrame variant="card">
      <ChartCaption>
        <ChartTitle>Cold start time</ChartTitle>
        <ChartDescription>
          All regions, 14 days before and after the change.
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={620}
        ariaLabel="Cold start time at p50, p95, and p99, before and after the change"
      />
      <ChartLegend>
        {series.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Cold start time in milliseconds"
        columns={["Percentile", "Before", "After"]}
        rows={latency.map((row) => [row.percentile, row.before, row.after])}
      />
    </ChartFrame>
  );
}
