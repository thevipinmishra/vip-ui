"use client";

import { defineChart, dot } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { densityContour } from "@tanstack/charts/spatial/density";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const noise = (seed: number) => {
  const value = Math.sin(seed * 93.9898 + 1.618) * 43758.5453;
  return value - Math.floor(value);
};

const clusters = [
  { label: "Browsers", spend: 18, conversion: 1.4, size: 70 },
  { label: "Planners", spend: 46, conversion: 3.6, size: 55 },
  { label: "Loyalists", spend: 74, conversion: 5.2, size: 35 },
];

const campaigns = clusters.flatMap((cluster, clusterIndex) =>
  Array.from({ length: cluster.size }, (_, index) => {
    const seed = clusterIndex * 200 + index + 1;
    const dx = noise(seed) + noise(seed + 0.4) - 1;
    const dy = noise(seed + 0.8) + noise(seed + 0.2) - 1;
    return {
      id: `${cluster.label}-${index}`,
      cluster: cluster.label,
      spend: Math.round((cluster.spend + dx * 16) * 10) / 10,
      conversion: Math.round((cluster.conversion + dy * 1.4) * 100) / 100,
    };
  }),
);

const formatSpend = (value: number) => `$${Math.round(value)}k`;
const formatRate = (value: number) => `${value.toFixed(1)}%`;

const summary = clusters.map((cluster) => {
  const items = campaigns.filter((row) => row.cluster === cluster.label);
  const mean = (values: number[]) =>
    values.reduce((total, value) => total + value, 0) / values.length;
  return {
    label: cluster.label,
    count: items.length,
    spend: mean(items.map((row) => row.spend)),
    conversion: mean(items.map((row) => row.conversion)),
  };
});

const definition = defineChart({
  marks: [
    densityContour(campaigns, {
      x: "spend",
      y: "conversion",
      bandwidth: 22,
      thresholds: 6,
      fill: "var(--ts-chart-1)",
      fillOpacity: 0.1,
      stroke: "var(--ts-chart-1)",
      strokeOpacity: 0.5,
      strokeWidth: 1,
    }),
    dot(campaigns, {
      x: "spend",
      y: "conversion",
      key: "id",
      r: 2,
      fill: "var(--foreground)",
      fillOpacity: 0.45,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 100]),
      grid: true,
      axis: { label: "Spend", ticks: { count: 5, format: formatSpend } },
    },
    y: {
      scale: scaleLinear().domain([0, 7]),
      grid: true,
      axis: {
        label: "Conversion",
        ticks: { count: 4, format: formatRate },
      },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.cluster,
      rows: [
        { label: "Spend", value: formatSpend(point.datum.spend) },
        { label: "Conversion", value: formatRate(point.datum.conversion) },
      ],
    }),
  },
});

export function ChartDensity() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Campaign clusters</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={280}
        initialWidth={520}
        ariaLabel={`Density contours over ${campaigns.length} campaigns by spend and conversion rate, forming three clusters`}
      />
      <ChartTable
        caption="Campaign clusters by spend and conversion"
        columns={["Cluster", "Campaigns", "Mean spend", "Mean conversion"]}
        rows={summary.map((item) => [
          item.label,
          item.count,
          formatSpend(item.spend),
          formatRate(item.conversion),
        ])}
      />
    </ChartFrame>
  );
}
