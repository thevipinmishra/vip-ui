"use client";

import { TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react";
import { areaY, defineChart, lineY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo, useState } from "react";
import { AnimatedNumber } from "../../vip-ui/animated-number";
import { Badge } from "../../vip-ui/badge";
import { Chart } from "../../vip-ui/chart";
import { Stat, StatDetail, StatLabel } from "../../vip-ui/stat";
import { ToggleButton } from "../../vip-ui/toggle-button";
import { ToggleButtonGroup } from "../../vip-ui/toggle-button-group";

type Period = "7d" | "30d" | "90d";

const periodLabels: Record<Period, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

interface Metric {
  label: string;
  format: Intl.NumberFormatOptions;
  direction: 1 | -1;
  points?: boolean;
  values: Record<Period, { value: number; change: number; trend: number[] }>;
}

const metrics: Metric[] = [
  {
    label: "Monthly recurring revenue",
    format: { style: "currency", currency: "USD", maximumFractionDigits: 0 },
    direction: 1,
    values: {
      "7d": { value: 18420, change: 2.1, trend: [8, 9, 9, 10, 11, 10, 12] },
      "30d": { value: 74310, change: 8.6, trend: [5, 6, 6, 8, 7, 9, 10, 12] },
      "90d": { value: 201880, change: 21.4, trend: [3, 4, 6, 6, 8, 9, 11, 13] },
    },
  },
  {
    label: "Active users",
    format: { maximumFractionDigits: 0 },
    direction: 1,
    values: {
      "7d": { value: 3912, change: 1.4, trend: [6, 7, 6, 7, 8, 8, 8] },
      "30d": { value: 8204, change: 5.2, trend: [5, 6, 7, 6, 7, 8, 9, 9] },
      "90d": { value: 12650, change: 14.9, trend: [3, 4, 5, 7, 7, 8, 10, 11] },
    },
  },
  {
    label: "Churn rate",
    format: { style: "percent", maximumFractionDigits: 1 },
    direction: -1,
    points: true,
    values: {
      "7d": { value: 0.021, change: -0.2, trend: [9, 8, 8, 7, 7, 6, 6] },
      "30d": { value: 0.024, change: -0.6, trend: [10, 9, 9, 8, 8, 7, 7, 6] },
      "90d": { value: 0.027, change: 0.3, trend: [6, 7, 7, 8, 7, 8, 8, 9] },
    },
  },
  {
    label: "Average response time",
    format: { style: "unit", unit: "millisecond", maximumFractionDigits: 0 },
    direction: -1,
    values: {
      "7d": { value: 182, change: -4.8, trend: [9, 8, 9, 7, 7, 6, 5] },
      "30d": { value: 196, change: -2.2, trend: [8, 8, 7, 8, 7, 7, 6, 6] },
      "90d": { value: 214, change: 3.5, trend: [5, 6, 6, 7, 6, 7, 8, 8] },
    },
  },
];

const periodDays: Record<Period, number> = { "7d": 7, "30d": 30, "90d": 90 };
const periodEnd = Date.UTC(2026, 8, 30);
const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function previousValue(metric: Metric, period: Period) {
  const { value, change } = metric.values[period];
  return metric.points ? value - change / 100 : value / (1 + change / 100);
}

function seriesFor(metric: Metric, period: Period) {
  const { value, trend } = metric.values[period];
  const start = previousValue(metric, period);
  const first = trend[0];
  const last = trend[trend.length - 1];
  const step = (periodDays[period] - 1) / (trend.length - 1);
  return trend.map((point, index) => ({
    day: dayFormat.format(
      periodEnd - Math.round((trend.length - 1 - index) * step) * 86_400_000,
    ),
    value:
      last === first
        ? value
        : start + ((value - start) * (point - first)) / (last - first),
  }));
}

function Sparkline({
  metric,
  period,
  good,
}: {
  metric: Metric;
  period: Period;
  good: boolean;
}) {
  const rows = useMemo(() => seriesFor(metric, period), [metric, period]);
  const color = good ? "var(--success)" : "var(--destructive)";
  const definition = useMemo(() => {
    const format = new Intl.NumberFormat("en-US", metric.format);
    const values = rows.map((row) => row.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = (max - min) * 0.15 || max * 0.05;
    return defineChart({
      guides: false,
      margin: { top: 6, right: 0, bottom: 0, left: 0 },
      keyboard: false,
      marks: [
        decorative(
          areaY(rows, {
            x: "day",
            y: "value",
            y1: min - pad,
            fill: color,
            fillOpacity: 0.12,
          }),
        ),
        lineY(rows, { x: "day", y: "value", stroke: color, strokeWidth: 2 }),
      ],
      scales: {
        x: { scale: scalePoint },
        y: { scale: scaleLinear().domain([min - pad, max + pad]) },
      },
      tooltip: {
        use: tooltip,
        content: ([point]) => ({
          title: point.datum.day,
          rows: [
            {
              label: metric.label,
              value: format.format(point.datum.value),
              color: point.color,
            },
          ],
        }),
      },
    });
  }, [rows, color, metric]);

  return (
    <Chart
      definition={definition}
      height={56}
      initialWidth={280}
      ariaLabel={`${metric.label} from ${rows[0].day} to ${rows[rows.length - 1].day}`}
    />
  );
}

export function StatsCards() {
  const [period, setPeriod] = useState<Period>("30d");

  return (
    <section aria-labelledby="stats-title" className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1
            id="stats-title"
            className="text-xl font-semibold tracking-[-0.035em]"
          >
            Business health
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Compared with the previous {periodLabels[period]}
          </p>
        </div>
        <ToggleButtonGroup
          aria-label="Period"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[period]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (next) setPeriod(next as Period);
          }}
        >
          {(Object.keys(periodLabels) as Period[]).map((key) => (
            <ToggleButton key={key} id={key} variant="segmented">
              {periodLabels[key]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const current = metric.values[period];
          const good = current.change * metric.direction > 0;
          const TrendIcon = current.change > 0 ? TrendUpIcon : TrendDownIcon;
          return (
            <Stat key={metric.label} className="grid gap-0 overflow-hidden p-0">
              <div className="px-4 pt-4">
                <StatLabel>{metric.label}</StatLabel>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <AnimatedNumber
                    value={current.value}
                    formatOptions={metric.format}
                    className="text-3xl font-semibold tracking-[-0.045em]"
                  />
                  <Badge
                    variant={good ? "success" : "error"}
                    className="gap-1 px-2"
                  >
                    <TrendIcon size={13} weight="bold" aria-hidden="true" />
                    {current.change > 0 ? "+" : "−"}
                    {Math.abs(current.change)}
                    {metric.points ? " pts" : "%"}
                  </Badge>
                </p>
                <StatDetail>
                  Previous:{" "}
                  {new Intl.NumberFormat("en-US", metric.format).format(
                    previousValue(metric, period),
                  )}
                </StatDetail>
              </div>
              <div className="mt-3">
                <Sparkline metric={metric} period={period} good={good} />
              </div>
            </Stat>
          );
        })}
      </div>
    </section>
  );
}
