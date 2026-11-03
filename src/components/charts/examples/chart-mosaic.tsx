"use client";

import { defineChart, groupBy, mosaicY, rect } from "@tanstack/charts";
import { colorLegend } from "@tanstack/charts/legend";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const questions = ["Onboarding", "Docs", "Support", "Pricing"];
const levels = [
  { label: "Disagree", color: "var(--ts-chart-5)" },
  { label: "Neutral", color: "var(--muted-foreground)" },
  { label: "Agree", color: "var(--ts-chart-2)" },
  { label: "Strongly agree", color: "var(--ts-chart-1)" },
];

const tallies: Record<string, number[]> = {
  Onboarding: [6, 9, 15, 10],
  Docs: [3, 6, 12, 21],
  Support: [8, 7, 10, 5],
  Pricing: [12, 8, 5, 3],
};

const responses = questions.flatMap((question) =>
  levels.flatMap((level, levelIndex) =>
    Array.from({ length: tallies[question][levelIndex] }, (_, index) => ({
      id: `${question}-${level.label}-${index}`,
      question,
      response: level.label,
    })),
  ),
);

const counts = groupBy(responses, {
  by: { question: "question", response: "response" },
  outputs: { count: { reduce: "count" } },
});

const cells = mosaicY(counts, {
  x: "question",
  y: "response",
  value: "count",
  yOrder: levels.map((level) => level.label),
});

const formatPercent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 0,
}).format;

const definition = defineChart({
  marks: [
    rect(cells, {
      x: "x",
      x1: "x1",
      x2: "x2",
      y: "y",
      y1: "y1",
      y2: "y2",
      color: "yValue",
      inset: 1,
      radius: 2,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 1]),
      axis: { ticks: { count: 5, format: formatPercent } },
    },
    y: {
      scale: scaleLinear().domain([0, 1]),
      axis: { ticks: { count: 3, format: formatPercent } },
    },
  },
  color: {
    domain: levels.map((level) => level.label),
    range: levels.map((level) => level.color),
    legend: colorLegend({ placement: "bottom" }),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: `${point.datum.question} · ${point.datum.response}`,
      rows: [
        {
          label: "Share of answers",
          value: formatPercent(point.datum.value / point.datum.total),
          color: point.color,
        },
        { label: "Responses", value: `${point.datum.value}` },
      ],
    }),
  },
});

export function ChartMosaic() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Survey sentiment</ChartTitle>
        <ChartDescription>
          Column width shows how many people answered.
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={280}
        initialWidth={520}
        ariaLabel="Mosaic chart of survey answers for onboarding, docs, support and pricing. Docs has the most strong agreement; pricing has the most disagreement."
      />
      <ChartTable
        caption="Survey answers by topic"
        columns={["Topic", ...levels.map((level) => level.label)]}
        rows={questions.map((question) => [
          question,
          ...tallies[question].map((count) => count),
        ])}
      />
    </ChartFrame>
  );
}
