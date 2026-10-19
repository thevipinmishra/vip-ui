"use client";

import { barX, defineChart, text } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const rows = [
  { stage: "Viewed product", users: 48210 },
  { stage: "Added to cart", users: 9870 },
  { stage: "Started checkout", users: 4312 },
  { stage: "Added payment", users: 3058 },
  { stage: "Purchased", users: 2641 },
];

const first = rows[0].users;
const formatPercent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
}).format;
const percent = (users: number) => formatPercent(users / first);
const fitsInside = (users: number) => users / first > 0.3;
const stepRate = (index: number) =>
  index === 0 ? "—" : formatPercent(rows[index].users / rows[index - 1].users);

const definition = defineChart({
  marks: [
    barX(rows, {
      x1: (row) => -row.users / 2,
      x2: (row) => row.users / 2,
      y: "stage",
      fill: "var(--ts-chart-1)",
      inset: 3,
      radius: 4,
    }),
    decorative(
      text(rows, {
        x: (row) => (fitsInside(row.users) ? 0 : row.users / 2),
        y: "stage",
        dx: (row) => (fitsInside(row.users) ? 0 : 6),
        text: (row) => percent(row.users),
        anchor: (row) => (fitsInside(row.users) ? "middle" : "start"),
        fill: (row) =>
          fitsInside(row.users) ? "var(--card)" : "var(--foreground)",
        fontSize: 12,
        fontWeight: 600,
      }),
    ),
  ],
  scales: {
    x: { scale: scaleLinear().domain([-first / 2, first / 2]), axis: false },
    y: {
      scale: () =>
        scaleBand<string>()
          .domain(rows.map((row) => row.stage))
          .padding(0.08),
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.stage,
      rows: [
        {
          label: "Users",
          value: point.datum.users.toLocaleString("en-US"),
          color: point.color,
        },
        { label: "Of viewers", value: percent(point.datum.users) },
        {
          label: "From last step",
          value: stepRate(
            rows.findIndex((row) => row.stage === point.datum.stage),
          ),
        },
      ],
    }),
  },
});

export function ChartFunnel() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Checkout funnel</ChartTitle>
        <ChartDescription>Users at each step, last 30 days</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel={`Checkout funnel from ${first.toLocaleString("en-US")} product views to ${rows[rows.length - 1].users.toLocaleString("en-US")} purchases in the last 30 days`}
      />
      <ChartTable
        caption="Users at each checkout step"
        columns={["Step", "Users", "Of viewers", "From last step"]}
        rows={rows.map((row, index) => [
          row.stage,
          row.users,
          percent(row.users),
          stepRate(index),
        ])}
      />
    </ChartFrame>
  );
}
