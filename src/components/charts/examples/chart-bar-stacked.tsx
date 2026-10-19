"use client";

import { barY, defineChart, stack } from "@tanstack/charts";
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

const days = [
  { date: "2026-09-29", urgent: 3, high: 14, normal: 46 },
  { date: "2026-09-30", urgent: 2, high: 12, normal: 51 },
  { date: "2026-10-01", urgent: 5, high: 16, normal: 48 },
  { date: "2026-10-02", urgent: 2, high: 11, normal: 39 },
  { date: "2026-10-03", urgent: 1, high: 3, normal: 11 },
  { date: "2026-10-04", urgent: 0, high: 2, normal: 8 },
  { date: "2026-10-05", urgent: 4, high: 15, normal: 55 },
  { date: "2026-10-06", urgent: 6, high: 18, normal: 49 },
  { date: "2026-10-07", urgent: 3, high: 13, normal: 47 },
  { date: "2026-10-08", urgent: 2, high: 12, normal: 44 },
  { date: "2026-10-09", urgent: 1, high: 10, normal: 41 },
  { date: "2026-10-10", urgent: 0, high: 4, normal: 12 },
  { date: "2026-10-11", urgent: 1, high: 2, normal: 9 },
  { date: "2026-10-12", urgent: 3, high: 14, normal: 52 },
];

const priorities = [
  { key: "urgent", label: "Urgent", color: "var(--ts-chart-5)" },
  { key: "high", label: "High", color: "var(--ts-chart-3)" },
  { key: "normal", label: "Normal", color: "var(--ts-chart-1)" },
] as const;

const rows = days.flatMap((day) =>
  priorities.map((priority) => ({
    date: day.date,
    priority: priority.label,
    tickets: day[priority.key],
  })),
);

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const weekdayFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const formatDay = (date: string) => dayFormat.format(new Date(date));
const formatWeekday = (date: string) => weekdayFormat.format(new Date(date));

const ticks = days
  .filter((_, index) => (days.length - 1 - index) % 2 === 0)
  .map((day) => day.date);

const definition = defineChart({
  marks: [
    barY(rows, {
      x: "date",
      y: "tickets",
      z: "priority",
      color: "priority",
      layout: stack(),
      inset: 2,
      radius: { end: 3, stack: "outer" },
    }),
  ],
  scales: {
    x: {
      scale: () => scaleBand().padding(0.15),
      axis: { ticks: { values: ticks, format: formatDay } },
    },
    y: {
      scale: scaleLinear().domain([0, 80]),
      grid: true,
      axis: { ticks: { count: 4 } },
    },
  },
  color: {
    domain: priorities.map((priority) => priority.label),
    range: priorities.map((priority) => priority.color),
  },
  focus: "group-x",
  tooltip: {
    use: tooltip,
    sort: "color-domain",
    content: (points, { primaryPoint }) => ({
      title: formatWeekday(points[0].datum.date),
      rows: points.map((point) => ({
        label: point.groupLabel,
        value: `${point.datum.tickets}`,
        color: point.color,
        active: point === primaryPoint,
      })),
    }),
  },
});

export function ChartBarStacked() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>New tickets</ChartTitle>
        <ChartDescription>By priority, last 14 days</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="New support tickets per day by priority for the last 14 days, stacked"
      />
      <ChartLegend>
        {priorities.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="New support tickets per day, by priority"
        columns={["Date", ...priorities.map((priority) => priority.label)]}
        rows={days.map((day) => [
          formatDay(day.date),
          ...priorities.map((priority) => day[priority.key]),
        ])}
      />
    </ChartFrame>
  );
}
