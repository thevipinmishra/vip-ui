"use client";

import { defineChart } from "@tanstack/charts";
import { pie, polar, radialArc } from "@tanstack/charts/polar";
import { Chart } from "@tanstack/charts/react";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const quota = 100;
const used = 72.4;
const percent = Math.round((used / quota) * 100);

const rows = [
  { status: "Used", gigabytes: used },
  { status: "Free", gigabytes: quota - used },
];

const formatGigabytes = (value: number) =>
  `${value.toLocaleString("en-US", { maximumFractionDigits: 1 })} GB`;

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.78,
      marks: [
        radialArc(
          pie(rows, {
            value: "gigabytes",
            startAngle: -Math.PI * 0.75,
            endAngle: Math.PI * 0.75,
          }),
          {
            color: "status",
            key: "status",
            innerRadius: ({ radius }) => radius * 0.76,
            cornerRadius: 999,
          },
        ),
      ],
      scales: { angle: null, radius: null },
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: ["Used", "Free"],
    range: ["var(--ts-chart-1)", "var(--muted)"],
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.status,
      rows: [
        {
          label: "Space",
          value: formatGigabytes(point.datum.gigabytes),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartRadialProgress() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Storage</ChartTitle>
        <ChartDescription>
          {formatGigabytes(used)} of {formatGigabytes(quota)} used
        </ChartDescription>
      </ChartCaption>
      <div className="relative">
        <Chart
          definition={definition}
          height={240}
          initialWidth={520}
          ariaLabel={`${formatGigabytes(used)} of ${formatGigabytes(quota)} storage used, ${percent} percent`}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid place-content-center text-center"
        >
          <span className="text-3xl font-semibold tabular-nums">
            {percent}%
          </span>
          <span className="text-xs text-muted-foreground">Used</span>
        </div>
      </div>
      <ChartTable
        caption="Storage use, in gigabytes"
        columns={["Status", "Space"]}
        rows={rows.map((row) => [row.status, formatGigabytes(row.gigabytes)])}
      />
    </ChartFrame>
  );
}
