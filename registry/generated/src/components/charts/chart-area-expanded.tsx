"use client";

import { areaY, defineChart, stack } from "@tanstack/charts";
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

const months = [
  { month: "2025-10", desktop: 37330, mobile: 29440, tablet: 5030 },
  { month: "2025-11", desktop: 37890, mobile: 31210, tablet: 5200 },
  { month: "2025-12", desktop: 32240, mobile: 31550, tablet: 6310 },
  { month: "2026-01", desktop: 37680, mobile: 33070, tablet: 6150 },
  { month: "2026-02", desktop: 38410, mobile: 34500, tablet: 5490 },
  { month: "2026-03", desktop: 38980, mobile: 36540, tablet: 5680 },
  { month: "2026-04", desktop: 39290, mobile: 38460, tablet: 5850 },
  { month: "2026-05", desktop: 40380, mobile: 40370, tablet: 5150 },
  { month: "2026-06", desktop: 37840, mobile: 41210, tablet: 5050 },
  { month: "2026-07", desktop: 34730, mobile: 42180, tablet: 5790 },
  { month: "2026-08", desktop: 38900, mobile: 44200, tablet: 5300 },
  { month: "2026-09", desktop: 39100, mobile: 48410, tablet: 5590 },
];

const devices = [
  { key: "desktop", label: "Desktop", color: "var(--ts-chart-1)" },
  { key: "mobile", label: "Mobile", color: "var(--ts-chart-2)" },
  { key: "tablet", label: "Tablet", color: "var(--ts-chart-3)" },
] as const;

const rows = months.flatMap((row) => {
  const total = row.desktop + row.mobile + row.tablet;
  return devices.map((device) => ({
    month: row.month,
    device: device.label,
    sessions: row[device.key],
    share: row[device.key] / total,
  }));
});

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const monthYearFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const formatMonth = (month: string) => monthFormat.format(new Date(month));
const formatMonthYear = (month: string) =>
  monthYearFormat.format(new Date(month));
const formatPercent = new Intl.NumberFormat("en-US", {
  style: "percent",
}).format;
const formatShare = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
}).format;

const definition = defineChart({
  marks: [
    areaY(rows, {
      x: "month",
      y: "sessions",
      z: "device",
      color: "device",
      layout: stack({ offset: "normalize" }),
      fillOpacity: 0.85,
    }),
  ],
  scales: {
    x: { scale: scalePoint, axis: { ticks: { format: formatMonth } } },
    y: {
      scale: scaleLinear().domain([0, 1]),
      grid: true,
      axis: { ticks: { count: 4, format: formatPercent } },
    },
  },
  color: {
    domain: devices.map((device) => device.label),
    range: devices.map((device) => device.color),
  },
  focus: "group-x",
  tooltip: {
    use: tooltip,
    sort: "color-domain",
    content: (points, { primaryPoint }) => ({
      title: formatMonthYear(points[0].datum.month),
      rows: points.map((point) => ({
        label: point.groupLabel,
        value: formatShare(point.datum.share),
        color: point.color,
        active: point === primaryPoint,
      })),
    }),
  },
});

export function ChartAreaExpanded() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Device share</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel="Monthly share of sessions from desktop, mobile and tablet, October 2025 to September 2026"
      />
      <ChartLegend>
        {devices.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Monthly share of sessions by device"
        columns={["Month", ...devices.map((device) => device.label)]}
        rows={months.map((row) => {
          const total = row.desktop + row.mobile + row.tablet;
          return [
            formatMonthYear(row.month),
            ...devices.map((device) => formatShare(row[device.key] / total)),
          ];
        })}
      />
    </ChartFrame>
  );
}
