"use client";

import { defineChart, lineY } from "@tanstack/charts";
import {
  type BrushRange,
  type BrushXChange,
  brushX,
} from "@tanstack/charts/interaction/brush";
import { controlledSignal } from "@tanstack/charts/interaction/signal";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Chart,
  ChartAction,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const rows = [
  { week: 1, signups: 214 },
  { week: 2, signups: 236 },
  { week: 3, signups: 268 },
  { week: 4, signups: 255 },
  { week: 5, signups: 302 },
  { week: 6, signups: 338 },
  { week: 7, signups: 356 },
  { week: 8, signups: 329 },
  { week: 9, signups: 391 },
  { week: 10, signups: 428 },
  { week: 11, signups: 446 },
  { week: 12, signups: 487 },
];

const weeks = rows.map((row) => row.week);
const initialRange: BrushRange<number> = { start: 3, end: 8 };

const countFormat = new Intl.NumberFormat("en-US");

const formatCount = (value: number) => countFormat.format(value);
const formatWeekTick = (week: number) => `W${week}`;

export function ChartBrush() {
  const [range, setRange] = useState<BrushRange<number>>(initialRange);
  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          lineY(rows, {
            x: "week",
            y: "signups",
            points: true,
            stroke: "var(--ts-chart-1)",
            strokeWidth: 2,
          }),
        ],
        scales: {
          x: {
            scale: scaleLinear().domain([1, 12]),
            axis: { ticks: { count: 6, format: formatWeekTick } },
          },
          y: {
            scale: scaleLinear().domain([0, 550]),
            grid: true,
            axis: { ticks: { count: 4, format: formatCount } },
          },
        },
        controls: [
          brushX({
            range: controlledSignal<BrushRange<number>, BrushXChange<number>>(
              range,
              (next, { reason }) => {
                if (reason.type === "commit") setRange(next);
              },
            ),
            values: weeks,
            format: (week) => `Week ${week}`,
            ariaLabel: "Reporting range",
            startAriaLabel: "Range start",
            endAriaLabel: "Range end",
            selectionStyle: {
              fill: "var(--ts-chart-1)",
              fillOpacity: 0.08,
              stroke: "var(--ts-chart-1)",
              strokeOpacity: 0.4,
              strokeWidth: 1,
            },
            handleStyle: { fill: "var(--ts-chart-1)", fillOpacity: 0 },
          }),
        ],
      }),
    [range],
  );

  const selectedWeeks = rows.filter(
    (row) => row.week >= range.start && row.week <= range.end,
  );
  const signups = selectedWeeks.reduce((sum, row) => sum + row.signups, 0);
  const isInitial =
    range.start === initialRange.start && range.end === initialRange.end;

  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Weekly signups</ChartTitle>
        <ChartDescription>
          Twelve weeks of new accounts. Drag the handles to choose a reporting
          range.
        </ChartDescription>
      </ChartCaption>
      <ChartAction>
        <Button
          variant="outline"
          size="sm"
          isDisabled={isInitial}
          onPress={() => setRange(initialRange)}
        >
          Reset range
        </Button>
      </ChartAction>
      <Chart
        definition={definition}
        height={260}
        initialWidth={520}
        ariaLabel={`Weekly signups for 12 weeks with a reporting range from week ${range.start} to week ${range.end}`}
      />
      <p
        role="status"
        aria-live="polite"
        className="mt-3 text-xs text-muted-foreground"
      >
        Week {range.start} to week {range.end}
        <span aria-hidden="true"> · </span>
        {selectedWeeks.length} weeks
        <span aria-hidden="true"> · </span>
        {formatCount(signups)} signups
      </p>
      <ChartTable
        caption="Weekly signups"
        columns={["Week", "Signups"]}
        rows={rows.map((row) => [`Week ${row.week}`, formatCount(row.signups)])}
      />
    </ChartFrame>
  );
}
