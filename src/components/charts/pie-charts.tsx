"use client";

import { defineChart } from "@tanstack/charts";
import { pie, polar, radialArc } from "@tanstack/charts/polar";
import { Chart } from "@tanstack/charts/react/core";
import { tooltip } from "@tanstack/charts/tooltip";
import { ChartPlot, galleryRenderer, valueTooltip } from "./chart-plot";

const devices = [
  { device: "Desktop", share: 48 },
  { device: "Mobile", share: 37 },
  { device: "Tablet", share: 15 },
];
const devicesChart = defineChart({
  marks: [
    polar({
      radiusRatio: 0.8,
      marks: [
        radialArc(pie(devices, { value: "share", gapAngle: 0.035 }), {
          color: "device",
          key: "device",
          stroke: "var(--card)",
          strokeWidth: 2,
        }),
      ],
      scales: { angle: null, radius: null },
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: devices.map((r) => r.device),
    range: ["var(--ts-chart-1)", "var(--ts-chart-2)", "var(--ts-chart-3)"],
  },
  tooltip: {
    use: tooltip,
    content: ([point]) =>
      valueTooltip(
        point.datum.device,
        "Visit share",
        `${point.datum.share}%`,
        point.color,
      ),
  },
});

const plans = [
  { plan: "Team", share: 54 },
  { plan: "Personal", share: 30 },
  { plan: "Enterprise", share: 16 },
];
const plansChart = defineChart({
  marks: [
    polar({
      radiusRatio: 0.8,
      marks: [
        radialArc(pie(plans, { value: "share", gapAngle: 0.025 }), {
          color: "plan",
          key: "plan",
          innerRadius: ({ radius }) => radius * 0.62,
          cornerRadius: 4,
        }),
      ],
      scales: { angle: null, radius: null },
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: plans.map((r) => r.plan),
    range: ["var(--ts-chart-2)", "var(--ts-chart-1)", "var(--ts-chart-4)"],
  },
  tooltip: {
    use: tooltip,
    content: ([point]) =>
      valueTooltip(
        point.datum.plan,
        "Subscriptions",
        `${point.datum.share}%`,
        point.color,
      ),
  },
});

const budget = [
  { item: "Product", share: 42 },
  { item: "Support", share: 28 },
  { item: "Operations", share: 18 },
  { item: "Other", share: 12 },
];
const budgetChart = defineChart({
  marks: [
    polar({
      radiusRatio: 0.8,
      marks: [
        radialArc(pie(budget, { value: "share", gapAngle: 0.07 }), {
          color: "item",
          key: "item",
          innerRadius: ({ radius }) => radius * 0.48,
          cornerRadius: 7,
        }),
      ],
      scales: { angle: null, radius: null },
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: budget.map((r) => r.item),
    range: [
      "var(--ts-chart-1)",
      "var(--ts-chart-2)",
      "var(--ts-chart-3)",
      "var(--ts-chart-4)",
    ],
  },
  tooltip: {
    use: tooltip,
    content: ([point]) =>
      valueTooltip(
        point.datum.item,
        "Budget share",
        `${point.datum.share}%`,
        point.color,
      ),
  },
});

export function PieDevices() {
  return (
    <ChartPlot
      title="Visits by device, in percent"
      columns={["Device", "Share (%)"]}
      rows={devices.map((r) => [r.device, r.share])}
      legend={devices.map((r, index) => ({
        label: r.device,
        color: `var(--ts-chart-${index + 1})`,
      }))}
    >
      <Chart
        definition={devicesChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Share of visits from desktop, mobile and tablet devices, in percent"
      />
    </ChartPlot>
  );
}
export function PieDonut() {
  return (
    <ChartPlot
      title="Subscriptions by plan, in percent"
      columns={["Plan", "Share (%)"]}
      rows={plans.map((r) => [r.plan, r.share])}
      legend={plans.map((r, index) => ({
        label: r.plan,
        color: ["var(--ts-chart-2)", "var(--ts-chart-1)", "var(--ts-chart-4)"][
          index
        ],
      }))}
    >
      <Chart
        definition={plansChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Subscription share across Team, Personal and Enterprise plans, in percent"
      />
    </ChartPlot>
  );
}
export function PieRounded() {
  return (
    <ChartPlot
      title="Operating budget allocation, in percent"
      columns={["Team", "Share (%)"]}
      rows={budget.map((r) => [r.item, r.share])}
      legend={budget.map((r, index) => ({
        label: r.item,
        color: `var(--ts-chart-${index + 1})`,
      }))}
    >
      <Chart
        definition={budgetChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Operating budget share across four teams, in percent"
      />
    </ChartPlot>
  );
}
