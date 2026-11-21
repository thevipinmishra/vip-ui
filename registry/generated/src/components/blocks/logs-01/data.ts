export type StatusClass = "success" | "client" | "server";

export interface LogEntry {
  id: string;
  time: number;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  status: number;
  duration: number;
  region: string;
  ip: string;
  key: string;
  userAgent: string;
}

export const statusClasses: { id: StatusClass; name: string; color: string }[] =
  [
    { id: "success", name: "2xx", color: "var(--ts-chart-1)" },
    { id: "client", name: "4xx", color: "var(--warning)" },
    { id: "server", name: "5xx", color: "var(--destructive)" },
  ];

export function statusClass(status: number): StatusClass {
  if (status >= 500) return "server";
  if (status >= 400) return "client";
  return "success";
}

function random(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const routes: { method: LogEntry["method"]; path: string; weight: number }[] = [
  { method: "POST", path: "/v1/messages", weight: 30 },
  { method: "GET", path: "/v1/messages/{id}", weight: 22 },
  { method: "GET", path: "/v1/contacts", weight: 14 },
  { method: "PATCH", path: "/v1/contacts/{id}", weight: 8 },
  { method: "POST", path: "/v1/batches", weight: 6 },
  { method: "GET", path: "/v1/webhooks", weight: 6 },
  { method: "DELETE", path: "/v1/webhooks/{id}", weight: 3 },
  { method: "POST", path: "/v1/auth/token", weight: 11 },
];

const regions = ["iad1", "iad1", "iad1", "fra1", "sfo1"];
const keys = ["rk_live_…4f2a", "rk_live_…91cd", "rk_live_…07be"];
const agents = [
  "relay-node/4.2.0 node/22.11.0",
  "relay-python/3.8.1 python/3.13",
  "curl/8.9.1",
];

export const windowEnd = Date.UTC(2026, 9, 28, 14, 32, 10);
export const windowMinutes = 30;

function pick<T>(next: () => number, items: T[]) {
  return items[Math.floor(next() * items.length)];
}

function routeFor(next: () => number) {
  const total = routes.reduce((sum, route) => sum + route.weight, 0);
  let roll = next() * total;
  for (const route of routes) {
    roll -= route.weight;
    if (roll <= 0) return route;
  }
  return routes[0];
}

function statusFor(
  next: () => number,
  method: LogEntry["method"],
  minute: number,
) {
  const incident = minute >= 11 && minute <= 14;
  const roll = next();
  if (incident && roll < 0.32) return pick(next, [500, 502, 503]);
  if (roll < 0.012) return 500;
  if (roll < 0.05) return pick(next, [400, 401, 404, 422, 429]);
  return method === "POST" ? 201 : method === "DELETE" ? 204 : 200;
}

export function createEntry(next: () => number, time: number, index: number) {
  const route = routeFor(next);
  const minute = Math.floor((windowEnd - time) / 60_000);
  const status = statusFor(next, route.method, minute);
  const base = route.path === "/v1/batches" ? 420 : 60;
  const slow = status >= 500 ? 1800 : 0;
  const id = Math.floor(next() * 36 ** 8)
    .toString(36)
    .padStart(8, "0");
  return {
    id: `req_${id}${index.toString(36)}`,
    time,
    method: route.method,
    path: route.path.replace(
      "{id}",
      `${route.path.includes("contacts") ? "ct" : route.path.includes("webhooks") ? "wh" : "msg"}_${Math.floor(next() * 36 ** 6).toString(36)}`,
    ),
    status,
    duration: Math.round(base + next() * 180 + slow * next()),
    region: pick(next, regions),
    ip: `${pick(next, [34, 52, 18, 104])}.${Math.floor(next() * 255)}.${Math.floor(next() * 255)}.${Math.floor(next() * 255)}`,
    key: pick(next, keys),
    userAgent: pick(next, agents),
  } satisfies LogEntry;
}

function buildLogs() {
  const next = random(2814);
  const entries: LogEntry[] = [];
  let time = windowEnd;
  let index = 0;
  while (time > windowEnd - windowMinutes * 60_000) {
    entries.push(createEntry(next, time, index));
    index += 1;
    time -= Math.round(1_200 + next() * 3_200);
  }
  return entries;
}

export const initialLogs = buildLogs();

export function percentile(values: number[], share: number) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * share))];
}

export function seededRandom(seed: number) {
  return random(seed);
}

const clock = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

const full = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

export function formatClock(time: number) {
  return clock.format(new Date(time));
}

export function formatFull(time: number) {
  return `${full.format(new Date(time))} UTC`;
}

export function responseBody(entry: LogEntry) {
  if (entry.status === 204) return "";
  if (entry.status >= 500) {
    return JSON.stringify(
      {
        error: {
          type: "upstream_unavailable",
          message: "The delivery provider did not answer in 10 seconds.",
          request_id: entry.id,
        },
      },
      null,
      2,
    );
  }
  if (entry.status >= 400) {
    const errors: Record<number, [string, string]> = {
      400: [
        "invalid_request",
        "The field 'to' must be a phone number or email.",
      ],
      401: ["unauthorized", "The API key is not valid or was revoked."],
      404: ["not_found", "No resource has this ID."],
      422: ["validation_failed", "The template has 2 missing variables."],
      429: ["rate_limited", "Slow down. The limit is 100 requests per second."],
    };
    const [type, message] = errors[entry.status] ?? [
      "error",
      "Request failed.",
    ];
    return JSON.stringify(
      { error: { type, message, request_id: entry.id } },
      null,
      2,
    );
  }
  const last = entry.path.split("/").at(-1) ?? "";
  const resource = entry.path.split("/")[2] ?? "";
  const objects: Record<string, string> = {
    messages: "message",
    contacts: "contact",
    webhooks: "webhook",
    batches: "batch",
    auth: "token",
  };
  const object = objects[resource] ?? resource;
  return JSON.stringify(
    {
      id: last.includes("_")
        ? last
        : `${object.slice(0, 3)}_${entry.id.slice(4, 12)}`,
      object,
      status: entry.method === "POST" ? "queued" : "active",
    },
    null,
    2,
  );
}
