"use client";

import { defineChart, waffleY } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const answers = [
  {
    group: "Promoters",
    scores: "9–10",
    people: 239,
    color: "var(--ts-chart-2)",
  },
  {
    group: "Passives",
    scores: "7–8",
    people: 111,
    color: "var(--muted-foreground)",
  },
  {
    group: "Detractors",
    scores: "0–6",
    people: 62,
    color: "var(--ts-chart-5)",
  },
];

const total = answers.reduce((sum, row) => sum + row.people, 0);

const rows = answers.map((row) => ({
  ...row,
  percent: Math.round((row.people / total) * 100),
}));

const score = rows[0].percent - rows[2].percent;

const series = rows.map((row) => ({ label: row.group, color: row.color }));

const definition = defineChart({
  marks: [
    waffleY(rows, {
      y: "percent",
      color: "group",
      key: "group",
      columns: 20,
      gap: 3,
      radius: 3,
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: series.map((item) => item.label),
    range: series.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: `${point.datum.group}, scores ${point.datum.scores}`,
      rows: [
        {
          label: "Share",
          value: `${point.datum.percent}%`,
          color: point.color,
        },
        { label: "People", value: `${point.datum.people}` },
      ],
    }),
  },
});

export function ChartWaffle() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Net Promoter Score</ChartTitle>
        <span className="text-2xl font-semibold tracking-tight tabular-nums">
          {score > 0 ? `+${score}` : score}
        </span>
        <ChartDescription>
          {total} answers in September. One square is 1% of answers.
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={150}
        initialWidth={520}
        ariaLabel={`Waffle chart of ${total} survey answers: ${rows.map((row) => `${row.percent}% ${row.group.toLowerCase()}`).join(", ")}. Net Promoter Score ${score}.`}
      />
      <ChartLegend items={series} />
      <ChartTable
        caption="Survey answers by group"
        columns={["Group", "Scores", "People", "Share"]}
        rows={rows.map((row) => [
          row.group,
          row.scores,
          row.people,
          `${row.percent}%`,
        ])}
      />
    </ChartFrame>
  );
}
