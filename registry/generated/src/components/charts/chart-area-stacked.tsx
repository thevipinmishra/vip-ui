"use client";

import { areaY, defineChart, stack } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
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

const months = [
  {
    month: "2025-10",
    organic: 41200,
    direct: 17800,
    referral: 8200,
    paid: 6400,
  },
  {
    month: "2025-11",
    organic: 43800,
    direct: 18400,
    referral: 9100,
    paid: 9800,
  },
  {
    month: "2025-12",
    organic: 39600,
    direct: 16900,
    referral: 7600,
    paid: 11200,
  },
  {
    month: "2026-01",
    organic: 45100,
    direct: 19200,
    referral: 8800,
    paid: 5100,
  },
  {
    month: "2026-02",
    organic: 47300,
    direct: 19800,
    referral: 9400,
    paid: 5300,
  },
  {
    month: "2026-03",
    organic: 50200,
    direct: 20500,
    referral: 12900,
    paid: 6900,
  },
  {
    month: "2026-04",
    organic: 51800,
    direct: 21100,
    referral: 10100,
    paid: 7200,
  },
  {
    month: "2026-05",
    organic: 53400,
    direct: 21600,
    referral: 10400,
    paid: 7400,
  },
  {
    month: "2026-06",
    organic: 52100,
    direct: 20900,
    referral: 9800,
    paid: 6100,
  },
  {
    month: "2026-07",
    organic: 50900,
    direct: 20200,
    referral: 9500,
    paid: 5800,
  },
  {
    month: "2026-08",
    organic: 54700,
    direct: 22400,
    referral: 10600,
    paid: 8900,
  },
  {
    month: "2026-09",
    organic: 58300,
    direct: 23800,
    referral: 11200,
    paid: 9600,
  },
];

const channels = [
  { key: "organic", label: "Organic search", color: "var(--ts-chart-1)" },
  { key: "direct", label: "Direct", color: "var(--ts-chart-2)" },
  { key: "referral", label: "Referral", color: "var(--ts-chart-3)" },
  { key: "paid", label: "Paid ads", color: "var(--ts-chart-4)" },
] as const;

const rows = months.flatMap((row) =>
  channels.map((channel) => ({
    month: row.month,
    channel: channel.label,
    sessions: row[channel.key],
  })),
);

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const monthYearFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const formatMonth = (month: string) => monthFormat.format(new Date(month));
const formatMonthYear = (month: string) =>
  monthYearFormat.format(new Date(month));
const formatCompact = new Intl.NumberFormat("en-US", {
  notation: "compact",
}).format;
const formatCount = (value: number) => value.toLocaleString("en-US");

const definition = defineChart({
  marks: [
    areaY(rows, {
      x: "month",
      y: "sessions",
      z: "channel",
      color: "channel",
      layout: stack(),
      fillOpacity: 0.85,
    }),
  ],
  scales: {
    x: { scale: scalePoint, axis: { ticks: { format: formatMonth } } },
    y: {
      scale: scaleLinear().domain([0, 120000]),
      grid: true,
      axis: { ticks: { count: 4, format: formatCompact } },
    },
  },
  color: {
    domain: channels.map((channel) => channel.label),
    range: channels.map((channel) => channel.color),
  },
  focus: "group-x",
  tooltip: {
    use: tooltip,
    sort: "color-domain",
    content: (points, { primaryPoint }) => ({
      title: formatMonthYear(points[0].datum.month),
      rows: points.map((point) => ({
        label: point.groupLabel,
        value: formatCount(point.datum.sessions),
        color: point.color,
        active: point === primaryPoint,
      })),
    }),
  },
});

export function ChartAreaStacked() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Sessions by channel</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Monthly sessions from organic search, direct, referral and paid ads, stacked, October 2025 to September 2026"
      />
      <ChartLegend>
        {channels.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Monthly sessions by channel"
        columns={["Month", ...channels.map((channel) => channel.label)]}
        rows={months.map((row) => [
          formatMonthYear(row.month),
          ...channels.map((channel) => row[channel.key]),
        ])}
      />
    </ChartFrame>
  );
}
