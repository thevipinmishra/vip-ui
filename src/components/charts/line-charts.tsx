"use client";

import { defineChart, dot, lineY, ruleY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { Chart } from "@tanstack/charts/react/core";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { ChartPlot, galleryRenderer } from "./chart-plot";

const response = [
  { week: "W1", minutes: 44 },
  { week: "W2", minutes: 40 },
  { week: "W3", minutes: 42 },
  { week: "W4", minutes: 34 },
  { week: "W5", minutes: 31 },
  { week: "W6", minutes: 25 },
];
const responseChart = defineChart({
  marks: [
    lineY(response, {
      x: "week",
      y: "minutes",
      stroke: "var(--ts-chart-1)",
      strokeWidth: 2.5,
    }),
  ],
  scales: {
    x: { scale: scalePoint },
    y: { scale: scaleLinear, domain: [0, 55], grid: true },
  },
  tooltip,
});

const retention = [
  { week: "W1", free: 80, pro: 90 },
  { week: "W2", free: 72, pro: 87 },
  { week: "W3", free: 67, pro: 84 },
  { week: "W4", free: 60, pro: 81 },
  { week: "W5", free: 57, pro: 78 },
  { week: "W6", free: 52, pro: 75 },
];
const retentionRows = retention.flatMap(({ week, free, pro }) => [
  { week, series: "Free", percent: free },
  { week, series: "Pro", percent: pro },
]);
const retentionChart = defineChart({
  marks: [
    lineY(retentionRows, {
      x: "week",
      y: "percent",
      z: "series",
      color: "series",
      strokeWidth: 2.5,
    }),
  ],
  scales: {
    x: { scale: scalePoint },
    y: { scale: scaleLinear, domain: [0, 100], grid: true },
  },
  color: {
    domain: ["Free", "Pro"],
    range: ["var(--ts-chart-1)", "var(--ts-chart-3)"],
  },
  focus: "group-x",
  tooltip,
});

const uptime = [
  { day: "Mon", value: 98 },
  { day: "Tue", value: 97 },
  { day: "Wed", value: 99 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 98 },
  { day: "Sat", value: 99 },
];
const uptimeChart = defineChart({
  marks: [
    decorative(
      ruleY([97], { stroke: "var(--ts-chart-5)", strokeDasharray: "4 4" }),
    ),
    decorative(
      lineY(uptime, {
        x: "day",
        y: "value",
        stroke: "var(--ts-chart-2)",
        strokeWidth: 2,
      }),
    ),
    dot(uptime, { x: "day", y: "value", fill: "var(--ts-chart-2)", r: 4 }),
  ],
  scales: {
    x: { scale: scalePoint },
    y: { scale: scaleLinear, domain: [90, 100], grid: true },
  },
  tooltip,
});

export function LineResponse() {
  return (
    <ChartPlot
      title="Median response time, in minutes"
      columns={["Week", "Minutes"]}
      rows={response.map((r) => [r.week, r.minutes])}
    >
      <Chart
        definition={responseChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Median response time across six weeks, in minutes"
      />
    </ChartPlot>
  );
}
export function LineComparison() {
  return (
    <ChartPlot
      title="Free and Pro retention, in percent"
      columns={["Week", "Free (%)", "Pro (%)"]}
      rows={retention.map((r) => [r.week, r.free, r.pro])}
      legend={[
        { label: "Free", color: "var(--ts-chart-1)" },
        { label: "Pro", color: "var(--ts-chart-3)" },
      ]}
    >
      <Chart
        definition={retentionChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Free and Pro user retention over six weeks, in percent"
      />
    </ChartPlot>
  );
}
export function LineTarget() {
  return (
    <ChartPlot
      title="Daily uptime and 97 percent target"
      columns={["Day", "Uptime (%)"]}
      rows={uptime.map((r) => [r.day, r.value])}
    >
      <Chart
        definition={uptimeChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Daily uptime Monday to Saturday in percent, with 97 percent target"
      />
    </ChartPlot>
  );
}
