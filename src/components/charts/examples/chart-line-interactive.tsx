"use client";

import { defineChart, lineY } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo, useState } from "react";
import {
  Chart,
  ChartAction,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";
import { ToggleButton } from "@/components/ui/toggle-button";

const days = [
  { date: "2026-09-29", current: 3.2, previous: 4.1 },
  { date: "2026-09-30", current: 2.9, previous: 3.8 },
  { date: "2026-10-01", current: 3.4, previous: 4.4 },
  { date: "2026-10-02", current: 4.1, previous: 4.9 },
  { date: "2026-10-03", current: 6.8, previous: 8.1 },
  { date: "2026-10-04", current: 7.2, previous: 8.6 },
  { date: "2026-10-05", current: 3.6, previous: 4.5 },
  { date: "2026-10-06", current: 2.8, previous: 3.9 },
  { date: "2026-10-07", current: 2.5, previous: 3.6 },
  { date: "2026-10-08", current: 2.7, previous: 3.9 },
  { date: "2026-10-09", current: 3.3, previous: 4.6 },
  { date: "2026-10-10", current: 5.9, previous: 7.4 },
  { date: "2026-10-11", current: 6.1, previous: 7.9 },
  { date: "2026-10-12", current: 2.9, previous: 4.0 },
];

const current = { label: "Last 14 days", color: "var(--ts-chart-1)" };
const previous = {
  label: "Previous 14 days",
  color: "var(--muted-foreground)",
};

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const formatDay = (date: string) => dayFormat.format(new Date(date));
const formatHours = (value: number) => `${value.toFixed(1)} h`;

const ticks = days
  .filter((_, index) => (days.length - 1 - index) % 2 === 0)
  .map((day) => day.date);

export function ChartLineInteractive() {
  const [compare, setCompare] = useState(true);
  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          ...(compare
            ? [
                lineY(days, {
                  id: "previous",
                  x: "date",
                  y: "previous",
                  stroke: previous.color,
                  strokeWidth: 1.5,
                  strokeDasharray: "4 4",
                }),
              ]
            : []),
          lineY(days, {
            id: "current",
            x: "date",
            y: "current",
            stroke: current.color,
            strokeWidth: 2,
          }),
        ],
        scales: {
          x: {
            scale: scalePoint,
            axis: { ticks: { values: ticks, format: formatDay } },
          },
          y: {
            scale: scaleLinear().domain([0, 10]),
            grid: true,
            axis: {
              ticks: { count: 5, format: (value: number) => `${value} h` },
            },
          },
        },
        focus: "group-x",
        tooltip: {
          use: tooltip,
          content: ([point]) => ({
            title: formatDay(point.datum.date),
            rows: [
              {
                label: current.label,
                value: formatHours(point.datum.current),
                color: current.color,
              },
              ...(compare
                ? [
                    {
                      label: previous.label,
                      value: formatHours(point.datum.previous),
                      color: previous.color,
                    },
                  ]
                : []),
            ],
          }),
        },
      }),
    [compare],
  );

  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>First reply time</ChartTitle>
      </ChartCaption>
      <ChartAction>
        <ToggleButton
          isSelected={compare}
          onChange={setCompare}
          variant="segmented"
        >
          Compare
        </ToggleButton>
      </ChartAction>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel={`Median hours to the first support reply for the last 14 days${compare ? ", compared with the previous 14 days" : ""}`}
      />
      <ChartLegend>
        <ChartLegendItem color={current.color} swatch="line">
          {current.label}
        </ChartLegendItem>
        {compare && (
          <ChartLegendItem color={previous.color} swatch="dashed">
            {previous.label}
          </ChartLegendItem>
        )}
      </ChartLegend>
      <ChartTable
        caption="Median hours to the first reply"
        columns={["Date", current.label, previous.label]}
        rows={days.map((day) => [
          formatDay(day.date),
          day.current,
          day.previous,
        ])}
      />
    </ChartFrame>
  );
}
