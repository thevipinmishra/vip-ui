"use client";

import { defineChart, lineY } from "@tanstack/charts";
import { controlledSignal } from "@tanstack/charts/interaction/signal";
import { interactiveColorLegend } from "@tanstack/charts/legend";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scaleOrdinal } from "@tanstack/charts/scales/ordinal";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { fold } from "@tanstack/charts/transform/fold";
import { useMemo, useState } from "react";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "../vip-ui/chart";

const packages = ["core", "react", "vue"] as const;
const labels: Record<string, string> = {
  core: "Core",
  react: "React",
  vue: "Vue",
};

const weeks = [
  { week: "W36", core: 182, react: 141, vue: 38 },
  { week: "W37", core: 191, react: 149, vue: 41 },
  { week: "W38", core: 204, react: 158, vue: 43 },
  { week: "W39", core: 198, react: 160, vue: 47 },
  { week: "W40", core: 221, react: 172, vue: 52 },
  { week: "W41", core: 236, react: 181, vue: 55 },
  { week: "W42", core: 249, react: 194, vue: 61 },
  { week: "W43", core: 262, react: 203, vue: 66 },
];

const rows = fold(weeks, {
  fields: packages,
  as: { key: "package", value: "downloads" },
});

const formatDownloads = (value: number) => `${value}k`;

export function ChartColorLegend() {
  const [visible, setVisible] = useState<readonly string[]>([...packages]);

  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          lineY(rows, {
            x: "week",
            y: "downloads",
            color: "package",
            strokeWidth: 2,
          }),
        ],
        scales: {
          x: { scale: scalePoint },
          y: {
            scale: scaleLinear().domain([0, 280]),
            grid: true,
            axis: { ticks: { count: 4, format: formatDownloads } },
          },
        },
        color: {
          scale: scaleOrdinal<string, string>()
            .domain([...packages])
            .range([
              "var(--ts-chart-1)",
              "var(--ts-chart-2)",
              "var(--ts-chart-3)",
            ]),
          legend: interactiveColorLegend<string>({
            visible: controlledSignal(visible, (next) => setVisible(next)),
            placement: "bottom",
            ariaLabel: "Package visibility",
            hover: "series",
            format: (value) => labels[value] ?? value,
          }),
        },
        focus: "group-x",
        tooltip: {
          use: tooltip,
          content: (points, { primaryPoint }) => ({
            title: points[0].datum.week,
            rows: points.map((point) => ({
              label: labels[point.datum.package],
              value: formatDownloads(point.datum.downloads),
              color: point.color,
              active: point === primaryPoint,
            })),
          }),
        },
      }),
    [visible],
  );

  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Weekly downloads</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={260}
        initialWidth={520}
        ariaLabel={`Weekly downloads for the core, React and Vue packages. Showing ${visible.length} of ${packages.length}.`}
      />
      <ChartTable
        caption="Weekly downloads by package, in thousands"
        columns={["Week", ...packages.map((item) => labels[item])]}
        rows={weeks.map((row) => [
          row.week,
          ...packages.map((item) => formatDownloads(row[item])),
        ])}
      />
    </ChartFrame>
  );
}
