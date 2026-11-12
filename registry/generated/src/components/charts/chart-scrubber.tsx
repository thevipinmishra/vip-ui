"use client";

import { areaY, defineChart, lineY } from "@tanstack/charts";
import {
  type HandleXChange,
  handleX,
} from "@tanstack/charts/interaction/handle";
import { controlledSignal } from "@tanstack/charts/interaction/signal";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scaleUtc } from "@tanstack/charts/scales/time";
import { useMemo, useState } from "react";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "../vip-ui/chart";

const hourly = [
  182, 141, 118, 104, 112, 168, 296, 512, 784, 936, 1012, 1048, 986, 1034, 1102,
  1068, 982, 864, 702, 588, 472, 391, 306, 231,
];

const rows = hourly.map((requests, hour) => ({
  time: new Date(Date.UTC(2026, 9, 14, hour)),
  requests,
}));

const times = rows.map((row) => row.time);

const hourFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  timeZone: "UTC",
});
const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});
const countFormat = new Intl.NumberFormat("en-US");

const formatHour = (date: Date) => hourFormat.format(date);
const formatTime = (date: Date) => timeFormat.format(date);
const formatCount = (value: number) => countFormat.format(value);
const requestsAt = (time: Date) =>
  rows.find((row) => row.time.getTime() === time.getTime())?.requests ?? 0;

export function ChartScrubber() {
  const [time, setTime] = useState(times[14]);
  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          areaY(rows, {
            x: "time",
            y: "requests",
            fill: "var(--ts-chart-1)",
            fillOpacity: 0.1,
          }),
          lineY(rows, {
            x: "time",
            y: "requests",
            stroke: "var(--ts-chart-1)",
            strokeWidth: 2,
          }),
        ],
        scales: {
          x: {
            scale: scaleUtc,
            axis: { ticks: { count: 6, format: formatHour } },
          },
          y: {
            scale: scaleLinear().domain([0, 1200]),
            grid: true,
            axis: { ticks: { count: 3, format: formatCount } },
          },
        },
        margin: { top: 32 },
        controls: [
          handleX({
            value: controlledSignal<Date, HandleXChange<Date>>(time, (next) =>
              setTime(next),
            ),
            values: times,
            cross: { edge: "top", offset: 16 },
            trackStyle: { stroke: "var(--border)", strokeWidth: 2 },
            ruleStyle: { stroke: "var(--ts-chart-1)", strokeOpacity: 0.4 },
            handleStyle: {
              fill: "var(--ts-chart-1)",
              stroke: "var(--card)",
              strokeWidth: 2,
            },
            ariaLabel: "Hour",
            format: (date) =>
              `${formatTime(date)}, ${formatCount(requestsAt(date))} requests`,
          }),
        ],
        tooltip: false,
        keyboard: false,
        pointer: false,
      }),
    [time],
  );

  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Requests per hour</ChartTitle>
        <ChartValue>{formatCount(requestsAt(time))}</ChartValue>
        <ChartDescription>
          October 14, 2026 at {formatTime(time)} UTC
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Requests per hour on October 14, 2026, with a handle to choose an hour"
      />
      <ChartTable
        caption="Requests per hour, October 14, 2026, UTC"
        columns={["Hour", "Requests"]}
        rows={rows.map((row) => [
          formatTime(row.time),
          formatCount(row.requests),
        ])}
      />
    </ChartFrame>
  );
}
