"use client";

import { defineChart } from "@tanstack/charts";
import { treemap } from "@tanstack/charts/hierarchy/treemap";
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

const series = [
  { label: "Media", color: "var(--ts-chart-1)", ink: "var(--card)" },
  {
    label: "Backups",
    color: "var(--ts-chart-2)",
    ink: "color-mix(in oklab, var(--ts-chart-2) 30%, black)",
  },
  {
    label: "Documents",
    color: "var(--ts-chart-3)",
    ink: "color-mix(in oklab, var(--ts-chart-3) 30%, black)",
  },
  {
    label: "Code",
    color: "var(--ts-chart-4)",
    ink: "white",
  },
];

const labelInk = (folder?: string) =>
  series.find((item) => item.label === folder)?.ink ?? "var(--card)";

const definition = defineChart({
  marks: [
    treemap(rows, {
      path: "path",
      value: "gigabytes",
      color: (node) => node.data?.folder,
      label: "name",
      labelFill: (node) => labelInk(node.data?.folder),
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
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Treemap of storage used by folder, in gigabytes"
      />
      <ChartLegend>
        {series.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
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
