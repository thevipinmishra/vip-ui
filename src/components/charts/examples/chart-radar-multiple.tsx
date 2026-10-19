"use client";

import { defineChart } from "@tanstack/charts";
import {
  angleGrid,
  focusGroupAngle,
  polar,
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
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const metrics = [
  { metric: "Performance", mobile: 64, desktop: 94 },
  { metric: "Accessibility", mobile: 93, desktop: 97 },
  { metric: "Best practices", mobile: 92, desktop: 100 },
  { metric: "SEO", mobile: 91, desktop: 100 },
];

const rows = metrics.flatMap(({ metric, mobile, desktop }) => [
  { metric, device: "Mobile", score: mobile },
  { metric, device: "Desktop", score: desktop },
]);

const series = [
  { label: "Mobile", color: "var(--ts-chart-3)" },
  { label: "Desktop", color: "var(--ts-chart-1)" },
];

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.66,
      scales: {
        angle: {
          scale: scalePoint<string>().domain(metrics.map((row) => row.metric)),
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
        radialLine(rows, {
          angle: "metric",
          radius: "score",
          curve: curveLinearClosed,
          z: "device",
          color: "device",
          strokeWidth: 2.5,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: series.map((item) => item.label),
    range: series.map((item) => item.color),
  },
  focus: focusGroupAngle,
  tooltip: {
    use: tooltip,
    sort: "color-domain",
    content: (points, { primaryPoint }) => ({
      title: points[0].datum.metric,
      rows: points.map((point) => ({
        label: point.groupLabel,
        value: `${point.datum.score} / 100`,
        color: point.color,
        active: point === primaryPoint,
      })),
    }),
  },
});

export function ChartRadarMultiple() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Lighthouse scores</ChartTitle>
        <ChartDescription>Home page, mobile and desktop</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Lighthouse scores out of 100 for the home page on mobile and desktop: performance, accessibility, best practices and SEO"
      />
      <ChartLegend>
        {series.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Lighthouse scores for the home page, out of 100"
        columns={["Category", "Mobile", "Desktop"]}
        rows={metrics.map((row) => [row.metric, row.mobile, row.desktop])}
      />
    </ChartFrame>
  );
}
