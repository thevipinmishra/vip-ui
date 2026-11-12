"use client";

import { defineChart, dot } from "@tanstack/charts";
import { canvasChartRenderer } from "@tanstack/charts/canvas";
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
} from "../vip-ui/chart";

const devices = [
  { label: "Desktop", color: "var(--ts-chart-1)", base: 1.2, slope: 0.012 },
  { label: "Mobile", color: "var(--ts-chart-2)", base: 2.1, slope: 0.02 },
];

const noise = (seed: number) => {
  const value = Math.sin(seed * 17.231 + 0.577) * 43758.5453;
  return value - Math.floor(value);
};

const sessions = Array.from({ length: 2400 }, (_, index) => {
  const device = devices[index % 2];
  const size = Math.round(40 + noise(index + 1) ** 1.4 * 460);
  const jitter = noise(index + 5000) + noise(index + 9000) - 1;
  return {
    id: index,
    device: device.label,
    size,
    seconds:
      Math.round(
        Math.max(0.3, device.base + size * device.slope * 0.1 + jitter * 1.2) *
          100,
      ) / 100,
  };
});

const formatSeconds = (value: number) => `${value.toFixed(1)} s`;
const formatSize = (value: number) => `${value} KB`;

const summary = devices.map((device) => {
  const items = sessions.filter((row) => row.device === device.label);
  const sorted = items.map((row) => row.seconds).sort((a, b) => a - b);
  return {
    label: device.label,
    count: items.length,
    median: sorted[Math.floor(sorted.length / 2)],
    p95: sorted[Math.floor(sorted.length * 0.95)],
  };
});

const definition = defineChart({
  marks: [
    dot(sessions, {
      x: "size",
      y: "seconds",
      key: "id",
      color: "device",
      r: 1.75,
      fillOpacity: 0.5,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 500]),
      grid: true,
      axis: { label: "Page weight", ticks: { count: 5, format: formatSize } },
    },
    y: {
      scale: scaleLinear().domain([0, 5]),
      grid: true,
      axis: { label: "Load time", ticks: { count: 4, format: formatSeconds } },
    },
  },
  color: {
    domain: devices.map((device) => device.label),
    range: devices.map((device) => device.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.device,
      rows: [
        {
          label: "Load time",
          value: formatSeconds(point.datum.seconds),
          color: point.color,
        },
        { label: "Page weight", value: formatSize(point.datum.size) },
      ],
    }),
  },
});

export function ChartScatterCanvas() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Load time by page weight</ChartTitle>
        <ChartDescription>
          {sessions.length.toLocaleString("en-US")} sessions on Canvas.
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        renderer={canvasChartRenderer}
        height={260}
        initialWidth={520}
        ariaLabel={`Scatterplot of ${sessions.length} sessions by page weight and load time. Mobile loads are slower at every page weight.`}
      />
      <ChartLegend>
        {devices.map((device) => (
          <ChartLegendItem key={device.label} color={device.color}>
            {device.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Load time by device"
        columns={["Device", "Sessions", "Median", "95th percentile"]}
        rows={summary.map((item) => [
          item.label,
          item.count,
          formatSeconds(item.median),
          formatSeconds(item.p95),
        ])}
      />
    </ChartFrame>
  );
}
