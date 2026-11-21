"use client";

import { barY, defineChart, ruleY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleBand } from "@tanstack/charts/scales/band";
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
} from "../../vip-ui/chart";

export interface UsageDay {
  day: string;
  events: number;
  projected: boolean;
}

const actualColor = "var(--ts-chart-1)";
const projectedColor =
  "color-mix(in oklab, var(--ts-chart-1) 30%, transparent)";
const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 2,
});
const full = new Intl.NumberFormat("en-US");

export function UsageChart({
  days,
  limit,
  used,
  projected,
}: {
  days: UsageDay[];
  limit: number;
  used: number;
  projected: number;
}) {
  const pace = limit / days.length;
  const definition = useMemo(() => {
    const top = Math.max(pace, ...days.map((item) => item.events)) * 1.15;
    return defineChart({
      marks: [
        barY(
          days.map((item) => ({
            ...item,
            kind: item.projected ? "Projected" : "Events",
          })),
          {
            x: "day",
            y: "events",
            z: "kind",
            color: "kind",
            inset: 1,
            radius: { end: 2 },
          },
        ),
        decorative(
          ruleY([pace], {
            stroke: "var(--muted-foreground)",
            strokeDasharray: "4 4",
            strokeOpacity: 0.8,
          }),
        ),
      ],
      scales: {
        x: {
          scale: () => scaleBand().padding(0.24),
          axis: {
            ticks: {
              values: days
                .filter((_, index) => index % 7 === 0)
                .map((item) => item.day),
            },
            tickLabels: { fontSize: 12 },
          },
        },
        y: {
          scale: scaleLinear().domain([0, top]),
          grid: true,
          axis: {
            ticks: { count: 3, format: (value) => compact.format(value) },
            tickLabels: { fontSize: 12 },
          },
        },
      },
      color: {
        domain: ["Events", "Projected"],
        range: [actualColor, projectedColor],
      },
      focus: "nearest-x",
      tooltip: {
        use: tooltip,
        content: (points) => {
          const item = points[0].datum as UsageDay;
          return {
            title: item.day,
            rows: [
              {
                label: item.projected ? "Projected" : "Events",
                value: full.format(item.events),
                color: item.projected ? projectedColor : actualColor,
              },
            ],
          };
        },
      },
    });
  }, [days, pace]);

  const over = projected > limit;

  return (
    <ChartFrame variant="card">
      <ChartCaption>
        <ChartTitle>Events by day</ChartTitle>
        <ChartValue>{compact.format(used)}</ChartValue>
        <ChartDescription className="text-[13px] leading-5">
          {over
            ? `On pace for ${compact.format(projected)} by Nov 30. Events over ${compact.format(limit)} cost $10 for each 100K.`
            : `On pace for ${compact.format(projected)} of ${compact.format(limit)} by Nov 30.`}
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={168}
        initialWidth={900}
        ariaLabel="Events by day for November 2026, with the projection to the end of the month"
      />
      <ChartLegend className="justify-start text-[13px]">
        <ChartLegendItem color={actualColor}>Events</ChartLegendItem>
        <ChartLegendItem color={projectedColor}>Projected</ChartLegendItem>
        <ChartLegendItem color="var(--muted-foreground)" swatch="dashed">
          Daily pace for the plan
        </ChartLegendItem>
      </ChartLegend>
      <ChartTable
        caption="Events by day"
        columns={["Day", "Events", "Type"]}
        rows={days.map((item) => [
          item.day,
          full.format(item.events),
          item.projected ? "Projected" : "Actual",
        ])}
      />
    </ChartFrame>
  );
}
