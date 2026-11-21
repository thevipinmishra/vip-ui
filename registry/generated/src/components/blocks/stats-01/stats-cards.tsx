"use client";

import { areaY, defineChart, lineY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { portal } from "@tanstack/charts/tooltip/portal";
import { useMemo, useState } from "react";
import { AnimatedNumber } from "../../vip-ui/animated-number";
import { Chart } from "../../vip-ui/chart";
import { Stat, StatDetail, StatLabel, StatTrend } from "../../vip-ui/stat";
import { ToggleButton } from "../../vip-ui/toggle-button";
import { ToggleButtonGroup } from "../../vip-ui/toggle-button-group";
import {
  formatChange,
  type Metric,
  metrics,
  type Period,
  periodLabels,
  readMetric,
} from "./data";

function Sparkline({
  metric,
  rows,
  good,
}: {
  metric: Metric;
  rows: { day: string; value: number }[];
  good: boolean;
}) {
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
        lineY(rows, {
          x: "day",
          y: "value",
          stroke: color,
          strokeWidth: rows.length > 30 ? 1.5 : 2,
        }),
      ],
      scales: {
        x: { scale: scalePoint },
        y: { scale: scaleLinear().domain([min - pad, max + pad]) },
      },
      tooltip: {
        use: tooltip,
        portal,
        content: ([point]) => ({
          rows: [
            {
              label: point.datum.day,
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

function MetricCard({ metric, period }: { metric: Metric; period: Period }) {
  const reading = useMemo(() => readMetric(metric, period), [metric, period]);
  const direction =
    reading.change > 0 ? "up" : reading.change < 0 ? "down" : "neutral";
  const good = reading.change === 0 || reading.change > 0 !== metric.invert;
  const format = new Intl.NumberFormat("en-US", metric.format);

  return (
    <Stat className="grid gap-0 overflow-hidden p-0">
      <div className="px-4 pt-4">
        <StatLabel>{metric.label}</StatLabel>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <AnimatedNumber
            value={reading.value}
            formatOptions={metric.format}
            className="text-3xl font-semibold tracking-[-0.045em] tabular-nums"
          />
          <StatTrend direction={direction} invert={metric.invert}>
            {formatChange(metric, reading.change)}
          </StatTrend>
        </p>
        <StatDetail className="tabular-nums">
          Previous {periodLabels[period]}: {format.format(reading.previous)}
        </StatDetail>
      </div>
      <div className="mt-3">
        <Sparkline metric={metric} rows={reading.rows} good={good} />
      </div>
    </Stat>
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
            Last {periodLabels[period]} to September 30, compared with the
            previous {periodLabels[period]}
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
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} period={period} />
        ))}
      </div>
    </section>
  );
}
