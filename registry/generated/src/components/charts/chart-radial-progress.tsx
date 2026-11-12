"use client";

import { defineChart } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { polar, radialBarAngle } from "@tanstack/charts/polar";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartCenter,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "../vip-ui/chart";

const quota = 100;
const used = 72.4;
const percent = Math.round((used / quota) * 100);

const rows = [
  { status: "Used", gigabytes: used },
  { status: "Free", gigabytes: quota - used },
];

const formatGigabytes = (value: number) =>
  `${value.toLocaleString("en-US", { maximumFractionDigits: 1 })} GB`;

const storage = [{ disk: "Storage", used }];

const layout = {
  radiusRatio: 0.9,
  startAngle: -Math.PI * 0.75,
  endAngle: Math.PI * 0.75,
  scales: {
    angle: { scale: scaleLinear().domain([0, quota]) },
    radius: {
      scale: () => scaleBand<string>(),
      range: [
        ({ radius }: { radius: number }) => radius * 0.8,
        ({ radius }: { radius: number }) => radius,
      ] as const,
    },
  },
};

const definition = defineChart({
  marks: [
    decorative(
      polar({
        ...layout,
        marks: [
          radialBarAngle(storage, {
            radius: "disk",
            angle: () => quota,
            fill: "var(--muted)",
            key: "disk",
            cornerRadius: "full",
          }),
        ],
      }),
    ),
    polar({
      ...layout,
      marks: [
        radialBarAngle(storage, {
          radius: "disk",
          angle: "used",
          fill: "var(--ts-chart-1)",
          key: "disk",
          cornerRadius: "full",
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: "Storage",
      rows: [
        {
          label: "Used",
          value: formatGigabytes(point.datum.used),
          color: point.color,
        },
        { label: "Free", value: formatGigabytes(quota - point.datum.used) },
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
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel={`${formatGigabytes(used)} of ${formatGigabytes(quota)} storage used, ${percent} percent`}
      >
        <ChartCenter aria-hidden="true">
          <ChartValue className="text-3xl">{percent}%</ChartValue>
          <ChartDescription>Used</ChartDescription>
        </ChartCenter>
      </Chart>
      <ChartTable
        caption="Storage use, in gigabytes"
        columns={["Status", "Space"]}
        rows={rows.map((row) => [row.status, formatGigabytes(row.gigabytes)])}
      />
    </ChartFrame>
  );
}
