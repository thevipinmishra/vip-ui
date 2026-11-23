export const chartUsage = `"use client";

import { barY, defineChart } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/vip-ui/chart";

const rows = [
  { channel: "Direct", visits: 42 },
  { channel: "Search", visits: 31 },
];

const definition = defineChart({
  marks: [barY(rows, { x: "channel", y: "visits", key: "channel" })],
  scales: {
    x: { scale: scaleBand },
    y: { scale: scaleLinear, grid: true },
  },
});

<ChartFrame>
  <ChartCaption>
    <ChartTitle>Traffic sources</ChartTitle>
    <ChartDescription>Visits in thousands</ChartDescription>
  </ChartCaption>
  <Chart definition={definition} height={220} ariaLabel="Visits by channel" />
  <ChartLegend>
    <ChartLegendItem color="var(--ts-chart-1)">Visits</ChartLegendItem>
  </ChartLegend>
  <ChartTable
    caption="Visits by channel, in thousands"
    columns={["Channel", "Visits"]}
    rows={rows.map((row) => [row.channel, row.visits])}
  />
</ChartFrame>`;
