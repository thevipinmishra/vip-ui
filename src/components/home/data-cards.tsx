"use client";

import {
  CaretLeftIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
  TrendUpIcon,
} from "@phosphor-icons/react";
import { barY, defineChart, stack } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react/core";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { portal } from "@tanstack/charts/tooltip/portal";
import { useMemo, useState } from "react";
import {
  ChartPlot,
  galleryRenderer,
  groupTooltip,
} from "@/components/charts/chart-plot";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
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
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Block, BlockBody, BlockFooter } from "./block";

type Period = "7d" | "30d" | "12m";

const periods: Period[] = ["7d", "30d", "12m"];

const periodNames: Record<Period, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "12m": "12 months",
};

const dollars = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
} as const;
const money = new Intl.NumberFormat("en-US", dollars);

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

export function RevenueCard() {
  const [period, setPeriod] = useState<Period>("30d");
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
    <Block
      title="Revenue"
      action={
        <ToggleButtonGroup
          className="shrink-0"
          aria-label="Period"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[period]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (periods.includes(next as Period)) setPeriod(next as Period);
          }}
        >
          {periods.map((key) => (
            <ToggleButton
              key={key}
              id={key}
              variant="segmented"
              aria-label={periodNames[key]}
            >
              {key.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      }
    >
      <BlockBody className="gap-1 pb-0">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <AnimatedNumber
            value={sum}
            formatOptions={dollars}
            className="block text-3xl font-semibold tracking-[-0.045em]"
          />
          <Badge variant="success">
            <TrendUpIcon size={13} weight="bold" aria-hidden="true" />
            {revenueChange[period]}%
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Last {periodNames[period]}
        </p>
        <div className="-mx-5 min-w-0">
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
              height={176}
              initialWidth={440}
              ariaLabel={`Revenue from Pro and Team plans for the last ${periodNames[period]}`}
            />
          </ChartPlot>
        </div>
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

const pageSize = 5;

export function InvoicesCard() {
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
      action={
        <SearchField
          className="w-36 shrink-0 sm:w-44"
          aria-label="Search invoices"
          placeholder="Search"
          value={query}
          onChange={(next) => {
            setQuery(next);
            setPage(0);
          }}
        />
      }
    >
      <BlockBody className="@container gap-3 pb-3">
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table aria-label="Invoices">
            <TableHeader>
              <Column isRowHeader>Customer</Column>
              <Column className="@max-[30rem]:hidden">Invoice</Column>
              <Column className="@max-[22rem]:hidden">Status</Column>
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
                      className="mt-1 @min-[22rem]:hidden"
                    >
                      {invoice.status}
                    </Badge>
                  </Cell>
                  <Cell className="font-mono text-xs text-muted-foreground @max-[30rem]:hidden">
                    {invoice.id}
                  </Cell>
                  <Cell className="@max-[22rem]:hidden">
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
      </BlockBody>
      <BlockFooter className="flex-nowrap justify-between">
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {matches.length
            ? `${first}–${first + rows.length - 1} of ${matches.length}`
            : "0 results"}
        </p>
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
      </BlockFooter>
    </Block>
  );
}
