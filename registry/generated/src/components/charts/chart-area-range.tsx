"use client";

import { areaY, defineChart, lineY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
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

const actual = [
  { month: "2026-01", revenue: 182400 },
  { month: "2026-02", revenue: 189700 },
  { month: "2026-03", revenue: 201300 },
  { month: "2026-04", revenue: 198600 },
  { month: "2026-05", revenue: 212900 },
  { month: "2026-06", revenue: 219400 },
  { month: "2026-07", revenue: 216800 },
  { month: "2026-08", revenue: 228500 },
  { month: "2026-09", revenue: 236200 },
];

const forecast = [
  { month: "2026-09", revenue: 236200, low: 236200, high: 236200 },
  { month: "2026-10", revenue: 243000, low: 236000, high: 250000 },
  { month: "2026-11", revenue: 251000, low: 239000, high: 263000 },
  { month: "2026-12", revenue: 262000, low: 244000, high: 280000 },
  { month: "2027-01", revenue: 268000, low: 245000, high: 291000 },
  { month: "2027-02", revenue: 276000, low: 248000, high: 304000 },
  { month: "2027-03", revenue: 285000, low: 251000, high: 319000 },
];

const months = [...new Set([...actual, ...forecast].map((row) => row.month))];

const series = [
  { label: "Actual", color: "var(--ts-chart-1)", swatch: "line" },
  { label: "Forecast", color: "var(--ts-chart-3)", swatch: "dashed" },
  {
    label: "80% range",
    color: "color-mix(in oklch, var(--ts-chart-3) 30%, transparent)",
    swatch: "square",
  },
] as const;

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
  style: "currency",
  currency: "USD",
  notation: "compact",
}).format;
const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;

const definition = defineChart({
  marks: [
    decorative(
      areaY(forecast, {
        x: "month",
        y1: "low",
        y2: "high",
        fill: "var(--ts-chart-3)",
        fillOpacity: 0.2,
      }),
    ),
    lineY(actual, {
      x: "month",
      y: "revenue",
      stroke: "var(--ts-chart-1)",
      strokeWidth: 2,
    }),
    lineY(forecast, {
      x: "month",
      y: "revenue",
      stroke: "var(--ts-chart-3)",
      strokeWidth: 2,
      strokeDasharray: "5 4",
    }),
  ],
  scales: {
    x: {
      scale: scalePoint<string>().domain(months),
      axis: { ticks: { format: formatMonth } },
    },
    y: {
      scale: scaleLinear().domain([150000, 350000]),
      grid: true,
      axis: { ticks: { count: 4, format: formatCompact } },
    },
  },
  focus: "group-x",
  tooltip: {
    use: tooltip,
    content: (points) => {
      const month = points[0].datum.month;
      const past = actual.find((row) => row.month === month);
      const future = forecast.find((row) => row.month === month);
      return {
        title: formatMonthYear(month),
        rows: past
          ? [
              {
                label: "Actual",
                value: formatMoney(past.revenue),
                color: series[0].color,
              },
            ]
          : [
              {
                label: "Forecast",
                value: formatMoney(future?.revenue ?? 0),
                color: series[1].color,
              },
              {
                label: "80% range",
                value: `${formatCompact(future?.low ?? 0)}–${formatCompact(future?.high ?? 0)}`,
              },
            ],
      };
    },
  },
});

export function ChartAreaRange() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Revenue forecast</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Monthly revenue from January to September 2026, and a forecast to March 2027 with an 80 percent range"
      />
      <ChartLegend>
        {series.map((item) => (
          <ChartLegendItem
            key={item.label}
            color={item.color}
            swatch={item.swatch}
          >
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Monthly revenue and forecast, in dollars"
        columns={["Month", "Actual", "Forecast", "Low", "High"]}
        rows={[
          ...actual.map((row) => [
            formatMonthYear(row.month),
            row.revenue,
            "",
            "",
            "",
          ]),
          ...forecast
            .slice(1)
            .map((row) => [
              formatMonthYear(row.month),
              "",
              row.revenue,
              row.low,
              row.high,
            ]),
        ]}
      />
    </ChartFrame>
  );
}
