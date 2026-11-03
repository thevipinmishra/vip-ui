"use client";

import { defineChart, hexagon } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { delaunayLink } from "@tanstack/charts/spatial/delaunay";
import { voronoi } from "@tanstack/charts/spatial/voronoi";
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

const providers = [
  { label: "Americas", color: "var(--ts-chart-1)" },
  { label: "Europe", color: "var(--ts-chart-2)" },
  { label: "Asia Pacific", color: "var(--ts-chart-3)" },
];

const regions = [
  { id: "use1", region: "Virginia", area: "Americas", cost: 0.92, latency: 38 },
  { id: "usw2", region: "Oregon", area: "Americas", cost: 0.98, latency: 62 },
  { id: "cac1", region: "Montréal", area: "Americas", cost: 1.04, latency: 46 },
  {
    id: "sae1",
    region: "São Paulo",
    area: "Americas",
    cost: 1.42,
    latency: 118,
  },
  { id: "euw1", region: "Dublin", area: "Europe", cost: 1.02, latency: 74 },
  { id: "euc1", region: "Frankfurt", area: "Europe", cost: 1.12, latency: 88 },
  { id: "eun1", region: "Stockholm", area: "Europe", cost: 1.06, latency: 96 },
  { id: "euw3", region: "Paris", area: "Europe", cost: 1.16, latency: 82 },
  {
    id: "apne1",
    region: "Tokyo",
    area: "Asia Pacific",
    cost: 1.28,
    latency: 148,
  },
  {
    id: "apse1",
    region: "Singapore",
    area: "Asia Pacific",
    cost: 1.22,
    latency: 172,
  },
  {
    id: "apse2",
    region: "Sydney",
    area: "Asia Pacific",
    cost: 1.34,
    latency: 186,
  },
  {
    id: "aps1",
    region: "Mumbai",
    area: "Asia Pacific",
    cost: 1.08,
    latency: 162,
  },
];

const formatCost = (value: number) => `${value.toFixed(2)}×`;
const formatLatency = (value: number) => `${value} ms`;

const definition = defineChart({
  marks: [
    voronoi(regions, {
      x: "cost",
      y: "latency",
      key: "id",
      color: "area",
      fillOpacity: 0.12,
      stroke: "var(--card)",
      strokeWidth: 1.5,
    }),
    decorative(
      delaunayLink(regions, {
        x: "cost",
        y: "latency",
        key: "id",
        stroke: "var(--muted-foreground)",
        strokeOpacity: 0.35,
        strokeWidth: 1,
      }),
    ),
    hexagon(regions, {
      x: "cost",
      y: "latency",
      key: "id",
      color: "area",
      r: 6,
      stroke: "var(--card)",
      strokeWidth: 1.5,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0.8, 1.5]),
      grid: true,
      axis: {
        label: "Relative cost",
        ticks: { count: 4, format: formatCost },
      },
    },
    y: {
      scale: scaleLinear().domain([0, 200]),
      grid: true,
      axis: {
        label: "Latency from users",
        ticks: { count: 4, format: formatLatency },
      },
    },
  },
  color: {
    domain: providers.map((item) => item.label),
    range: providers.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.region,
      rows: [
        { label: "Area", value: point.datum.area, color: point.color },
        { label: "Cost", value: formatCost(point.datum.cost) },
        { label: "Latency", value: formatLatency(point.datum.latency) },
      ],
    }),
  },
});

export function ChartVoronoi() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Region placement</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={280}
        initialWidth={520}
        ariaLabel="Twelve cloud regions by relative cost and latency, with Voronoi cells and nearest-neighbor links. Americas regions are cheapest and fastest."
      />
      <ChartLegend>
        {providers.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Cloud regions by cost and latency"
        columns={["Region", "Area", "Relative cost", "Latency"]}
        rows={regions.map((row) => [
          row.region,
          row.area,
          formatCost(row.cost),
          formatLatency(row.latency),
        ])}
      />
    </ChartFrame>
  );
}
