"use client";

import { CalendarDate } from "@internationalized/date";
import { ChartLineUpIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RangeValue } from "react-aria-components";
import { AnimatedNumber } from "../../vip-ui/animated-number";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import { Card } from "../../vip-ui/card";
import { DateRangePicker } from "../../vip-ui/date-range-picker";
import { ProgressRing } from "../../vip-ui/progress-ring";
import { Select } from "../../vip-ui/select";
import { Separator } from "../../vip-ui/separator";
import { Skeleton } from "../../vip-ui/skeleton";
import {
  Stat,
  StatDetail,
  StatGroup,
  StatLabel,
  StatTrend,
  StatValue,
} from "../../vip-ui/stat";
import { Tab, TabList, TabPanel, Tabs } from "../../vip-ui/tabs";
import { showToast } from "../../vip-ui/toast";
import { AccountsTable } from "./accounts-table";
import {
  CohortChart,
  MovementChart,
  type MovementSeries,
  TrendChart,
} from "./analytics-charts";
import {
  bucketRows,
  compareOptions,
  type DayRow,
  defaultRange,
  formatCompactMoney,
  formatCount,
  formatMoney,
  formatPercent,
  formatRange,
  previousPeriod,
  previousYear,
  rangePresets,
  rowsInRange,
  type Summary,
  summarize,
} from "./data";

type TabKey = "revenue" | "customers";
type CompareKey = "previous" | "year" | "none";

const goal = 480_000;
const quarterEnd = Date.UTC(2026, 11, 31);
const dayMs = 86_400_000;

const revenueSeries: MovementSeries[] = [
  { key: "newMrr", label: "New", color: "var(--ts-chart-1)", sign: 1 },
  {
    key: "expansionMrr",
    label: "Expansion",
    color: "color-mix(in oklab, var(--ts-chart-1) 50%, var(--card))",
    sign: 1,
  },
  {
    key: "contractionMrr",
    label: "Contraction",
    color: "color-mix(in oklab, var(--destructive) 45%, var(--card))",
    sign: -1,
  },
  { key: "churnedMrr", label: "Churn", color: "var(--destructive)", sign: -1 },
];

const workspaceSeries: MovementSeries[] = [
  { key: "signups", label: "New", color: "var(--ts-chart-2)", sign: 1 },
  {
    key: "churned",
    label: "Churned",
    color: "var(--destructive)",
    sign: -1,
  },
];

const money = {
  style: "currency" as const,
  currency: "USD",
  maximumFractionDigits: 0,
};

interface Kpi {
  label: string;
  value: number;
  format: Intl.NumberFormatOptions;
  change: number | null;
  points?: boolean;
  invert?: boolean;
}

function percentChange(value: number, before: number | undefined) {
  if (before === undefined || before === 0) return null;
  return Math.round(((value - before) / Math.abs(before)) * 1_000) / 10;
}

function pointChange(value: number, before: number | undefined) {
  if (before === undefined) return null;
  return Math.round((value - before) * 1_000) / 10;
}

function kpisFor(current: Summary, previous: Summary | null): Kpi[] {
  return [
    {
      label: "MRR",
      value: current.mrr,
      format: money,
      change: percentChange(current.mrr, previous?.mrr),
    },
    {
      label: "Net new MRR",
      value: current.netNewMrr,
      format: money,
      change: percentChange(current.netNewMrr, previous?.netNewMrr),
    },
    {
      label: "Active workspaces",
      value: current.workspaces,
      format: { maximumFractionDigits: 0 },
      change: percentChange(current.workspaces, previous?.workspaces),
    },
    {
      label: "Revenue per account",
      value: current.arpa,
      format: { ...money, minimumFractionDigits: 2, maximumFractionDigits: 2 },
      change: percentChange(current.arpa, previous?.arpa),
    },
    {
      label: "Trial conversion",
      value: current.conversion,
      format: {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      },
      change: pointChange(current.conversion, previous?.conversion),
      points: true,
    },
    {
      label: "Logo churn, monthly",
      value: current.logoChurn,
      format: {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      change:
        previous === null
          ? null
          : Math.round((current.logoChurn - previous.logoChurn) * 10_000) / 100,
      points: true,
      invert: true,
    },
  ];
}

function formatChange(kpi: Kpi, change: number) {
  const sign = change > 0 ? "+" : change < 0 ? "−" : "";
  const digits = kpi.invert && kpi.points ? 2 : 1;
  return `${sign}${Math.abs(change).toFixed(digits)}${kpi.points ? " pts" : "%"}`;
}

function PanelSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <div className="rounded-xl bg-card p-5 shadow-(--shadow-card) ring-1 ring-border/70">
      <Skeleton className="h-4 w-36" />
      <Skeleton className="mt-3 h-7 w-44" />
      <Skeleton className={tall ? "mt-5 h-64 w-full" : "mt-5 h-56 w-full"} />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <PanelSkeleton tall />
        <div className="rounded-xl bg-card p-5 shadow-(--shadow-card) ring-1 ring-border/70">
          <Skeleton className="h-4 w-24" />
          <div className="grid justify-items-center gap-3 py-4">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="mt-4 grid gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
      <PanelSkeleton />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}

function exportCsv(rows: DayRow[]) {
  const header = [
    "Date",
    "MRR",
    "Active workspaces",
    "Trials",
    "New workspaces",
    "Churned workspaces",
    "New MRR",
    "Expansion MRR",
    "Contraction MRR",
    "Churned MRR",
  ];
  const lines = rows.map((row) =>
    [
      row.date,
      row.mrr,
      row.workspaces,
      row.trials,
      row.signups,
      row.churned,
      row.newMrr,
      row.expansionMrr,
      row.contractionMrr,
      row.churnedMrr,
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

function KpiStats({
  kpis,
  compareLabel,
}: {
  kpis: Kpi[] | null;
  compareLabel: string;
}) {
  if (!kpis) {
    return ["a", "b", "c", "d", "e", "f"].map((key) => (
      <Stat key={key} className="grid gap-2.5">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-4 w-20" />
      </Stat>
    ));
  }

  return kpis.map((kpi) => (
    <Stat key={kpi.label}>
      <StatLabel className="truncate">{kpi.label}</StatLabel>
      <StatValue className="text-2xl">
        <AnimatedNumber value={kpi.value} formatOptions={kpi.format} />
      </StatValue>
      <StatDetail>
        {kpi.change === null ? (
          <span>No comparison</span>
        ) : (
          <>
            <StatTrend
              direction={
                kpi.change > 0 ? "up" : kpi.change < 0 ? "down" : "neutral"
              }
              invert={kpi.invert}
            >
              {formatChange(kpi, kpi.change)}
            </StatTrend>
            <span className="truncate">vs. {compareLabel.toLowerCase()}</span>
          </>
        )}
      </StatDetail>
    </Stat>
  ));
}

function GoalCard({
  current,
  days,
  end,
}: {
  current: Summary;
  days: number;
  end: CalendarDate;
}) {
  const daysLeft = Math.max(
    0,
    Math.round((quarterEnd - end.toDate("UTC").getTime()) / dayMs),
  );
  const pace = (current.netNewMrr * 30) / days;
  const projected = current.mrr + (pace * daysLeft) / 30;
  const gap = Math.max(0, goal - current.mrr);
  const needed = daysLeft > 0 ? gap / (daysLeft / 30) : gap;
  const onTrack = projected >= goal;

  return (
    <Card className="grid content-start gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Q4 goal</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatMoney(goal)} MRR by December 31
          </p>
        </div>
        <Badge variant={onTrack ? "success" : "warning"}>
          {onTrack ? "On track" : "Behind pace"}
        </Badge>
      </div>
      <div className="grid justify-items-center py-1">
        <ProgressRing
          label="of goal"
          value={Math.min(current.mrr, goal)}
          maxValue={goal}
          size="lg"
          aria-label={`${formatMoney(current.mrr)} of ${formatMoney(goal)}`}
        />
      </div>
      <Separator />
      <dl className="grid gap-2.5 text-sm">
        <Detail label="Gap to goal" value={formatMoney(gap)} />
        <Detail label="Needed per month" value={formatMoney(needed)} />
        <Detail label="Current pace per month" value={formatMoney(pace)} />
        <Detail label="Projected on Dec 31" value={formatMoney(projected)} />
      </dl>
    </Card>
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
  const compareBuckets = useMemo(
    () =>
      compareRows.length === rows.length && compareRows.length > 0
        ? bucketRows(compareRows, 13)
        : null,
    [compareRows, rows.length],
  );
  const compareLabel =
    compareOptions.find((option) => option.id === compare)?.name ?? "";
  const rangeLabel = formatRange(range.start, range.end);

  function updateRange(next: RangeValue<CalendarDate> | null) {
    if (!next) return;
    setRange({ start: next.start, end: next.end });
    setLoading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLoading(false), 650);
  }

  const kpis = current ? kpisFor(current, previous) : null;

  return (
    <div className="min-h-svh bg-muted/30">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
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
                Revenue analytics
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

      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.04em]">
              Revenue
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{rangeLabel}</p>
          </div>
          <div className="flex w-full flex-wrap items-end gap-3 sm:w-auto">
            <DateRangePicker
              label="Date range"
              size="sm"
              value={range}
              onChange={updateRange}
              presets={rangePresets}
              minValue={new CalendarDate(2026, 1, 1)}
              maxValue={defaultRange.end}
              className="w-full sm:w-64"
            />
            <Select
              label="Compare to"
              size="sm"
              options={compareOptions}
              value={compare}
              onChange={(value) => setCompare(value as CompareKey)}
              className="w-full sm:w-44"
            />
            <Button variant="outline" size="sm" onPress={() => exportCsv(rows)}>
              <DownloadSimpleIcon
                data-icon="inline-start"
                size={16}
                aria-hidden="true"
              />
              Export CSV
            </Button>
          </div>
        </div>

        <StatGroup
          role="group"
          aria-label="Key metrics"
          className="grid-cols-2 md:grid-cols-3 xl:grid-cols-6"
        >
          <KpiStats kpis={loading ? null : kpis} compareLabel={compareLabel} />
        </StatGroup>

        <Tabs
          selectedKey={tab}
          onSelectionChange={(key) => setTab(key as TabKey)}
          className="grid gap-4"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-[-0.03em]">
              Performance
            </h2>
            <TabList aria-label="Analytics view" size="sm">
              <Tab id="revenue">Revenue</Tab>
              <Tab id="customers">Customers</Tab>
            </TabList>
          </div>

          <TabPanel
            id="revenue"
            className="mt-0 grid gap-5 bg-transparent p-0 shadow-none ring-0"
          >
            {loading || !current ? (
              <ChartSkeleton />
            ) : (
              <div className="grid gap-5">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
                  <TrendChart
                    data={buckets}
                    compare={compareBuckets}
                    compareLabel={compareLabel}
                    value="mrr"
                    title="Monthly recurring revenue"
                    description={rangeLabel}
                    headline={formatMoney(current.mrr)}
                    ariaLabel={`Monthly recurring revenue from ${rangeLabel}`}
                    color="var(--ts-chart-1)"
                    formatValue={formatMoney}
                    formatAxis={formatCompactMoney}
                  />
                  <GoalCard
                    current={current}
                    days={rows.length}
                    end={range.end}
                  />
                </div>
                <MovementChart
                  data={buckets}
                  series={revenueSeries}
                  title="MRR movement"
                  description="Gains above zero, losses below. The line is net new MRR."
                  netLabel="Net new MRR"
                  ariaLabel={`New, expansion, contraction, and churned MRR in each period from ${rangeLabel}`}
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
            {loading || !current ? (
              <ChartSkeleton />
            ) : (
              <div className="grid gap-5">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
                  <TrendChart
                    data={buckets}
                    compare={compareBuckets}
                    compareLabel={compareLabel}
                    value="workspaces"
                    title="Active workspaces"
                    description={rangeLabel}
                    headline={formatCount(current.workspaces)}
                    ariaLabel={`Active workspaces from ${rangeLabel}`}
                    color="var(--ts-chart-2)"
                    formatValue={formatCount}
                    formatAxis={formatCount}
                  />
                  <Card className="grid content-start gap-4 p-5">
                    <h3 className="text-base font-semibold tracking-tight">
                      Customer health
                    </h3>
                    <dl className="grid gap-2.5 text-sm">
                      <Detail
                        label="Trials started"
                        value={formatCount(current.trials)}
                      />
                      <Detail
                        label="New workspaces"
                        value={formatCount(current.signups)}
                      />
                      <Detail
                        label="Churned workspaces"
                        value={formatCount(current.churned)}
                      />
                      <Detail
                        label="Net growth"
                        value={`${current.signups >= current.churned ? "+" : "−"}${formatCount(Math.abs(current.signups - current.churned))}`}
                      />
                    </dl>
                    <Separator />
                    <dl className="grid gap-2.5 text-sm">
                      <Detail
                        label="Trial conversion"
                        value={formatPercent(current.conversion)}
                      />
                      <Detail
                        label="Logo churn, monthly"
                        value={formatPercent(current.logoChurn, 2)}
                      />
                      <Detail
                        label="Revenue per account"
                        value={formatMoney(current.arpa)}
                      />
                    </dl>
                  </Card>
                </div>
                <div className="grid gap-5 xl:grid-cols-2">
                  <MovementChart
                    data={buckets}
                    series={workspaceSeries}
                    title="Workspace movement"
                    description="New workspaces above zero, churned below."
                    netLabel="Net change"
                    ariaLabel={`New and churned workspaces in each period from ${rangeLabel}`}
                    formatValue={formatCount}
                    formatAxis={formatCount}
                  />
                  <CohortChart />
                </div>
              </div>
            )}
          </TabPanel>
        </Tabs>

        <AccountsTable />

        <p className="text-xs text-muted-foreground">
          Data is updated every 15 minutes. All times in UTC.
        </p>
      </main>
    </div>
  );
}
