"use client";

import { defineChart } from "@tanstack/charts";
import {
  pie,
  polar,
  radialArc,
  radialBarAngle,
  radialBarRadius,
  radialText,
} from "@tanstack/charts/polar";
import { Chart } from "@tanstack/charts/react/core";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { ChartPlot, galleryRenderer } from "./chart-plot";

const complete = 72;
const progress = [
  { id: "Complete", value: complete },
  { id: "Remaining", value: 100 - complete },
];
const progressChart = defineChart({
  marks: [
    polar({
      radiusRatio: 0.78,
      scales: {
        angle: { scale: scaleLinear().domain([0, 1]) },
        radius: { scale: scaleLinear().domain([0, 1]) },
      },
      marks: [
        radialArc(
          pie(progress, {
            value: "value",
            startAngle: -Math.PI * 0.75,
            endAngle: Math.PI * 0.75,
          }),
          {
            innerRadius: ({ radius }) => radius * 0.76,
            cornerRadius: 999,
            color: "id",
            key: "id",
          },
        ),
        radialText([{ id: "reading", label: "72%" }], {
          angle: 0,
          radius: 0,
          text: "label",
          key: "id",
          fill: "var(--foreground)",
          fontSize: 26,
          fontWeight: 650,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: ["Complete", "Remaining"],
    range: ["var(--ts-chart-1)", "var(--muted)"],
  },
  tooltip,
});

const channels = [
  { name: "Organic", value: 82 },
  { name: "Direct", value: 64 },
  { name: "Referral", value: 48 },
  { name: "Social", value: 31 },
];
const channelsChart = defineChart({
  marks: [
    polar({
      radiusRatio: 0.76,
      scales: {
        angle: { scale: () => scaleBand<string>().padding(0.14) },
        radius: {
          scale: scaleLinear().domain([0, 100]),
          range: [({ radius }) => radius * 0.25, ({ radius }) => radius],
        },
      },
      marks: [
        radialBarRadius(channels, {
          angle: "name",
          radius: "value",
          color: "name",
          key: "name",
          cornerRadius: 5,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: channels.map((r) => r.name),
    range: [
      "var(--ts-chart-1)",
      "var(--ts-chart-2)",
      "var(--ts-chart-3)",
      "var(--ts-chart-4)",
    ],
  },
  tooltip,
});

const goals = [
  { goal: "Design", percent: 84 },
  { goal: "Engineering", percent: 66 },
  { goal: "Research", percent: 51 },
];
const goalsChart = defineChart({
  marks: [
    polar({
      radiusRatio: 0.84,
      startAngle: -Math.PI * 0.75,
      endAngle: Math.PI * 0.75,
      scales: {
        angle: { scale: scaleLinear().domain([0, 100]) },
        radius: { scale: () => scaleBand<string>().padding(0.24) },
      },
      marks: [
        radialBarAngle(goals, {
          radius: "goal",
          angle: "percent",
          color: "goal",
          key: "goal",
          cornerRadius: "full",
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: goals.map((r) => r.goal),
    range: ["var(--ts-chart-1)", "var(--ts-chart-2)", "var(--ts-chart-3)"],
  },
  tooltip,
});

export function RadialProgress() {
  return (
    <ChartPlot
      title="Onboarding completed, in percent"
      columns={["Status", "Share (%)"]}
      rows={progress.map((r) => [r.id, r.value])}
    >
      <Chart
        definition={progressChart}
        renderer={galleryRenderer}
        height={242}
        initialWidth={520}
        ariaLabel="Onboarding 72 percent complete, 28 percent remaining"
      />
    </ChartPlot>
  );
}
export function RadialGoals() {
  return (
    <ChartPlot
      title="Quarterly goal completion, in percent"
      columns={["Team", "Completion (%)"]}
      rows={goals.map((r) => [r.goal, r.percent])}
      legend={goals.map((r, index) => ({
        label: `${r.goal} ${r.percent}%`,
        color: `var(--ts-chart-${index + 1})`,
      }))}
    >
      <Chart
        definition={goalsChart}
        renderer={galleryRenderer}
        height={242}
        initialWidth={520}
        ariaLabel="Quarterly goal completion in percent for Design, Engineering and Research teams"
      />
    </ChartPlot>
  );
}

export function RadialChannels() {
  return (
    <ChartPlot
      title="Campaign reach by channel, out of 100"
      columns={["Channel", "Reach"]}
      rows={channels.map((r) => [r.name, r.value])}
      legend={channels.map((r, index) => ({
        label: r.name,
        color: `var(--ts-chart-${index + 1})`,
      }))}
    >
      <Chart
        definition={channelsChart}
        renderer={galleryRenderer}
        height={242}
        initialWidth={520}
        ariaLabel="Campaign reach out of 100 across Organic, Direct, Referral and Social channels"
      />
    </ChartPlot>
  );
}
