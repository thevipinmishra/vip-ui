"use client";

import { barX, barY, defineChart, stack } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react/core";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  ChartPlot,
  galleryRenderer,
  groupTooltip,
  valueTooltip,
} from "./chart-plot";

const orders = [
  { month: "Jan", value: 124 },
  { month: "Feb", value: 158 },
  { month: "Mar", value: 142 },
  { month: "Apr", value: 186 },
  { month: "May", value: 211 },
  { month: "Jun", value: 235 },
];
const ordersChart = defineChart({
  marks: [
    barY(orders, {
      x: "month",
      y: "value",
      fill: "var(--ts-chart-1)",
      inset: 5,
      radius: { end: 5 },
    }),
  ],
  scales: {
    x: { scale: () => scaleBand().padding(0.1) },
    y: { scale: scaleLinear, domain: [0, 260], grid: true },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) =>
      valueTooltip(
        point.datum.month,
        "Orders",
        `${point.datum.value} orders`,
        point.color,
      ),
  },
});

const regions = [
  { region: "North", value: 83 },
  { region: "West", value: 67 },
  { region: "East", value: 52 },
  { region: "South", value: 38 },
];
const regionsChart = defineChart({
  marks: [
    barX(regions, {
      x: "value",
      y: "region",
      fill: "var(--ts-chart-2)",
      inset: 7,
      radius: { end: 5 },
    }),
  ],
  scales: {
    x: { scale: scaleLinear, domain: [0, 100], grid: true },
    y: { scale: () => scaleBand().padding(0.1) },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) =>
      valueTooltip(
        point.datum.region,
        "Active projects",
        `${point.datum.value} projects`,
        point.color,
      ),
  },
});

const requests = [
  { day: "Mon", resolved: 28, pending: 8 },
  { day: "Tue", resolved: 32, pending: 11 },
  { day: "Wed", resolved: 29, pending: 6 },
  { day: "Thu", resolved: 36, pending: 10 },
  { day: "Fri", resolved: 41, pending: 7 },
];
const requestRows = requests.flatMap(({ day, resolved, pending }) => [
  { day, series: "Resolved", value: resolved },
  { day, series: "Pending", value: pending },
]);
const requestsChart = defineChart({
  marks: [
    barY(requestRows, {
      x: "day",
      y: "value",
      z: "series",
      color: "series",
      layout: stack(),
      inset: 6,
      radius: { end: 4, stack: "outer" },
    }),
  ],
  scales: {
    x: { scale: () => scaleBand().padding(0.1) },
    y: { scale: scaleLinear, domain: [0, 55], grid: true },
  },
  color: {
    domain: ["Resolved", "Pending"],
    range: ["var(--ts-chart-1)", "var(--ts-chart-4)"],
  },
  focus: "group-x",
  tooltip: {
    use: tooltip,
    sort: "color-domain",
    content: (points, { primaryPoint }) =>
      groupTooltip<(typeof requestRows)[number]>(
        points[0].datum.day,
        points,
        (row) => `${row.value} requests`,
        primaryPoint,
      ),
  },
});

export function BarOrders() {
  return (
    <ChartPlot
      title="Orders by month"
      columns={["Month", "Orders"]}
      rows={orders.map((r) => [r.month, r.value])}
    >
      <Chart
        definition={ordersChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Monthly orders from January to June"
      />
    </ChartPlot>
  );
}
export function BarHorizontal() {
  return (
    <ChartPlot
      title="Active projects by region"
      columns={["Region", "Projects"]}
      rows={regions.map((r) => [r.region, r.value])}
    >
      <Chart
        definition={regionsChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Active projects across North, West, East and South regions"
      />
    </ChartPlot>
  );
}
export function BarStacked() {
  return (
    <ChartPlot
      title="Resolved and pending requests by weekday"
      columns={["Day", "Resolved", "Pending"]}
      rows={requests.map((r) => [r.day, r.resolved, r.pending])}
      legend={[
        { label: "Resolved", color: "var(--ts-chart-1)" },
        { label: "Pending", color: "var(--ts-chart-4)" },
      ]}
    >
      <Chart
        definition={requestsChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Daily resolved and pending support requests, Monday to Friday"
      />
    </ChartPlot>
  );
}
