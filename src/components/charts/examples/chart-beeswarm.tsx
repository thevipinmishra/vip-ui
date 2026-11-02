"use client";

import { defineChart, dodgeY, dot } from "@tanstack/charts";
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

const sizes = [
  4.2, 5.8, 6.5, 7.9, 8.4, 9.1, 9.6, 10.8, 11.5, 12.2, 12.9, 13.4, 14.1, 14.8,
  15.2, 16.4, 17.3, 17.9, 18.6, 19.2, 20.5, 21.8, 22.4, 23.9, 24.6, 26.1, 27.8,
  29.4, 31.2, 33.5, 36.8, 38.4, 42.6, 47.9, 55.3, 64.8,
];

const segments = [
  { label: "Small business", max: 15, color: "var(--ts-chart-1)" },
  { label: "Mid-market", max: 40, color: "var(--ts-chart-2)" },
  {
    label: "Enterprise",
    max: Number.POSITIVE_INFINITY,
    color: "var(--ts-chart-4)",
  },
];

const segment = (value: number) =>
  segments.find((item) => value < item.max)?.label ?? "Enterprise";

const rows = sizes.map((value, index) => ({
  id: `DL-${2041 + index}`,
  value,
  segment: segment(value),
}));

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;
const formatMoney = (thousands: number) => money(thousands * 1000);
const formatCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
}).format;

const definition = defineChart({
  marks: [
    dot(rows, {
      x: "value",
      key: "id",
      r: 5,
      color: "segment",
      fillOpacity: 0.9,
      layout: dodgeY({ anchor: "middle", padding: 1.5 }),
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 70]),
      grid: true,
      axis: {
        label: "Annual contract value",
        ticks: {
          count: 7,
          format: (value: number) => formatCompact(value * 1000),
        },
      },
    },
    y: null,
  },
  color: {
    domain: segments.map((item) => item.label),
    range: segments.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.id,
      rows: [
        {
          label: point.datum.segment,
          value: formatMoney(point.datum.value),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartBeeswarm() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Closed deals</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={140}
        initialWidth={520}
        ariaLabel={`Beeswarm of ${rows.length} closed deals by annual contract value, by customer segment`}
      />
      <ChartLegend>
        {segments.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Closed deals in the third quarter"
        columns={["Deal", "Segment", "Annual contract value"]}
        rows={rows.map((row) => [row.id, row.segment, formatMoney(row.value)])}
      />
    </ChartFrame>
  );
}
