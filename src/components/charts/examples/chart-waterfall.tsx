"use client";

import { barY, defineChart, ruleY } from "@tanstack/charts";
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
} from "@/components/ui/chart";

const changes = [
  { item: "Revenue", amount: 642000 },
  { item: "Cost of sales", amount: -186000 },
  { item: "Payroll", amount: -248000 },
  { item: "Marketing", amount: -74000 },
  { item: "Software", amount: -39000 },
  { item: "Interest", amount: 8000 },
];

const profit = changes.reduce((sum, row) => sum + row.amount, 0);

const rows = [
  ...changes.map((row, index) => {
    const start = changes
      .slice(0, index)
      .reduce((sum, previous) => sum + previous.amount, 0);
    return {
      ...row,
      start,
      end: start + row.amount,
      kind: row.amount >= 0 ? "Increase" : "Decrease",
    };
  }),
  { item: "Net profit", amount: profit, start: 0, end: profit, kind: "Total" },
];

const series = [
  { label: "Increase", color: "var(--ts-chart-2)" },
  { label: "Decrease", color: "var(--ts-chart-5)" },
  { label: "Total", color: "var(--ts-chart-1)" },
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
      x: "item",
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
    domain: series.map((item) => item.label),
    range: series.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.item,
      rows: [
        {
          label: point.datum.kind,
          value: money(point.datum.amount),
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
        <ChartDescription>
          Revenue to net profit, third quarter of 2026
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel={`Waterfall from ${money(changes[0].amount)} revenue to ${money(profit)} net profit in the third quarter of 2026`}
      />
      <ChartLegend>
        {series.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Revenue to net profit, third quarter of 2026"
        columns={["Item", "Change", "Running total"]}
        rows={rows.map((row) => [row.item, money(row.amount), money(row.end)])}
      />
    </ChartFrame>
  );
}
