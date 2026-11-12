"use client";

import { barY, defineChart, link } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
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
  ChartValue,
} from "../vip-ui/chart";

const rows = [
  {
    date: "2026-09-14",
    open: 183.27,
    high: 187.04,
    low: 181.79,
    close: 185.38,
  },
  {
    date: "2026-09-15",
    open: 186.76,
    high: 188.08,
    low: 186.34,
    close: 186.53,
  },
  {
    date: "2026-09-16",
    open: 186.16,
    high: 189.51,
    low: 186.15,
    close: 187.95,
  },
  {
    date: "2026-09-17",
    open: 187.72,
    high: 194.01,
    low: 186.65,
    close: 191.84,
  },
  {
    date: "2026-09-18",
    open: 190.94,
    high: 193.48,
    low: 189.43,
    close: 192.49,
  },
  {
    date: "2026-09-21",
    open: 192.16,
    high: 193.08,
    low: 191.43,
    close: 191.83,
  },
  {
    date: "2026-09-22",
    open: 192.67,
    high: 195.62,
    low: 191.54,
    close: 194.02,
  },
  { date: "2026-09-23", open: 192.99, high: 197.2, low: 190.91, close: 197.14 },
  {
    date: "2026-09-24",
    open: 197.48,
    high: 197.97,
    low: 193.99,
    close: 195.27,
  },
  {
    date: "2026-09-25",
    open: 195.67,
    high: 198.61,
    low: 195.59,
    close: 198.28,
  },
  {
    date: "2026-09-28",
    open: 199.29,
    high: 201.25,
    low: 199.24,
    close: 201.05,
  },
  {
    date: "2026-09-29",
    open: 200.67,
    high: 201.92,
    low: 200.37,
    close: 201.76,
  },
  {
    date: "2026-09-30",
    open: 201.67,
    high: 203.45,
    low: 200.68,
    close: 200.68,
  },
  { date: "2026-10-01", open: 200.73, high: 201.74, low: 199.2, close: 199.57 },
  { date: "2026-10-02", open: 199.96, high: 201.53, low: 199.8, close: 200.11 },
  { date: "2026-10-05", open: 200.66, high: 202.6, low: 200.62, close: 202.26 },
  {
    date: "2026-10-06",
    open: 202.27,
    high: 203.89,
    low: 201.66,
    close: 202.94,
  },
  { date: "2026-10-07", open: 204.55, high: 206.8, low: 203.24, close: 205.18 },
  {
    date: "2026-10-08",
    open: 204.15,
    high: 205.29,
    low: 202.26,
    close: 202.35,
  },
  {
    date: "2026-10-09",
    open: 202.68,
    high: 203.97,
    low: 202.27,
    close: 202.91,
  },
  {
    date: "2026-10-12",
    open: 203.27,
    high: 204.28,
    low: 201.69,
    close: 202.67,
  },
];

const last = rows[rows.length - 1];
const first = rows[0];

const up = "var(--ts-chart-2)";
const down = "var(--ts-chart-5)";
const color = (row: (typeof rows)[number]) =>
  row.close >= row.open ? up : down;

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const formatDay = (date: string) => dayFormat.format(new Date(date));
const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;
const formatChange = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2,
  signDisplay: "always",
}).format;

const mondays = rows
  .filter((row) => new Date(row.date).getUTCDay() === 1)
  .map((row) => row.date);

const definition = defineChart({
  marks: [
    decorative(
      link(rows, {
        x1: "date",
        x2: "date",
        y1: "low",
        y2: "high",
        stroke: color,
        strokeWidth: 1.5,
      }),
    ),
    barY(rows, {
      x: "date",
      y1: "open",
      y2: "close",
      fill: color,
      inset: 2,
      radius: 1.5,
      maxThickness: 14,
    }),
  ],
  scales: {
    x: {
      scale: () => scaleBand().padding(0.15),
      axis: { ticks: { values: mondays, format: formatDay } },
    },
    y: {
      scale: scaleLinear().domain([180, 210]),
      grid: true,
      axis: { ticks: { count: 5, format: (value: number) => `$${value}` } },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: formatDay(point.datum.date),
      rows: [
        { label: "Open", value: formatPrice(point.datum.open) },
        { label: "High", value: formatPrice(point.datum.high) },
        { label: "Low", value: formatPrice(point.datum.low) },
        {
          label: "Close",
          value: formatPrice(point.datum.close),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartCandlestick() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>ACME share price</ChartTitle>
        <ChartValue>{formatPrice(last.close)}</ChartValue>
        <ChartDescription>
          {formatChange((last.close - first.open) / first.open)} since{" "}
          {formatDay(first.date)}
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel={`Candlestick chart of daily ACME share prices for ${rows.length} trading days, ${formatDay(first.date)} to ${formatDay(last.date)}`}
      />
      <ChartLegend>
        <ChartLegendItem color={up}>Closed higher</ChartLegendItem>
        <ChartLegendItem color={down}>Closed lower</ChartLegendItem>
      </ChartLegend>
      <ChartTable
        caption="Daily ACME share price, in dollars"
        columns={["Date", "Open", "High", "Low", "Close"]}
        rows={rows.map((row) => [
          formatDay(row.date),
          row.open,
          row.high,
          row.low,
          row.close,
        ])}
      />
    </ChartFrame>
  );
}
