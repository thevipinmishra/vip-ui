"use client";

import { dot, facetChart, lineY } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { svgChartRenderer } from "@tanstack/charts/svg/renderer";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

const regions = [
  { region: "North America", values: [42, 46, 51, 55, 58, 61, 66, 72] },
  { region: "Europe", values: [38, 40, 39, 44, 47, 46, 50, 53] },
  { region: "Asia Pacific", values: [21, 25, 30, 34, 41, 47, 52, 60] },
  { region: "Latin America", values: [12, 13, 15, 14, 17, 19, 22, 24] },
];

const rows = regions.flatMap((item) =>
  months.map((month, index) => ({
    region: item.region,
    month,
    revenue: item.values[index],
  })),
);

const formatRevenue = (value: number) => `$${value}k`;

const definition = facetChart(rows, {
  by: "region",
  columns: 2,
  minWidth: 220,
  gap: 12,
  axes: "outer",
  chart: (groupRows) => ({
    marks: [
      lineY(groupRows, {
        x: "month",
        y: "revenue",
        stroke: "var(--ts-chart-1)",
        strokeWidth: 1.75,
      }),
      dot(groupRows.slice(-1), {
        x: "month",
        y: "revenue",
        r: 3,
        fill: "var(--ts-chart-1)",
      }),
    ],
    scales: {
      x: {
        scale: () => scalePoint<string>().domain(months),
        axis: { ticks: { values: ["Mar", "Jun", "Sep"] } },
      },
      y: {
        scale: scaleLinear().domain([0, 80]),
        grid: true,
        axis: { ticks: { count: 3, format: formatRevenue } },
      },
    },
  }),
});

export function ChartFacet() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Revenue by region</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        renderer={svgChartRenderer}
        height={300}
        initialWidth={520}
        ariaLabel="Small multiples of monthly revenue for four regions on a shared scale. Asia Pacific grows fastest; Latin America stays smallest."
      />
      <ChartTable
        caption="Monthly revenue by region, in thousands of dollars"
        columns={["Region", ...months]}
        rows={regions.map((item) => [
          item.region,
          ...item.values.map(formatRevenue),
        ])}
      />
    </ChartFrame>
  );
}
