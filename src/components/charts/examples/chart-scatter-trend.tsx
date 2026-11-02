"use client";

import { defineChart, dot, linearRegressionY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const rows = [
  { week: "2026-07-06", spend: 6.2, signups: 184 },
  { week: "2026-07-13", spend: 8.9, signups: 236 },
  { week: "2026-07-20", spend: 12.4, signups: 229 },
  { week: "2026-07-27", spend: 14.8, signups: 347 },
  { week: "2026-08-03", spend: 17.5, signups: 318 },
  { week: "2026-08-10", spend: 21.3, signups: 412 },
  { week: "2026-08-17", spend: 23.6, signups: 386 },
  { week: "2026-08-24", spend: 27.1, signups: 503 },
  { week: "2026-08-31", spend: 30.4, signups: 462 },
  { week: "2026-09-07", spend: 33.8, signups: 571 },
  { week: "2026-09-14", spend: 37.9, signups: 604 },
  { week: "2026-09-21", spend: 41.6, signups: 588 },
];

const weekFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const formatWeek = (week: string) =>
  `Week of ${weekFormat.format(new Date(week))}`;
const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;
const formatCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
}).format;

const definition = defineChart({
  marks: [
    decorative(
      linearRegressionY(rows, {
        x: "spend",
        y: "signups",
        stroke: "var(--ts-chart-3)",
        strokeWidth: 2,
        fillOpacity: 0.14,
      }),
    ),
    dot(rows, {
      x: "spend",
      y: "signups",
      key: "week",
      r: 4.5,
      fill: "var(--ts-chart-1)",
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 45]),
      grid: true,
      axis: {
        label: "Ad spend",
        ticks: {
          count: 5,
          format: (value: number) => formatCompact(value * 1000),
        },
      },
    },
    y: {
      scale: scaleLinear().domain([0, 700]),
      grid: true,
      axis: { label: "Signups" },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: formatWeek(point.datum.week),
      rows: [
        {
          label: "Signups",
          value: `${point.datum.signups}`,
          color: point.color,
        },
        { label: "Ad spend", value: formatMoney(point.datum.spend * 1000) },
        {
          label: "Cost per signup",
          value: formatMoney((point.datum.spend * 1000) / point.datum.signups),
        },
      ],
    }),
  },
});

export function ChartScatterTrend() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Ad spend and signups</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Weekly signups against ad spend for 12 weeks, with a rising linear trend line"
      />
      <ChartLegend>
        <ChartLegendItem color="var(--ts-chart-1)">Week</ChartLegendItem>
        <ChartLegendItem color="var(--ts-chart-3)" swatch="line">
          Trend, 95% band
        </ChartLegendItem>
      </ChartLegend>
      <ChartTable
        caption="Weekly ad spend and signups"
        columns={["Week", "Ad spend", "Signups"]}
        rows={rows.map((row) => [
          formatWeek(row.week),
          formatMoney(row.spend * 1000),
          row.signups,
        ])}
      />
    </ChartFrame>
  );
}
