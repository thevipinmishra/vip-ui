"use client";

import { areaY, defineChart, lineY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { deviation } from "@tanstack/charts/transform/reduce";
import { rollingWindow } from "@tanstack/charts/transform/rolling-window";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "@/components/ui/chart";

const closes = [
  48.2, 48.9, 49.6, 49.1, 50.4, 51.2, 50.8, 51.9, 52.6, 52.1, 53.4, 54.2, 53.6,
  52.8, 51.9, 52.7, 53.8, 55.1, 56.4, 55.7, 54.9, 56.2, 57.6, 58.3, 57.4, 56.1,
  55.3, 56.8, 58.2, 59.6, 60.1, 59.2, 58.4, 59.9, 61.3, 62.4, 61.7, 60.8, 62.1,
  63.5,
];

const prices = closes.map((close, index) => ({ week: index + 1, close }));

const bands = rollingWindow(prices, {
  orderBy: "week",
  size: 10,
  partial: false,
  outputs: {
    mean: { value: "close", reduce: "mean" },
    spread: { value: "close", reduce: deviation },
  },
}).map((row) => ({
  ...row,
  lower: row.mean - 2 * row.spread,
  upper: row.mean + 2 * row.spread,
}));

const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
}).format;

const last = prices[prices.length - 1];
const bandFor = (week: number) => bands.find((row) => row.week === week);

const definition = defineChart({
  marks: [
    decorative(
      areaY(bands, {
        x: "week",
        y1: "lower",
        y2: "upper",
        fill: "var(--ts-chart-2)",
        fillOpacity: 0.14,
      }),
    ),
    decorative(
      lineY(bands, {
        x: "week",
        y: "mean",
        stroke: "var(--ts-chart-2)",
        strokeWidth: 1.5,
        strokeDasharray: "4 3",
      }),
    ),
    lineY(prices, {
      x: "week",
      y: "close",
      stroke: "var(--ts-chart-1)",
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([1, prices.length]),
      axis: {
        label: "Week",
        ticks: { values: [1, 10, 20, 30, 40] },
      },
    },
    y: {
      scale: scaleLinear().domain([44, 68]),
      grid: true,
      axis: { ticks: { count: 4, format: formatPrice } },
    },
  },
  focus: "nearest-x",
  tooltip: {
    use: tooltip,
    content: ([point]) => {
      const band = bandFor(point.datum.week);
      return {
        title: `Week ${point.datum.week}`,
        rows: [
          {
            label: "Close",
            value: formatPrice(point.datum.close),
            color: point.color,
          },
          ...(band
            ? [
                { label: "10-week mean", value: formatPrice(band.mean) },
                {
                  label: "Band",
                  value: `${formatPrice(band.lower)}–${formatPrice(band.upper)}`,
                },
              ]
            : []),
        ],
      };
    },
  },
});

export function ChartBollinger() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Share price</ChartTitle>
        <ChartValue>{formatPrice(last.close)}</ChartValue>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel={`Weekly closing price over ${prices.length} weeks with a 10-week mean and two-deviation band. The price closes at ${formatPrice(last.close)}, inside the band.`}
      />
      <ChartLegend>
        <ChartLegendItem color="var(--ts-chart-1)" swatch="line">
          Close
        </ChartLegendItem>
        <ChartLegendItem color="var(--ts-chart-2)" swatch="dashed">
          10-week mean
        </ChartLegendItem>
        <ChartLegendItem color="var(--ts-chart-2)">±2σ band</ChartLegendItem>
      </ChartLegend>
      <ChartTable
        caption="Weekly closing price with 10-week bands"
        columns={["Week", "Close", "Mean", "Lower", "Upper"]}
        rows={prices.map((row) => {
          const band = bandFor(row.week);
          return [
            row.week,
            formatPrice(row.close),
            band ? formatPrice(band.mean) : "—",
            band ? formatPrice(band.lower) : "—",
            band ? formatPrice(band.upper) : "—",
          ];
        })}
      />
    </ChartFrame>
  );
}
