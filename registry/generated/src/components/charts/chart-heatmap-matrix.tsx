"use client";

import { cell, defineChart, text } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleBand } from "@tanstack/charts/scales/band";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "../vip-ui/chart";

const cohorts = [
  { cohort: "2026-04", signups: 1240, retained: [64, 52, 47, 44, 42] },
  { cohort: "2026-05", signups: 1385, retained: [66, 54, 49, 45] },
  { cohort: "2026-06", signups: 1312, retained: [63, 51, 46] },
  { cohort: "2026-07", signups: 1478, retained: [68, 56] },
  { cohort: "2026-08", signups: 1590, retained: [70] },
];

const months = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5"];

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
const formatCohort = (cohort: string) => monthFormat.format(new Date(cohort));

const rows = cohorts.flatMap(({ cohort, signups, retained }) =>
  retained.map((percent, index) => ({
    cohort: formatCohort(cohort),
    month: months[index],
    percent,
    users: Math.round((signups * percent) / 100),
  })),
);

const levels = [
  {
    label: "Below 45%",
    min: 0,
    color: "color-mix(in oklab, var(--ts-chart-1) 14%, var(--muted))",
    text: "var(--foreground)",
  },
  {
    label: "45–54%",
    min: 45,
    color: "color-mix(in oklab, var(--ts-chart-1) 36%, var(--muted))",
    text: "var(--foreground)",
  },
  {
    label: "55–64%",
    min: 55,
    color: "color-mix(in oklab, var(--ts-chart-1) 70%, var(--muted))",
    text: "var(--card)",
  },
  {
    label: "65% and above",
    min: 65,
    color: "var(--ts-chart-1)",
    text: "var(--card)",
  },
];

const level = (percent: number) =>
  levels.findLast((item) => percent >= item.min) ?? levels[0];

const definition = defineChart({
  marks: [
    cell(rows, {
      x: "month",
      y: "cohort",
      color: (row) => level(row.percent).label,
      key: (row) => `${row.cohort}-${row.month}`,
      inset: 2,
      radius: 4,
    }),
    decorative(
      text(rows, {
        x: "month",
        y: "cohort",
        text: (row) => `${row.percent}%`,
        fill: (row) => level(row.percent).text,
        fontSize: 12,
        fontWeight: 600,
      }),
    ),
  ],
  scales: {
    x: { scale: () => scaleBand<string>().domain(months) },
    y: {
      scale: () =>
        scaleBand<string>().domain(
          cohorts.map((row) => formatCohort(row.cohort)),
        ),
    },
  },
  color: {
    domain: levels.map((item) => item.label),
    range: levels.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: `${point.datum.cohort} signups, ${point.datum.month.toLowerCase()}`,
      rows: [
        {
          label: "Still active",
          value: `${point.datum.percent}%`,
          color: point.color,
        },
        { label: "Users", value: point.datum.users.toLocaleString("en-US") },
      ],
    }),
  },
});

export function ChartHeatmapMatrix() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Retention by signup month</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Cohort retention for users who signed up from April to August 2026, in percent, for each month after signup"
      />
      <ChartLegend>
        {levels.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Users still active, in percent, by signup month"
        columns={["Signup month", "Signups", ...months]}
        rows={cohorts.map((row) => [
          formatCohort(row.cohort),
          row.signups,
          ...months.map((_, index) => row.retained[index] ?? ""),
        ])}
      />
    </ChartFrame>
  );
}
