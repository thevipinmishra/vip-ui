"use client";

import { binY, defineChart, dot, groupBy, tickY } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { normalize } from "@tanstack/charts/transform/normalize";
import { median, quantile } from "@tanstack/charts/transform/reduce";
import { violinY } from "@tanstack/charts/violin";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const segments = [
  { label: "Enterprise", color: "var(--ts-chart-1)", center: 18, spread: 6 },
  { label: "Growth", color: "var(--ts-chart-2)", center: 32, spread: 10 },
  { label: "Starter", color: "var(--ts-chart-3)", center: 46, spread: 14 },
];

const noise = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const rows = segments.flatMap((segment, segmentIndex) =>
  Array.from({ length: 20 }, (_, index) => {
    const seed = segmentIndex * 100 + index + 1;
    const offset = noise(seed) + noise(seed + 0.5) + noise(seed + 0.25) - 1.5;
    return {
      segment: segment.label,
      minutes: Math.max(
        4,
        Math.round(segment.center + offset * segment.spread),
      ),
    };
  }),
);

const bins = binY(rows, {
  value: "minutes",
  by: "segment",
  thresholds: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72],
  outputs: { count: { reduce: "count" } },
});

const profiles = normalize(
  bins.filter((bin) => bin.count > 0),
  {
    value: "count",
    by: "segment",
    basis: "max",
    as: "width",
  },
);

const summaries = groupBy(rows, {
  by: "segment",
  outputs: {
    median: { value: "minutes", reduce: median },
    lower: { value: "minutes", reduce: quantile(0.25) },
    upper: { value: "minutes", reduce: quantile(0.75) },
  },
});

const formatMinutes = (value: number) => `${Math.round(value)} min`;

const definition = defineChart({
  marks: [
    violinY(profiles, {
      x: "segment",
      y: "y",
      width: "width",
      span: 0.72,
      color: "segment",
      fillOpacity: 0.3,
      strokeWidth: 1.5,
    }),
    tickY(summaries, {
      x: "segment",
      y: "median",
      span: 0.32,
      stroke: "var(--foreground)",
      strokeWidth: 2,
    }),
    dot(summaries, {
      x: "segment",
      y: "median",
      r: 3.5,
      fill: "var(--card)",
      stroke: "var(--foreground)",
      strokeWidth: 1.5,
    }),
  ],
  scales: {
    x: {
      scale: () =>
        scalePoint<string>()
          .domain(segments.map((segment) => segment.label))
          .padding(0.5),
    },
    y: {
      scale: scaleLinear().domain([0, 72]),
      grid: true,
      axis: {
        label: "First response",
        ticks: { count: 4, format: formatMinutes },
      },
    },
  },
  color: {
    domain: segments.map((segment) => segment.label),
    range: segments.map((segment) => segment.color),
  },
  tooltip: {
    use: tooltip,
    content: (points) => {
      const point = points[0];
      const summary = summaries.find(
        (item) => item.segment === point.datum.segment,
      );
      return {
        title: point.datum.segment,
        rows: summary
          ? [
              {
                label: "Median",
                value: formatMinutes(summary.median),
                color: point.color,
              },
              {
                label: "Middle 50%",
                value: `${formatMinutes(summary.lower)}–${formatMinutes(summary.upper)}`,
              },
            ]
          : [],
      };
    },
  },
});

export function ChartViolin() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>First response time</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={260}
        initialWidth={520}
        ariaLabel="Violin plot of first response time for Enterprise, Growth and Starter customers, 20 tickets each, with the median marked"
      />
      <ChartLegend>
        {segments.map((segment) => (
          <ChartLegendItem key={segment.label} color={segment.color}>
            {segment.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="First response time by customer segment"
        columns={["Segment", "Median", "25th percentile", "75th percentile"]}
        rows={summaries.map((summary) => [
          summary.segment,
          formatMinutes(summary.median),
          formatMinutes(summary.lower),
          formatMinutes(summary.upper),
        ])}
      />
    </ChartFrame>
  );
}
