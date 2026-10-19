"use client";

import { defineChart } from "@tanstack/charts";
import {
  angleGrid,
  polar,
  radialDot,
  radialGrid,
} from "@tanstack/charts/polar";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const rows = [
  { direction: "N", name: "North", hours: 9 },
  { direction: "NE", name: "Northeast", hours: 6 },
  { direction: "E", name: "East", hours: 5 },
  { direction: "SE", name: "Southeast", hours: 8 },
  { direction: "S", name: "South", hours: 14 },
  { direction: "SW", name: "Southwest", hours: 24 },
  { direction: "W", name: "West", hours: 21 },
  { direction: "NW", name: "Northwest", hours: 13 },
];

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.66,
      scales: {
        angle: {
          scale: scalePoint<string>().domain(rows.map((row) => row.direction)),
          wrap: true,
        },
        radius: { scale: scaleLinear().domain([0, 30]) },
      },
      guides: [
        radialGrid({
          values: [10, 20, 30],
          shape: "circle",
          stroke: "var(--border)",
          labels: true,
          format: (value) => `${value}%`,
          labelAngle: Math.PI / 8,
          labelAnchor: "start",
          labelBaseline: "auto",
          labelDx: 2,
          labelDy: -2,
          labelFill: "var(--muted-foreground)",
          labelFontSize: 10,
        }),
        angleGrid({
          labels: true,
          stroke: "var(--border)",
          labelFill: "var(--muted-foreground)",
        }),
      ],
      marks: [
        radialDot(rows, {
          angle: "direction",
          radius: "hours",
          fill: "var(--ts-chart-2)",
          r: 5,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.name,
      rows: [
        {
          label: "Share of hours",
          value: `${point.datum.hours}%`,
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartRadarDots() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Wind direction</ChartTitle>
        <ChartDescription>
          Share of hours from each direction, September 2026
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Share of hours the wind came from each of eight compass directions in September 2026. Most wind came from the southwest and west."
      />
      <ChartTable
        caption="Share of hours by wind direction, in percent"
        columns={["Direction", "Share of hours (%)"]}
        rows={rows.map((row) => [row.name, row.hours])}
      />
    </ChartFrame>
  );
}
