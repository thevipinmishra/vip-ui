"use client";

import { defineChart, dot } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { contour } from "@tanstack/charts/spatial/contour";
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

const floor = { width: 40, depth: 24 };
const columns = 41;
const rowCount = 25;

const accessPoints = [
  { name: "Lobby", x: 7, y: 6, power: -31 },
  { name: "Open office", x: 22, y: 15, power: -30 },
  { name: "Meeting rooms", x: 34, y: 5, power: -33 },
];

const signalAt = (x: number, y: number) =>
  Math.max(
    ...accessPoints.map(
      (point) =>
        point.power -
        20 * Math.log10(Math.max(1, Math.hypot(point.x - x, point.y - y))),
    ),
  );

const grid = Array.from({ length: columns * rowCount }, (_, index) => ({
  signal: signalAt(
    ((index % columns) / (columns - 1)) * floor.width,
    (Math.floor(index / columns) / (rowCount - 1)) * floor.depth,
  ),
}));

const levels = [
  {
    label: "Weak",
    min: -60,
    color: "color-mix(in oklab, var(--ts-chart-2) 22%, var(--card))",
  },
  {
    label: "Fair",
    min: -56,
    color: "color-mix(in oklab, var(--ts-chart-2) 45%, var(--card))",
  },
  {
    label: "Good",
    min: -52,
    color: "color-mix(in oklab, var(--ts-chart-2) 70%, var(--card))",
  },
  { label: "Strong", min: -48, color: "var(--ts-chart-2)" },
];

const levelFor = (signal: number) =>
  levels.findLast((level) => signal >= level.min)?.label ?? "No signal";

const share = (label: string) => {
  const cells = grid.filter((cell) => levelFor(cell.signal) === label).length;
  return `${Math.round((cells / grid.length) * 100)}%`;
};

const definition = defineChart({
  marks: [
    contour(grid, {
      width: columns,
      height: rowCount,
      value: "signal",
      thresholds: levels.map((level) => level.min),
      color: (level) => levelFor(level.value),
    }),
    dot(accessPoints, {
      x: "x",
      y: "y",
      key: "name",
      r: 5,
      fill: "var(--ts-chart-1)",
      stroke: "var(--card)",
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, floor.width]),
      axis: { ticks: { count: 4, format: (value: number) => `${value} m` } },
    },
    y: {
      scale: scaleLinear().domain([0, floor.depth]),
      axis: { ticks: { count: 3, format: (value: number) => `${value} m` } },
    },
  },
  color: {
    domain: levels.map((level) => level.label),
    range: levels.map((level) => level.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.name,
      rows: [
        {
          label: "Access point",
          value: `${point.datum.x} m, ${point.datum.y} m`,
        },
      ],
    }),
  },
});

export function ChartContour() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Wi-Fi coverage</ChartTitle>
        <ChartDescription>Signal strength on the second floor</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Wi-Fi signal strength across a 40 by 24 meter floor with three access points"
      />
      <ChartLegend>
        {levels.map((level) => (
          <ChartLegendItem key={level.label} color={level.color}>
            {level.label}
          </ChartLegendItem>
        ))}
        <ChartLegendItem color="var(--ts-chart-1)">
          Access point
        </ChartLegendItem>
      </ChartLegend>
      <ChartTable
        caption="Share of the floor at each signal level"
        columns={["Level", "Minimum signal", "Floor share"]}
        rows={levels.map((level) => [
          level.label,
          `${level.min} dBm`,
          share(level.label),
        ])}
      />
    </ChartFrame>
  );
}
