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
  { plan: "Starter", subscriptions: 1482, price: 12 },
  { plan: "Pro", subscriptions: 864, price: 49 },
  { plan: "Business", subscriptions: 311, price: 149 },
  { plan: "Enterprise", subscriptions: 47, price: 990 },
];

const total = rows.reduce((sum, row) => sum + row.subscriptions, 0);

const series = rows.map((row, index) => ({
  label: row.plan,
  color: `var(--ts-chart-${index + 1})`,
}));

const formatShare = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
}).format;
const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.8,
      marks: [
        radialArc(pie(rows, { value: "subscriptions", gapAngle: 0.025 }), {
          color: "plan",
          key: "plan",
          innerRadius: ({ radius }) => radius * 0.66,
          cornerRadius: 4,
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
      title: `${point.datum.plan}, ${formatMoney(point.datum.price)} a month`,
      rows: [
        {
          label: "Subscriptions",
          value: point.datum.subscriptions.toLocaleString("en-US"),
          color: point.color,
        },
        {
          label: "Share",
          value: formatShare(point.datum.subscriptions / total),
        },
      ],
    }),
  },
});

export function ChartPieDonut() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Subscriptions</ChartTitle>
        <ChartDescription>Active subscriptions by plan</ChartDescription>
      </ChartCaption>
      <div className="relative">
        <Chart
          definition={definition}
          height={220}
          initialWidth={520}
          ariaLabel={`${total.toLocaleString("en-US")} active subscriptions across the Starter, Pro, Business and Enterprise plans`}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid place-content-center text-center"
        >
          <span className="text-2xl font-semibold tabular-nums">
            {total.toLocaleString("en-US")}
          </span>
          <span className="text-xs text-muted-foreground">Active</span>
        </div>
      </div>
      <ChartLegend items={series} />
      <ChartTable
        caption="Active subscriptions by plan"
        columns={["Plan", "Monthly price", "Subscriptions"]}
        rows={rows.map((row) => [
          row.plan,
          formatMoney(row.price),
          row.subscriptions,
        ])}
      />
    </ChartFrame>
  );
}
