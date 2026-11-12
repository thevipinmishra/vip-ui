"use client";

import {
  arrow,
  defineChart,
  dot,
  frame,
  lineY,
  ruleX,
  ruleY,
  select,
  text,
  tickY,
  vector,
} from "@tanstack/charts";
import { focusGuideY } from "@tanstack/charts/focus/guide";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "../vip-ui/chart";

const rows = [
  { month: "Jan", value: 2.4 },
  { month: "Feb", value: 2.6 },
  { month: "Mar", value: 2.5 },
  { month: "Apr", value: 2.9 },
  { month: "May", value: 3.4 },
  { month: "Jun", value: 3.1 },
  { month: "Jul", value: 3.3 },
  { month: "Aug", value: 4.1 },
  { month: "Sep", value: 3.8 },
  { month: "Oct", value: 3.6 },
  { month: "Nov", value: 3.9 },
  { month: "Dec", value: 3.7 },
];

const target = 3.5;
const [peak] = select(rows, { value: "value", select: "max" });
const launch = rows[4];
const runUp = [{ from: rows[6], to: peak }];

const formatRate = (value: number) => `${value.toFixed(1)}%`;

const definition = defineChart({
  marks: [
    decorative(frame({ stroke: "var(--border)" })),
    decorative(
      ruleY([target], {
        stroke: "var(--muted-foreground)",
        strokeDasharray: "4 4",
        strokeOpacity: 0.8,
      }),
    ),
    decorative(
      tickY([{ month: "Dec", value: target }], {
        x: "month",
        y: "value",
        length: 10,
        stroke: "var(--muted-foreground)",
      }),
    ),
    decorative(
      ruleX([peak], {
        x: "month",
        stroke: "var(--ts-chart-1)",
        strokeOpacity: 0.35,
      }),
    ),
    lineY(rows, {
      x: "month",
      y: "value",
      stroke: "var(--ts-chart-1)",
      strokeWidth: 2,
    }),
    decorative(
      arrow(runUp, {
        x1: (row) => row.from.month,
        y1: (row) => row.from.value + 0.35,
        x2: (row) => row.to.month,
        y2: (row) => row.to.value + 0.1,
        stroke: "var(--muted-foreground)",
        strokeWidth: 1.25,
        headLength: 6,
      }),
    ),
    decorative(
      vector([launch], {
        x: "month",
        y: "value",
        length: 18,
        rotate: 180,
        anchor: "end",
        stroke: "var(--ts-chart-2)",
        strokeWidth: 1.5,
      }),
    ),
    decorative(
      text([launch], {
        x: "month",
        y: "value",
        text: () => "Launch",
        dy: -24,
        fill: "var(--ts-chart-2)",
        fontSize: 11,
        fontWeight: 600,
      }),
    ),
    decorative(
      dot([peak], {
        x: "month",
        y: "value",
        r: 4.5,
        fill: "var(--ts-chart-1)",
        stroke: "var(--card)",
        strokeWidth: 1.5,
      }),
    ),
    decorative(
      text([peak], {
        x: "month",
        y: "value",
        text: (row) => `Peak ${formatRate(row.value)}`,
        dy: -12,
        fill: "var(--foreground)",
        fontSize: 11,
        fontWeight: 600,
      }),
    ),
    focusGuideY(rows, {
      x: "month",
      y: "value",
      yRule: { stroke: "var(--ts-chart-1)", strokeOpacity: 0.5 },
      marker: {
        radius: 3.5,
        fill: "var(--card)",
        stroke: "var(--ts-chart-1)",
        strokeWidth: 2,
      },
      yLabel: { format: (value) => formatRate(value) },
    }),
  ],
  scales: {
    x: {
      scale: scalePoint<string>().domain(rows.map((row) => row.month)),
    },
    y: {
      scale: scaleLinear().domain([2, 4.6]),
      grid: true,
      axis: { ticks: { count: 4, format: formatRate } },
    },
  },
  focus: "nearest-x",
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.month,
      rows: [
        {
          label: "Conversion",
          value: formatRate(point.datum.value),
          color: point.color,
        },
        {
          label: "Versus target",
          value: `${point.datum.value >= target ? "+" : ""}${(point.datum.value - target).toFixed(1)} pts`,
        },
      ],
    }),
  },
});

export function ChartAnnotations() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Checkout conversion</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={260}
        initialWidth={520}
        ariaLabel={`Monthly checkout conversion. It rises after the ${launch.month} launch and peaks at ${formatRate(peak.value)} in ${peak.month}, against a ${formatRate(target)} target.`}
      />
      <ChartLegend>
        <ChartLegendItem color="var(--ts-chart-1)" swatch="line">
          Conversion
        </ChartLegendItem>
        <ChartLegendItem color="var(--muted-foreground)" swatch="dashed">
          Target
        </ChartLegendItem>
      </ChartLegend>
      <ChartTable
        caption="Monthly checkout conversion"
        columns={["Month", "Conversion", "Note"]}
        rows={rows.map((row) => [
          row.month,
          formatRate(row.value),
          row === peak ? "Peak" : row === launch ? "Launch" : "",
        ])}
      />
    </ChartFrame>
  );
}
