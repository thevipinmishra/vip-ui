"use client";

import { XIcon } from "@phosphor-icons/react";
import { areaY, defineChart, lineY } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
  TooltipChart,
} from "../vip-ui/chart";

const days = [
  { day: "Oct 20", kwh: 18.4, peak: 3.1, solar: 6.2 },
  { day: "Oct 21", kwh: 21.2, peak: 3.8, solar: 4.1 },
  { day: "Oct 22", kwh: 19.7, peak: 3.4, solar: 5.6 },
  { day: "Oct 23", kwh: 24.6, peak: 4.6, solar: 2.3 },
  { day: "Oct 24", kwh: 22.9, peak: 4.1, solar: 3.4 },
  { day: "Oct 25", kwh: 27.3, peak: 5.2, solar: 6.8 },
  { day: "Oct 26", kwh: 25.8, peak: 4.9, solar: 7.1 },
  { day: "Oct 27", kwh: 20.1, peak: 3.6, solar: 5.2 },
  { day: "Oct 28", kwh: 19.3, peak: 3.3, solar: 4.8 },
  { day: "Oct 29", kwh: 23.4, peak: 4.4, solar: 2.9 },
  { day: "Oct 30", kwh: 21.8, peak: 3.9, solar: 3.7 },
  { day: "Oct 31", kwh: 26.1, peak: 5, solar: 1.9 },
  { day: "Nov 1", kwh: 28.7, peak: 5.6, solar: 6.4 },
  { day: "Nov 2", kwh: 27.2, peak: 5.3, solar: 6.9 },
];

type Day = (typeof days)[number];

const average = days.reduce((total, row) => total + row.kwh, 0) / days.length;
const formatKwh = (value: number) => `${value.toFixed(1)} kWh`;
const formatKw = (value: number) => `${value.toFixed(1)} kW`;

const definition = defineChart({
  marks: [
    areaY(days, {
      x: "day",
      y: "kwh",
      fill: "var(--ts-chart-1)",
      fillOpacity: 0.12,
    }),
    lineY(days, {
      x: "day",
      y: "kwh",
      stroke: "var(--ts-chart-1)",
      strokeWidth: 2,
      points: true,
    }),
  ],
  scales: {
    x: {
      scale: scalePoint,
      axis: { ticks: { values: ["Oct 20", "Oct 25", "Oct 30", "Nov 2"] } },
    },
    y: {
      scale: scaleLinear().domain([0, 32]),
      grid: true,
      axis: { ticks: { count: 4, format: (value: number) => `${value}` } },
    },
  },
  focus: "nearest-x",
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.day,
      rows: [
        {
          label: "Usage",
          value: formatKwh(point.datum.kwh),
          color: point.color,
        },
      ],
    }),
  },
});

function DayDetail({ day, onClose }: { day: Day; onClose: () => void }) {
  const change = day.kwh - average;
  return (
    <div className="grid w-52 gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-foreground">{day.day}</span>
        <button
          type="button"
          aria-label="Close details"
          onClick={onClose}
          className="-me-1 grid size-6 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring"
        >
          <XIcon aria-hidden="true" className="size-3.5" />
        </button>
      </div>
      <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 tabular-nums">
        <dt className="text-muted-foreground">Usage</dt>
        <dd className="text-end text-foreground">{formatKwh(day.kwh)}</dd>
        <dt className="text-muted-foreground">Peak draw</dt>
        <dd className="text-end text-foreground">{formatKw(day.peak)}</dd>
        <dt className="text-muted-foreground">Solar</dt>
        <dd className="text-end text-foreground">{formatKwh(day.solar)}</dd>
        <dt className="text-muted-foreground">Versus average</dt>
        <dd className="text-end text-foreground">
          {change >= 0 ? "+" : "−"}
          {formatKwh(Math.abs(change))}
        </dd>
      </dl>
    </div>
  );
}

export function ChartTooltip() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Energy use</ChartTitle>
        <ChartDescription>
          Hover for the total. Click a day to pin its details.
        </ChartDescription>
      </ChartCaption>
      <TooltipChart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel={`Daily energy use for ${days.length} days, averaging ${formatKwh(average)}. Select a day to pin a detailed breakdown.`}
        renderTooltipBody={({ points, defaultBody, pinned, dismiss }) => {
          const day = points[0]?.datum;
          return pinned && day ? (
            <DayDetail day={day} onClose={dismiss} />
          ) : (
            defaultBody
          );
        }}
      />
      <ChartTable
        caption="Daily energy use"
        columns={["Day", "Usage", "Peak draw", "Solar"]}
        rows={days.map((row) => [
          row.day,
          formatKwh(row.kwh),
          formatKw(row.peak),
          formatKwh(row.solar),
        ])}
      />
    </ChartFrame>
  );
}
