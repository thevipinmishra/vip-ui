"use client";

import { TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { Stat, StatDetail, StatLabel } from "@/components/ui/stat";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

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

function Sparkline({ points, good }: { points: number[]; good: boolean }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 28 - ((point - min) / range) * 24;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`size-full ${good ? "text-success" : "text-destructive"}`}
    >
      <path
        d={`${path} L100,32 L0,32 Z`}
        fill="currentColor"
        fillOpacity={0.12}
      />
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
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
              <div className="px-5 pt-5">
                <StatLabel>{metric.label}</StatLabel>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <AnimatedNumber
                    value={current.value}
                    formatOptions={metric.format}
                    className="text-3xl font-semibold tracking-[-0.045em]"
                  />
                  <Badge
                    variant={good ? "success" : "error"}
                    className="min-h-6 gap-1 px-2 py-0.5"
                  >
                    <TrendIcon size={13} weight="bold" aria-hidden="true" />
                    {current.change > 0 ? "+" : "−"}
                    {Math.abs(current.change)}%
                  </Badge>
                </p>
                <StatDetail>
                  {good ? "Better" : "Worse"} than the previous{" "}
                  {periodLabels[period]}
                </StatDetail>
              </div>
              <div className="mt-3 h-14">
                <Sparkline points={current.trend} good={good} />
              </div>
            </Stat>
          );
        })}
      </div>
    </section>
  );
}
