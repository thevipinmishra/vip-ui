"use client";

import { defineChart } from "@tanstack/charts";
import { geoShape } from "@tanstack/charts/geo";
import { colorLegend } from "@tanstack/charts/legend";
import { tooltip } from "@tanstack/charts/tooltip";
import { geoIdentity } from "d3-geo";
import { scaleThreshold } from "d3-scale";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const room = (
  id: string,
  name: string,
  occupancy: number,
  [x1, y1, x2, y2]: readonly [number, number, number, number],
) => ({
  type: "Feature" as const,
  id,
  properties: { name, occupancy },
  geometry: {
    type: "Polygon" as const,
    coordinates: [
      [
        [x1, y1],
        [x2, y1],
        [x2, y2],
        [x1, y2],
        [x1, y1],
      ],
    ],
  },
});

const rooms = [
  room("lobby", "Lobby", 34, [0, 0, 40, 30]),
  room("focus", "Focus room", 92, [40, 0, 60, 30]),
  room("studio", "Studio", 71, [60, 0, 100, 30]),
  room("open", "Open desks", 83, [0, 30, 60, 60]),
  room("board", "Boardroom", 58, [60, 30, 100, 45]),
  room("cafe", "Café", 47, [60, 45, 100, 60]),
];

const plan = { type: "FeatureCollection" as const, features: rooms };

const levels = [
  {
    label: "Under 50%",
    color: "color-mix(in oklab, var(--ts-chart-2) 30%, var(--card))",
  },
  {
    label: "50–75%",
    color: "color-mix(in oklab, var(--ts-chart-2) 60%, var(--card))",
  },
  { label: "75–90%", color: "var(--ts-chart-2)" },
  { label: "Over 90%", color: "var(--ts-chart-5)" },
];

const formatPercent = (value: number) => `${value}%`;

const definition = defineChart({
  marks: [
    geoShape(rooms, {
      key: (feature) => feature.id,
      projection: { type: geoIdentity, fit: plan, inset: 4 },
      color: (feature) => feature.properties.occupancy,
      stroke: "var(--card)",
      strokeWidth: 3,
    }),
  ],
  scales: { x: null, y: null },
  color: {
    scale: scaleThreshold<number, string>()
      .domain([50, 75, 90])
      .range(levels.map((level) => level.color)),
    legend: colorLegend({
      label: "Occupancy",
      placement: "bottom",
      format: formatPercent,
    }),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.properties.name,
      rows: [
        {
          label: "Occupancy",
          value: formatPercent(point.datum.properties.occupancy),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartGeo() {
  const busiest = [...rooms].sort(
    (a, b) => b.properties.occupancy - a.properties.occupancy,
  )[0];
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Floor occupancy</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={280}
        initialWidth={520}
        ariaLabel={`Floor plan of six rooms colored by occupancy. ${busiest.properties.name} is busiest at ${formatPercent(busiest.properties.occupancy)}.`}
      />
      <ChartTable
        caption="Room occupancy"
        columns={["Room", "Occupancy"]}
        rows={rooms.map((feature) => [
          feature.properties.name,
          formatPercent(feature.properties.occupancy),
        ])}
      />
    </ChartFrame>
  );
}
