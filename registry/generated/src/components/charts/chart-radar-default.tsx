"use client";

import { defineChart } from "@tanstack/charts";
import {
  angleGrid,
  polar,
  radialArea,
  radialGrid,
  radialLine,
} from "@tanstack/charts/polar";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { curveLinearClosed } from "d3-shape";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "../vip-ui/chart";

const rows = [
  { area: "Onboarding", satisfied: 82 },
  { area: "Docs", satisfied: 74 },
  { area: "Performance", satisfied: 88 },
  { area: "Pricing", satisfied: 61 },
  { area: "Support", satisfied: 91 },
  { area: "Reliability", satisfied: 86 },
];

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.66,
      scales: {
        angle: {
          scale: scalePoint<string>().domain(rows.map((row) => row.area)),
          wrap: true,
        },
        radius: { scale: scaleLinear().domain([0, 100]) },
      },
      guides: [
        radialGrid({
          values: [25, 50, 75, 100],
          shape: "polygon",
          stroke: "var(--border)",
        }),
        angleGrid({
          labels: true,
          stroke: "var(--border)",
          labelFill: "var(--muted-foreground)",
        }),
      ],
      marks: [
        radialArea(rows, {
          angle: "area",
          radius: "satisfied",
          curve: curveLinearClosed,
          fill: "var(--ts-chart-1)",
          fillOpacity: 0.2,
        }),
        radialLine(rows, {
          angle: "area",
          radius: "satisfied",
          curve: curveLinearClosed,
          stroke: "var(--ts-chart-1)",
          strokeWidth: 2.5,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.area,
      rows: [
        {
          label: "Satisfied",
          value: `${point.datum.satisfied}%`,
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartRadarDefault() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Customer satisfaction</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Percent of customers satisfied with onboarding, docs, performance, pricing, support and reliability"
      />
      <ChartTable
        caption="Percent of customers satisfied, by area"
        columns={["Area", "Satisfied (%)"]}
        rows={rows.map((row) => [row.area, row.satisfied])}
      />
    </ChartFrame>
  );
}
