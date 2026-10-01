"use client";

import { barY, defineChart } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTitle,
} from "@/components/ui/chart";

const rows = [
  { month: "Jan", signups: 48 },
  { month: "Feb", signups: 62 },
  { month: "Mar", signups: 55 },
  { month: "Apr", signups: 79 },
  { month: "May", signups: 71 },
  { month: "Jun", signups: 94 },
] as const;

const signupsChart = defineChart({
  marks: [
    barY(rows, {
      x: "month",
      y: "signups",
      fill: "var(--ts-chart-1)",
      inset: 3,
    }),
  ],
  scales: {
    x: { scale: () => scaleBand().padding(0.12) },
    y: {
      scale: scaleLinear,
      domain: [0, 100],
      grid: true,
      axis: { label: "Signups" },
    },
  },
  tooltip,
});

export function ChartDemo() {
  return (
    <ChartFrame className="w-full max-w-2xl ring-1 ring-border/70">
      <ChartCaption>
        <ChartTitle>New workspace signups</ChartTitle>
        <ChartDescription>
          Monthly signups, January to June 2026
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={signupsChart}
        height={260}
        initialWidth={600}
        ariaLabel="Monthly workspace signups from January to June 2026"
      />
      <table className="sr-only">
        <caption>Monthly workspace signups, January to June 2026</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Signups</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.month}>
              <th scope="row">{row.month}</th>
              <td>{row.signups}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ChartFrame>
  );
}
