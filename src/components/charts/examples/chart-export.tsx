"use client";

import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { areaY, defineChart, lineY } from "@tanstack/charts";
import { downloadChartImage, downloadChartSvg } from "@tanstack/charts/export";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { type Key, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Chart,
  ChartAction,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "@/components/ui/chart";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";

const rows = [
  { week: "2026-07-06", signups: 1240 },
  { week: "2026-07-13", signups: 1315 },
  { week: "2026-07-20", signups: 1290 },
  { week: "2026-07-27", signups: 1420 },
  { week: "2026-08-03", signups: 1385 },
  { week: "2026-08-10", signups: 1510 },
  { week: "2026-08-17", signups: 1605 },
  { week: "2026-08-24", signups: 1570 },
  { week: "2026-08-31", signups: 1690 },
  { week: "2026-09-07", signups: 1760 },
  { week: "2026-09-14", signups: 1835 },
  { week: "2026-09-21", signups: 1910 },
];

const weekFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const fullWeekFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const countFormat = new Intl.NumberFormat("en-US");

const formatWeek = (week: string) => weekFormat.format(new Date(week));
const formatFullWeek = (week: string) =>
  `Week of ${fullWeekFormat.format(new Date(week))}`;
const formatCount = (value: number) => countFormat.format(value);

const total = rows.reduce((sum, row) => sum + row.signups, 0);

const definition = defineChart({
  marks: [
    areaY(rows, {
      x: "week",
      y: "signups",
      key: "week",
      fill: "var(--ts-chart-1)",
      fillOpacity: 0.12,
    }),
    lineY(rows, {
      x: "week",
      y: "signups",
      key: "week",
      stroke: "var(--ts-chart-1)",
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: {
      scale: scalePoint<string>().domain(rows.map((row) => row.week)),
      axis: {
        ticks: {
          values: rows
            .filter((_, index) => index % 3 === 0)
            .map((row) => row.week),
          format: formatWeek,
        },
      },
    },
    y: {
      scale: scaleLinear().domain([0, 2000]),
      grid: true,
      axis: { ticks: { count: 4, format: formatCount } },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: formatFullWeek(point.datum.week),
      rows: [
        {
          label: "Sign-ups",
          value: formatCount(point.datum.signups),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartExport() {
  const frame = useRef<HTMLElement>(null);

  function download(format: Key) {
    const target = frame.current;
    if (!target) return;
    if (format === "svg") {
      downloadChartSvg(target, "weekly-sign-ups.svg");
      return;
    }
    void downloadChartImage(target, "weekly-sign-ups.png", {
      scale: 2,
      background: getComputedStyle(target).getPropertyValue("--card"),
    });
  }

  return (
    <ChartFrame ref={frame}>
      <ChartCaption>
        <ChartTitle>Weekly sign-ups</ChartTitle>
        <ChartValue>{formatCount(total)}</ChartValue>
        <ChartDescription>July 6 to September 27, 2026</ChartDescription>
      </ChartCaption>
      <ChartAction>
        <MenuTrigger>
          <Button variant="outline" size="sm">
            <DownloadSimpleIcon size={16} aria-hidden="true" />
            Export
          </Button>
          <MenuPopover placement="bottom end">
            <MenuContent aria-label="Export format" onAction={download}>
              <MenuItem id="png">PNG image</MenuItem>
              <MenuItem id="svg">SVG image</MenuItem>
            </MenuContent>
          </MenuPopover>
        </MenuTrigger>
      </ChartAction>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Weekly sign-ups from July 6 to September 27, 2026"
      />
      <ChartTable
        caption="Weekly sign-ups, July to September 2026"
        columns={["Week", "Sign-ups"]}
        rows={rows.map((row) => [
          formatFullWeek(row.week),
          formatCount(row.signups),
        ])}
      />
    </ChartFrame>
  );
}
