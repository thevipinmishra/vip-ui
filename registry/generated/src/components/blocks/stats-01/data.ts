export type Period = "7d" | "30d" | "90d";

export const periodDays: Record<Period, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

export const periodLabels: Record<Period, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

export interface Metric {
  id: string;
  label: string;
  summary: "last" | "mean";
  format: Intl.NumberFormatOptions;
  invert?: boolean;
  points?: boolean;
  values: number[];
}

const dayMs = 86_400_000;
const historyDays = 180;
const lastDay = Date.UTC(2026, 8, 30);

function random(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function series(
  seed: number,
  point: (index: number, weekday: number, noise: number) => number,
) {
  const next = random(seed);
  return Array.from({ length: historyDays }, (_, index) => {
    const weekday = new Date(dayStart(index)).getUTCDay();
    return point(index, weekday, next() * 2 - 1);
  });
}

function dayStart(index: number) {
  return lastDay - (historyDays - 1 - index) * dayMs;
}

const mrr = (() => {
  let value = 61_840;
  return series(11, (index, weekday, noise) => {
    if (index > 0) {
      const working = weekday !== 0 && weekday !== 6;
      value += (working ? 92 : 28) + noise * 70 - (index === 131 ? 640 : 0);
    }
    return Math.round(value);
  });
})();

const activeUsers = series(23, (index, weekday, noise) => {
  const weekend = weekday === 0 || weekday === 6 ? 0.71 : 1;
  const trend = 2_180 + index * 2.6;
  return Math.round(trend * weekend * (1 + noise * 0.035));
});

const churn = series(37, (index, _weekday, noise) => {
  const trend = 0.0292 - index * 0.000_026;
  const bump = index > 128 && index < 146 ? 0.0021 : 0;
  return Math.round((trend + bump + noise * 0.000_12) * 10_000) / 10_000;
});

const latency = series(41, (index, weekday, noise) => {
  const weekend = weekday === 0 || weekday === 6 ? -14 : 0;
  const incident = index === 158 ? 96 : index === 159 ? 41 : 0;
  return Math.round(231 - index * 0.21 + weekend + incident + noise * 9);
});

export const metrics: Metric[] = [
  {
    id: "mrr",
    label: "Monthly recurring revenue",
    summary: "last",
    format: { style: "currency", currency: "USD", maximumFractionDigits: 0 },
    values: mrr,
  },
  {
    id: "dau",
    label: "Daily active users",
    summary: "mean",
    format: { maximumFractionDigits: 0 },
    values: activeUsers,
  },
  {
    id: "churn",
    label: "Churn rate, 30-day",
    summary: "last",
    format: {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    invert: true,
    points: true,
    values: churn,
  },
  {
    id: "latency",
    label: "p95 response time",
    summary: "mean",
    format: { style: "unit", unit: "millisecond", maximumFractionDigits: 0 },
    invert: true,
    values: latency,
  },
];

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function summarize(metric: Metric, values: number[]) {
  if (metric.summary === "last") return values[values.length - 1];
  const mean =
    values.reduce((total, value) => total + value, 0) / values.length;
  return Math.round(mean);
}

export function readMetric(metric: Metric, period: Period) {
  const days = periodDays[period];
  const current = metric.values.slice(-days);
  const previous = metric.values.slice(-days * 2, -days);
  const value = summarize(metric, current);
  const before = summarize(metric, previous);
  const change = metric.points
    ? Math.round((value - before) * 10_000) / 100
    : Math.round(((value - before) / before) * 1_000) / 10;
  const start = historyDays - days;
  return {
    value,
    previous: before,
    change,
    rows: current.map((point, index) => ({
      day: dayFormat.format(dayStart(start + index)),
      value: point,
    })),
  };
}

export function formatChange(metric: Metric, change: number) {
  const sign = change > 0 ? "+" : change < 0 ? "−" : "";
  const size = Math.abs(change).toFixed(metric.points ? 2 : 1);
  return `${sign}${size}${metric.points ? " pts" : "%"}`;
}
