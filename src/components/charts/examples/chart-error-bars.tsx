"use client";

import { defineChart, dot, link, ruleY, tickY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
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
} from "@/components/ui/chart";

const target = 72;

const regions = [
  { region: "North", estimate: 78, low: 73, high: 83 },
  { region: "South", estimate: 69, low: 62, high: 76 },
  { region: "East", estimate: 74, low: 70, high: 78 },
  { region: "West", estimate: 66, low: 58, high: 74 },
  { region: "Central", estimate: 81, low: 77, high: 85 },
  { region: "Coastal", estimate: 71, low: 64, high: 78 },
];

const formatScore = (value: number) => `${value}`;

const definition = defineChart({
  marks: [
    decorative(
      ruleY([target], {
        stroke: "var(--muted-foreground)",
        strokeDasharray: "4 4",
        strokeOpacity: 0.8,
      }),
    ),
    decorative(
      link(regions, {
        x1: "region",
        x2: "region",
        y1: "low",
        y2: "high",
        stroke: "var(--ts-chart-1)",
        strokeWidth: 1.5,
      }),
    ),
    decorative(
      tickY(regions, {
        x: "region",
        y: "low",
        length: 12,
        stroke: "var(--ts-chart-1)",
      }),
    ),
    decorative(
      tickY(regions, {
        x: "region",
        y: "high",
        length: 12,
        stroke: "var(--ts-chart-1)",
      }),
    ),
    dot(regions, {
      x: "region",
      y: "estimate",
      key: "region",
      r: 4.5,
      fill: "var(--ts-chart-1)",
      stroke: "var(--card)",
      strokeWidth: 1.5,
    }),
  ],
  scales: {
    x: {
      scale: () =>
        scaleBand<string>()
          .domain(regions.map((row) => row.region))
          .padding(0.4),
    },
    y: {
      scale: scaleLinear().domain([50, 90]),
      grid: true,
      axis: { label: "Satisfaction score", ticks: { count: 4 } },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.region,
      rows: [
        {
          label: "Estimate",
          value: formatScore(point.datum.estimate),
          color: point.color,
        },
        {
          label: "95% interval",
          value: `${point.datum.low}–${point.datum.high}`,
        },
        {
          label: "Versus target",
          value:
            point.datum.low > target
              ? "Above"
              : point.datum.high < target
                ? "Below"
                : "Overlaps",
        },
      ],
    }),
  },
});

export function ChartErrorBars() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Satisfaction by region</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel={`Satisfaction estimates with 95% intervals for six regions against a target of ${target}. North and Central sit above the target.`}
      />
      <ChartLegend>
        <ChartLegendItem color="var(--ts-chart-1)">
          Estimate and 95% interval
        </ChartLegendItem>
        <ChartLegendItem color="var(--muted-foreground)" swatch="dashed">
          Target
        </ChartLegendItem>
      </ChartLegend>
      <ChartTable
        caption="Satisfaction estimates by region"
        columns={["Region", "Estimate", "Low", "High"]}
        rows={regions.map((row) => [
          row.region,
          row.estimate,
          row.low,
          row.high,
        ])}
      />
    </ChartFrame>
  );
}
