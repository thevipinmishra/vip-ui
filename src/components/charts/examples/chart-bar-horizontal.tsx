"use client";

import { barX, defineChart } from "@tanstack/charts";
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

const rows = [
  { page: "/", views: 18420 },
  { page: "/pricing", views: 9860 },
  { page: "/docs/getting-started", views: 7315 },
  { page: "/blog/release-notes-2-0", views: 5120 },
  { page: "/docs/components/data-table", views: 4690 },
  { page: "/changelog", views: 3240 },
];

const totalViews = 61_870;

const formatCompact = new Intl.NumberFormat("en-US", {
  notation: "compact",
}).format;
const formatShare = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
}).format;

const definition = defineChart({
  marks: [
    barX(rows, {
      x: "views",
      y: "page",
      fill: "var(--ts-chart-2)",
      inset: 3,
      radius: { end: 4 },
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 20000]),
      grid: true,
      axis: { ticks: { count: 4, format: formatCompact } },
    },
    y: { scale: () => scaleBand().padding(0.12) },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.page,
      rows: [
        {
          label: "Views",
          value: point.datum.views.toLocaleString("en-US"),
          color: point.color,
        },
        {
          label: "Of all views",
          value: formatShare(point.datum.views / totalViews),
        },
      ],
    }),
  },
});

export function ChartBarHorizontal() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Top pages</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Page views for the six most visited pages in the last 30 days"
      />
      <ChartTable
        caption="Page views for the top pages, last 30 days"
        columns={["Page", "Views"]}
        rows={rows.map((row) => [row.page, row.views])}
      />
    </ChartFrame>
  );
}
