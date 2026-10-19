"use client";

import { defineChart, dot, ruleY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
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

const target = 2.5;

const rows = [
  { page: "/", kilobytes: 1480, lcp: 2.4 },
  { page: "/pricing", kilobytes: 920, lcp: 2.3 },
  { page: "/docs", kilobytes: 760, lcp: 1.5 },
  { page: "/docs/installation", kilobytes: 690, lcp: 1.4 },
  { page: "/docs/components/table", kilobytes: 1180, lcp: 2.2 },
  { page: "/docs/components/chart", kilobytes: 1640, lcp: 2.2 },
  { page: "/blog", kilobytes: 1320, lcp: 2.3 },
  { page: "/blog/release-notes-2-0", kilobytes: 2240, lcp: 3.6 },
  { page: "/blog/design-tokens", kilobytes: 1870, lcp: 2.4 },
  { page: "/changelog", kilobytes: 840, lcp: 1.6 },
  { page: "/about", kilobytes: 1050, lcp: 1.4 },
  { page: "/careers", kilobytes: 1410, lcp: 1.7 },
  { page: "/contact", kilobytes: 610, lcp: 1.2 },
  { page: "/login", kilobytes: 480, lcp: 1.6 },
  { page: "/signup", kilobytes: 560, lcp: 1.3 },
  { page: "/dashboard", kilobytes: 1960, lcp: 3.9 },
  { page: "/dashboard/settings", kilobytes: 1220, lcp: 2.1 },
  { page: "/templates", kilobytes: 2580, lcp: 3.4 },
  { page: "/showcase", kilobytes: 3120, lcp: 4.8 },
  { page: "/legal/privacy", kilobytes: 390, lcp: 0.9 },
];

const formatSize = (kilobytes: number) =>
  `${(kilobytes / 1000).toLocaleString("en-US", { maximumFractionDigits: 2 })} MB`;

const definition = defineChart({
  marks: [
    decorative(
      ruleY([target], {
        stroke: "var(--muted-foreground)",
        strokeDasharray: "4 4",
      }),
    ),
    dot(rows, {
      x: "kilobytes",
      y: "lcp",
      key: "page",
      r: 4.5,
      fill: "var(--ts-chart-1)",
      fillOpacity: 0.8,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 3500]),
      grid: true,
      axis: {
        label: "Page weight",
        ticks: { count: 4, format: formatSize },
      },
    },
    y: {
      scale: scaleLinear().domain([0, 6]),
      grid: true,
      axis: {
        label: "LCP",
        ticks: { count: 4, format: (value: number) => `${value} s` },
      },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.page,
      rows: [
        {
          label: "LCP",
          value: `${point.datum.lcp.toFixed(1)} s`,
          color: point.color,
        },
        { label: "Page weight", value: formatSize(point.datum.kilobytes) },
      ],
    }),
  },
});

export function ChartScatterDefault() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Page weight and load time</ChartTitle>
        <ChartDescription>
          Largest contentful paint (LCP) for 20 pages. The dashed line is the{" "}
          {target} s target.
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel={`Largest contentful paint against page weight for ${rows.length} pages, with a ${target} second target`}
      />
      <ChartTable
        caption="Page weight and largest contentful paint"
        columns={["Page", "Page weight", "LCP (s)"]}
        rows={rows.map((row) => [row.page, formatSize(row.kilobytes), row.lcp])}
      />
    </ChartFrame>
  );
}
