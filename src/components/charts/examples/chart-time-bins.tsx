"use client";

import { defineChart, rect } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scaleUtc } from "@tanstack/charts/scales/time";
import { tooltip } from "@tanstack/charts/tooltip";
import { binTimeX } from "@tanstack/charts/transform/bin-time";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "@/components/ui/chart";

const hour = 3_600_000;

const utcHour = {
  floor: (date: Date) => new Date(Math.floor(date.getTime() / hour) * hour),
  offset: (date: Date, step = 1) => new Date(date.getTime() + step * hour),
  range: (start: Date, stop: Date, step = 1) => {
    const dates: Date[] = [];
    for (
      let time = Math.ceil(start.getTime() / hour) * hour;
      time < stop.getTime();
      time += step * hour
    )
      dates.push(new Date(time));
    return dates;
  },
};

const ordersPerHour = [
  4, 2, 1, 1, 0, 2, 5, 11, 19, 26, 31, 34, 38, 33, 29, 27, 30, 36, 42, 39, 28,
  19, 11, 6,
];

const start = new Date(Date.UTC(2026, 10, 2));
const end = new Date(Date.UTC(2026, 10, 3));

const orders = ordersPerHour.flatMap((count, hourIndex) =>
  Array.from({ length: count }, (_, index) => ({
    id: `${hourIndex}-${index}`,
    placedAt: new Date(
      start.getTime() +
        hourIndex * hour +
        Math.floor(((index * 37 + hourIndex * 11) % 60) * 60_000),
    ),
  })),
);

const bins = binTimeX(orders, {
  value: "placedAt",
  interval: utcHour,
  domain: [start, end],
});

const hourFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  timeZone: "UTC",
});
const formatHour = (date: Date) => hourFormat.format(date);
const formatRange = (bin: (typeof bins)[number]) =>
  `${formatHour(bin.x1)} to ${formatHour(bin.x2)}`;

const definition = defineChart({
  marks: [
    rect(bins, {
      x1: "x1",
      x2: "x2",
      y1: () => 0,
      y2: "value",
      key: (bin) => bin.x1.toISOString(),
      fill: "var(--ts-chart-1)",
      inset: 1,
      radius: [3, 3, 0, 0],
    }),
  ],
  scales: {
    x: {
      scale: scaleUtc().domain([start, end]),
      axis: {
        ticks: {
          values: utcHour.range(start, end, 3),
          format: formatHour,
        },
      },
    },
    y: {
      scale: scaleLinear().domain([0, 45]),
      grid: true,
      axis: { ticks: { count: 3 } },
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: formatRange(point.datum),
      rows: [
        { label: "Orders", value: `${point.datum.value}`, color: point.color },
      ],
    }),
  },
});

export function ChartTimeBins() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Orders per hour</ChartTitle>
        <ChartValue>{orders.length}</ChartValue>
        <ChartDescription>November 2, 2026, UTC</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Orders per hour on November 2, 2026"
      />
      <ChartTable
        caption="Orders per hour, November 2, 2026, UTC"
        columns={["Hour", "Orders"]}
        rows={bins.map((bin) => [formatRange(bin), bin.value])}
      />
    </ChartFrame>
  );
}
