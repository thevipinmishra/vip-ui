"use client";

import { barY, defineChart, lineY } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react/core";
import { RendererChart } from "@tanstack/charts/react/tooltip";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  ChartPlot,
  galleryRenderer,
  groupTooltip,
  valueTooltip,
} from "./chart-plot";

const revenue = [
  { month: "Jan", amount: 42 },
  { month: "Feb", amount: 58 },
  { month: "Mar", amount: 51 },
  { month: "Apr", amount: 73 },
  { month: "May", amount: 81 },
  { month: "Jun", amount: 94 },
];
const revenueChart = defineChart({
  marks: [
    barY(revenue, {
      x: "month",
      y: "amount",
      fill: "var(--ts-chart-1)",
      inset: 7,
      radius: { end: 5 },
    }),
  ],
  scales: {
    x: { scale: () => scaleBand().padding(0.1) },
    y: { scale: scaleLinear().domain([0, 110]), grid: true },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) =>
      valueTooltip(
        point.datum.month,
        "Revenue",
        `$${point.datum.amount}k`,
        point.color,
      ),
  },
});

const signups = [
  { week: "W1", organic: 32, paid: 18 },
  { week: "W2", organic: 40, paid: 21 },
  { week: "W3", organic: 39, paid: 26 },
  { week: "W4", organic: 53, paid: 24 },
  { week: "W5", organic: 61, paid: 30 },
  { week: "W6", organic: 66, paid: 34 },
];
const signupRows = signups.flatMap(({ week, organic, paid }) => [
  { week, source: "Organic", value: organic },
  { week, source: "Paid", value: paid },
]);
const signupsChart = defineChart({
  marks: [
    lineY(signupRows, {
      x: "week",
      y: "value",
      z: "source",
      color: "source",
      strokeWidth: 2.5,
    }),
  ],
  scales: {
    x: { scale: scalePoint },
    y: { scale: scaleLinear().domain([0, 80]), grid: true },
  },
  color: {
    domain: ["Organic", "Paid"],
    range: ["var(--ts-chart-1)", "var(--ts-chart-3)"],
  },
  focus: "group-x",
  tooltip: {
    use: tooltip,
    sort: "color-domain",
    content: (points, { primaryPoint }) =>
      groupTooltip<(typeof signupRows)[number]>(
        points[0].datum.week,
        points,
        (row) => `${row.value} signups`,
        primaryPoint,
      ),
  },
});

const conversion = [
  { month: "Jan", rate: 2.4 },
  { month: "Feb", rate: 2.7 },
  { month: "Mar", rate: 2.6 },
  { month: "Apr", rate: 3.1 },
  { month: "May", rate: 3.4 },
  { month: "Jun", rate: 3.8 },
];
const conversionChart = defineChart({
  marks: [
    lineY(conversion, {
      x: "month",
      y: "rate",
      stroke: "var(--ts-chart-2)",
      strokeWidth: 2.5,
      points: true,
    }),
  ],
  scales: {
    x: { scale: scalePoint },
    y: { scale: scaleLinear().domain([0, 5]), grid: true },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) =>
      valueTooltip(
        point.datum.month,
        "Conversion rate",
        `${point.datum.rate}%`,
        point.color,
      ),
  },
});

export function TooltipValue() {
  return (
    <ChartPlot
      title="Revenue by month, in thousands of dollars"
      columns={["Month", "Revenue ($k)"]}
      rows={revenue.map((r) => [r.month, r.amount])}
    >
      <Chart
        definition={revenueChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Monthly revenue January to June, in thousands of dollars; focus a bar to inspect it"
      />
    </ChartPlot>
  );
}
export function TooltipGrouped() {
  return (
    <ChartPlot
      title="Organic and paid signups by week"
      columns={["Week", "Organic", "Paid"]}
      rows={signups.map((r) => [r.week, r.organic, r.paid])}
      legend={[
        { label: "Organic", color: "var(--ts-chart-1)" },
        { label: "Paid", color: "var(--ts-chart-3)" },
      ]}
    >
      <Chart
        definition={signupsChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Organic and paid signups over six weeks; focus a week to compare sources"
      />
    </ChartPlot>
  );
}
export function TooltipCustom() {
  return (
    <ChartPlot
      title="Conversion rate by month, in percent"
      columns={["Month", "Conversion (%)"]}
      rows={conversion.map((r) => [r.month, r.rate])}
    >
      <RendererChart
        definition={conversionChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Monthly conversion rate January to June, in percent; activate a point to pin its tooltip"
        renderTooltipBody={({ defaultBody, pinned }) => (
          <div>
            {defaultBody}
            {pinned && (
              <p className="mt-2 border-t border-border/70 pt-2 text-xs text-muted-foreground">
                Pinned for closer inspection. Press Escape to close.
              </p>
            )}
          </div>
        )}
      />
    </ChartPlot>
  );
}
