"use client";

import { defineChart, dot } from "@tanstack/charts";
import { controlledSignal } from "@tanstack/charts/interaction/signal";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { keyedSelection, whenSelected } from "@tanstack/charts/selection";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Chart,
  ChartAction,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const accounts = [
  {
    id: "northwind",
    name: "Northwind Labs",
    spend: 58200,
    retention: 96,
  },
  {
    id: "lumen",
    name: "Lumen Health",
    spend: 51400,
    retention: 93,
  },
  {
    id: "atlas",
    name: "Atlas Freight",
    spend: 47800,
    retention: 88,
  },
  {
    id: "kepler",
    name: "Kepler Energy",
    spend: 43600,
    retention: 91,
  },
  {
    id: "harbor",
    name: "Harbor Retail",
    spend: 39200,
    retention: 84,
  },
  {
    id: "cedar",
    name: "Cedar Finance",
    spend: 35600,
    retention: 89,
  },
  {
    id: "pioneer",
    name: "Pioneer Media",
    spend: 31400,
    retention: 79,
  },
  {
    id: "solstice",
    name: "Solstice Travel",
    spend: 26800,
    retention: 82,
  },
  {
    id: "meadow",
    name: "Meadow Foods",
    spend: 22300,
    retention: 74,
  },
  {
    id: "orbital",
    name: "Orbital Robotics",
    spend: 18400,
    retention: 77,
  },
];

type Account = (typeof accounts)[number];

const moneyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const compactMoneyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
});
const percentFormat = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 0,
});

const formatMoney = (value: number) => moneyFormat.format(value);
const formatCompactMoney = (value: number) => compactMoneyFormat.format(value);
const formatRetention = (value: number) => percentFormat.format(value / 100);

export function ChartSelectionTable() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const definition = useMemo(() => {
    const selection = keyedSelection<Account, string, number, number>({
      selected: controlledSignal(selectedId, (next) => setSelectedId(next)),
      key: (datum) => datum.id,
    });

    return defineChart({
      marks: [
        dot(accounts, {
          id: "accounts",
          x: "spend",
          y: "retention",
          key: "id",
          r: 5,
          fill: "var(--ts-chart-1)",
          fillOpacity: 0.75,
        }),
        whenSelected(
          dot(accounts, {
            id: "selected-account",
            x: "spend",
            y: "retention",
            key: "id",
            r: 8,
            fill: "none",
            stroke: "var(--ts-chart-1)",
            strokeWidth: 2,
          }),
          selection,
        ),
      ],
      scales: {
        x: {
          scale: scaleLinear().domain([0, 60000]),
          grid: true,
          axis: {
            label: "Annual spend",
            ticks: { count: 4, format: formatCompactMoney },
          },
        },
        y: {
          scale: scaleLinear().domain([65, 100]),
          grid: true,
          axis: {
            label: "Retention",
            ticks: { count: 5, format: formatRetention },
          },
        },
      },
      selection,
      tooltip: {
        use: tooltip,
        content: ([point]) => ({
          title: point.datum.name,
          rows: [
            {
              label: "Annual spend",
              value: formatMoney(point.datum.spend),
              color: point.color,
            },
            {
              label: "Retention",
              value: formatRetention(point.datum.retention),
            },
          ],
        }),
      },
    });
  }, [selectedId]);

  const selected = accounts.find((account) => account.id === selectedId);

  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Account health</ChartTitle>
        <ChartDescription>
          Annual spend and retention for ten accounts. Select a point to inspect
          an account.
        </ChartDescription>
      </ChartCaption>
      <ChartAction>
        <Button
          variant="outline"
          size="sm"
          isDisabled={!selected}
          onPress={() => setSelectedId(null)}
        >
          Clear
        </Button>
      </ChartAction>
      <Chart
        definition={definition}
        height={260}
        initialWidth={520}
        ariaLabel="Annual spend against retention for ten accounts. Select a point to inspect an account."
      />
      <p
        role="status"
        aria-live="polite"
        className="mt-3 text-xs text-muted-foreground"
      >
        {selected ? (
          <>
            <span className="font-medium text-foreground">{selected.name}</span>
            <span aria-hidden="true"> · </span>
            {formatMoney(selected.spend)} spend
            <span aria-hidden="true"> · </span>
            {formatRetention(selected.retention)} retention
          </>
        ) : (
          "No account selected"
        )}
      </p>
      <ChartTable
        caption="Account spend and retention"
        columns={["Account", "Annual spend", "Retention"]}
        rows={accounts.map((account) => [
          account.name,
          formatMoney(account.spend),
          formatRetention(account.retention),
        ])}
      />
    </ChartFrame>
  );
}
