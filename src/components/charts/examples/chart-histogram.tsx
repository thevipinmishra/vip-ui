"use client";

import { binX, defineChart, rect } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const seconds = [
  0.6, 0.7, 0.7, 0.9, 0.9, 0.9, 1.0, 1.0, 1.0, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1,
  1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3,
  1.3, 1.4, 1.4, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5, 1.5, 1.5, 1.6, 1.6, 1.6, 1.6,
  1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.7, 1.7, 1.7, 1.7, 1.8, 1.8, 1.8, 1.8, 1.8,
  1.8, 1.8, 1.8, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 2.0, 2.0, 2.0,
  2.0, 2.0, 2.0, 2.0, 2.0, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1,
  2.1, 2.1, 2.1, 2.1, 2.2, 2.2, 2.2, 2.2, 2.2, 2.3, 2.3, 2.3, 2.3, 2.3, 2.3,
  2.3, 2.3, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
  2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.7, 2.7, 2.7, 2.7, 2.8, 2.8, 2.8, 2.8, 2.8,
  2.9, 2.9, 2.9, 2.9, 3.0, 3.0, 3.0, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.2, 3.2,
  3.3, 3.4, 3.4, 3.4, 3.5, 3.5, 3.5, 3.5, 3.6, 3.6, 3.7, 3.7, 3.8, 3.9, 3.9,
  3.9, 4.0, 4.1, 4.2, 4.2, 4.2, 4.2, 4.6, 4.6, 4.6, 4.6, 5.1, 5.5, 6.5, 7.8,
];

const loads = seconds.map((value, index) => ({ id: index, seconds: value }));

const ratings = [
  { label: "Good", max: 2.5, color: "var(--ts-chart-2)" },
  { label: "Needs improvement", max: 4, color: "var(--ts-chart-3)" },
  { label: "Poor", max: Number.POSITIVE_INFINITY, color: "var(--ts-chart-5)" },
];

const rating = (upper: number) =>
  ratings.find((item) => upper <= item.max)?.label ?? "Poor";

const bins = binX(loads, {
  value: "seconds",
  thresholds: [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8,
  ],
});

const range = (bin: (typeof bins)[number]) => `${bin.x1}–${bin.x2} s`;

const definition = defineChart({
  marks: [
    rect(bins, {
      x1: "x1",
      x2: "x2",
      y1: () => 0,
      y2: "value",
      color: (bin) => rating(bin.x2),
      inset: 1,
      radius: [3, 3, 0, 0],
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 8]),
      axis: {
        label: "Largest contentful paint",
        ticks: { count: 8, format: (value: number) => `${value} s` },
      },
    },
    y: {
      scale: scaleLinear().domain([0, 50]),
      grid: true,
      axis: { label: "Page loads", ticks: { count: 5 } },
    },
  },
  color: {
    domain: ratings.map((item) => item.label),
    range: ratings.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: range(point.datum),
      rows: [
        {
          label: "Page loads",
          value: `${point.datum.value}`,
          color: point.color,
        },
        { label: "Rating", value: rating(point.datum.x2) },
      ],
    }),
  },
});

export function ChartHistogram() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Load time distribution</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel={`Histogram of largest contentful paint for ${loads.length} page loads, in half-second ranges, rated good, needs improvement or poor`}
      />
      <ChartLegend>
        {ratings.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Page loads by largest contentful paint"
        columns={["Range", "Page loads", "Rating"]}
        rows={bins.map((bin) => [range(bin), bin.value, rating(bin.x2)])}
      />
    </ChartFrame>
  );
}
