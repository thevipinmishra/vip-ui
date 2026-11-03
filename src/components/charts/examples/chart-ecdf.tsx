"use client";

import { defineChart, lineY } from "@tanstack/charts";
import { d3Curve } from "@tanstack/charts/d3/shape";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { cumulative } from "@tanstack/charts/transform/cumulative";
import { normalize } from "@tanstack/charts/transform/normalize";
import { curveStepAfter } from "d3-shape";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const tiers = [
  { label: "Free", color: "var(--ts-chart-3)", base: 180, spread: 260 },
  { label: "Pro", color: "var(--ts-chart-2)", base: 120, spread: 160 },
  { label: "Enterprise", color: "var(--ts-chart-1)", base: 80, spread: 90 },
];

const noise = (seed: number) => {
  const value = Math.sin(seed * 39.3468) * 43758.5453;
  return value - Math.floor(value);
};

const rows = tiers.flatMap((tier, tierIndex) =>
  Array.from({ length: 20 }, (_, index) => ({
    tier: tier.label,
    latency: Math.round(
      tier.base + noise(tierIndex * 40 + index + 1) ** 2 * tier.spread,
    ),
  })),
);

const running = cumulative(rows, {
  by: "tier",
  orderBy: "latency",
  outputs: { seen: { reduce: "count" } },
});

const points = normalize(running, {
  value: "seen",
  by: "tier",
  basis: "max",
  as: "share",
}).sort((a, b) =>
  a.tier === b.tier ? a.latency - b.latency : a.tier.localeCompare(b.tier),
);

const formatPercent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 0,
}).format;
const formatLatency = (value: number) => `${value} ms`;

const percentile = (tier: string, share: number) =>
  points.find((point) => point.tier === tier && point.share >= share)
    ?.latency ?? 0;

const definition = defineChart({
  marks: [
    lineY(points, {
      x: "latency",
      y: "share",
      z: "tier",
      color: "tier",
      curve: d3Curve(curveStepAfter),
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 500]),
      grid: true,
      axis: {
        label: "Request latency",
        ticks: { count: 5, format: formatLatency },
      },
    },
    y: {
      scale: scaleLinear().domain([0, 1]),
      grid: true,
      axis: { ticks: { count: 4, format: formatPercent } },
    },
  },
  color: {
    domain: tiers.map((tier) => tier.label),
    range: tiers.map((tier) => tier.color),
  },
  focus: "nearest",
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.tier,
      rows: [
        {
          label: `At or under ${formatLatency(point.datum.latency)}`,
          value: formatPercent(point.datum.share),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartEcdf() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Latency by plan</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel={`Cumulative distribution of request latency for three plans. Enterprise reaches 90% at ${formatLatency(percentile("Enterprise", 0.9))}, Free at ${formatLatency(percentile("Free", 0.9))}.`}
      />
      <ChartLegend>
        {tiers.map((tier) => (
          <ChartLegendItem key={tier.label} color={tier.color} swatch="line">
            {tier.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Request latency percentiles by plan"
        columns={["Plan", "Median", "90th percentile", "Slowest"]}
        rows={tiers.map((tier) => [
          tier.label,
          formatLatency(percentile(tier.label, 0.5)),
          formatLatency(percentile(tier.label, 0.9)),
          formatLatency(percentile(tier.label, 1)),
        ])}
      />
    </ChartFrame>
  );
}
