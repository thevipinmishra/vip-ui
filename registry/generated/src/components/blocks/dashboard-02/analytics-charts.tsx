"use client";

import {
  barY,
  cell,
  defineChart,
  lineY,
  ruleY,
  stack,
  text,
} from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo } from "react";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "../../vip-ui/chart";
import {
  type Bucket,
  bucketRange,
  cohorts,
  formatCount,
  formatPercent,
} from "./data";

const tickLabels = { fontSize: 12 };

function tickValues(buckets: Bucket[]) {
  if (buckets.length <= 7) return undefined;
  const step = Math.ceil(buckets.length / 6);
  return buckets
    .filter((_, index) => (buckets.length - 1 - index) % step === 0)
    .map((bucket) => bucket.start);
}

interface TrendChartProps {
  data: Bucket[];
  compare: Bucket[] | null;
  compareLabel: string;
  value: "mrr" | "workspaces";
  title: string;
  description: string;
  headline: string;
  ariaLabel: string;
  color: string;
  formatValue: (value: number) => string;
  formatAxis: (value: number) => string;
}

export function TrendChart({
  data,
  compare,
  compareLabel,
  value,
  title,
  description,
  headline,
  ariaLabel,
  color,
  formatValue,
  formatAxis,
}: TrendChartProps) {
  const rows = useMemo(
    () =>
      data.map((bucket, index) => ({
        start: bucket.start,
        range: bucketRange(bucket),
        value: bucket[value],
        previous: compare?.[index]?.[value] ?? null,
        previousRange: compare?.[index] ? bucketRange(compare[index]) : "",
      })),
    [data, compare, value],
  );
  const definition = useMemo(() => {
    const labels = new Map(data.map((bucket) => [bucket.start, bucket.label]));
    const values = rows.flatMap((row) =>
      row.previous === null ? [row.value] : [row.value, row.previous],
    );
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = (max - min) * 0.15 || Math.abs(max) * 0.05 || 1;
    const withPrevious = rows.filter((row) => row.previous !== null);
    return defineChart({
      marks: [
        ...(withPrevious.length
          ? [
              lineY(withPrevious, {
                id: `${value}-previous`,
                x: "start",
                y: "previous",
                stroke: "var(--muted-foreground)",
                strokeWidth: 1.5,
                strokeDasharray: "4 4",
                strokeOpacity: 0.7,
              }),
            ]
          : []),
        lineY(rows, {
          id: `${value}-line`,
          x: "start",
          y: "value",
          stroke: color,
          strokeWidth: 2.5,
        }),
      ],
      scales: {
        x: {
          scale: scalePoint<string>().domain(rows.map((row) => row.start)),
          axis: {
            ticks: {
              values: tickValues(data),
              format: (key) => labels.get(String(key)) ?? String(key),
            },
            tickLabels,
          },
        },
        y: {
          scale: scaleLinear().domain([Math.max(0, min - pad), max + pad]),
          grid: true,
          axis: { ticks: { count: 4, format: formatAxis }, tickLabels },
        },
      },
      focus: "group-x",
      tooltip: {
        use: tooltip,
        content: (points) => {
          const row = points[0].datum;
          return {
            title: row.range,
            rows: [
              { label: title, value: formatValue(row.value), color },
              ...(row.previous === null
                ? []
                : [
                    {
                      label: row.previousRange,
                      value: formatValue(row.previous),
                      color: "var(--muted-foreground)",
                    },
                  ]),
            ],
          };
        },
      },
    });
  }, [rows, data, value, color, formatAxis, formatValue, title]);

  return (
    <ChartFrame variant="card">
      <ChartCaption>
        <ChartTitle>{title}</ChartTitle>
        <ChartValue>{headline}</ChartValue>
        <ChartDescription className="text-[13px] leading-5">
          {description}
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={248}
        initialWidth={760}
        ariaLabel={ariaLabel}
      />
      <ChartLegend className="justify-start text-[13px]">
        <ChartLegendItem color={color} swatch="line">
          Selected range
        </ChartLegendItem>
        {compare && (
          <ChartLegendItem color="var(--muted-foreground)" swatch="dashed">
            {compareLabel}
          </ChartLegendItem>
        )}
      </ChartLegend>
      <ChartTable
        caption={title}
        columns={["Period", title, ...(compare ? [compareLabel] : [])]}
        rows={rows.map((row) => [
          row.range,
          formatValue(row.value),
          ...(compare
            ? [row.previous === null ? "" : formatValue(row.previous)]
            : []),
        ])}
      />
    </ChartFrame>
  );
}

export interface MovementSeries {
  key:
    | "newMrr"
    | "expansionMrr"
    | "contractionMrr"
    | "churnedMrr"
    | "signups"
    | "churned";
  label: string;
  color: string;
  sign: 1 | -1;
}

interface MovementChartProps {
  data: Bucket[];
  series: MovementSeries[];
  title: string;
  description: string;
  netLabel: string;
  ariaLabel: string;
  formatValue: (value: number) => string;
  formatAxis: (value: number) => string;
}

export function MovementChart({
  data,
  series,
  title,
  description,
  netLabel,
  ariaLabel,
  formatValue,
  formatAxis,
}: MovementChartProps) {
  const rows = useMemo(
    () =>
      data.flatMap((bucket) =>
        series.map((item) => ({
          start: bucket.start,
          series: item.label,
          value: bucket[item.key] * item.sign,
        })),
      ),
    [data, series],
  );
  const nets = useMemo(
    () =>
      data.map((bucket) => ({
        start: bucket.start,
        net: series.reduce(
          (total, item) => total + bucket[item.key] * item.sign,
          0,
        ),
      })),
    [data, series],
  );
  const definition = useMemo(() => {
    const labels = new Map(data.map((bucket) => [bucket.start, bucket.label]));
    const ranges = new Map(
      data.map((bucket) => [bucket.start, bucketRange(bucket)]),
    );
    const netByStart = new Map(nets.map((row) => [row.start, row.net]));
    const up = Math.max(
      1,
      ...data.map((bucket) =>
        series
          .filter((item) => item.sign > 0)
          .reduce((total, item) => total + bucket[item.key], 0),
      ),
    );
    const down = Math.max(
      1,
      ...data.map((bucket) =>
        series
          .filter((item) => item.sign < 0)
          .reduce((total, item) => total + bucket[item.key], 0),
      ),
    );
    return defineChart({
      marks: [
        barY(rows, {
          x: "start",
          y: "value",
          z: "series",
          color: "series",
          layout: stack({
            offset: "diverging",
            order: series.map((item) => item.label),
          }),
          inset: 1,
          radius: 2,
        }),
        decorative(ruleY([0], { stroke: "var(--muted-foreground)" })),
        lineY(nets, {
          id: "net",
          x: "start",
          y: "net",
          stroke: "var(--foreground)",
          strokeWidth: 1.5,
        }),
      ],
      scales: {
        x: {
          scale: () =>
            scaleBand<string>()
              .domain(data.map((bucket) => bucket.start))
              .padding(0.24),
          axis: {
            ticks: {
              values: tickValues(data),
              format: (key) => labels.get(String(key)) ?? String(key),
            },
            tickLabels,
          },
        },
        y: {
          scale: scaleLinear().domain([-down * 1.15, up * 1.1]),
          grid: true,
          axis: { ticks: { count: 5, format: formatAxis }, tickLabels },
        },
      },
      color: {
        domain: series.map((item) => item.label),
        range: series.map((item) => item.color),
      },
      focus: "group-x",
      tooltip: {
        use: tooltip,
        sort: "color-domain",
        content: (points) => {
          const start = String(points[0]?.datum.start ?? "");
          return {
            title: ranges.get(start) ?? start,
            rows: [
              ...points.flatMap((point) =>
                "series" in point.datum
                  ? [
                      {
                        label: point.groupLabel,
                        value: formatValue(Math.abs(point.datum.value)),
                        color: point.color,
                      },
                    ]
                  : [],
              ),
              {
                label: netLabel,
                value: formatValue(netByStart.get(start) ?? 0),
              },
            ],
          };
        },
      },
    });
  }, [rows, nets, data, series, formatAxis, formatValue, netLabel]);

  return (
    <ChartFrame variant="card">
      <ChartCaption>
        <ChartTitle>{title}</ChartTitle>
        <ChartDescription className="text-[13px] leading-5">
          {description}
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={900}
        ariaLabel={ariaLabel}
      />
      <ChartLegend className="justify-start text-[13px]">
        {series.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
        <ChartLegendItem color="var(--foreground)" swatch="line">
          {netLabel}
        </ChartLegendItem>
      </ChartLegend>
      <ChartTable
        caption={title}
        columns={["Period", ...series.map((item) => item.label), netLabel]}
        rows={data.map((bucket, index) => [
          bucketRange(bucket),
          ...series.map((item) => formatValue(bucket[item.key])),
          formatValue(nets[index].net),
        ])}
      />
    </ChartFrame>
  );
}

const steps = [
  "Month 1",
  "Month 2",
  "Month 3",
  "Month 4",
  "Month 5",
  "Month 6",
];

const levels = [
  { label: "Below 78%", min: 0, mix: 18, text: "var(--foreground)" },
  { label: "78–83%", min: 0.78, mix: 40, text: "var(--foreground)" },
  { label: "84–89%", min: 0.84, mix: 70, text: "var(--card)" },
  { label: "90% and above", min: 0.9, mix: 100, text: "var(--card)" },
].map((level) => ({
  ...level,
  color:
    level.mix === 100
      ? "var(--ts-chart-1)"
      : `color-mix(in oklab, var(--ts-chart-1) ${level.mix}%, var(--muted))`,
}));

const levelFor = (rate: number) =>
  levels.findLast((level) => rate >= level.min) ?? levels[0];

const cohortRows = cohorts.flatMap((cohort) =>
  cohort.retained.map((rate, index) => ({
    cohort: cohort.label,
    step: steps[index],
    rate,
    workspaces: Math.round(cohort.signups * rate),
    signups: cohort.signups,
  })),
);

const cohortDefinition = defineChart({
  marks: [
    cell(cohortRows, {
      x: "step",
      y: "cohort",
      color: (row) => levelFor(row.rate).label,
      key: (row) => `${row.cohort}-${row.step}`,
      inset: 2,
      radius: 4,
    }),
    decorative(
      text(cohortRows, {
        x: "step",
        y: "cohort",
        text: (row) => formatPercent(row.rate, 0),
        fill: (row) => levelFor(row.rate).text,
        fontSize: 12,
        fontWeight: 600,
      }),
    ),
  ],
  scales: {
    x: {
      scale: () => scaleBand<string>().domain(steps),
      axis: { tickLabels },
    },
    y: {
      scale: () => scaleBand<string>().domain(cohorts.map((row) => row.label)),
      axis: { tickLabels },
    },
  },
  color: {
    domain: levels.map((level) => level.label),
    range: levels.map((level) => level.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: `${point.datum.cohort} cohort, ${point.datum.step.toLowerCase()}`,
      rows: [
        {
          label: "Still active",
          value: formatPercent(point.datum.rate),
          color: point.color,
        },
        {
          label: "Workspaces",
          value: `${formatCount(point.datum.workspaces)} of ${formatCount(point.datum.signups)}`,
        },
      ],
    }),
  },
});

export function CohortChart() {
  return (
    <ChartFrame variant="card">
      <ChartCaption>
        <ChartTitle>Workspace retention</ChartTitle>
        <ChartDescription className="text-[13px] leading-5">
          Paid workspaces still active, by signup month
        </ChartDescription>
      </ChartCaption>
      <Chart
        definition={cohortDefinition}
        height={248}
        initialWidth={560}
        ariaLabel="Workspace retention for signup cohorts from April to September 2026, in percent, for each month after signup"
      />
      <ChartLegend className="justify-start text-[13px]">
        {levels.map((level) => (
          <ChartLegendItem key={level.label} color={level.color}>
            {level.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Paid workspaces still active, in percent, by signup month"
        columns={["Signup month", "Workspaces", ...steps]}
        rows={cohorts.map((cohort) => [
          cohort.label,
          formatCount(cohort.signups),
          ...steps.map((_, index) =>
            cohort.retained[index] === undefined
              ? ""
              : formatPercent(cohort.retained[index], 0),
          ),
        ])}
      />
    </ChartFrame>
  );
}
