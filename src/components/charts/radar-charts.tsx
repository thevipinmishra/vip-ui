"use client";

import { defineChart } from "@tanstack/charts";
import {
  angleGrid,
  focusGroupAngle,
  polar,
  radialArea,
  radialDot,
  radialGrid,
  radialLine,
} from "@tanstack/charts/polar";
import { Chart } from "@tanstack/charts/react/core";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  ChartPlot,
  galleryRenderer,
  groupTooltip,
  valueTooltip,
} from "./chart-plot";

const metrics = ["Speed", "Quality", "Reach", "Support", "Reliability"];
const guides = [
  radialGrid({
    values: [25, 50, 75, 100],
    shape: "polygon",
    stroke: "var(--border)",
  }),
  angleGrid({
    labels: true,
    stroke: "var(--border)",
    labelFill: "var(--muted-foreground)",
  }),
];
const profile = [
  { metric: "Speed", score: 78 },
  { metric: "Quality", score: 91 },
  { metric: "Reach", score: 65 },
  { metric: "Support", score: 84 },
  { metric: "Reliability", score: 88 },
];
const profileChart = defineChart({
  marks: [
    polar({
      radiusRatio: 0.66,
      scales: {
        angle: { scale: scalePoint<string>().domain(metrics), wrap: true },
        radius: { scale: scaleLinear().domain([0, 100]) },
      },
      guides,
      marks: [
        radialArea(profile, {
          angle: "metric",
          radius: "score",
          fill: "var(--ts-chart-1)",
          fillOpacity: 0.18,
        }),
        radialLine(profile, {
          angle: "metric",
          radius: "score",
          stroke: "var(--ts-chart-1)",
          strokeWidth: 2.5,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  tooltip: {
    use: tooltip,
    content: ([point]) =>
      valueTooltip(
        point.datum.metric,
        "Team score",
        `${point.datum.score} / 100`,
        point.color,
      ),
  },
});

const comparison = [
  { metric: "Speed", team: "Current", score: 78 },
  { metric: "Quality", team: "Current", score: 91 },
  { metric: "Reach", team: "Current", score: 65 },
  { metric: "Support", team: "Current", score: 84 },
  { metric: "Reliability", team: "Current", score: 88 },
  { metric: "Speed", team: "Previous", score: 68 },
  { metric: "Quality", team: "Previous", score: 82 },
  { metric: "Reach", team: "Previous", score: 75 },
  { metric: "Support", team: "Previous", score: 72 },
  { metric: "Reliability", team: "Previous", score: 80 },
];
const comparisonChart = defineChart({
  marks: [
    polar({
      radiusRatio: 0.66,
      scales: {
        angle: { scale: scalePoint<string>().domain(metrics), wrap: true },
        radius: { scale: scaleLinear().domain([0, 100]) },
      },
      guides,
      marks: [
        radialLine(comparison, {
          angle: "metric",
          radius: "score",
          z: "team",
          color: "team",
          strokeWidth: 2.5,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: ["Current", "Previous"],
    range: ["var(--ts-chart-1)", "var(--ts-chart-3)"],
  },
  focus: focusGroupAngle,
  tooltip: {
    use: tooltip,
    sort: "color-domain",
    content: (points, { primaryPoint }) =>
      groupTooltip<(typeof comparison)[number]>(
        points[0].datum.metric,
        points,
        (row) => `${row.score} / 100`,
        primaryPoint,
      ),
  },
});

const benchmarks = [
  { metric: "Speed", score: 70 },
  { metric: "Quality", score: 82 },
  { metric: "Reach", score: 59 },
  { metric: "Support", score: 92 },
  { metric: "Reliability", score: 77 },
];
const benchmarksChart = defineChart({
  marks: [
    polar({
      radiusRatio: 0.66,
      scales: {
        angle: { scale: scalePoint<string>().domain(metrics), wrap: true },
        radius: { scale: scaleLinear().domain([0, 100]) },
      },
      guides: [
        radialGrid({
          values: [25, 50, 75, 100],
          shape: "circle",
          stroke: "var(--border)",
        }),
        angleGrid({
          labels: true,
          stroke: "var(--border)",
          labelFill: "var(--muted-foreground)",
        }),
      ],
      marks: [
        radialDot(benchmarks, {
          angle: "metric",
          radius: "score",
          fill: "var(--ts-chart-2)",
          r: 5,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  tooltip: {
    use: tooltip,
    content: ([point]) =>
      valueTooltip(
        point.datum.metric,
        "Benchmark score",
        `${point.datum.score} / 100`,
        point.color,
      ),
  },
});

export function RadarProfile() {
  return (
    <ChartPlot
      title="Current team scores out of 100"
      columns={["Metric", "Score"]}
      rows={profile.map((r) => [r.metric, r.score])}
    >
      <Chart
        definition={profileChart}
        renderer={galleryRenderer}
        height={242}
        initialWidth={520}
        ariaLabel="Team scores for speed, quality, reach, support and reliability, out of 100"
      />
    </ChartPlot>
  );
}
export function RadarBenchmarks() {
  return (
    <ChartPlot
      title="Benchmark scores out of 100"
      columns={["Metric", "Score"]}
      rows={benchmarks.map((r) => [r.metric, r.score])}
    >
      <Chart
        definition={benchmarksChart}
        renderer={galleryRenderer}
        height={242}
        initialWidth={520}
        ariaLabel="Benchmark scores for five metrics, shown as individual points on circular guides"
      />
    </ChartPlot>
  );
}

export function RadarCompare() {
  return (
    <ChartPlot
      title="Current versus previous scores out of 100"
      columns={["Metric", "Current", "Previous"]}
      legend={[
        { label: "Current", color: "var(--ts-chart-1)" },
        { label: "Previous", color: "var(--ts-chart-3)" },
      ]}
      rows={metrics.map((metric) => [
        metric,
        comparison.find((r) => r.metric === metric && r.team === "Current")
          ?.score ?? 0,
        comparison.find((r) => r.metric === metric && r.team === "Previous")
          ?.score ?? 0,
      ])}
    >
      <Chart
        definition={comparisonChart}
        renderer={galleryRenderer}
        height={242}
        initialWidth={520}
        ariaLabel="Current and previous team scores across five metrics, out of 100"
      />
    </ChartPlot>
  );
}
