export type Range = "1h" | "6h" | "24h";

export interface Point {
  time: number;
  requests: number;
  errorRate: number;
  p50: number;
  p95: number;
  p99: number;
  apdex: number;
}

export type ServiceStatus = "healthy" | "degraded" | "recovering";

export interface Service {
  name: string;
  team: string;
  status: ServiceStatus;
  requests: number;
  unit: "rpm" | "qpm" | "ops";
  errorRate: number;
  p95: number;
  cpu: number;
  budget: number;
}

export interface Alert {
  id: string;
  title: string;
  service: string;
  severity: "critical" | "warning";
  state: "firing" | "resolved";
  started: string;
  duration: string;
}

export interface Deploy {
  id: string;
  time: number;
  service: string;
  title: string;
  author: string;
  kind: "deploy" | "change";
}

export const rangeMinutes: Record<Range, number> = {
  "1h": 60,
  "6h": 360,
  "24h": 1_440,
};

export const rangeLabels: Record<Range, string> = {
  "1h": "Last hour",
  "6h": "Last 6 hours",
  "24h": "Last 24 hours",
};

const minute = 60_000;
const step = 5 * minute;
export const now = Date.UTC(2026, 9, 31, 11, 5);
const total = (2 * 1_440) / 5;

const at = (hours: number, minutes: number, day = 31) =>
  Date.UTC(2026, 9, day, hours, minutes);

export const incident = {
  start: at(9, 24),
  end: at(11, 5),
  title: "Reports load slowly",
};

function random(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function ramp(time: number, from: number, to: number) {
  return Math.min(1, Math.max(0, (time - from) / (to - from)));
}

function severity(time: number) {
  if (time < at(9, 20) || time > at(11, 30)) return 0;
  if (time < at(9, 50)) return ramp(time, at(9, 20), at(9, 50));
  if (time < at(10, 15)) return 1;
  if (time < at(10, 35)) return 0.45;
  if (time < at(10, 50)) return 0.45 - 0.4 * ramp(time, at(10, 35), at(10, 50));
  return 0.05;
}

function daily(time: number) {
  const hour = (time / 3_600_000) % 24;
  return ((1 + Math.cos((2 * Math.PI * (hour - 15.5)) / 24)) / 2) ** 1.4;
}

export const series: Point[] = (() => {
  const next = random(31);
  return Array.from({ length: total }, (_, index) => {
    const time = now - (total - 1 - index) * step;
    const load = daily(time);
    const hit = severity(time);
    const canary = time >= at(16, 40, 30) && time <= at(16, 55, 30) ? 1 : 0;
    const noise = () => next() * 2 - 1;
    const requests = Math.round(8_600 + 14_200 * load + noise() * 420);
    const errorRate = Math.max(
      0.0004,
      0.0011 + noise() * 0.0003 + hit * 0.0105 + canary * 0.0032,
    );
    const p50 = Math.round(46 + 9 * load + hit * 92 + noise() * 3);
    const p95 = Math.round(
      198 + 38 * load + hit * 1_640 + canary * 64 + noise() * 12,
    );
    const p99 = Math.round(
      510 + 90 * load + hit * 3_420 + canary * 150 + noise() * 30,
    );
    const apdex = Math.min(
      0.99,
      0.972 - load * 0.012 - hit * 0.36 - canary * 0.03 + noise() * 0.004,
    );
    return { time, requests, errorRate, p50, p95, p99, apdex };
  });
})();

export function pointsFor(range: Range, offset = 0) {
  const count = rangeMinutes[range] / 5;
  const endIndex = series.length - offset;
  return series.slice(endIndex - count, endIndex);
}

export function summarize(points: Point[]) {
  const requests = points.reduce((sum, point) => sum + point.requests, 0);
  return {
    requests: requests / points.length,
    errorRate:
      points.reduce((sum, point) => sum + point.errorRate * point.requests, 0) /
      requests,
    p95: Math.round(
      points.reduce((sum, point) => sum + point.p95 * point.requests, 0) /
        requests,
    ),
    apdex:
      points.reduce((sum, point) => sum + point.apdex * point.requests, 0) /
      requests,
  };
}

export const services: Service[] = [
  {
    name: "web-gateway",
    team: "Platform",
    status: "healthy",
    requests: 0,
    unit: "rpm",
    errorRate: 0.0014,
    p95: 236,
    cpu: 0.41,
    budget: 0.86,
  },
  {
    name: "api",
    team: "Core API",
    status: "healthy",
    requests: 9_640,
    unit: "rpm",
    errorRate: 0.0021,
    p95: 214,
    cpu: 0.56,
    budget: 0.54,
  },
  {
    name: "reports-api",
    team: "Insights",
    status: "degraded",
    requests: 1_310,
    unit: "rpm",
    errorRate: 0.0284,
    p95: 1_240,
    cpu: 0.72,
    budget: 0.21,
  },
  {
    name: "reports-cache",
    team: "Insights",
    status: "recovering",
    requests: 22_400,
    unit: "ops",
    errorRate: 0,
    p95: 3,
    cpu: 0.64,
    budget: 0.48,
  },
  {
    name: "search",
    team: "Discovery",
    status: "healthy",
    requests: 2_180,
    unit: "rpm",
    errorRate: 0.0005,
    p95: 96,
    cpu: 0.38,
    budget: 0.92,
  },
  {
    name: "webhooks-worker",
    team: "Integrations",
    status: "healthy",
    requests: 1_920,
    unit: "rpm",
    errorRate: 0.0031,
    p95: 640,
    cpu: 0.27,
    budget: 0.58,
  },
  {
    name: "jobs-worker",
    team: "Platform",
    status: "healthy",
    requests: 840,
    unit: "rpm",
    errorRate: 0.0009,
    p95: 2_100,
    cpu: 0.61,
    budget: 0.77,
  },
  {
    name: "postgres-primary",
    team: "Data",
    status: "healthy",
    requests: 31_200,
    unit: "qpm",
    errorRate: 0,
    p95: 8,
    cpu: 0.47,
    budget: 0.99,
  },
];

const lastHour = summarize(pointsFor("1h"));
services[0].requests = Math.round(lastHour.requests);
services[0].p95 = lastHour.p95;
services[0].errorRate = lastHour.errorRate;

export const alerts: Alert[] = [
  {
    id: "a1",
    title: "p95 latency above 1 s",
    service: "reports-api",
    severity: "critical",
    state: "firing",
    started: "09:31",
    duration: "1 h 34 min",
  },
  {
    id: "a2",
    title: "Memory above 85%",
    service: "reports-cache",
    severity: "warning",
    state: "firing",
    started: "10:52",
    duration: "13 min",
  },
  {
    id: "a3",
    title: "5xx rate above 1%",
    service: "reports-api",
    severity: "critical",
    state: "resolved",
    started: "09:38",
    duration: "1 h 6 min",
  },
  {
    id: "a4",
    title: "Node rc-3 not responding",
    service: "reports-cache",
    severity: "critical",
    state: "resolved",
    started: "09:22",
    duration: "52 min",
  },
  {
    id: "a5",
    title: "Canary error rate above 0.3%",
    service: "api",
    severity: "warning",
    state: "resolved",
    started: "Oct 30, 16:44",
    duration: "14 min",
  },
];

export const deploys: Deploy[] = [
  {
    id: "d1",
    time: at(10, 31),
    service: "reports-cache",
    title: "Scale cluster from 4 to 6 nodes",
    author: "Priya Raman",
    kind: "change",
  },
  {
    id: "d2",
    time: at(10, 14),
    service: "reports-cache",
    title: "Restart node rc-3",
    author: "Priya Raman",
    kind: "change",
  },
  {
    id: "d3",
    time: at(8, 55),
    service: "web",
    title: "Release v2026.10.31.1",
    author: "Leo Park",
    kind: "deploy",
  },
  {
    id: "d4",
    time: at(16, 42, 30),
    service: "api",
    title: "Release v2026.10.30.4",
    author: "Ana Silva",
    kind: "deploy",
  },
  {
    id: "d5",
    time: at(12, 10, 30),
    service: "search",
    title: "Release v2026.10.30.2",
    author: "Leo Park",
    kind: "deploy",
  },
];

const clock = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
});
const dayClock = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

export const formatClock = (time: number) => clock.format(time);
export const formatDayClock = (time: number) =>
  time >= at(0, 0) ? `Today, ${clock.format(time)}` : dayClock.format(time);

const count = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatCount = (value: number) => count.format(value);
export const formatCompact = (value: number) => compact.format(value);

export function formatRate(value: number) {
  const digits = value < 0.01 ? 2 : 1;
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatMs(value: number) {
  return value >= 1_000
    ? `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 2)} s`
    : `${count.format(value)} ms`;
}
