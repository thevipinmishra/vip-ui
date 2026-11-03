"use client";

import { defineChart } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import {
  polar,
  radialArc,
  radialRule,
  radialText,
} from "@tanstack/charts/polar";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "@/components/ui/chart";

const score = 68;
const startAngle = -Math.PI * 0.75;
const endAngle = Math.PI * 0.75;
const angleOf = (value: number) =>
  startAngle + (value / 100) * (endAngle - startAngle);

const zones = [
  { id: "poor", label: "Poor", from: 0, to: 50, color: "var(--ts-chart-5)" },
  { id: "fair", label: "Fair", from: 50, to: 75, color: "var(--ts-chart-3)" },
  { id: "good", label: "Good", from: 75, to: 100, color: "var(--ts-chart-2)" },
];

const zoneOf = (value: number) =>
  zones.find((zone) => value >= zone.from && value < zone.to) ??
  zones[zones.length - 1];

const arcs = zones.map((zone) => ({
  ...zone,
  startAngle: angleOf(zone.from),
  endAngle: angleOf(zone.to),
}));

const reading = [{ id: "score", score, startAngle, endAngle: angleOf(score) }];
const ticks = [0, 25, 50, 75, 100].map((value) => ({ id: value, value }));

const layout = {
  startAngle,
  endAngle,
  radiusRatio: 0.92,
  scales: {
    angle: { scale: scaleLinear().domain([0, 100]) },
    radius: { scale: scaleLinear().domain([0, 1]) },
  },
};

const definition = defineChart({
  marks: [
    decorative(
      polar({
        ...layout,
        marks: [
          radialArc(arcs, {
            key: "id",
            innerRadius: ({ radius }) => radius * 0.84,
            outerRadius: ({ radius }) => radius * 0.9,
            fill: (zone) => zone.color,
            fillOpacity: 0.35,
            padAngle: () => 0.02,
          }),
          radialText(ticks, {
            angle: "value",
            radius: () => 1,
            text: "value",
            radiusOffset: 4,
            anchor: "outside",
            fill: "var(--muted-foreground)",
            fontSize: 10,
          }),
          radialRule([score], {
            angle: (value) => value,
            radius1: 0,
            radius2: 0.74,
            stroke: "var(--foreground)",
            strokeWidth: 2.5,
          }),
          radialText([{ id: "center", score }], {
            angle: () => 0,
            radius: () => 0,
            text: (row) => `${row.score}`,
            dy: 30,
            fill: "var(--foreground)",
            fontSize: 26,
            fontWeight: 600,
          }),
        ],
      }),
    ),
    polar({
      startAngle,
      endAngle,
      radiusRatio: layout.radiusRatio,
      scales: { angle: null, radius: null },
      marks: [
        radialArc(reading, {
          key: "id",
          innerRadius: ({ radius }) => radius * 0.66,
          outerRadius: ({ radius }) => radius * 0.8,
          cornerRadius: 4,
          fill: zoneOf(score).color,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: "Health score",
      rows: [
        {
          label: "Score",
          value: `${point.datum.score} / 100`,
          color: point.color,
        },
        { label: "Rating", value: zoneOf(point.datum.score).label },
      ],
    }),
  },
});

export function ChartRadialGauge() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Account health</ChartTitle>
        <ChartValue>{zoneOf(score).label}</ChartValue>
      </ChartCaption>
      <Chart
        definition={definition}
        height={260}
        initialWidth={520}
        ariaLabel={`Gauge showing a health score of ${score} out of 100, in the ${zoneOf(score).label.toLowerCase()} range`}
      />
      <ChartTable
        caption="Health score ranges"
        columns={["Range", "From", "To", "Current"]}
        rows={zones.map((zone) => [
          zone.label,
          zone.from,
          zone.to,
          zoneOf(score).id === zone.id ? score : "—",
        ])}
      />
    </ChartFrame>
  );
}
