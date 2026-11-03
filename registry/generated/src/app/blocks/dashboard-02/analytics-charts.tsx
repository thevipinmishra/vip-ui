"use client";

import { areaY, barY, defineChart, group, lineY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
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
} from "../../../components/vip-ui/chart";
import type { Bucket } from "./data";

interface AreaChartProps {
  data: Bucket[];
  value: "mrr" | "workspaces";
  title: string;
  description: string;
  headline: string;
  ariaLabel: string;
  color: string;
  formatValue: (value: number) => string;
  formatAxis: (value: number) => string;
}

export function AreaChart({
  data,
  value,
  title,
  description,
  headline,
  ariaLabel,
  color,
  formatValue,
  formatAxis,
}: AreaChartProps) {
  const rows = useMemo(
    () =>
      data.map((bucket) => ({
        start: bucket.start,
        label: bucket.label,
        value: bucket[value],
      })),
    [data, value],
  );
  const labels = useMemo(
    () => new Map(rows.map((row) => [row.start, row.label])),
    [rows],
  );
  const ticks = useMemo(
    () =>
      rows.length > 9
        ? rows.filter((_, index) => index % 3 === 0).map((row) => row.start)
        : undefined,
    [rows],
  );
  const definition = useMemo(() => {
    const values = rows.map((row) => row.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = (max - min) * 0.2 || Math.abs(max) * 0.05 || 1;
    const lower = Math.max(0, min - pad);
    const upper = max + pad;
    return defineChart({
      marks: [
        decorative(
          areaY(rows, {
            id: `${value}-fill`,
            x: "start",
            y: "value",
            y1: lower,
            fill: color,
            fillOpacity: 0.14,
          }),
        ),
        lineY(rows, {
          id: `${value}-line`,
          x: "start",
          y: "value",
          stroke: color,
          strokeWidth: 2.5,
        }),
      ],
      scales: {
        x: {
          scale: scalePoint,
          axis: {
            ticks: {
              values: ticks,
              format: (key) => labels.get(String(key)) ?? String(key),
            },
            tickLabels: { fontSize: 13 },
          },
        },
        y: {
          scale: scaleLinear().domain([lower, upper]),
          grid: true,
          axis: {
            ticks: { count: 4, format: formatAxis },
            tickLabels: { fontSize: 13 },
          },
        },
      },
      tooltip: {
        use: tooltip,
        content: ([point]) => ({
          title: labels.get(point.datum.start) ?? point.datum.start,
          rows: [
            {
              label: title,
              value: formatValue(point.datum.value),
              color: point.color,
            },
          ],
        }),
      },
    });
  }, [rows, value, color, labels, ticks, formatAxis, formatValue, title]);

  return (
    <ChartFrame className="shadow-[var(--shadow-card)] ring-1 ring-border/70">
      <ChartCaption>
        <ChartTitle>{title}</ChartTitle>
        <ChartValue>{headline}</ChartValue>
        <ChartDescription className="text-[13px] leading-5">
          {description}
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={264}
        initialWidth={760}
        ariaLabel={ariaLabel}
      />
      <ChartTable
        caption={title}
        columns={["Date", title]}
        rows={rows.map((row) => [row.label, formatValue(row.value)])}
      />
    </ChartFrame>
  );
}

interface BarSeries {
  key: "newMrr" | "expansionMrr" | "signups" | "churned";
  label: string;
  color: string;
}

interface BarChartProps {
  data: Bucket[];
  series: BarSeries[];
  title: string;
  description: string;
  ariaLabel: string;
  formatValue: (value: number) => string;
  formatAxis: (value: number) => string;
}

export function BarChart({
  data,
  series,
  title,
  description,
  ariaLabel,
  formatValue,
  formatAxis,
}: BarChartProps) {
  const rows = useMemo(
    () =>
      data.flatMap((bucket) =>
        series.map((item) => ({
          start: bucket.start,
          label: bucket.label,
          series: item.label,
          value: bucket[item.key],
        })),
      ),
    [data, series],
  );
  const labels = useMemo(
    () => new Map(data.map((bucket) => [bucket.start, bucket.label])),
    [data],
  );
  const ticks = useMemo(
    () =>
      data.length > 9
        ? data
            .filter((_, index) => index % 3 === 0)
            .map((bucket) => bucket.start)
        : undefined,
    [data],
  );
  const definition = useMemo(() => {
    const max = Math.max(1, ...rows.map((row) => row.value));
    return defineChart({
      marks: [
        barY(rows, {
          x: "start",
          y: "value",
          z: "series",
          color: "series",
          layout: group({ padding: 0.12 }),
          inset: 1,
          radius: { end: 3 },
        }),
      ],
      scales: {
        x: {
          scale: () => scaleBand().padding(0.18),
          axis: {
            ticks: {
              values: ticks,
              format: (key) => labels.get(String(key)) ?? String(key),
            },
            tickLabels: { fontSize: 13 },
          },
        },
        y: {
          scale: scaleLinear().domain([0, max * 1.08]),
          grid: true,
          axis: {
            ticks: { count: 4, format: formatAxis },
            tickLabels: { fontSize: 13 },
          },
        },
      },
      color: {
        domain: series.map((item) => item.label),
        range: series.map((item) => item.color),
      },
      focus: "group-x",
      tooltip: {
        use: tooltip,
        sort: "color-domain",
        content: (points, { primaryPoint }) => ({
          title: points[0] ? labels.get(points[0].datum.start) : "",
          rows: points.map((point) => ({
            label: point.groupLabel,
            value: formatValue(point.datum.value),
            color: point.color,
            active: point === primaryPoint,
          })),
        }),
      },
    });
  }, [rows, series, labels, ticks, formatValue, formatAxis]);

  return (
    <ChartFrame className="shadow-[var(--shadow-card)] ring-1 ring-border/70">
      <ChartCaption>
        <ChartTitle>{title}</ChartTitle>
        <ChartDescription className="text-[13px] leading-5">
          {description}
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={224}
        initialWidth={900}
        ariaLabel={ariaLabel}
      />
      <ChartLegend className="text-[13px]">
        {series.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption={title}
        columns={["Date", ...series.map((item) => item.label)]}
        rows={data.map((bucket) => [
          bucket.label,
          ...series.map((item) => formatValue(bucket[item.key])),
        ])}
      />
    </ChartFrame>
  );
}
