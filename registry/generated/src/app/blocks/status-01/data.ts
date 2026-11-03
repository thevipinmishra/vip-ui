export type ServiceState = "operational" | "degraded" | "outage";
export interface UptimeDay {
  date: string;
  label: string;
  fullLabel: string;
  uptime: number;
  state: ServiceState;
}

export interface Service {
  name: string;
  state: ServiceState;
  uptime: string;
}

export interface IncidentUpdate {
  title: string;
  dateTime: string;
  time: string;
  body: string;
}

export interface Incident {
  id: string;
  title: string;
  status: "Monitoring" | "Resolved";
  date: string;
  active: boolean;
  updates: IncidentUpdate[];
}

const dayMs = 86_400_000;
const end = Date.UTC(2026, 9, 31);

const dips: Record<string, number> = {
  "2026-09-12": 99.96,
  "2026-09-29": 99.62,
  "2026-10-03": 99.86,
  "2026-10-14": 99.97,
  "2026-10-21": 99.91,
  "2026-10-31": 99.74,
};

const shortDay = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const longDay = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function stateOf(uptime: number): ServiceState {
  if (uptime >= 99.95) return "operational";
  if (uptime >= 99.5) return "degraded";
  return "outage";
}

export const uptimeDays: UptimeDay[] = Array.from(
  { length: 90 },
  (_, index) => {
    const date = new Date(end - (89 - index) * dayMs);
    const key = date.toISOString().slice(0, 10);
    const uptime = dips[key] ?? 100;
    return {
      date: key,
      label: shortDay.format(date),
      fullLabel: longDay.format(date),
      uptime,
      state: stateOf(uptime),
    };
  },
);

export const services: Service[] = [
  {
    name: "Web app",
    state: "operational",
    uptime: "100%",
  },
  {
    name: "API",
    state: "operational",
    uptime: "99.98%",
  },
  {
    name: "Reports",
    state: "degraded",
    uptime: "99.87%",
  },
  {
    name: "Webhooks",
    state: "operational",
    uptime: "99.99%",
  },
  {
    name: "Background jobs",
    state: "operational",
    uptime: "99.94%",
  },
  {
    name: "Email delivery",
    state: "operational",
    uptime: "100%",
  },
];

export const incidents: Incident[] = [
  {
    id: "reports",
    title: "Reports load slowly",
    status: "Monitoring",
    date: "31 Oct 2026",
    active: true,
    updates: [
      {
        title: "Monitoring",
        dateTime: "2026-10-31T11:05:00Z",
        time: "31 Oct, 11:05 UTC",
        body: "Cache capacity is higher. Report loads are back under four seconds.",
      },
      {
        title: "Identified",
        dateTime: "2026-10-31T10:12:00Z",
        time: "31 Oct, 10:12 UTC",
        body: "A cache node stopped. We restarted it and warmed the cache.",
      },
      {
        title: "Investigating",
        dateTime: "2026-10-31T09:24:00Z",
        time: "31 Oct, 09:24 UTC",
        body: "Reports take longer than usual to load. Boards and search are not affected.",
      },
    ],
  },
  {
    id: "webhooks",
    title: "Webhook retries delayed",
    status: "Resolved",
    date: "21 Oct 2026",
    active: false,
    updates: [
      {
        title: "Resolved",
        dateTime: "2026-10-21T16:40:00Z",
        time: "21 Oct, 16:40 UTC",
        body: "The queue is empty. All delayed events were delivered.",
      },
      {
        title: "Monitoring",
        dateTime: "2026-10-21T15:18:00Z",
        time: "21 Oct, 15:18 UTC",
        body: "We added workers. Retries now finish in less than two minutes.",
      },
      {
        title: "Investigating",
        dateTime: "2026-10-21T14:02:00Z",
        time: "21 Oct, 14:02 UTC",
        body: "Some webhook retries wait longer than five minutes.",
      },
    ],
  },
  {
    id: "api",
    title: "Elevated API error rates",
    status: "Resolved",
    date: "3 Oct 2026",
    active: false,
    updates: [
      {
        title: "Resolved",
        dateTime: "2026-10-03T13:22:00Z",
        time: "3 Oct, 13:22 UTC",
        body: "Error rates are back to normal. The fix is live in all regions.",
      },
      {
        title: "Identified",
        dateTime: "2026-10-03T12:45:00Z",
        time: "3 Oct, 12:45 UTC",
        body: "A bad config change went out with the 12:30 deploy. We rolled it back.",
      },
      {
        title: "Investigating",
        dateTime: "2026-10-03T12:18:00Z",
        time: "3 Oct, 12:18 UTC",
        body: "About 4% of API requests fail with a 502 error. We are checking the deploy.",
      },
    ],
  },
  {
    id: "jobs",
    title: "Background jobs delayed",
    status: "Resolved",
    date: "29 Sep 2026",
    active: false,
    updates: [
      {
        title: "Resolved",
        dateTime: "2026-09-29T18:05:00Z",
        time: "29 Sep, 18:05 UTC",
        body: "All queued jobs are complete. No data was lost.",
      },
      {
        title: "Monitoring",
        dateTime: "2026-09-29T17:10:00Z",
        time: "29 Sep, 17:10 UTC",
        body: "The queue is moving again. We expect to clear it within an hour.",
      },
      {
        title: "Investigating",
        dateTime: "2026-09-29T16:32:00Z",
        time: "29 Sep, 16:32 UTC",
        body: "Imports and exports are slower than usual. We restarted the job workers.",
      },
    ],
  },
];

export const stateLabels: Record<ServiceState, string> = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
};

export const stateColors: Record<ServiceState, string> = {
  operational: "color-mix(in oklab, var(--success) 72%, var(--card))",
  degraded: "var(--warning)",
  outage: "var(--destructive)",
};

export function average(rows: UptimeDay[]) {
  if (rows.length === 0) return 100;
  return rows.reduce((sum, row) => sum + row.uptime, 0) / rows.length;
}

export function formatAverage(value: number) {
  return `${value.toFixed(3)}%`;
}

export function formatRangeLabel(rows: UptimeDay[]) {
  const first = rows[0];
  const last = rows.at(-1);
  if (!first || !last) return "";
  return `${shortDay.format(new Date(`${first.date}T00:00:00Z`))} – ${longDay.format(
    new Date(`${last.date}T00:00:00Z`),
  )}`;
}
