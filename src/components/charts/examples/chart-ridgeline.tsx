"use client";

import { binX, defineChart } from "@tanstack/charts";
import { ridgelineY } from "@tanstack/charts/ridgeline";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { normalize } from "@tanstack/charts/transform/normalize";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const seasons = [
  { label: "Season 1", center: 7.9, spread: 1.4 },
  { label: "Season 2", center: 8.4, spread: 1.1 },
  { label: "Season 3", center: 7.2, spread: 1.8 },
  { label: "Season 4", center: 6.4, spread: 2 },
];

const noise = (seed: number) => {
  const value = Math.sin(seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const rows = seasons.flatMap((season, seasonIndex) =>
  Array.from({ length: 30 }, (_, index) => {
    const seed = seasonIndex * 50 + index + 1;
    const offset = noise(seed) + noise(seed + 0.3) + noise(seed + 0.7) - 1.5;
    const rating = season.center + offset * season.spread;
    return {
      season: season.label,
      rating: Math.min(10, Math.max(3, Math.round(rating * 10) / 10)),
    };
  }),
);

const bins = binX(rows, {
  value: "rating",
  by: "season",
  thresholds: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
  outputs: { count: { reduce: "count" } },
});

const profiles = normalize(bins, {
  value: "count",
  by: "season",
  basis: "max",
  as: "height",
});

const formatRating = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
}).format;

const summary = seasons.map((season) => {
  const values = rows
    .filter((row) => row.season === season.label)
    .map((row) => row.rating);
  return {
    season: season.label,
    mean: values.reduce((total, value) => total + value, 0) / values.length,
    low: Math.min(...values),
    high: Math.max(...values),
  };
});

const definition = defineChart({
  marks: [
    ridgelineY(profiles, {
      x: "x",
      y: "season",
      height: "height",
      overlap: 0.85,
      fill: "var(--ts-chart-1)",
      fillOpacity: 0.22,
      stroke: "var(--ts-chart-1)",
      strokeWidth: 1.5,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([3, 10]),
      grid: true,
      axis: { label: "Episode rating", ticks: { count: 7 } },
    },
    y: {
      scale: () =>
        scalePoint<string>()
          .domain(seasons.map((season) => season.label))
          .padding(0.9),
      reverse: true,
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.season,
      rows: [
        {
          label: "Ratings",
          value: `${formatRating(point.datum.x1)}–${formatRating(point.datum.x2)}`,
          color: point.color,
        },
        { label: "Episodes", value: `${point.datum.count}` },
      ],
    }),
  },
});

export function ChartRidgeline() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Ratings by season</ChartTitle>
        <ChartDescription>
          Each profile is scaled to its own peak.
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={260}
        initialWidth={520}
        ariaLabel="Ridgeline plot of episode ratings for four seasons. Ratings peak in season 2 and spread lower in season 4."
      />
      <ChartTable
        caption="Episode ratings by season"
        columns={["Season", "Mean rating", "Lowest", "Highest"]}
        rows={summary.map((item) => [
          item.season,
          formatRating(item.mean),
          formatRating(item.low),
          formatRating(item.high),
        ])}
      />
    </ChartFrame>
  );
}
