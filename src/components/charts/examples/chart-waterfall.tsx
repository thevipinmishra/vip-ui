"use client";

import { barY, defineChart, ruleY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { waterfall } from "@tanstack/charts/transform/waterfall";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const changes = [
  { item: "Revenue", amount: 642000 },
  { item: "Cost of sales", amount: -186000 },
  { item: "Payroll", amount: -248000 },
  { item: "Marketing", amount: -74000 },
  { item: "Software", amount: -39000 },
  { item: "Interest", amount: 8000 },
];

const rows = waterfall(changes, { value: "amount", total: true });
const profit = rows.at(-1)?.end ?? 0;

const series = [
  { key: "increase", label: "Increase", color: "var(--ts-chart-2)" },
  { key: "decrease", label: "Decrease", color: "var(--ts-chart-5)" },
  { key: "total", label: "Total", color: "var(--ts-chart-1)" },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;
const compactMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
}).format;

const definition = defineChart({
  marks: [
    barY(rows, {
      x: (row) => (row.kind === "total" ? "Net profit" : row.item),
      y1: "start",
      y2: "end",
      color: "kind",
      inset: 5,
      radius: 3,
    }),
    decorative(ruleY([0], { stroke: "var(--border)" })),
  ],
  scales: {
    x: { scale: () => scaleBand().padding(0.1) },
    y: {
      scale: scaleLinear().domain([0, 700000]),
      grid: true,
      axis: { ticks: { count: 4, format: compactMoney } },
    },
  },
  color: {
    domain: series.map((item) => item.key),
    range: series.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.kind === "total" ? "Net profit" : point.datum.item,
      rows: [
        {
          label: point.datum.kind === "total" ? "Total" : point.datum.kind,
          value: money(point.datum.delta),
          color: point.color,
        },
        { label: "Running total", value: money(point.datum.end) },
      ],
    }),
  },
});

export function ChartWaterfall() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Profit bridge</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel={`Waterfall from ${money(changes[0].amount)} revenue to ${money(profit)} net profit in the third quarter of 2026`}
      />
      <ChartLegend>
        {series.map((item) => (
          <ChartLegendItem key={item.key} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Revenue to net profit, third quarter of 2026"
        columns={["Item", "Change", "Running total"]}
        rows={rows.map((row) => [
          row.kind === "total" ? "Net profit" : row.item,
          money(row.delta),
          money(row.end),
        ])}
      />
    </ChartFrame>
  );
}
