"use client";

import { defineChart } from "@tanstack/charts";
import { differenceY } from "@tanstack/charts/difference";
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
  ChartValue,
} from "@/components/ui/chart";

const rows = [
  { month: 0, plan: 980_000, actual: 942_000 },
  { month: 1, plan: 1_010_000, actual: 1_048_000 },
  { month: 2, plan: 1_040_000, actual: 1_012_000 },
  { month: 3, plan: 1_070_000, actual: 1_126_000 },
  { month: 4, plan: 1_100_000, actual: 1_084_000 },
  { month: 5, plan: 1_130_000, actual: 1_198_000 },
  { month: 6, plan: 1_160_000, actual: 1_152_000 },
  { month: 7, plan: 1_190_000, actual: 1_246_000 },
  { month: 8, plan: 1_220_000, actual: 1_204_000 },
  { month: 9, plan: 1_250_000, actual: 1_308_000 },
  { month: 10, plan: 1_280_000, actual: 1_262_000 },
  { month: 11, plan: 1_310_000, actual: 1_364_000 },
];

const months = rows.map((row) => row.month);
const latest = rows[rows.length - 1];
const latestVariance = latest.actual - latest.plan;

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const monthYearFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const formatMonth = (month: number) =>
  monthFormat.format(new Date(Date.UTC(2026, month, 1)));
const formatMonthYear = (month: number) =>
  monthYearFormat.format(new Date(Date.UTC(2026, month, 1)));
const formatCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
}).format;
const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;
const formatSignedMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  signDisplay: "always",
}).format;

const definition = defineChart({
  marks: [
    differenceY(rows, {
      x: "month",
      y1: "plan",
      y2: "actual",
      key: "month",
      positiveFill: "var(--ts-chart-2)",
      negativeFill: "var(--ts-chart-5)",
      comparisonStroke: "var(--ts-chart-3)",
      stroke: "var(--ts-chart-1)",
      fillOpacity: 0.22,
      comparisonStrokeDasharray: "4 3",
      strokeWidth: 2,
      comparisonStrokeWidth: 1.5,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 11]),
      axis: {
        ticks: { values: months, format: formatMonth },
        tickLabels: { thin: false },
      },
    },
    y: {
      scale: scaleLinear().domain([900_000, 1_400_000]),
      grid: true,
      axis: {
        label: "Revenue",
        ticks: { count: 4, format: formatCompact },
      },
    },
  },
  focus: "group-x",
  tooltip: {
    use: tooltip,
    content: (points) => {
      const [point] = points;
      const datum = point?.datum;
      const plan = datum && "plan" in datum ? datum.plan : 0;
      const actual = datum && "actual" in datum ? datum.actual : 0;
      const variance = actual - plan;
      return {
        title: formatMonthYear(point?.xValue ?? 0),
        rows: [
          {
            label: "Plan",
            value: formatMoney(plan),
            color: "var(--ts-chart-3)",
          },
          {
            label: "Actual",
            value: formatMoney(actual),
            color: "var(--ts-chart-1)",
          },
          {
            label: "Delta",
            value: formatSignedMoney(variance),
            color: variance >= 0 ? "var(--ts-chart-2)" : "var(--ts-chart-5)",
          },
        ],
      };
    },
  },
});

export function ChartLineDifference() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Revenue vs plan</ChartTitle>
        <ChartValue>{formatSignedMoney(latestVariance)}</ChartValue>
        <ChartDescription>December actual against plan</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Monthly plan and actual revenue for 2026, with shaded areas where actual revenue was above or below plan"
      />
      <ChartLegend>
        <ChartLegendItem color="var(--ts-chart-3)" swatch="dashed">
          Plan
        </ChartLegendItem>
        <ChartLegendItem color="var(--ts-chart-1)" swatch="line">
          Actual
        </ChartLegendItem>
        <ChartLegendItem color="var(--ts-chart-2)">
          Ahead of plan
        </ChartLegendItem>
        <ChartLegendItem color="var(--ts-chart-5)">Behind plan</ChartLegendItem>
      </ChartLegend>
      <ChartTable
        caption="Monthly plan and actual revenue, with variance"
        columns={["Month", "Plan", "Actual", "Delta"]}
        rows={rows.map((row) => [
          formatMonthYear(row.month),
          formatMoney(row.plan),
          formatMoney(row.actual),
          formatSignedMoney(row.actual - row.plan),
        ])}
      />
    </ChartFrame>
  );
}
