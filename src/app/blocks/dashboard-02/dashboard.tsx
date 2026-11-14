"use client";

import { CalendarDate } from "@internationalized/date";
import {
  ChartLineUpIcon,
  CurrencyDollarIcon,
  DownloadSimpleIcon,
  TargetIcon,
  TrendDownIcon,
  TrendUpIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RangeValue } from "react-aria-components";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Stat,
  StatDetail,
  StatIcon,
  StatLabel,
  StatValue,
} from "@/components/ui/stat";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { showToast } from "@/components/ui/toast";
import { AreaChart, BarChart } from "./analytics-charts";
import {
  bucketRows,
  compareOptions,
  defaultRange,
  formatCompactMoney,
  formatCount,
  formatMoney,
  formatPercent,
  formatRange,
  growthRate,
  previousPeriod,
  previousYear,
  rangePresets,
  rowsInRange,
  summarize,
} from "./data";

type TabKey = "revenue" | "customers";
type CompareKey = "previous" | "year" | "none";

const goal = 600_000;

const revenueSeries = [
  { key: "newMrr" as const, label: "New MRR", color: "var(--ts-chart-1)" },
  {
    key: "expansionMrr" as const,
    label: "Expansion",
    color: "var(--ts-chart-3)",
  },
];

const customerSeries = [
  { key: "signups" as const, label: "New", color: "var(--ts-chart-2)" },
  { key: "churned" as const, label: "Churned", color: "var(--ts-chart-5)" },
];

function ChartSkeleton() {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-xl bg-card p-5 shadow-(--shadow-card) ring-1 ring-border/70">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="mt-3 h-8 w-44" />
          <Skeleton className="mt-5 h-66 w-full" />
        </div>
        <div className="rounded-xl bg-card p-5 shadow-(--shadow-card) ring-1 ring-border/70">
          <Skeleton className="h-4 w-24" />
          <div className="grid justify-items-center gap-3 py-4">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-px w-full" />
          <div className="mt-4 grid gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-card p-5 shadow-(--shadow-card) ring-1 ring-border/70">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-4 h-56 w-full" />
      </div>
    </div>
  );
}

function StatSkeleton() {
  return (
    <Stat className="grid gap-3">
      <Skeleton className="h-3.5 w-28" />
      <Skeleton className="h-9 w-36" />
      <Skeleton className="h-5 w-40" />
    </Stat>
  );
}

export function AnalyticsDashboard() {
  const [range, setRange] = useState<RangeValue<CalendarDate>>({
    start: defaultRange.start,
    end: defaultRange.end,
  });
  const [tab, setTab] = useState<TabKey>("revenue");
  const [compare, setCompare] = useState<CompareKey>("previous");
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  const rows = useMemo(() => rowsInRange(range.start, range.end), [range]);
  const compareRows = useMemo(() => {
    if (compare === "none") return [];
    const shifted =
      compare === "year"
        ? previousYear(range.start, range.end)
        : previousPeriod(range.start, range.end);
    return rowsInRange(shifted.start, shifted.end);
  }, [compare, range]);

  const current = useMemo(() => summarize(rows), [rows]);
  const previous = useMemo(() => summarize(compareRows), [compareRows]);
  const buckets = useMemo(() => bucketRows(rows, 13), [rows]);
  const growth = useMemo(() => growthRate(rows), [rows]);
  const compactGrowth = formatPercent(growth);
  const compareLabel =
    compareOptions.find((option) => option.id === compare)?.name ?? "";

  const progress = Math.min(100, (current.mrr / goal) * 100);
  const gap = Math.max(0, goal - current.mrr);

  const stats = [
    {
      label: "Recurring revenue",
      value: current.mrr,
      format: {
        style: "currency" as const,
        currency: "USD",
        maximumFractionDigits: 0,
      },
      icon: CurrencyDollarIcon,
      delta:
        compare === "none" || previous.mrr === 0
          ? null
          : ((current.mrr - previous.mrr) / previous.mrr) * 100,
      points: false,
    },
    {
      label: "Net new MRR",
      value: current.netNewMrr,
      format: {
        style: "currency" as const,
        currency: "USD",
        maximumFractionDigits: 0,
      },
      icon: TrendUpIcon,
      delta:
        compare === "none" || previous.netNewMrr === 0
          ? null
          : ((current.netNewMrr - previous.netNewMrr) /
              Math.abs(previous.netNewMrr)) *
            100,
      points: false,
    },
    {
      label: "Active workspaces",
      value: current.workspaces,
      format: { maximumFractionDigits: 0 },
      icon: UsersThreeIcon,
      delta:
        compare === "none" || previous.workspaces === 0
          ? null
          : ((current.workspaces - previous.workspaces) / previous.workspaces) *
            100,
      points: false,
    },
    {
      label: "Trial conversion",
      value: current.conversion,
      format: {
        style: "percent" as const,
        maximumFractionDigits: 1,
      },
      icon: TargetIcon,
      delta:
        compare === "none"
          ? null
          : (current.conversion - previous.conversion) * 100,
      points: true,
    },
  ];

  function updateRange(next: RangeValue<CalendarDate> | null) {
    if (!next) return;
    setRange({ start: next.start, end: next.end });
    setLoading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLoading(false), 650);
  }

  function exportData() {
    const header = [
      "Date",
      "MRR",
      "Active workspaces",
      "New MRR",
      "Expansion MRR",
      "Churned MRR",
      "Signups",
      "Churned workspaces",
      "Trial conversion",
    ];
    const lines = rows.map((row) =>
      [
        row.date,
        row.mrr,
        row.workspaces,
        row.newMrr,
        row.expansionMrr,
        row.churnedMrr,
        row.signups,
        row.churned,
        row.conversion,
      ].join(","),
    );
    const csv = [header.join(","), ...lines].join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "cobalt-analytics.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    showToast({
      title: `${rows.length} days exported`,
      description: "The CSV file is in your downloads folder.",
      variant: "success",
    });
  }

  return (
    <div className="min-h-svh bg-muted/30">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
            >
              <ChartLineUpIcon size={20} weight="bold" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[-0.02em]">
                Cobalt
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Product analytics
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Badge variant="success" dot className="max-sm:hidden">
              Live
            </Badge>
            <span className="hidden text-xs text-muted-foreground md:block">
              Updated 2 min ago
            </span>
            <div className="flex items-center gap-2">
              <Avatar name="Devon Ellis" size="sm" />
              <span className="hidden text-sm font-medium sm:block">
                Devon Ellis
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-[-0.04em]">
            Analytics
          </h1>
          <Button variant="outline" size="sm" onPress={exportData}>
            <DownloadSimpleIcon size={16} aria-hidden="true" />
            Export CSV
          </Button>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <DateRangePicker
            label="Date range"
            size="sm"
            value={range}
            onChange={updateRange}
            presets={rangePresets}
            minValue={new CalendarDate(2025, 1, 1)}
            maxValue={new CalendarDate(2026, 10, 31)}
            className="w-full sm:w-72"
          />
          <Select
            label="Compare to"
            size="sm"
            options={compareOptions}
            value={compare}
            onValueChange={(value) => setCompare(value as CompareKey)}
            className="w-full sm:w-52"
          />
          <p className="pb-2 text-xs tabular-nums text-muted-foreground">
            {formatRange(range.start, range.end)}
          </p>
        </div>

        <section
          aria-label="Key metrics"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {loading
            ? ["mrr", "net", "workspaces", "conversion"].map((key) => (
                <StatSkeleton key={key} />
              ))
            : stats.map((stat) => {
                const Icon = stat.icon;
                const TrendIcon =
                  stat.delta !== null && stat.delta < 0
                    ? TrendDownIcon
                    : TrendUpIcon;
                return (
                  <Stat key={stat.label}>
                    <StatIcon>
                      <Icon weight="bold" />
                    </StatIcon>
                    <StatLabel>{stat.label}</StatLabel>
                    <StatValue>
                      <AnimatedNumber
                        value={stat.value}
                        formatOptions={stat.format}
                      />
                    </StatValue>
                    <StatDetail>
                      {stat.delta === null ? (
                        <span>No comparison</span>
                      ) : (
                        <>
                          <Badge
                            variant={stat.delta >= 0 ? "success" : "error"}
                            className="gap-1 px-2"
                          >
                            <TrendIcon
                              size={13}
                              weight="bold"
                              aria-hidden="true"
                            />
                            {Math.abs(stat.delta).toFixed(1)}
                            {stat.points ? " pts" : "%"}
                          </Badge>
                          <span>{compareLabel.toLowerCase()}</span>
                        </>
                      )}
                    </StatDetail>
                  </Stat>
                );
              })}
        </section>

        <Tabs
          value={tab}
          onValueChange={(key) => setTab(key as TabKey)}
          className="grid gap-4"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2
              id="performance-title"
              className="text-lg font-semibold tracking-[-0.03em]"
            >
              Performance
            </h2>
            <TabList aria-label="Analytics view">
              <Tab id="revenue">Revenue</Tab>
              <Tab id="customers">Customers</Tab>
            </TabList>
          </div>

          <TabPanel
            id="revenue"
            className="mt-0 grid gap-5 bg-transparent p-0 shadow-none ring-0"
          >
            {loading ? (
              <ChartSkeleton />
            ) : (
              <div className="grid gap-5">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
                  <AreaChart
                    data={buckets}
                    value="mrr"
                    title="Recurring revenue"
                    description={formatRange(range.start, range.end)}
                    headline={formatMoney(current.mrr)}
                    ariaLabel={`Monthly recurring revenue from ${formatRange(range.start, range.end)}`}
                    color="var(--ts-chart-1)"
                    formatValue={formatMoney}
                    formatAxis={formatCompactMoney}
                  />
                  <Card className="grid content-start gap-4 p-5">
                    <div>
                      <h3 className="text-base font-semibold tracking-tight">
                        MRR goal
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Q4 target for 31 December 2026.
                      </p>
                    </div>
                    <div className="grid justify-items-center gap-3 py-2">
                      <ProgressRing
                        label="of Q4 goal"
                        value={current.mrr}
                        maxValue={goal}
                        size="lg"
                        aria-label={`${formatMoney(current.mrr)} of ${formatMoney(goal)}`}
                      />
                      <p className="text-sm">
                        <span className="font-semibold">
                          {formatMoney(current.mrr)}
                        </span>{" "}
                        <span className="text-muted-foreground">
                          of {formatMoney(goal)}
                        </span>
                      </p>
                    </div>
                    <Separator />
                    <dl className="grid gap-2.5 text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-muted-foreground">Gap to goal</dt>
                        <dd className="font-medium tabular-nums">
                          {formatMoney(gap)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-muted-foreground">
                          Growth in range
                        </dt>
                        <dd className="font-medium tabular-nums">
                          {compactGrowth}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-muted-foreground">Progress</dt>
                        <dd className="font-medium tabular-nums">
                          {progress.toFixed(1)}%
                        </dd>
                      </div>
                    </dl>
                  </Card>
                </div>
                <BarChart
                  data={buckets}
                  series={revenueSeries}
                  title="Growth by source"
                  description="New and expansion MRR in each period."
                  ariaLabel="New and expansion MRR by period"
                  formatValue={formatMoney}
                  formatAxis={formatCompactMoney}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel
            id="customers"
            className="mt-0 grid gap-5 bg-transparent p-0 shadow-none ring-0"
          >
            {loading ? (
              <ChartSkeleton />
            ) : (
              <div className="grid gap-5">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
                  <AreaChart
                    data={buckets}
                    value="workspaces"
                    title="Active workspaces"
                    description={formatRange(range.start, range.end)}
                    headline={formatCount(current.workspaces)}
                    ariaLabel={`Active workspaces from ${formatRange(range.start, range.end)}`}
                    color="var(--ts-chart-2)"
                    formatValue={formatCount}
                    formatAxis={formatCount}
                  />
                  <Card className="grid content-start gap-4 p-5">
                    <h3 className="text-base font-semibold tracking-tight">
                      Customer health
                    </h3>
                    <dl className="grid gap-3 text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-muted-foreground">
                          New workspaces
                        </dt>
                        <dd className="font-medium tabular-nums">
                          {formatCount(current.signups)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-muted-foreground">
                          Churned workspaces
                        </dt>
                        <dd className="font-medium tabular-nums">
                          {formatCount(current.churned)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-muted-foreground">Net growth</dt>
                        <dd className="font-medium tabular-nums">
                          +{formatCount(current.signups - current.churned)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-muted-foreground">
                          Trial conversion
                        </dt>
                        <dd className="font-medium tabular-nums">
                          {formatPercent(current.conversion)}
                        </dd>
                      </div>
                    </dl>
                    <Separator />
                    <p className="text-sm leading-6 text-muted-foreground">
                      {current.signups > current.churned
                        ? "More workspaces joined than left."
                        : "More workspaces left than joined."}
                    </p>
                  </Card>
                </div>
                <BarChart
                  data={buckets}
                  series={customerSeries}
                  title="Workspace movement"
                  description="New and churned workspaces in each period."
                  ariaLabel="New and churned workspaces by period"
                  formatValue={formatCount}
                  formatAxis={formatCount}
                />
              </div>
            )}
          </TabPanel>
        </Tabs>

        <p className="text-xs text-muted-foreground">
          Data is updated every 15 minutes. All times in UTC.
        </p>
      </main>
    </div>
  );
}
