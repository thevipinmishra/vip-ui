"use client";

import { defineChart } from "@tanstack/charts";
import { sunburst } from "@tanstack/charts/hierarchy/sunburst";
import { polar } from "@tanstack/charts/polar";
import { Chart } from "@tanstack/charts/react";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const regions = ["Americas", "Europe", "Asia"];

const rows = [
  { path: "Revenue/Americas/Business", region: "Americas", revenue: 210 },
  { path: "Revenue/Americas/Pro", region: "Americas", revenue: 140 },
  { path: "Revenue/Americas/Starter", region: "Americas", revenue: 20 },
  { path: "Revenue/Europe/Business", region: "Europe", revenue: 160 },
  { path: "Revenue/Europe/Pro", region: "Europe", revenue: 90 },
  { path: "Revenue/Europe/Starter", region: "Europe", revenue: 15 },
  { path: "Revenue/Asia/Business", region: "Asia", revenue: 85 },
  { path: "Revenue/Asia/Pro", region: "Asia", revenue: 70 },
  { path: "Revenue/Asia/Starter", region: "Asia", revenue: 10 },
];

const total = rows.reduce((sum, row) => sum + row.revenue, 0);

const regionColor = (region: string) =>
  `var(--ts-chart-${regions.indexOf(region) + 1})`;

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.9,
      marks: [
        sunburst(rows, {
          path: "path",
          value: "revenue",
          innerRadius: ({ radius }) => radius * 0.3,
          ringPadding: 2,
          fill: (node) =>
            node.depth === 1
              ? regionColor(node.name)
              : `color-mix(in oklch, ${regionColor(node.data?.region ?? "")} 55%, var(--card))`,
          stroke: "var(--card)",
          strokeWidth: 1.5,
        }),
      ],
      scales: { angle: null, radius: null },
    }),
  ],
  scales: { x: null, y: null },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.data
        ? `${point.datum.data.region}, ${point.datum.name}`
        : point.datum.name,
      rows: [
        {
          label: "Revenue",
          value: `$${point.datum.value}k`,
          color: point.color,
        },
        {
          label: "Share",
          value: `${Math.round((point.datum.value / total) * 100)}%`,
        },
      ],
    }),
  },
});

export function ChartSunburst() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Revenue mix</ChartTitle>
        <ChartDescription>Region inside, plan outside</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Sunburst of revenue by region, then by plan, in thousands of dollars"
      />
      <ChartLegend
        items={regions.map((region) => ({
          label: region,
          color: regionColor(region),
        }))}
      />
      <ChartTable
        caption="Revenue by region and plan, in thousands of dollars"
        columns={["Region", "Plan", "Revenue ($k)"]}
        rows={rows.map((row) => [
          row.region,
          row.path.split("/").at(-1) ?? row.path,
          row.revenue,
        ])}
      />
    </ChartFrame>
  );
}
