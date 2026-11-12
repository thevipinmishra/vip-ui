"use client";

import { defineChart } from "@tanstack/charts";
import { colorLegend } from "@tanstack/charts/legend";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { hexbin } from "@tanstack/charts/spatial/hexbin";
import { tooltip } from "@tanstack/charts/tooltip";
import { scaleThreshold } from "d3-scale";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "../vip-ui/chart";

const noise = (seed: number) => {
  const value = Math.sin(seed * 12.9898 + 4.1414) * 43758.5453;
  return value - Math.floor(value);
};

const requests = Array.from({ length: 180 }, (_, index) => {
  const hour = Math.round(noise(index + 1) * 240) / 10;
  const load = Math.exp(-((hour - 14) ** 2) / 18);
  const jitter = noise(index + 500) + noise(index + 900) - 1;
  return {
    id: index,
    hour,
    latency: Math.round(110 + load * 160 + jitter * 70),
  };
});

const steps = [3, 6, 9];
const ramp = [
  "color-mix(in oklab, var(--ts-chart-1) 22%, var(--card))",
  "color-mix(in oklab, var(--ts-chart-1) 48%, var(--card))",
  "color-mix(in oklab, var(--ts-chart-1) 74%, var(--card))",
  "var(--ts-chart-1)",
];

const formatHour = (value: number) =>
  `${String(Math.floor(value)).padStart(2, "0")}:00`;
const formatLatency = (value: number) => `${Math.round(value)} ms`;

const blocks = [0, 6, 12, 18].map((start) => {
  const items = requests.filter(
    (row) => row.hour >= start && row.hour < start + 6,
  );
  const latencies = items.map((row) => row.latency).sort((a, b) => a - b);
  return {
    label: `${formatHour(start)}–${formatHour(start + 6)}`,
    requests: items.length,
    median: latencies[Math.floor(latencies.length / 2)] ?? 0,
  };
});

const definition = defineChart({
  marks: [
    hexbin(requests, {
      x: "hour",
      y: "latency",
      binWidth: 18,
      color: "count",
      stroke: "var(--card)",
      strokeWidth: 1,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 24]),
      axis: { label: "Hour (UTC)", ticks: { count: 6, format: formatHour } },
    },
    y: {
      scale: scaleLinear().domain([0, 360]),
      grid: true,
      axis: {
        label: "Latency",
        ticks: { count: 4, format: formatLatency },
      },
    },
  },
  color: {
    scale: scaleThreshold<number, string>().domain(steps).range(ramp),
    legend: colorLegend({
      label: "Requests per cell",
      placement: "bottom",
      format: (value) => `${value}`,
    }),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: `Around ${formatHour(point.datum.x)}`,
      rows: [
        {
          label: "Requests",
          value: `${point.datum.count}`,
          color: point.color,
        },
        { label: "Latency", value: `≈ ${formatLatency(point.datum.y)}` },
      ],
    }),
  },
});

export function ChartHexbin() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Request latency by hour</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={280}
        initialWidth={520}
        ariaLabel={`Hexagonal bins of ${requests.length} requests by hour and latency. Latency rises in the afternoon peak.`}
      />
      <ChartTable
        caption="Requests and median latency by time of day"
        columns={["Time (UTC)", "Requests", "Median latency"]}
        rows={blocks.map((block) => [
          block.label,
          block.requests,
          formatLatency(block.median),
        ])}
      />
    </ChartFrame>
  );
}
