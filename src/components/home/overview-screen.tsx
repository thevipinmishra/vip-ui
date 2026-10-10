"use client";

import {
  CaretLeftIcon,
  CaretRightIcon,
  DownloadSimpleIcon,
  MagnifyingGlassIcon,
  TrendDownIcon,
  TrendUpIcon,
} from "@phosphor-icons/react";
import { areaY, barY, defineChart, dot, lineY, stack } from "@tanstack/charts";
import { d3Curve } from "@tanstack/charts/d3/shape";
import { decorative } from "@tanstack/charts/mark/decorative";
import { pie, polar, radialArc } from "@tanstack/charts/polar";
import { Chart } from "@tanstack/charts/react/core";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { portal } from "@tanstack/charts/tooltip/portal";
import { curveMonotoneX } from "d3-shape";
import { type ReactNode, useMemo, useState } from "react";
import {
  ChartPlot,
  galleryRenderer,
  groupTooltip,
  valueTooltip,
} from "@/components/charts/chart-plot";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartCaption, ChartFrame, ChartTitle } from "@/components/ui/chart";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from "@/components/ui/pagination";
import { SearchField } from "@/components/ui/search-field";
import { Stat, StatLabel, StatValue } from "@/components/ui/stat";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { showToast } from "@/components/ui/toast";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Block, BlockBody, BlockFooter } from "./block";
import { Part } from "./part";
import { Screen, ScreenHeader } from "./screen";

type Period = "7d" | "30d" | "12m";

const periods: Period[] = ["7d", "30d", "12m"];

const periodNames: Record<Period, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "12m": "12 months",
};

const smooth = d3Curve(curveMonotoneX);
const integer = { maximumFractionDigits: 0 } as const;
const milliseconds = {
  style: "unit",
  unit: "millisecond",
  unitDisplay: "short",
  maximumFractionDigits: 0,
} as const;
const dollars = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
} as const;
const money = new Intl.NumberFormat("en-US", dollars);

function TileChart({
  title,
  columns,
  rows,
  children,
}: {
  title: string;
  columns: readonly string[];
  rows: readonly (readonly (string | number)[])[];
  children: ReactNode;
}) {
  return (
    <ChartFrame className="bg-transparent p-0 sm:p-0">
      <ChartCaption className="sr-only">
        <ChartTitle>{title}</ChartTitle>
      </ChartCaption>
      {children}
      <div className="sr-only">
        <table>
          <caption>{title}: exact values</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={String(row[0])}>
                {row.map((value, index) =>
                  index === 0 ? (
                    <th key={columns[index]} scope="row">
                      {value}
                    </th>
                  ) : (
                    <td key={columns[index]}>{value}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}

type RevenuePoint = { label: string; pro: number; team: number };

const revenue: Record<Period, RevenuePoint[]> = {
  "7d": [
    { label: "Mon", pro: 4.1, team: 2.2 },
    { label: "Tue", pro: 4.6, team: 2.6 },
    { label: "Wed", pro: 4.3, team: 2.9 },
    { label: "Thu", pro: 5.2, team: 3.1 },
    { label: "Fri", pro: 5.8, team: 3.6 },
    { label: "Sat", pro: 3.2, team: 1.9 },
    { label: "Sun", pro: 2.9, team: 1.7 },
  ],
  "30d": [
    { label: "Sep 10", pro: 21, team: 12 },
    { label: "Sep 15", pro: 23, team: 14 },
    { label: "Sep 20", pro: 22, team: 15 },
    { label: "Sep 25", pro: 26, team: 17 },
    { label: "Sep 30", pro: 29, team: 19 },
    { label: "Oct 5", pro: 31, team: 22 },
  ],
  "12m": [
    { label: "Nov", pro: 88, team: 41 },
    { label: "Dec", pro: 94, team: 46 },
    { label: "Jan", pro: 91, team: 49 },
    { label: "Feb", pro: 99, team: 53 },
    { label: "Mar", pro: 104, team: 58 },
    { label: "Apr", pro: 101, team: 61 },
    { label: "May", pro: 112, team: 66 },
    { label: "Jun", pro: 118, team: 71 },
    { label: "Jul", pro: 121, team: 77 },
    { label: "Aug", pro: 127, team: 83 },
    { label: "Sep", pro: 134, team: 88 },
    { label: "Oct", pro: 139, team: 94 },
  ],
};

const revenueChange: Record<Period, number> = {
  "7d": 6.4,
  "30d": 12.1,
  "12m": 38.7,
};

function RevenueCard({ period }: { period: Period }) {
  const rows = revenue[period];
  const sum = rows.reduce((value, row) => value + row.pro + row.team, 0) * 1000;
  const max = Math.max(...rows.map((row) => row.pro + row.team));
  const definition = useMemo(() => {
    const series = rows.flatMap((row) => [
      { label: row.label, series: "Pro", value: row.pro },
      { label: row.label, series: "Team", value: row.team },
    ]);
    return defineChart({
      marks: [
        barY(series, {
          id: "revenue",
          x: "label",
          y: "value",
          z: "series",
          key: "label",
          color: "series",
          layout: stack(),
          inset: period === "12m" ? 3 : 8,
          radius: { end: 4, stack: "outer" },
        }),
      ],
      scales: {
        x: { scale: () => scaleBand().padding(0.12) },
        y: {
          scale: scaleLinear().domain([0, max * 1.12]),
          grid: true,
          axis: {
            ticks: { count: 4, format: (value: number) => `$${value}k` },
          },
        },
      },
      color: {
        domain: ["Pro", "Team"],
        range: ["var(--ts-chart-1)", "var(--ts-chart-2)"],
      },
      focus: "group-x",
      tooltip: {
        use: tooltip,
        portal,
        sort: "color-domain",
        content: (points, { primaryPoint }) =>
          groupTooltip<(typeof series)[number]>(
            points[0].datum.label,
            points,
            (row) => money.format(row.value * 1000),
            primaryPoint,
          ),
      },
    });
  }, [rows, max, period]);

  return (
    <Block title="Revenue" className="lg:col-span-2">
      <BlockBody className="gap-1 pb-0">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <Part slug="animated-number">
            <AnimatedNumber
              value={sum}
              formatOptions={dollars}
              className="block text-3xl font-semibold tracking-[-0.045em]"
            />
          </Part>
          <Part slug="badge">
            <Badge variant="success">
              <TrendUpIcon size={13} weight="bold" aria-hidden="true" />
              {revenueChange[period]}%
            </Badge>
          </Part>
          <span className="text-xs text-muted-foreground">
            Compared with the previous {periodNames[period]}
          </span>
        </div>
        <Part
          name="Chart"
          slug="chart"
          href="/charts"
          className="-mx-4 sm:-mx-5"
        >
          <ChartPlot
            title={`Revenue by plan for the last ${periodNames[period]}, in thousands of dollars`}
            columns={["Period", "Pro", "Team"]}
            rows={rows.map((row) => [row.label, row.pro, row.team])}
            legend={[
              { label: "Pro", color: "var(--ts-chart-1)" },
              { label: "Team", color: "var(--ts-chart-2)" },
            ]}
          >
            <Chart
              definition={definition}
              renderer={galleryRenderer}
              height={196}
              initialWidth={560}
              ariaLabel={`Revenue from Pro and Team plans for the last ${periodNames[period]}`}
            />
          </ChartPlot>
        </Part>
      </BlockBody>
    </Block>
  );
}

type Trend = { value: number; change: number; points: number[] };

const users: Record<Period, Trend> = {
  "7d": {
    value: 12140,
    change: 4.1,
    points: [11.2, 11.5, 11.3, 11.9, 12.2, 11.8, 12.5],
  },
  "30d": {
    value: 10960,
    change: 8.2,
    points: [
      8.9, 9.4, 9.1, 9.8, 10.2, 9.9, 10.6, 11.1, 10.8, 11.4, 11.9, 11.6, 12.1,
      12.5,
    ],
  },
  "12m": {
    value: 8420,
    change: 61.5,
    points: [5.1, 5.8, 6.2, 6.0, 6.9, 7.6, 8.1, 8.8, 9.6, 10.4, 11.3, 12.5],
  },
};

const latency: Record<Period, Trend> = {
  "7d": {
    value: 149,
    change: 6,
    points: [162, 158, 155, 157, 151, 150, 149],
  },
  "30d": {
    value: 156,
    change: 18,
    points: [212, 198, 204, 187, 176, 181, 169, 158, 162, 149],
  },
  "12m": {
    value: 171,
    change: 34,
    points: [262, 251, 244, 236, 221, 214, 203, 196, 188, 179, 166, 158],
  },
};

const pointLabel: Record<Period, (index: number, count: number) => string> = {
  "7d": (index) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
  "30d": (index, count) =>
    new Date(
      Date.UTC(
        2026,
        9,
        10 - Math.round(((count - 1 - index) * 29) / (count - 1)),
      ),
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }),
  "12m": (index) =>
    [
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ][index],
};

function UsersTile({ period }: { period: Period }) {
  const trend = users[period];
  const rows = useMemo(
    () =>
      users[period].points.map((value, index, points) => ({
        when: pointLabel[period](index, points.length),
        value,
      })),
    [period],
  );
  const definition = useMemo(() => {
    const min = Math.min(...rows.map((row) => row.value));
    const max = Math.max(...rows.map((row) => row.value));
    return defineChart({
      marks: [
        decorative(
          areaY(rows, {
            x: "when",
            y: "value",
            curve: smooth,
            fill: "var(--ts-chart-1)",
            fillOpacity: 0.14,
          }),
        ),
        lineY(rows, {
          x: "when",
          y: "value",
          curve: smooth,
          stroke: "var(--ts-chart-1)",
          strokeWidth: 2,
        }),
      ],
      guides: false,
      clip: true,
      margin: { top: 4, right: 2, bottom: 2, left: 2 },
      scales: {
        x: { scale: scalePoint },
        y: {
          scale: scaleLinear().domain([min - (max - min) * 0.6, max * 1.02]),
        },
      },
      tooltip: {
        use: tooltip,
        portal,
        content: ([point]) =>
          valueTooltip(
            point.datum.when,
            "Active users",
            `${point.datum.value.toFixed(1)}k`,
            point.color,
          ),
      },
    });
  }, [rows]);

  return (
    <Part slug="stat">
      <Stat className="grid min-w-0 content-start gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <StatLabel>Active users</StatLabel>
            <StatValue className="mt-1 text-2xl">
              <AnimatedNumber value={trend.value} formatOptions={integer} />
            </StatValue>
          </div>
          <Badge variant="success">
            <TrendUpIcon size={13} weight="bold" aria-hidden="true" />
            {trend.change}%
          </Badge>
        </div>
        <TileChart
          title={`Daily active users for the last ${periodNames[period]}, in thousands`}
          columns={["Day", "Users (thousands)"]}
          rows={rows.map((row) => [row.when, row.value])}
        >
          <Chart
            definition={definition}
            renderer={galleryRenderer}
            height={72}
            initialWidth={300}
            ariaLabel={`Daily active users change from ${trend.points[0]} thousand to ${trend.points.at(-1)} thousand`}
          />
        </TileChart>
      </Stat>
    </Part>
  );
}

function LatencyTile({ period }: { period: Period }) {
  const trend = latency[period];
  const rows = useMemo(
    () =>
      latency[period].points.map((ms, index, points) => ({
        when: pointLabel[period](index, points.length),
        ms,
      })),
    [period],
  );
  const definition = useMemo(() => {
    const min = Math.min(...rows.map((row) => row.ms));
    const max = Math.max(...rows.map((row) => row.ms));
    return defineChart({
      marks: [
        lineY(rows, {
          x: "when",
          y: "ms",
          curve: smooth,
          stroke: "var(--ts-chart-2)",
          strokeWidth: 2,
        }),
        decorative(
          dot(rows.slice(-1), {
            x: "when",
            y: "ms",
            fill: "var(--ts-chart-2)",
            stroke: "var(--card)",
            strokeWidth: 2,
            r: 4,
          }),
        ),
      ],
      guides: false,
      margin: { top: 6, right: 6, bottom: 6, left: 2 },
      scales: {
        x: { scale: scalePoint },
        y: { scale: scaleLinear().domain([min * 0.9, max * 1.04]) },
      },
      tooltip: {
        use: tooltip,
        portal,
        content: ([point]) =>
          valueTooltip(
            point.datum.when,
            "Median response",
            `${point.datum.ms} ms`,
            point.color,
          ),
      },
    });
  }, [rows]);

  return (
    <Part slug="stat">
      <Stat className="grid min-w-0 content-start gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <StatLabel>Response time</StatLabel>
            <StatValue className="mt-1 text-2xl">
              <AnimatedNumber
                value={trend.value}
                formatOptions={milliseconds}
              />
            </StatValue>
          </div>
          <Badge variant="success">
            <TrendDownIcon size={13} weight="bold" aria-hidden="true" />
            {trend.change}%
          </Badge>
        </div>
        <TileChart
          title={`Median response time for the last ${periodNames[period]}, in milliseconds`}
          columns={["Day", "Response (ms)"]}
          rows={rows.map((row) => [row.when, row.ms])}
        >
          <Chart
            definition={definition}
            renderer={galleryRenderer}
            height={72}
            initialWidth={300}
            ariaLabel={`Median response time decreases from ${trend.points[0]} to ${trend.points.at(-1)} milliseconds`}
          />
        </TileChart>
      </Stat>
    </Part>
  );
}

const planColors = {
  Pro: "var(--ts-chart-1)",
  Team: "var(--ts-chart-2)",
  Free: "var(--ts-chart-3)",
} as const;

type Plan = keyof typeof planColors;

const signups: Record<Period, Record<Plan, number>> = {
  "7d": { Pro: 151, Team: 106, Free: 55 },
  "30d": { Pro: 693, Team: 385, Free: 206 },
  "12m": { Pro: 7609, Team: 4028, Free: 3283 },
};

function WorkspacesCard({ period }: { period: Period }) {
  const counts = signups[period];
  const total = counts.Pro + counts.Team + counts.Free;
  const rows = useMemo(() => {
    const counts = signups[period];
    const total = counts.Pro + counts.Team + counts.Free;
    return (Object.keys(planColors) as Plan[]).map((plan) => ({
      plan,
      count: counts[plan],
      share: Math.round((counts[plan] / total) * 100),
    }));
  }, [period]);
  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          polar({
            radiusRatio: 0.96,
            marks: [
              radialArc(pie(rows, { value: "count", gapAngle: 0.05 }), {
                color: "plan",
                key: "plan",
                innerRadius: ({ radius }) => radius * 0.7,
                cornerRadius: 4,
              }),
            ],
            scales: { angle: null, radius: null },
          }),
        ],
        scales: { x: null, y: null },
        color: {
          domain: rows.map((row) => row.plan),
          range: rows.map((row) => planColors[row.plan]),
        },
        tooltip: {
          use: tooltip,
          portal,
          content: ([point]) =>
            valueTooltip(
              point.datum.plan,
              "New workspaces",
              `${point.datum.count.toLocaleString("en-US")} (${point.datum.share}%)`,
              point.color,
            ),
        },
      }),
    [rows],
  );

  return (
    <Block title="New workspaces">
      <BlockBody className="content-center justify-items-center gap-5">
        <Part name="Chart" slug="chart" href="/charts" className="w-40">
          <div className="relative">
            <TileChart
              title={`New workspaces by plan for the last ${periodNames[period]}`}
              columns={["Plan", "Workspaces", "Share (%)"]}
              rows={rows.map((row) => [row.plan, row.count, row.share])}
            >
              <Chart
                definition={definition}
                renderer={galleryRenderer}
                height={160}
                initialWidth={160}
                ariaLabel={rows
                  .map((row) => `${row.plan} has ${row.share} percent`)
                  .join(", ")}
              />
            </TileChart>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 grid place-content-center text-center"
            >
              <AnimatedNumber
                value={total}
                formatOptions={integer}
                className="text-xl font-semibold tracking-[-0.04em]"
              />
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
          </div>
        </Part>
        <ul className="grid w-full gap-2 text-sm">
          {rows.map((row) => (
            <li key={row.plan} className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-[3px]"
                style={{ backgroundColor: planColors[row.plan] }}
              />
              <span className="min-w-0 flex-1 truncate text-muted-foreground">
                {row.plan}
              </span>
              <span className="font-medium tabular-nums">
                {row.count.toLocaleString("en-US")}
              </span>
              <span className="w-10 text-end text-muted-foreground tabular-nums">
                {row.share}%
              </span>
            </li>
          ))}
        </ul>
      </BlockBody>
    </Block>
  );
}

type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";

const invoices: {
  id: string;
  customer: string;
  status: InvoiceStatus;
  amount: number;
}[] = [
  { id: "INV-2048", customer: "Lumen Labs", status: "Paid", amount: 4200 },
  { id: "INV-2047", customer: "Harbor & Co.", status: "Pending", amount: 1850 },
  { id: "INV-2046", customer: "Fieldwork", status: "Overdue", amount: 960 },
  { id: "INV-2045", customer: "Kettle Studio", status: "Paid", amount: 12400 },
  { id: "INV-2044", customer: "Northpeak", status: "Draft", amount: 3100 },
  { id: "INV-2043", customer: "Orbit Health", status: "Paid", amount: 2750 },
  { id: "INV-2042", customer: "Pine & Oak", status: "Pending", amount: 5320 },
  { id: "INV-2041", customer: "Quarry", status: "Paid", amount: 880 },
];

const statusVariant = {
  Paid: "success",
  Pending: "warning",
  Overdue: "error",
  Draft: "neutral",
} as const;

const pageSize = 4;

function InvoicesCard() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const matches = invoices.filter((invoice) =>
    `${invoice.id} ${invoice.customer} ${invoice.status}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const pages = Math.max(1, Math.ceil(matches.length / pageSize));
  const rows = matches.slice(page * pageSize, (page + 1) * pageSize);
  const first = matches.length ? page * pageSize + 1 : 0;

  return (
    <Block
      title="Invoices"
      className="lg:col-span-2"
      action={
        <Part slug="search-field" className="w-40 shrink-0 sm:w-48">
          <SearchField
            aria-label="Search invoices"
            placeholder="Search"
            value={query}
            onChange={(next) => {
              setQuery(next);
              setPage(0);
            }}
          />
        </Part>
      }
    >
      <BlockBody className="gap-3 pb-3">
        <Part slug="table">
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table
              aria-label="Invoices"
              className="[&_td]:py-2.5 [&_th]:py-2.5"
            >
              <TableHeader>
                <Column isRowHeader>Customer</Column>
                <Column className="max-sm:hidden">Invoice</Column>
                <Column className="max-sm:hidden">Status</Column>
                <Column className="text-end">Amount</Column>
              </TableHeader>
              <TableBody
                items={rows}
                renderEmptyState={() => (
                  <EmptyState className="m-3 gap-2 py-6">
                    <EmptyStateIcon className="size-9">
                      <MagnifyingGlassIcon size={16} />
                    </EmptyStateIcon>
                    <EmptyStateTitle className="text-sm">
                      No invoices found
                    </EmptyStateTitle>
                    <EmptyStateDescription className="text-xs">
                      Search for a different customer.
                    </EmptyStateDescription>
                  </EmptyState>
                )}
              >
                {(invoice) => (
                  <Row id={invoice.id}>
                    <Cell>
                      <span className="block truncate font-medium">
                        {invoice.customer}
                      </span>
                      <Badge
                        variant={statusVariant[invoice.status]}
                        dot
                        className="mt-1 sm:hidden"
                      >
                        {invoice.status}
                      </Badge>
                    </Cell>
                    <Cell className="font-mono text-xs text-muted-foreground max-sm:hidden">
                      {invoice.id}
                    </Cell>
                    <Cell className="max-sm:hidden">
                      <Badge variant={statusVariant[invoice.status]} dot>
                        {invoice.status}
                      </Badge>
                    </Cell>
                    <Cell className="text-end tabular-nums">
                      {money.format(invoice.amount)}
                    </Cell>
                  </Row>
                )}
              </TableBody>
            </Table>
          </div>
        </Part>
      </BlockBody>
      <BlockFooter className="flex-nowrap justify-between">
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {matches.length
            ? `${first}–${first + rows.length - 1} of ${matches.length}`
            : "0 results"}
        </p>
        <Part slug="pagination">
          <Pagination aria-label="Invoice pages">
            <PaginationList className="flex-nowrap gap-1">
              <PaginationItem>
                <PaginationLink
                  href="#invoices"
                  aria-label="Previous page"
                  isDisabled={page === 0}
                  onClick={(event) => {
                    event.preventDefault();
                    setPage((current) => Math.max(0, current - 1));
                  }}
                >
                  <CaretLeftIcon size={17} aria-hidden="true" />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#invoices"
                  aria-label="Next page"
                  isDisabled={page >= pages - 1}
                  onClick={(event) => {
                    event.preventDefault();
                    setPage((current) => Math.min(pages - 1, current + 1));
                  }}
                >
                  <CaretRightIcon size={17} aria-hidden="true" />
                </PaginationLink>
              </PaginationItem>
            </PaginationList>
          </Pagination>
        </Part>
      </BlockFooter>
    </Block>
  );
}

export function OverviewScreen() {
  const [period, setPeriod] = useState<Period>("30d");

  return (
    <Screen>
      <ScreenHeader
        title="Overview"
        detail={`Last ${periodNames[period]}`}
        actions={
          <>
            <Part slug="toggle-button-group">
              <ToggleButtonGroup
                aria-label="Period"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={[period]}
                onSelectionChange={(keys) => {
                  const [next] = keys;
                  if (periods.includes(next as Period)) {
                    setPeriod(next as Period);
                  }
                }}
              >
                {periods.map((key) => (
                  <ToggleButton
                    key={key}
                    id={key}
                    variant="segmented"
                    aria-label={periodNames[key]}
                    className="px-2.5"
                  >
                    {key.toUpperCase()}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Part>
            <Part slug="button">
              <Button
                variant="outline"
                size="sm"
                onPress={() =>
                  showToast({
                    title: "Export started",
                    description: `overview-${period}.csv`,
                  })
                }
              >
                <DownloadSimpleIcon size={16} aria-hidden="true" />
                Export
              </Button>
            </Part>
          </>
        }
      />
      <div className="grid min-w-0 gap-4 lg:grid-cols-3">
        <RevenueCard period={period} />
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <UsersTile period={period} />
          <LatencyTile period={period} />
        </div>
        <InvoicesCard />
        <WorkspacesCard period={period} />
      </div>
    </Screen>
  );
}
