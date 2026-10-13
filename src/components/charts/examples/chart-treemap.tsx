"use client";

import { defineChart } from "@tanstack/charts";
import { treemap } from "@tanstack/charts/hierarchy/treemap";
import { Chart } from "@tanstack/charts/react";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const rows = [
  { path: "Storage/Media/Video", folder: "Media", gigabytes: 182 },
  { path: "Storage/Media/Photos", folder: "Media", gigabytes: 96 },
  { path: "Storage/Media/Audio", folder: "Media", gigabytes: 31 },
  { path: "Storage/Backups/Daily", folder: "Backups", gigabytes: 120 },
  { path: "Storage/Backups/Weekly", folder: "Backups", gigabytes: 64 },
  { path: "Storage/Documents/Contracts", folder: "Documents", gigabytes: 38 },
  { path: "Storage/Documents/Reports", folder: "Documents", gigabytes: 27 },
  { path: "Storage/Documents/Slides", folder: "Documents", gigabytes: 19 },
  { path: "Storage/Code/Builds", folder: "Code", gigabytes: 44 },
  { path: "Storage/Code/Packages", folder: "Code", gigabytes: 23 },
];

const series = ["Media", "Backups", "Documents", "Code"].map(
  (folder, index) => ({ label: folder, color: `var(--ts-chart-${index + 1})` }),
);

const definition = defineChart({
  marks: [
    treemap(rows, {
      path: "path",
      value: "gigabytes",
      color: (node) => node.data?.folder,
      label: "name",
      labelFill: "var(--card)",
      labelFontWeight: 600,
      paddingInner: 2,
      sort: (left, right) => right.value - left.value,
      radius: 4,
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: series.map((item) => item.label),
    range: series.map((item) => item.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.name,
      rows: [
        {
          label: point.datum.data?.folder ?? "Folder",
          value: `${point.datum.value} GB`,
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartTreemap() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Storage</ChartTitle>
        <ChartDescription>Space used by folder, in gigabytes</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Treemap of storage used by folder, in gigabytes"
      />
      <ChartLegend items={series} />
      <ChartTable
        caption="Storage used by folder, in gigabytes"
        columns={["Folder", "Subfolder", "Gigabytes"]}
        rows={rows.map((row) => [
          row.folder,
          row.path.split("/").at(-1) ?? row.path,
          row.gigabytes,
        ])}
      />
    </ChartFrame>
  );
}
