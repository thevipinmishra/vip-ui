"use client";

import { areaY, defineChart, lineY, stack } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { Chart } from "@tanstack/charts/react/core";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo, useState } from "react";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import {
  ChartPlot,
  galleryRenderer,
  groupTooltip,
  valueTooltip,
} from "./chart-plot";

const visits = [
  { month: "Jan", value: 32 },
  { month: "Feb", value: 41 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 56 },
  { month: "May", value: 63 },
  { month: "Jun", value: 78 },
];
const visitsChart = defineChart({
  marks: [
    decorative(
      areaY(visits, {
        x: "month",
        y: "value",
        fill: "var(--ts-chart-1)",
        fillOpacity: 0.19,
      }),
    ),
    lineY(visits, {
      x: "month",
      y: "value",
      stroke: "var(--ts-chart-1)",
      strokeWidth: 2.5,
    }),
  ],
  scales: {
    x: { scale: scalePoint },
    y: { scale: scaleLinear().domain([0, 90]), grid: true },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) =>
      valueTooltip(
        point.datum.month,
        "Visits",
        `${point.datum.value}k visits`,
        point.color,
      ),
  },
});

const sources = [
  { month: "Jan", direct: 18, search: 14 },
  { month: "Feb", direct: 22, search: 19 },
  { month: "Mar", direct: 26, search: 16 },
  { month: "Apr", direct: 31, search: 25 },
  { month: "May", direct: 34, search: 29 },
  { month: "Jun", direct: 40, search: 38 },
];
const sourceRows = sources.flatMap(({ month, direct, search }) => [
  { month, series: "Direct", value: direct },
  { month, series: "Search", value: search },
]);
const sourcesChart = defineChart({
  marks: [
    areaY(sourceRows, {
      x: "month",
      y: "value",
      z: "series",
      color: "series",
      layout: stack(),
      fillOpacity: 0.82,
    }),
  ],
  scales: {
    x: { scale: scalePoint },
    y: { scale: scaleLinear().domain([0, 90]), grid: true },
  },
  color: {
    domain: ["Direct", "Search"],
    range: ["var(--ts-chart-1)", "var(--ts-chart-2)"],
  },
  focus: "group-x",
  tooltip: {
    use: tooltip,
    sort: "color-domain",
    content: (points, { primaryPoint }) =>
      groupTooltip<(typeof sourceRows)[number]>(
        points[0].datum.month,
        points,
        (row) => `${row.value}k visits`,
        primaryPoint,
      ),
  },
});

const forecast = [
  { month: "Jan", low: 22, value: 29, high: 35 },
  { month: "Feb", low: 28, value: 34, high: 42 },
  { month: "Mar", low: 30, value: 39, high: 46 },
  { month: "Apr", low: 36, value: 43, high: 52 },
  { month: "May", low: 40, value: 51, high: 60 },
  { month: "Jun", low: 46, value: 57, high: 68 },
];
const forecastChart = defineChart({
  marks: [
    decorative(
      areaY(forecast, {
        x: "month",
        y1: "low",
        y2: "high",
        fill: "var(--ts-chart-3)",
        fillOpacity: 0.2,
      }),
    ),
    lineY(forecast, {
      x: "month",
      y: "value",
      stroke: "var(--ts-chart-3)",
      strokeWidth: 2.5,
    }),
  ],
  scales: {
    x: { scale: scalePoint },
    y: { scale: scaleLinear().domain([0, 75]), grid: true },
  },
  tooltip: {
    use: tooltip,
    content: ([point], { pinned }) => ({
      title: point.datum.month,
      rows: [
        {
          label: "Forecast",
          value: `${point.datum.value}k`,
          color: point.color,
        },
        ...(pinned
          ? [
              {
                label: "Estimate range",
                value: `${point.datum.low}–${point.datum.high}k`,
              },
            ]
          : []),
      ],
    }),
  },
});

const visitHistory = [
  { month: "Jul", value: 35 },
  { month: "Aug", value: 39 },
  { month: "Sep", value: 45 },
  { month: "Oct", value: 49 },
  { month: "Nov", value: 47 },
  { month: "Dec", value: 54 },
  ...visits,
];

export function AreaWindow() {
  const [period, setPeriod] = useState<"6" | "12">("6");
  const rows = useMemo(() => visitHistory.slice(-Number(period)), [period]);
  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          decorative(
            areaY(rows, {
              id: "visits-fill",
              x: "month",
              y: "value",
              fill: "var(--ts-chart-1)",
              fillOpacity: 0.19,
            }),
          ),
          lineY(rows, {
            id: "visits-line",
            x: "month",
            y: "value",
            stroke: "var(--ts-chart-1)",
            strokeWidth: 2.5,
          }),
        ],
        scales: {
          x: { scale: scalePoint },
          y: { scale: scaleLinear().domain([0, 90]), grid: true },
        },
        tooltip: {
          use: tooltip,
          content: ([point]) =>
            valueTooltip(
              point.datum.month,
              "Visits",
              `${point.datum.value}k visits`,
              point.color,
            ),
        },
      }),
    [rows],
  );

  return (
    <ChartPlot
      title={`Workspace visits over ${period} months, in thousands`}
      columns={["Month", "Visits (thousands)"]}
      rows={rows.map((row) => [row.month, row.value])}
      controls={
        <ToggleButtonGroup
          aria-label="Visit period"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[period]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (next === "6" || next === "12") setPeriod(next);
          }}
        >
          <ToggleButton id="6" variant="segmented">
            6 months
          </ToggleButton>
          <ToggleButton id="12" variant="segmented">
            12 months
          </ToggleButton>
        </ToggleButtonGroup>
      }
    >
      <Chart
        definition={definition}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel={`Workspace visits over the last ${period} months, in thousands`}
      />
    </ChartPlot>
  );
}

export function AreaVisits() {
  return (
    <ChartPlot
      title="Workspace visits by month, in thousands"
      columns={["Month", "Visits (thousands)"]}
      rows={visits.map((r) => [r.month, r.value])}
    >
      <Chart
        definition={visitsChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Monthly workspace visits, January to June, in thousands"
      />
    </ChartPlot>
  );
}
export function AreaStacked() {
  return (
    <ChartPlot
      title="Visits by channel, in thousands"
      columns={["Month", "Direct", "Search"]}
      rows={sources.map((r) => [r.month, r.direct, r.search])}
      legend={[
        { label: "Direct", color: "var(--ts-chart-1)" },
        { label: "Search", color: "var(--ts-chart-2)" },
      ]}
    >
      <Chart
        definition={sourcesChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Direct and search visits by month, January to June, in thousands"
      />
    </ChartPlot>
  );
}
export function AreaRange() {
  return (
    <ChartPlot
      title="Forecast with low and high estimates, in thousands"
      columns={["Month", "Low", "Forecast", "High"]}
      rows={forecast.map((r) => [r.month, r.low, r.value, r.high])}
    >
      <Chart
        definition={forecastChart}
        renderer={galleryRenderer}
        height={222}
        initialWidth={520}
        ariaLabel="Monthly signup forecast and low to high range, January to June, in thousands"
      />
    </ChartPlot>
  );
}
