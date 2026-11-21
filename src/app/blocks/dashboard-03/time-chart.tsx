"use client";

import {
  areaY,
  defineChart,
  lineY,
  rect,
  ruleX,
  ruleY,
} from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo } from "react";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "@/components/ui/chart";
import {
  type Deploy,
  deploys,
  formatClock,
  formatDayClock,
  incident,
  type Point,
  type Range,
} from "./data";

type Key = "requests" | "errorRate" | "p50" | "p95" | "p99";

export interface TimeSeries {
  key: Key;
  label: string;
  color: string;
  fill?: boolean;
}

interface TimeChartProps {
  points: Point[];
  range: Range;
  series: TimeSeries[];
  title: string;
  value: string;
  description: string;
  ariaLabel: string;
  threshold?: { value: number; label: string };
  format: (value: number) => string;
  formatAxis: (value: number) => string;
  height?: number;
}

const tickStep: Record<Range, number> = {
  "1h": 10 * 60_000,
  "6h": 60 * 60_000,
  "24h": 4 * 60 * 60_000,
};

export function TimeChart({
  points,
  range,
  series,
  title,
  value,
  description,
  ariaLabel,
  threshold,
  format,
  formatAxis,
  height = 200,
}: TimeChartProps) {
  const first = points[0].time;
  const last = points[points.length - 1].time;
  const markers = useMemo(
    () =>
      deploys.filter((deploy) => deploy.time >= first && deploy.time <= last),
    [first, last],
  );
  const shade = useMemo(
    () =>
      incident.end >= first && incident.start <= last
        ? [
            {
              x1: Math.max(first, incident.start),
              x2: Math.min(last, incident.end),
            },
          ]
        : [],
    [first, last],
  );

  const definition = useMemo(() => {
    const max = Math.max(
      threshold?.value ?? 0,
      ...points.flatMap((point) => series.map((item) => point[item.key])),
    );
    const top = max * 1.12;
    const stepSize = tickStep[range];
    const ticks: number[] = [];
    for (
      let tick = Math.ceil(first / stepSize) * stepSize;
      tick <= last;
      tick += stepSize
    ) {
      ticks.push(tick);
    }
    const byTime = new Map(points.map((point) => [point.time, point]));
    const changeAt = new Map<number, Deploy>(
      markers.map((deploy) => [
        Math.round(deploy.time / 300_000) * 300_000,
        deploy,
      ]),
    );
    return defineChart({
      marks: [
        decorative(
          rect(shade, {
            x1: "x1",
            x2: "x2",
            y1: () => 0,
            y2: () => top,
            fill: "var(--warning)",
            fillOpacity: 0.09,
          }),
        ),
        decorative(
          ruleX(markers, {
            x: "time",
            stroke: "var(--muted-foreground)",
            strokeDasharray: "2 3",
            strokeOpacity: 0.8,
          }),
        ),
        ...(threshold
          ? [
              decorative(
                ruleY([threshold.value], {
                  stroke: "var(--destructive)",
                  strokeDasharray: "4 4",
                  strokeOpacity: 0.6,
                }),
              ),
            ]
          : []),
        ...series.flatMap((item) => [
          ...(item.fill
            ? [
                decorative(
                  areaY(points, {
                    id: `${item.key}-fill`,
                    x: "time",
                    y: item.key,
                    fill: item.color,
                    fillOpacity: 0.12,
                  }),
                ),
              ]
            : []),
          lineY(points, {
            id: item.key,
            x: "time",
            y: item.key,
            stroke: item.color,
            strokeWidth: series.length > 1 ? 1.5 : 2,
          }),
        ]),
      ],
      scales: {
        x: {
          scale: scaleLinear().domain([first, last]),
          axis: {
            ticks: {
              values: ticks,
              format: (tick) => formatClock(Number(tick)),
            },
          },
        },
        y: {
          scale: scaleLinear().domain([0, top]),
          grid: true,
          axis: { ticks: { count: 4, format: formatAxis } },
        },
      },
      focus: "group-x",
      tooltip: {
        use: tooltip,
        content: (hits) => {
          const time = Number(hits[0].datum.time);
          const point = byTime.get(time);
          const change = changeAt.get(time);
          const inIncident = time >= incident.start && time <= incident.end;
          return {
            title: `${formatDayClock(time)} UTC`,
            rows: [
              ...series.map((item) => ({
                label: item.label,
                value: point ? format(point[item.key]) : "",
                color: item.color,
              })),
              ...(change
                ? [{ label: `${change.service}: ${change.title}`, value: "" }]
                : []),
              ...(inIncident
                ? [{ label: incident.title, value: "Incident" }]
                : []),
            ],
          };
        },
      },
    });
  }, [
    points,
    series,
    range,
    first,
    last,
    markers,
    shade,
    threshold,
    format,
    formatAxis,
  ]);

  return (
    <ChartFrame variant="card">
      <ChartCaption>
        <ChartTitle>{title}</ChartTitle>
        <ChartValue className="text-xl">{value}</ChartValue>
        <ChartDescription className="text-[13px] leading-5">
          {description}
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={height}
        initialWidth={560}
        ariaLabel={ariaLabel}
      />
      <ChartLegend className="justify-start text-xs">
        {series.map((item) => (
          <ChartLegendItem key={item.key} color={item.color} swatch="line">
            {item.label}
          </ChartLegendItem>
        ))}
        {threshold && (
          <ChartLegendItem color="var(--destructive)" swatch="dashed">
            {threshold.label}
          </ChartLegendItem>
        )}
        {markers.length > 0 && (
          <ChartLegendItem color="var(--muted-foreground)" swatch="dashed">
            Change
          </ChartLegendItem>
        )}
        {shade.length > 0 && (
          <ChartLegendItem color="color-mix(in oklab, var(--warning) 35%, var(--card))">
            Incident
          </ChartLegendItem>
        )}
      </ChartLegend>
      <ChartTable
        caption={title}
        columns={["Time, UTC", ...series.map((item) => item.label)]}
        rows={points.map((point) => [
          formatDayClock(point.time),
          ...series.map((item) => format(point[item.key])),
        ])}
      />
    </ChartFrame>
  );
}
