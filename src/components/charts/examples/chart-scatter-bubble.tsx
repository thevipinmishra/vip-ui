"use client";

import { defineChart, dot } from "@tanstack/charts";
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

const rows = [
  {
    market: "Germany",
    region: "Europe",
    growth: 8,
    retention: 82,
    revenue: 24,
  },
  { market: "France", region: "Europe", growth: 5, retention: 76, revenue: 14 },
  { market: "Spain", region: "Europe", growth: 12, retention: 71, revenue: 6 },
  {
    market: "Canada",
    region: "Americas",
    growth: 10,
    retention: 85,
    revenue: 11,
  },
  {
    market: "Brazil",
    region: "Americas",
    growth: 21,
    retention: 64,
    revenue: 9,
  },
  {
    market: "Mexico",
    region: "Americas",
    growth: 17,
    retention: 69,
    revenue: 5,
  },
  { market: "Japan", region: "Asia", growth: 4, retention: 88, revenue: 19 },
  { market: "India", region: "Asia", growth: 26, retention: 61, revenue: 8 },
];

const series = [
  { label: "Europe", color: "var(--ts-chart-1)" },
  { label: "Americas", color: "var(--ts-chart-2)" },
  { label: "Asia", color: "var(--ts-chart-3)" },
];

const definition = defineChart({
  marks: [
    dot(rows, {
      x: "growth",
      y: "retention",
      r: "revenue",
      rScale: (revenue) => Math.sqrt(revenue) * 4,
      color: "region",
      key: "market",
      fillOpacity: 0.7,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 30]),
      grid: true,
      axis: {
        label: "Revenue growth, year over year",
        ticks: { count: 4, format: (value: number) => `${value}%` },
      },
    },
    y: {
      scale: scaleLinear().domain([50, 100]),
      grid: true,
      axis: {
        label: "Net retention",
        ticks: { count: 5, format: (value: number) => `${value}%` },
      },
    },
  },
  color: {
    domain: series.map((item) => item.label),
    range: series.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.market,
      rows: [
        {
          label: "Revenue",
          value: `$${point.datum.revenue}M`,
          color: point.color,
        },
        { label: "Growth", value: `${point.datum.growth}%` },
        { label: "Retention", value: `${point.datum.retention}%` },
      ],
    }),
  },
});

export function ChartScatterBubble() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Markets</ChartTitle>
        <ChartDescription>
          Growth and retention by country. Bubble area shows annual revenue.
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Growth against retention for eight markets, with bubble size for revenue"
      />
      <ChartLegend>
        {series.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Market growth, retention and revenue"
        columns={[
          "Market",
          "Region",
          "Growth (%)",
          "Retention (%)",
          "Revenue ($M)",
        ]}
        rows={rows.map((row) => [
          row.market,
          row.region,
          row.growth,
          row.retention,
          row.revenue,
        ])}
      />
    </ChartFrame>
  );
}
