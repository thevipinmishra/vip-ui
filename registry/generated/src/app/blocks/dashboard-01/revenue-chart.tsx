"use client";

import { areaY, defineChart, lineY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { motion } from "@tanstack/charts/motion";
import { Chart } from "@tanstack/charts/react/core";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo, useState } from "react";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTitle,
} from "../../../components/vip-ui/chart";
import { ToggleButton } from "../../../components/vip-ui/toggle-button";
import { ToggleButtonGroup } from "../../../components/vip-ui/toggle-button-group";
import { revenue } from "./data";

const renderer = motion({
  initial: false,
  transition: { type: "spring", stiffness: 420, damping: 38 },
});

const periods = {
  "7": "Last 7 days",
  "14": "Last 14 days",
  "30": "Last 30 days",
} as const;
type Period = keyof typeof periods;

export function RevenueChart() {
  const [period, setPeriod] = useState<Period>("30");
  const rows = useMemo(() => revenue.slice(-Number(period)), [period]);
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          decorative(
            areaY(rows, {
              id: "revenue-fill",
              x: "day",
              y: "value",
              fill: "var(--ts-chart-1)",
              fillOpacity: 0.16,
            }),
          ),
          lineY(rows, {
            id: "revenue-line",
            x: "day",
            y: "value",
            stroke: "var(--ts-chart-1)",
            strokeWidth: 2.5,
          }),
        ],
        scales: {
          x: { scale: scalePoint },
          y: { scale: scaleLinear().domain([0, 4.5]), grid: true },
        },
        tooltip: {
          use: tooltip,
          content: ([point]) => ({
            title: point.datum.day,
            rows: [
              {
                label: "Revenue",
                value: `$${(point.datum.value * 1000).toLocaleString("en-US")}`,
                color: point.color,
              },
            ],
          }),
        },
      }),
    [rows],
  );

  return (
    <ChartFrame className="shadow-[var(--shadow-card)] ring-1 ring-border/70">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <ChartCaption className="mb-0">
          <ChartTitle>Revenue</ChartTitle>
          <ChartDescription>
            ${(total * 1000).toLocaleString("en-US")} in the{" "}
            {periods[period].toLowerCase()}
          </ChartDescription>
        </ChartCaption>
        <ToggleButtonGroup
          aria-label="Revenue period"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[period]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (next === "7" || next === "14" || next === "30") setPeriod(next);
          }}
        >
          <ToggleButton id="7" variant="segmented">
            7 days
          </ToggleButton>
          <ToggleButton id="14" variant="segmented">
            14 days
          </ToggleButton>
          <ToggleButton id="30" variant="segmented">
            30 days
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Chart
        definition={definition}
        renderer={renderer}
        height={240}
        initialWidth={640}
        ariaLabel={`Daily revenue for the ${periods[period].toLowerCase()}, in thousands of dollars`}
      />
      <table className="sr-only">
        <caption>Daily revenue, in thousands of dollars</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.day}>
              <th scope="row">{row.day}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ChartFrame>
  );
}
