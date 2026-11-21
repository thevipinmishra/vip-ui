"use client";

import { PulseIcon } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";
import {
  Stat,
  StatDetail,
  StatGroup,
  StatLabel,
  StatTrend,
  StatValue,
} from "@/components/ui/stat";
import { Switch } from "@/components/ui/switch";
import { AlertsCard, ChangesCard } from "./activity-panels";
import {
  alerts,
  formatCompact,
  formatCount,
  formatMs,
  formatRate,
  pointsFor,
  type Range,
  rangeLabels,
  summarize,
} from "./data";
import { ServicesTable } from "./services-table";
import { TimeChart, type TimeSeries } from "./time-chart";

const latencySeries: TimeSeries[] = [
  { key: "p99", label: "p99", color: "var(--ts-chart-3)" },
  { key: "p95", label: "p95", color: "var(--ts-chart-1)" },
  { key: "p50", label: "p50", color: "var(--ts-chart-2)" },
];

const errorBudget = 0.61;

function trend(value: number, before: number) {
  return Math.round(((value - before) / before) * 1_000) / 10;
}

function direction(change: number) {
  return change > 0 ? "up" : change < 0 ? "down" : "neutral";
}

function signed(change: number, unit: string) {
  const sign = change > 0 ? "+" : change < 0 ? "−" : "";
  return `${sign}${Math.abs(change).toFixed(1)}${unit}`;
}

function scrollToAlerts() {
  document
    .getElementById("alerts")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ObservabilityDashboard() {
  const [range, setRange] = useState<Range>("6h");
  const [live, setLive] = useState(true);
  const points = useMemo(() => pointsFor(range), [range]);
  const yesterday = useMemo(() => pointsFor(range, 288), [range]);
  const current = summarize(points);
  const before = summarize(yesterday);
  const firing = alerts.filter((alert) => alert.state === "firing");
  const critical = firing.filter((alert) => alert.severity === "critical");
  const label = rangeLabels[range].toLowerCase();

  const kpis = [
    {
      label: "Requests per minute",
      value: formatCount(current.requests),
      change: trend(current.requests, before.requests),
      unit: "%",
      invert: false,
    },
    {
      label: "Error rate",
      value: formatRate(current.errorRate),
      change: trend(current.errorRate, before.errorRate),
      unit: "%",
      invert: true,
    },
    {
      label: "p95 latency",
      value: formatMs(current.p95),
      change: trend(current.p95, before.p95),
      unit: "%",
      invert: true,
    },
    {
      label: "Apdex",
      value: current.apdex.toFixed(2),
      change: Math.round((current.apdex - before.apdex) * 100) / 100,
      unit: "",
      invert: false,
    },
  ];

  return (
    <div className="min-h-svh bg-muted/30">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
            >
              <PulseIcon size={20} weight="bold" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[-0.02em]">
                Cobalt
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Observability
              </p>
            </div>
            <Badge variant="outline" className="ms-2 max-sm:hidden">
              production
            </Badge>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <Switch isSelected={live} onChange={setLive}>
              <span className="max-sm:sr-only">Auto-refresh</span>
            </Switch>
            <Avatar name="Priya Raman" size="sm" />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.04em]">
              Platform health
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              All regions · {live ? "Updates every 30 s" : "Auto-refresh off"} ·
              Last update 11:05 UTC
            </p>
          </div>
          <SegmentedControl
            aria-label="Time range"
            size="sm"
            value={range}
            onValueChange={(details) => {
              if (
                details.value === "1h" ||
                details.value === "6h" ||
                details.value === "24h"
              ) {
                setRange(details.value);
              }
            }}
          >
            <SegmentedControlItem value="1h">1 hour</SegmentedControlItem>
            <SegmentedControlItem value="6h">6 hours</SegmentedControlItem>
            <SegmentedControlItem value="24h">24 hours</SegmentedControlItem>
          </SegmentedControl>
        </div>

        <Alert
          variant="warning"
          title="Open incident: Reports load slowly"
          action={
            <Button variant="outline" size="sm" onPress={scrollToAlerts}>
              Show alerts
            </Button>
          }
        >
          Started 09:24 UTC. The team is monitoring the fix. reports-api p95 is
          still above 1 s.
        </Alert>

        <StatGroup
          role="group"
          aria-label="Key metrics"
          className="grid-cols-2 md:grid-cols-3 xl:grid-cols-6"
        >
          {kpis.map((kpi) => (
            <Stat key={kpi.label}>
              <StatLabel className="truncate">{kpi.label}</StatLabel>
              <StatValue className="text-2xl">{kpi.value}</StatValue>
              <StatDetail>
                <StatTrend
                  direction={direction(kpi.change)}
                  invert={kpi.invert}
                >
                  {kpi.unit
                    ? signed(kpi.change, kpi.unit)
                    : `${kpi.change > 0 ? "+" : kpi.change < 0 ? "−" : ""}${Math.abs(kpi.change).toFixed(2)}`}
                </StatTrend>
                <span>vs. yesterday</span>
              </StatDetail>
            </Stat>
          ))}
          <Stat>
            <StatLabel className="truncate">Firing alerts</StatLabel>
            <StatValue className="text-2xl">{firing.length}</StatValue>
            <StatDetail>
              {critical.length} critical · {firing.length - critical.length}{" "}
              warning
            </StatDetail>
          </Stat>
          <Stat>
            <StatLabel className="truncate">Error budget left</StatLabel>
            <StatValue className="text-2xl">
              {Math.round(errorBudget * 100)}%
            </StatValue>
            <StatDetail>99.9% SLO, 30 days</StatDetail>
          </Stat>
        </StatGroup>

        <div className="grid gap-5 lg:grid-cols-2">
          <TimeChart
            points={points}
            range={range}
            series={[
              {
                key: "requests",
                label: "Requests per minute",
                color: "var(--ts-chart-1)",
                fill: true,
              },
            ]}
            title="Traffic"
            value={`${formatCompact(current.requests)} req/min`}
            description={`Average, ${label}`}
            ariaLabel={`Requests per minute for the ${label}, in 5-minute steps`}
            format={formatCount}
            formatAxis={formatCompact}
          />
          <TimeChart
            points={points}
            range={range}
            series={[
              {
                key: "errorRate",
                label: "5xx rate",
                color: "var(--destructive)",
                fill: true,
              },
            ]}
            threshold={{ value: 0.01, label: "Alert at 1%" }}
            title="Server errors"
            value={formatRate(current.errorRate)}
            description={`Share of requests with a 5xx status, ${label}`}
            ariaLabel={`Server error rate for the ${label}, in 5-minute steps`}
            format={formatRate}
            formatAxis={(value) => formatRate(value)}
          />
        </div>

        <TimeChart
          points={points}
          range={range}
          series={latencySeries}
          threshold={{ value: 400, label: "p95 target 400 ms" }}
          title="Latency"
          value={`${formatMs(current.p95)} p95`}
          description={`Response time percentiles, ${label}`}
          ariaLabel={`p50, p95, and p99 response time for the ${label}, in 5-minute steps`}
          format={formatMs}
          formatAxis={formatMs}
          height={240}
        />

        <ServicesTable />

        <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
          <AlertsCard />
          <ChangesCard />
        </div>

        <p className="text-xs text-muted-foreground">
          Charts use 5-minute steps from the gateway in us-east-1 and eu-west-1.
          Service rows show the last hour. All times in UTC.
        </p>
      </main>
    </div>
  );
}
