"use client";

import { defineChart } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { polar, radialBarAngle } from "@tanstack/charts/polar";
import { scaleBand } from "@tanstack/charts/scales/band";
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
  { goal: "Ship the mobile app", current: 9, target: 11, unit: "features" },
  { goal: "Hire six engineers", current: 4, target: 6, unit: "hires" },
  { goal: "Close 40 enterprise deals", current: 29, target: 40, unit: "deals" },
].map((row) => ({
  ...row,
  complete: Math.round((row.current / row.target) * 100),
}));

const series = rows.map((row, index) => ({
  label: `${row.goal}, ${row.complete}%`,
  color: `var(--ts-chart-${index + 1})`,
}));

const layout = {
  radiusRatio: 0.92,
  startAngle: -Math.PI * 0.75,
  endAngle: Math.PI * 0.75,
  scales: {
    angle: { scale: scaleLinear().domain([0, 100]) },
    radius: {
      scale: () => scaleBand<string>().padding(0.24),
      range: [
        ({ radius }: { radius: number }) => radius * 0.42,
        ({ radius }: { radius: number }) => radius,
      ] as const,
    },
  },
};

const definition = defineChart({
  marks: [
    decorative(
      polar({
        ...layout,
        marks: [
          radialBarAngle(rows, {
            radius: "goal",
            angle: () => 100,
            fill: "var(--muted)",
            key: "goal",
            cornerRadius: "full",
          }),
        ],
      }),
    ),
    polar({
      ...layout,
      marks: [
        radialBarAngle(rows, {
          radius: "goal",
          angle: "complete",
          color: "goal",
          key: "goal",
          cornerRadius: "full",
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: rows.map((row) => row.goal),
    range: series.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.goal,
      rows: [
        {
          label: "Complete",
          value: `${point.datum.complete}%`,
          color: point.color,
        },
        {
          label: "Progress",
          value: `${point.datum.current} of ${point.datum.target} ${point.datum.unit}`,
        },
      ],
    }),
  },
});

export function ChartRadialRings() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Q4 goals</ChartTitle>
        <ChartDescription>Progress to each target, in percent</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Progress to three fourth-quarter goals, in percent"
      />
      <ChartLegend>
        {series.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Progress to fourth-quarter goals"
        columns={["Goal", "Progress", "Complete (%)"]}
        rows={rows.map((row) => [
          row.goal,
          `${row.current} of ${row.target} ${row.unit}`,
          row.complete,
        ])}
      />
    </ChartFrame>
  );
}
