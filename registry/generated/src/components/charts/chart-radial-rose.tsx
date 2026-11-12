"use client";

import { defineChart } from "@tanstack/charts";
import { polar, radialBarRadius } from "@tanstack/charts/polar";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "../vip-ui/chart";

const rows = [
  { region: "North America", revenue: 412000 },
  { region: "Europe", revenue: 286000 },
  { region: "Asia Pacific", revenue: 194000 },
  { region: "Latin America", revenue: 78000 },
  { region: "Middle East and Africa", revenue: 41000 },
];

const series = rows.map((row, index) => ({
  label: row.region,
  color: `var(--ts-chart-${index + 1})`,
}));

const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.94,
      scales: {
        angle: { scale: () => scaleBand<string>().padding(0.14) },
        radius: {
          scale: scaleLinear().domain([0, 450000]),
          range: [({ radius }) => radius * 0.25, ({ radius }) => radius],
        },
      },
      marks: [
        radialBarRadius(rows, {
          angle: "region",
          radius1: () => 0,
          radius2: "revenue",
          color: "region",
          key: "region",
          cornerRadius: 5,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: series.map((item) => item.label),
    range: series.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.region,
      rows: [
        {
          label: "Revenue",
          value: formatMoney(point.datum.revenue),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartRadialRose() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Revenue by region</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Revenue by region in the third quarter of 2026: North America, Europe, Asia Pacific, Latin America, and Middle East and Africa"
      />
      <ChartLegend>
        {series.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Revenue by region, third quarter of 2026, in dollars"
        columns={["Region", "Revenue"]}
        rows={rows.map((row) => [row.region, row.revenue])}
      />
    </ChartFrame>
  );
}
