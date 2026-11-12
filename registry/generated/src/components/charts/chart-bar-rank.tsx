"use client";

import { barX, defineChart, text } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { rank } from "@tanstack/charts/transform/rank";
import {
  Chart,
  ChartAction,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "../vip-ui/chart";

const rows = [
  { channel: "Organic search", conversion: 0.078, sessions: 128_400 },
  { channel: "Paid search", conversion: 0.064, sessions: 94_200 },
  { channel: "Email", conversion: 0.058, sessions: 38_100 },
  { channel: "Direct", conversion: 0.051, sessions: 76_400 },
  { channel: "Referral", conversion: 0.044, sessions: 21_600 },
  { channel: "Social", conversion: 0.038, sessions: 58_900 },
  { channel: "Affiliate", conversion: 0.031, sessions: 17_300 },
  { channel: "Display", conversion: 0.024, sessions: 48_200 },
  { channel: "Video", conversion: 0.019, sessions: 12_500 },
];

const ranked = rank(rows, { value: "conversion", order: "descending" });
const top = [...ranked].sort((a, b) => a.rank - b.rank).slice(0, 6);

const formatPercent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
}).format;
const formatCount = new Intl.NumberFormat("en-US").format;

const definition = defineChart({
  motion: {
    transition: { type: "tween", duration: 420, easing: "ease-out" },
  },
  marks: [
    barX(top, {
      x: "conversion",
      y: "channel",
      fill: "var(--ts-chart-1)",
      inset: 3,
      radius: { end: 4 },
      key: "channel",
      motion: (context) => ({
        delay: context.phase === "enter" ? context.datumIndex * 30 : 0,
      }),
    }),
    decorative(
      text(top, {
        x: "conversion",
        y: "channel",
        text: (row) => formatPercent(row.conversion),
        dx: 6,
        anchor: "start",
        fill: "var(--foreground)",
        fontSize: 12,
        fontWeight: 600,
      }),
    ),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 0.09]),
      grid: true,
      axis: {
        label: "Conversion rate",
        ticks: { count: 3, format: formatPercent },
      },
    },
    y: {
      scale: () =>
        scaleBand<string>()
          .domain(top.map((row) => row.channel))
          .padding(0.12),
    },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.channel,
      rows: [
        {
          label: "Conversion",
          value: formatPercent(point.datum.conversion),
          color: point.color,
        },
        { label: "Sessions", value: formatCount(point.datum.sessions) },
        { label: "Rank", value: `#${point.datum.rank}` },
      ],
    }),
  },
});

export function ChartBarRank() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Acquisition channels</ChartTitle>
      </ChartCaption>
      <ChartAction>
        <span className="text-xs text-muted-foreground">
          Top 6 of 9 channels by conversion
        </span>
      </ChartAction>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel={`Conversion rate for the top six acquisition channels, led by ${top[0].channel} at ${formatPercent(top[0].conversion)}`}
      />
      <ChartTable
        caption="Acquisition channels ranked by conversion rate"
        columns={["Channel", "Conversion rate", "Sessions", "Rank"]}
        rows={top.map((row) => [
          row.channel,
          formatPercent(row.conversion),
          formatCount(row.sessions),
          row.rank,
        ])}
      />
    </ChartFrame>
  );
}
