"use client";

import { boxRows, boxY, defineChart } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const samples = {
  "us-east-1": [
    61, 64, 66, 68, 70, 71, 73, 74, 76, 77, 79, 81, 84, 88, 93, 141,
  ],
  "eu-west-1": [
    82, 88, 91, 94, 96, 97, 99, 101, 104, 106, 109, 113, 118, 124, 164,
  ],
  "ap-south-1": [
    118, 124, 131, 137, 142, 146, 151, 155, 162, 168, 176, 189, 238,
  ],
};

const rows = Object.entries(samples).flatMap(([region, values]) =>
  values.map((ms, index) => ({ id: `${region}-${index}`, region, ms })),
);

const summaries = boxRows(rows, { category: "region", value: "ms" }).flatMap(
  (row) => (row.kind === "summary" ? [row] : []),
);

const definition = defineChart({
  marks: [
    boxY(rows, {
      x: "region",
      y: "ms",
      key: "id",
      fill: "color-mix(in oklab, var(--ts-chart-1) 22%, var(--card))",
      stroke: "var(--ts-chart-1)",
      inset: 24,
      r: 3.5,
    }),
  ],
  scales: {
    x: { scale: () => scaleBand().padding(0.2) },
    y: {
      scale: scaleLinear().domain([0, 250]),
      grid: true,
      axis: {
        label: "Latency",
        ticks: { count: 5, format: (value: number) => `${value} ms` },
      },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) =>
      point.datum.kind === "summary"
        ? {
            title: `${point.datum.category}`,
            rows: [
              { label: "Median", value: `${point.datum.median} ms` },
              {
                label: "Middle half",
                value: `${point.datum.q1}–${point.datum.q3} ms`,
              },
              { label: "Requests", value: `${point.datum.count}` },
            ],
          }
        : {
            title: `${point.datum.category}`,
            rows: [{ label: "Outlier", value: `${point.datum.value} ms` }],
          },
  },
});

export function ChartBoxPlot() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Latency by region</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Box plots of request latency in milliseconds for the us-east-1, eu-west-1 and ap-south-1 regions"
      />
      <ChartTable
        caption="Request latency by region, in milliseconds"
        columns={[
          "Region",
          "Lowest",
          "First quartile",
          "Median",
          "Third quartile",
          "Highest",
        ]}
        rows={summaries.map((row) => [
          `${row.category}`,
          row.whiskerLow,
          row.q1,
          row.median,
          row.q3,
          row.whiskerHigh,
        ])}
      />
    </ChartFrame>
  );
}
