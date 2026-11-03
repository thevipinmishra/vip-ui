"use client";

import { defineChart, rect } from "@tanstack/charts";
import { colorGradientLegend } from "@tanstack/charts/legend";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { binXY } from "@tanstack/charts/transform/bin-xy";
import { scaleSequential } from "d3-scale";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const noise = (seed: number) => {
  const value = Math.sin(seed * 45.164 + 2.5) * 43758.5453;
  return value - Math.floor(value);
};

const orders = Array.from({ length: 220 }, (_, index) => {
  const value = 10 + noise(index + 1) ** 1.6 * 190;
  const days = 1 + (value / 200) * 4 + (noise(index + 300) - 0.3) * 3;
  return {
    id: index,
    orderValue: Math.round(value),
    deliveryDays: Math.min(9.9, Math.max(0.5, Math.round(days * 10) / 10)),
  };
});

const cells = binXY(orders, {
  x: "orderValue",
  y: "deliveryDays",
  xThresholds: [0, 25, 50, 75, 100, 125, 150, 175, 200],
  yThresholds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  outputs: { count: { reduce: "count" } },
}).filter((cell) => cell.count > 0);

const ramp = (t: number) =>
  `color-mix(in oklab, var(--ts-chart-1) ${Math.round(12 + t * 88)}%, var(--card))`;

const formatMoney = (value: number) => `$${value}`;
const formatDays = (value: number) => `${value} d`;

const bands = [0, 50, 100, 150].map((start) => {
  const items = orders.filter(
    (row) => row.orderValue >= start && row.orderValue < start + 50,
  );
  return {
    label: `${formatMoney(start)}–${formatMoney(start + 50)}`,
    orders: items.length,
    days:
      items.reduce((total, row) => total + row.deliveryDays, 0) /
      Math.max(1, items.length),
  };
});

const definition = defineChart({
  marks: [
    rect(cells, {
      x1: "x1",
      x2: "x2",
      y1: "y1",
      y2: "y2",
      color: "count",
      inset: 0.5,
      radius: 2,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 200]),
      axis: {
        label: "Order value",
        ticks: { count: 4, format: formatMoney },
      },
    },
    y: {
      scale: scaleLinear().domain([0, 10]),
      axis: { label: "Delivery time", ticks: { count: 5, format: formatDays } },
    },
  },
  color: {
    scale: () => scaleSequential(ramp),
    legend: colorGradientLegend({
      label: "Orders",
      placement: "bottom",
      width: 180,
      format: (value) => `${Math.round(value)}`,
    }),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: `${formatMoney(point.datum.x1)}–${formatMoney(point.datum.x2)}`,
      rows: [
        {
          label: "Orders",
          value: `${point.datum.count}`,
          color: point.color,
        },
        {
          label: "Delivery",
          value: `${point.datum.y1}–${formatDays(point.datum.y2)}`,
        },
      ],
    }),
  },
});

export function ChartHeatmapBinxy() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Order value and delivery time</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={280}
        initialWidth={520}
        ariaLabel={`Two-dimensional histogram of ${orders.length} orders by value and delivery time. Larger orders take longer to arrive.`}
      />
      <ChartTable
        caption="Orders and mean delivery time by order value"
        columns={["Order value", "Orders", "Mean delivery"]}
        rows={bands.map((band) => [
          band.label,
          band.orders,
          formatDays(Math.round(band.days * 10) / 10),
        ])}
      />
    </ChartFrame>
  );
}
