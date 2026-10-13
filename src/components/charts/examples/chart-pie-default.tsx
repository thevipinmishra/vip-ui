"use client";

import { defineChart } from "@tanstack/charts";
import { pie, polar, radialArc } from "@tanstack/charts/polar";
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

const rows = [
  { browser: "Chrome", visitors: 31840 },
  { browser: "Safari", visitors: 11920 },
  { browser: "Edge", visitors: 3610 },
  { browser: "Firefox", visitors: 1880 },
  { browser: "Other", visitors: 1117 },
];

const total = rows.reduce((sum, row) => sum + row.visitors, 0);

const series = rows.map((row, index) => ({
  label: row.browser,
  color: `var(--ts-chart-${index + 1})`,
}));

const formatShare = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
}).format;

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.8,
      marks: [
        radialArc(pie(rows, { value: "visitors", gapAngle: 0.02 }), {
          color: "browser",
          key: "browser",
          stroke: "var(--card)",
          strokeWidth: 2,
        }),
      ],
      scales: { angle: null, radius: null },
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
      title: point.datum.browser,
      rows: [
        {
          label: "Visitors",
          value: point.datum.visitors.toLocaleString("en-US"),
          color: point.color,
        },
        { label: "Share", value: formatShare(point.datum.visitors / total) },
      ],
    }),
  },
});

export function ChartPieDefault() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Browsers</ChartTitle>
        <ChartDescription>Visitors by browser, last 30 days</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Share of visitors by browser for the last 30 days: Chrome, Safari, Edge, Firefox and other"
      />
      <ChartLegend items={series} />
      <ChartTable
        caption="Visitors by browser, last 30 days"
        columns={["Browser", "Visitors", "Share"]}
        rows={rows.map((row) => [
          row.browser,
          row.visitors,
          formatShare(row.visitors / total),
        ])}
      />
    </ChartFrame>
  );
}
