"use client";

import { defineChart, lineY } from "@tanstack/charts";
import { controlledSignal } from "@tanstack/charts/interaction/signal";
import {
  type ZoomXChange,
  type ZoomXWindow,
  zoomX,
} from "@tanstack/charts/interaction/zoom";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scaleUtc } from "@tanstack/charts/scales/time";
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
  ChartValue,
} from "@/components/ui/chart";

const DAY = 86_400_000;
const start = new Date(Date.UTC(2026, 6, 1));

const rows = Array.from({ length: 90 }, (_, index) => {
  const date = new Date(start.getTime() + index * DAY);
  const weekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;
  const base = 3400 + index * 26;
  const wave = Math.sin(index / 3) * 240 + Math.cos(index / 7) * 180;
  return {
    id: date.toISOString().slice(0, 10),
    date,
    revenue: Math.round((weekend ? base * 0.78 : base) + wave),
  };
});

const fullStart = rows[0].date;
const fullEnd = rows[rows.length - 1].date;
const initialWindow: ZoomXWindow<Date> = {
  start: rows[rows.length - 30].date,
  end: fullEnd,
};

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const fullDayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const moneyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const compactMoneyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const formatDay = (date: Date) => dayFormat.format(date);
const formatFullDay = (date: Date) => fullDayFormat.format(date);
const formatMoney = (value: number) => moneyFormat.format(value);
const formatCompactMoney = (value: number) => compactMoneyFormat.format(value);

export function ChartZoom() {
  const [visibleWindow, setVisibleWindow] =
    useState<ZoomXWindow<Date>>(initialWindow);
  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          lineY(rows, {
            x: "date",
            y: "revenue",
            stroke: "var(--ts-chart-1)",
            strokeWidth: 2,
          }),
        ],
        scales: {
          x: {
            scale: scaleUtc().domain([visibleWindow.start, visibleWindow.end]),
            axis: { ticks: { count: 5, format: formatDay } },
          },
          y: {
            scale: scaleLinear().domain([0, 6500]),
            grid: true,
            axis: {
              ticks: { count: 4, format: formatCompactMoney },
            },
          },
        },
        controls: [
          zoomX({
            window: controlledSignal<ZoomXWindow<Date>, ZoomXChange<Date>>(
              visibleWindow,
              (next) => setVisibleWindow(next),
            ),
            extent: [fullStart, fullEnd],
            scaleExtent: [1, 12],
            ariaLabel: "Visible revenue window",
            format: formatDay,
          }),
        ],
        clip: true,
      }),
    [visibleWindow],
  );

  const visibleRows = rows.filter(
    (row) => row.date >= visibleWindow.start && row.date <= visibleWindow.end,
  );
  const total = visibleRows.reduce((sum, row) => sum + row.revenue, 0);
  const isInitial =
    visibleWindow.start.getTime() === initialWindow.start.getTime() &&
    visibleWindow.end.getTime() === initialWindow.end.getTime();

  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Daily revenue</ChartTitle>
        <ChartValue>{formatMoney(total)}</ChartValue>
        <ChartDescription>
          Revenue for the visible {visibleRows.length}-day window. Drag, scroll,
          or use the keyboard to zoom and pan.
        </ChartDescription>
      </ChartCaption>
      <ChartAction>
        <Button
          variant="outline"
          size="sm"
          isDisabled={isInitial}
          onPress={() => setVisibleWindow(initialWindow)}
        >
          Reset zoom
        </Button>
      </ChartAction>
      <Chart
        definition={definition}
        height={260}
        initialWidth={520}
        ariaLabel={`Daily revenue from ${formatFullDay(visibleWindow.start)} to ${formatFullDay(visibleWindow.end)}`}
      />
      <p
        role="status"
        aria-live="polite"
        className="mt-3 text-xs text-muted-foreground"
      >
        {formatFullDay(visibleWindow.start)} to{" "}
        {formatFullDay(visibleWindow.end)}
        <span aria-hidden="true"> · </span>
        {visibleRows.length} of {rows.length} days
      </p>
      <ChartTable
        caption="Daily revenue, July to September 2026"
        columns={["Date", "Revenue"]}
        rows={rows.map((row) => [
          formatFullDay(row.date),
          formatMoney(row.revenue),
        ])}
      />
    </ChartFrame>
  );
}
