"use client";

import { barY, defineChart } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo, useState } from "react";
import {
  Chart,
  ChartAction,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "@/components/ui/chart";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import {
  average,
  formatAverage,
  formatRangeLabel,
  stateColors,
  stateLabels,
  uptimeDays,
} from "./data";

type Range = "30" | "90";

const legend = [
  { label: "Operational", color: stateColors.operational },
  { label: "Degraded", color: stateColors.degraded },
  { label: "Outage", color: stateColors.outage },
];

export function UptimeChart() {
  const [range, setRange] = useState<Range>("90");
  const rows = useMemo(() => uptimeDays.slice(-Number(range)), [range]);
  const percent = useMemo(() => average(rows), [rows]);
  const incidents = rows.filter((row) => row.state !== "operational").length;
  const labels = useMemo(
    () => new Map(rows.map((row) => [row.date, row.label])),
    [rows],
  );
  const chartRows = useMemo(
    () => rows.map((row) => ({ ...row, status: stateLabels[row.state] })),
    [rows],
  );
  const ticks = useMemo(
    () =>
      rows
        .filter((_, index) => index % (range === "90" ? 15 : 5) === 0)
        .map((row) => row.date),
    [rows, range],
  );
  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          barY(chartRows, {
            x: "date",
            y: "uptime",
            y1: 99,
            color: "status",
            inset: 0.5,
            radius: { end: 2 },
          }),
        ],
        scales: {
          x: {
            scale: () => scaleBand().padding(0.2),
            axis: {
              ticks: {
                values: ticks,
                format: (key) => labels.get(String(key)) ?? String(key),
              },
              tickLabels: { fontSize: 13 },
            },
          },
          y: {
            scale: scaleLinear().domain([99, 100]),
            grid: true,
            axis: {
              ticks: {
                count: 3,
                format: (value: number) => `${value.toFixed(1)}%`,
              },
              tickLabels: { fontSize: 13 },
            },
          },
        },
        color: {
          domain: legend.map((item) => item.label),
          range: legend.map((item) => item.color),
        },
        tooltip: {
          use: tooltip,
          content: ([point]) => ({
            title: point.datum.fullLabel,
            rows: [
              {
                label: "Uptime",
                value: `${point.datum.uptime.toFixed(2)}%`,
                color: point.color,
              },
              {
                label: "State",
                value: point.datum.state,
              },
            ],
          }),
        },
      }),
    [chartRows, labels, ticks],
  );

  return (
    <ChartFrame variant="card" className="h-full">
      <ChartCaption>
        <ChartTitle>Platform uptime</ChartTitle>
        <ChartValue>{formatAverage(percent)}</ChartValue>
        <ChartDescription className="text-[13px] leading-5">
          {formatRangeLabel(rows)} · {incidents}{" "}
          {incidents === 1 ? "incident" : "incidents"}
        </ChartDescription>
      </ChartCaption>
      <ChartAction className="w-full justify-end sm:w-auto">
        <ToggleButtonGroup
          aria-label="Uptime range"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[range]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (next === "30" || next === "90") setRange(next);
          }}
        >
          <ToggleButton id="30" variant="segmented">
            30 days
          </ToggleButton>
          <ToggleButton id="90" variant="segmented">
            90 days
          </ToggleButton>
        </ToggleButtonGroup>
      </ChartAction>
      <Chart
        definition={definition}
        height={196}
        initialWidth={640}
        ariaLabel={`Daily platform uptime for the last ${range} days`}
      />
      <ChartLegend className="justify-start text-[13px]">
        {legend.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Daily platform uptime"
        columns={["Date", "Uptime", "State"]}
        rows={rows.map((row) => [
          row.fullLabel,
          `${row.uptime.toFixed(2)}%`,
          stateLabels[row.state],
        ])}
      />
    </ChartFrame>
  );
}
