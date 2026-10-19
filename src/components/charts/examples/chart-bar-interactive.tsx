"use client";

import { barY, defineChart } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo, useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import {
  Chart,
  ChartAction,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "@/components/ui/chart";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const sales = [
  { month: "2025-10", revenue: 158300, orders: 1092 },
  { month: "2025-11", revenue: 171900, orders: 1184 },
  { month: "2025-12", revenue: 176400, orders: 1231 },
  { month: "2026-01", revenue: 182400, orders: 1226 },
  { month: "2026-02", revenue: 189700, orders: 1268 },
  { month: "2026-03", revenue: 201300, orders: 1322 },
  { month: "2026-04", revenue: 198600, orders: 1301 },
  { month: "2026-05", revenue: 212900, orders: 1389 },
  { month: "2026-06", revenue: 219400, orders: 1410 },
  { month: "2026-07", revenue: 216800, orders: 1398 },
  { month: "2026-08", revenue: 228500, orders: 1463 },
  { month: "2026-09", revenue: 236200, orders: 1502 },
];

const totalRevenue = sales.reduce((sum, row) => sum + row.revenue, 0);
const totalOrders = sales.reduce((sum, row) => sum + row.orders, 0);

const currency: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
};
const money = new Intl.NumberFormat("en-US", currency).format;
const compactMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
}).format;
const count = (value: number) => value.toLocaleString("en-US");

const metrics = {
  revenue: {
    label: "Revenue",
    max: 250000,
    value: (row: (typeof sales)[number]) => row.revenue,
    total: totalRevenue,
    totalFormat: currency,
    format: money,
    tick: compactMoney,
  },
  orders: {
    label: "Orders",
    max: 1600,
    value: (row: (typeof sales)[number]) => row.orders,
    total: totalOrders,
    totalFormat: undefined,
    format: count,
    tick: count,
  },
  average: {
    label: "Average order",
    max: 200,
    value: (row: (typeof sales)[number]) => row.revenue / row.orders,
    total: totalRevenue / totalOrders,
    totalFormat: currency,
    format: money,
    tick: money,
  },
};

type Metric = keyof typeof metrics;

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

export function ChartBarInteractive() {
  const [metric, setMetric] = useState<Metric>("revenue");
  const { label, max, value, total, totalFormat, format, tick } =
    metrics[metric];
  const rows = useMemo(
    () => sales.map((row) => ({ month: row.month, value: value(row) })),
    [value],
  );
  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          barY(rows, {
            id: "sales",
            x: "month",
            y: "value",
            key: "month",
            fill: "var(--ts-chart-1)",
            inset: 3,
            radius: { end: 4 },
          }),
        ],
        scales: {
          x: {
            scale: () => scaleBand().padding(0.15),
            axis: {
              ticks: { format: formatMonth },
              tickLabels: {
                thin: false,
                opacity: ({ index, bandwidth }) =>
                  bandwidth < 30 && index % 2 === 1 ? 0 : undefined,
              },
            },
          },
          y: {
            scale: scaleLinear().domain([0, max]),
            grid: true,
            axis: { ticks: { count: 4, format: tick } },
          },
        },
        tooltip: {
          use: tooltip,
          content: ([point]) => ({
            title: formatMonthYear(point.datum.month),
            rows: [
              { label, value: format(point.datum.value), color: point.color },
            ],
          }),
        },
      }),
    [rows, label, max, format, tick],
  );

  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>{label}</ChartTitle>
        <ChartValue>
          <AnimatedNumber value={total} formatOptions={totalFormat} />
        </ChartValue>
        <ChartDescription>October 2025 to September 2026</ChartDescription>
      </ChartCaption>
      <ChartAction>
        <ToggleButtonGroup
          aria-label="Metric"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[metric]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (next === "revenue" || next === "orders" || next === "average")
              setMetric(next);
          }}
        >
          {Object.entries(metrics).map(([id, item]) => (
            <ToggleButton key={id} id={id} variant="segmented">
              {item.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </ChartAction>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel={`Monthly ${label.toLowerCase()}, October 2025 to September 2026`}
      />
      <ChartTable
        caption={`Monthly ${label.toLowerCase()}`}
        columns={["Month", label]}
        rows={rows.map((row) => [
          formatMonthYear(row.month),
          format(row.value),
        ])}
      />
    </ChartFrame>
  );
}
