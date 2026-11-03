"use client";

import { areaX, defineChart, lineX } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const rows = [
  { team: "Platform", tickets: 82 },
  { team: "Billing", tickets: 64 },
  { team: "Mobile", tickets: 47 },
  { team: "Integrations", tickets: 38 },
  { team: "Growth", tickets: 21 },
];

const formatCount = new Intl.NumberFormat("en-US").format;

const definition = defineChart({
  marks: [
    areaX(rows, {
      x: "tickets",
      y: "team",
      fill: "var(--ts-chart-1)",
      fillOpacity: 0.22,
    }),
    lineX(rows, {
      x: "tickets",
      y: "team",
      stroke: "var(--ts-chart-1)",
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([0, 100]),
      grid: true,
      axis: {
        label: "Open tickets",
        ticks: { count: 4, format: formatCount },
      },
    },
    y: { scale: () => scaleBand().padding(0.1) },
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: `${point.datum.team} team`,
      rows: [
        {
          label: "Open tickets",
          value: formatCount(point.datum.tickets),
          color: point.color,
        },
      ],
    }),
  },
});

export function ChartAreaHorizontal() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Support backlog</ChartTitle>
        <ChartDescription>
          Open tickets older than 7 days, by team
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Weekly support backlog by team, from 82 open tickets for Platform to 21 for Growth"
      />
      <ChartTable
        caption="Weekly support backlog by team"
        columns={["Team", "Open tickets"]}
        rows={rows.map((row) => [row.team, formatCount(row.tickets)])}
      />
    </ChartFrame>
  );
}
