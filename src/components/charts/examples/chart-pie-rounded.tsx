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
  { service: "Compute", cost: 4820 },
  { service: "Database", cost: 2960 },
  { service: "Storage", cost: 1450 },
  { service: "Network", cost: 730 },
  { service: "Other", cost: 310 },
];

const total = rows.reduce((sum, row) => sum + row.cost, 0);

const series = rows.map((row, index) => ({
  label: row.service,
  color: `var(--ts-chart-${index + 1})`,
}));

const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;
const formatShare = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
}).format;

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.8,
      marks: [
        radialArc(pie(rows, { value: "cost", gapAngle: 0.06 }), {
          color: "service",
          key: "service",
          innerRadius: ({ radius }) => radius * 0.5,
          cornerRadius: 6,
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
      title: point.datum.service,
      rows: [
        {
          label: "Cost",
          value: formatMoney(point.datum.cost),
          color: point.color,
        },
        { label: "Share", value: formatShare(point.datum.cost / total) },
      ],
    }),
  },
});

export function ChartPieRounded() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Cloud costs</ChartTitle>
        <ChartDescription>
          {formatMoney(total)} in September, by service
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel={`Cloud costs of ${formatMoney(total)} in September, by service: compute, database, storage, network and other`}
      />
      <ChartLegend items={series} />
      <ChartTable
        caption="Cloud costs in September, by service, in dollars"
        columns={["Service", "Cost", "Share"]}
        rows={rows.map((row) => [
          row.service,
          row.cost,
          formatShare(row.cost / total),
        ])}
      />
    </ChartFrame>
  );
}
