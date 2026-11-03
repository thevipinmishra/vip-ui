"use client";

import { areaY, defineChart, stack } from "@tanstack/charts";
import { d3Curve } from "@tanstack/charts/d3/shape";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { curveBasis } from "d3-shape";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const areas = [
  {
    label: "Billing",
    color: "var(--ts-chart-1)",
    values: [42, 45, 51, 48, 44, 40, 38, 41, 47, 53, 58, 61],
  },
  {
    label: "Integrations",
    color: "var(--ts-chart-2)",
    values: [18, 22, 27, 34, 40, 46, 49, 52, 50, 47, 44, 42],
  },
  {
    label: "Reporting",
    color: "var(--ts-chart-3)",
    values: [30, 28, 26, 25, 27, 31, 36, 40, 42, 39, 34, 30],
  },
  {
    label: "Access",
    color: "var(--ts-chart-4)",
    values: [12, 14, 13, 15, 18, 17, 16, 15, 19, 24, 28, 26],
  },
  {
    label: "Mobile",
    color: "var(--ts-chart-5)",
    values: [8, 9, 11, 14, 16, 20, 24, 27, 25, 22, 19, 18],
  },
];

const rows = months.flatMap((month, monthIndex) =>
  areas.map((area) => ({
    month,
    area: area.label,
    tickets: area.values[monthIndex],
  })),
);

const definition = defineChart({
  marks: [
    areaY(rows, {
      x: "month",
      y: "tickets",
      z: "area",
      color: "area",
      layout: stack({ offset: "wiggle", order: "inside-out" }),
      curve: d3Curve(curveBasis),
      fillOpacity: 0.85,
    }),
  ],
  scales: {
    x: { scale: scalePoint },
    y: { scale: scaleLinear, axis: false },
  },
  color: {
    domain: areas.map((area) => area.label),
    range: areas.map((area) => area.color),
  },
  focus: "group-x",
  tooltip: {
    use: tooltip,
    sort: "color-domain",
    content: (points, { primaryPoint }) => ({
      title: points[0].datum.month,
      rows: points.map((point) => ({
        label: point.groupLabel,
        value: `${point.datum.tickets}`,
        color: point.color,
        active: point === primaryPoint,
      })),
    }),
  },
});

export function ChartStreamgraph() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Tickets by product area</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Streamgraph of monthly support tickets across five product areas. Integrations grows through summer and billing rises at year end."
      />
      <ChartLegend>
        {areas.map((area) => (
          <ChartLegendItem key={area.label} color={area.color}>
            {area.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Monthly support tickets by product area"
        columns={["Month", ...areas.map((area) => area.label)]}
        rows={months.map((month, monthIndex) => [
          month,
          ...areas.map((area) => area.values[monthIndex]),
        ])}
      />
    </ChartFrame>
  );
}
