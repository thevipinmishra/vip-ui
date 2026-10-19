"use client";

import { cell, defineChart } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
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

const firstMonday = Date.UTC(2026, 6, 27);
const oneDay = 24 * 60 * 60 * 1000;

const deploysPerDay = [
  7, 6, 8, 7, 7, 0, 0, 5, 3, 6, 2, 2, 0, 2, 1, 6, 1, 6, 4, 0, 0, 4, 6, 4, 7, 3,
  2, 0, 0, 8, 5, 1, 3, 0, 1, 2, 6, 7, 4, 2, 2, 1, 5, 5, 3, 5, 2, 0, 0, 3, 1, 5,
  5, 1, 1, 1, 6, 4, 7, 5, 4, 1, 1, 5, 5, 5, 3, 3, 2, 1, 2, 7, 1, 3, 4, 1, 1, 4,
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const isoDate = (time: number) => new Date(time).toISOString().slice(0, 10);

const rows = deploysPerDay.map((deploys, index) => ({
  date: isoDate(firstMonday + index * oneDay),
  week: isoDate(firstMonday + Math.floor(index / 7) * 7 * oneDay),
  day: days[index % 7],
  deploys,
}));

const weeks = [...new Set(rows.map((row) => row.week))];
const total = deploysPerDay.reduce((sum, deploys) => sum + deploys, 0);

const levels = [
  { label: "0", max: 0, color: "var(--muted)" },
  {
    label: "1–2",
    max: 2,
    color: "color-mix(in oklch, var(--ts-chart-2) 30%, var(--muted))",
  },
  {
    label: "3–4",
    max: 4,
    color: "color-mix(in oklch, var(--ts-chart-2) 55%, var(--muted))",
  },
  {
    label: "5–6",
    max: 6,
    color: "color-mix(in oklch, var(--ts-chart-2) 80%, var(--muted))",
  },
  { label: "7+", max: Number.POSITIVE_INFINITY, color: "var(--ts-chart-2)" },
];

const level = (deploys: number) =>
  levels.find((item) => deploys <= item.max)?.label ?? "0";

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const weekFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const monthStarts = weeks.filter((week) => new Date(week).getUTCDate() <= 7);

const definition = defineChart({
  marks: [
    cell(rows, {
      x: "week",
      y: "day",
      color: (row) => level(row.deploys),
      key: "date",
      inset: 1.5,
      radius: 3,
    }),
  ],
  scales: {
    x: {
      scale: () => scaleBand<string>().domain(weeks),
      axis: {
        ticks: {
          values: monthStarts,
          format: (week: string) => monthFormat.format(new Date(week)),
        },
      },
    },
    y: { scale: () => scaleBand<string>().domain(days) },
  },
  color: {
    domain: levels.map((item) => item.label),
    range: levels.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: dateFormat.format(new Date(point.datum.date)),
      rows: [
        {
          label: "Deploys",
          value: `${point.datum.deploys}`,
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartHeatmapCalendar() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Deploys</ChartTitle>
        <ChartDescription>
          {total} production deploys in the last {weeks.length} weeks
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel={`Calendar heatmap of production deploys per day for the last ${weeks.length} weeks`}
      />
      <ChartLegend>
        {levels.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Production deploys per day"
        columns={["Week of", ...days]}
        rows={weeks.map((week) => [
          weekFormat.format(new Date(week)),
          ...days.map(
            (day) =>
              rows.find((row) => row.week === week && row.day === day)
                ?.deploys ?? "",
          ),
        ])}
      />
    </ChartFrame>
  );
}
