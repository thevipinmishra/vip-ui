"use client";

import { defineChart, lineY } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const hours = [
  { hour: "00:00", p50: 41, p95: 118, p99: 262 },
  { hour: "01:00", p50: 39, p95: 112, p99: 248 },
  { hour: "02:00", p50: 38, p95: 109, p99: 241 },
  { hour: "03:00", p50: 38, p95: 111, p99: 255 },
  { hour: "04:00", p50: 40, p95: 116, p99: 260 },
  { hour: "05:00", p50: 42, p95: 124, p99: 281 },
  { hour: "06:00", p50: 47, p95: 138, p99: 302 },
  { hour: "07:00", p50: 53, p95: 152, p99: 331 },
  { hour: "08:00", p50: 58, p95: 168, p99: 356 },
  { hour: "09:00", p50: 61, p95: 177, p99: 372 },
  { hour: "10:00", p50: 63, p95: 181, p99: 384 },
  { hour: "11:00", p50: 62, p95: 179, p99: 377 },
  { hour: "12:00", p50: 60, p95: 174, p99: 369 },
  { hour: "13:00", p50: 64, p95: 186, p99: 402 },
  { hour: "14:00", p50: 71, p95: 214, p99: 518 },
  { hour: "15:00", p50: 66, p95: 193, p99: 428 },
  { hour: "16:00", p50: 62, p95: 178, p99: 381 },
  { hour: "17:00", p50: 59, p95: 169, p99: 362 },
  { hour: "18:00", p50: 55, p95: 158, p99: 339 },
  { hour: "19:00", p50: 51, p95: 147, p99: 318 },
  { hour: "20:00", p50: 48, p95: 139, p99: 301 },
  { hour: "21:00", p50: 46, p95: 131, p99: 287 },
  { hour: "22:00", p50: 44, p95: 125, p99: 274 },
  { hour: "23:00", p50: 42, p95: 120, p99: 266 },
];

const percentiles = [
  { key: "p50", label: "p50", color: "var(--ts-chart-1)" },
  { key: "p95", label: "p95", color: "var(--ts-chart-2)" },
  { key: "p99", label: "p99", color: "var(--ts-chart-3)" },
] as const;

const rows = hours.flatMap((row) =>
  percentiles.map((percentile) => ({
    hour: row.hour,
    percentile: percentile.label,
    ms: row[percentile.key],
  })),
);

const ticks = hours
  .filter((_, index) => index % 4 === 0)
  .map((row) => row.hour);

const definition = defineChart({
  marks: [
    lineY(rows, {
      x: "hour",
      y: "ms",
      z: "percentile",
      color: "percentile",
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: { scale: scalePoint, axis: { ticks: { values: ticks } } },
    y: {
      scale: scaleLinear().domain([0, 600]),
      grid: true,
      axis: { ticks: { count: 4, format: (value: number) => `${value} ms` } },
    },
  },
  color: {
    domain: percentiles.map((percentile) => percentile.label),
    range: percentiles.map((percentile) => percentile.color),
  },
  focus: "group-x",
  tooltip: {
    use: tooltip,
    sort: "color-domain",
    content: (points, { primaryPoint }) => ({
      title: `${points[0].datum.hour} UTC`,
      rows: points.map((point) => ({
        label: point.groupLabel,
        value: `${point.datum.ms} ms`,
        color: point.color,
        active: point === primaryPoint,
      })),
    }),
  },
});

export function ChartLineMultiple() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>API latency</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Hourly API response time at the 50th, 95th and 99th percentiles for the last 24 hours, in milliseconds"
      />
      <ChartLegend>
        {percentiles.map((item) => (
          <ChartLegendItem key={item.label} color={item.color} swatch="line">
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Hourly API response time percentiles, in milliseconds"
        columns={["Hour (UTC)", "p50", "p95", "p99"]}
        rows={hours.map((row) => [row.hour, row.p50, row.p95, row.p99])}
      />
    </ChartFrame>
  );
}
