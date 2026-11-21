"use client";

import { areaY, defineChart, lineY, ruleX, text } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
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
import { StatTrend } from "@/components/ui/stat";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { change, current, formatCompact, formatMoney, previous } from "./data";

const periods = {
  "7": "7 days",
  "14": "14 days",
  "30": "30 days",
} as const;
type Period = keyof typeof periods;

const launch = { date: "2026-09-18", label: "Fall collection" };
const colors = {
  current: "var(--ts-chart-1)",
  previous: "var(--muted-foreground)",
};

export function RevenueChart() {
  const [period, setPeriod] = useState<Period>("30");
  const rows = useMemo(() => {
    const days = Number(period);
    const before = previous.slice(-days);
    return current.slice(-days).map((day, index) => ({
      date: day.date,
      label: day.label,
      sales: day.sales,
      previous: before[index].sales,
      previousLabel: before[index].label,
    }));
  }, [period]);
  const total = rows.reduce((sum, row) => sum + row.sales, 0);
  const totalBefore = rows.reduce((sum, row) => sum + row.previous, 0);
  const delta = change(total, totalBefore);
  const markers = rows.filter((row) => row.date === launch.date);

  const definition = useMemo(() => {
    const step = rows.length > 14 ? 5 : rows.length > 7 ? 2 : 1;
    const ticks = rows
      .filter((_, index) => (rows.length - 1 - index) % step === 0)
      .map((row) => row.date);
    const labels = new Map(rows.map((row) => [row.date, row.label]));
    const max = Math.max(...rows.flatMap((row) => [row.sales, row.previous]));
    return defineChart({
      marks: [
        decorative(
          ruleX(markers, {
            x: "date",
            stroke: "var(--muted-foreground)",
            strokeDasharray: "2 3",
            strokeOpacity: 0.7,
          }),
        ),
        decorative(
          text(markers, {
            x: "date",
            y: () => max * 1.12,
            text: () => launch.label,
            anchor: "end",
            dx: -6,
            fill: "var(--muted-foreground)",
            fontSize: 11,
            fontWeight: 500,
          }),
        ),
        lineY(rows, {
          id: "previous",
          x: "date",
          y: "previous",
          stroke: colors.previous,
          strokeWidth: 1.5,
          strokeDasharray: "4 4",
          strokeOpacity: 0.7,
        }),
        decorative(
          areaY(rows, {
            id: "sales-fill",
            x: "date",
            y: "sales",
            fill: colors.current,
            fillOpacity: 0.12,
          }),
        ),
        lineY(rows, {
          id: "sales",
          x: "date",
          y: "sales",
          stroke: colors.current,
          strokeWidth: 2,
        }),
      ],
      scales: {
        x: {
          scale: scalePoint<string>().domain(rows.map((row) => row.date)),
          axis: {
            ticks: {
              values: ticks,
              format: (key) => labels.get(String(key)) ?? String(key),
            },
          },
        },
        y: {
          scale: scaleLinear().domain([0, max * 1.18]),
          grid: true,
          axis: { ticks: { count: 4, format: formatCompact } },
        },
      },
      focus: "group-x",
      tooltip: {
        use: tooltip,
        content: (points) => {
          const row = points[0].datum;
          return {
            title: row.label,
            rows: [
              {
                label: "Net sales",
                value: formatMoney(row.sales),
                color: colors.current,
              },
              {
                label: `Same day, ${row.previousLabel}`,
                value: formatMoney(row.previous),
                color: colors.previous,
              },
            ],
          };
        },
      },
    });
  }, [rows, markers]);

  return (
    <ChartFrame variant="card">
      <ChartCaption>
        <ChartTitle>Net sales</ChartTitle>
        <ChartValue>{formatMoney(total)}</ChartValue>
        <ChartDescription className="flex flex-wrap items-center gap-2">
          <StatTrend direction={delta >= 0 ? "up" : "down"}>
            {delta >= 0 ? "+" : "−"}
            {Math.abs(delta).toFixed(1)}%
          </StatTrend>
          vs. previous {periods[period]}
        </ChartDescription>
      </ChartCaption>
      <ChartAction>
        <ToggleButtonGroup
          aria-label="Sales period"
          size="sm"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[period]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (next === "7" || next === "14" || next === "30") setPeriod(next);
          }}
        >
          {(Object.keys(periods) as Period[]).map((key) => (
            <ToggleButton key={key} id={key} variant="segmented">
              {periods[key]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </ChartAction>
      <Chart
        definition={definition}
        height={248}
        initialWidth={640}
        ariaLabel={`Daily net sales for the last ${periods[period]}, compared with the previous ${periods[period]}`}
      />
      <ChartLegend className="justify-start">
        <ChartLegendItem color={colors.current} swatch="line">
          Last {periods[period]}
        </ChartLegendItem>
        <ChartLegendItem color={colors.previous} swatch="dashed">
          Previous {periods[period]}
        </ChartLegendItem>
      </ChartLegend>
      <ChartTable
        caption="Daily net sales, in dollars"
        columns={["Day", "Net sales", "Previous period"]}
        rows={rows.map((row) => [
          row.label,
          formatMoney(row.sales),
          formatMoney(row.previous),
        ])}
      />
    </ChartFrame>
  );
}
