export type ServiceState = "operational" | "degraded" | "outage";
export interface Service {
  name: string;
  state: ServiceState;
  history: ServiceDay[];
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

export interface Outage {
  service: string;
  date: string;
  minutes: number;
  state: Exclude<ServiceState, "operational">;
  incident: string;
}

export interface ServiceDay {
  date: string;
  label: string;
  fullLabel: string;
  state: ServiceState;
  uptime: number;
  note: string;
}

export const outages: Outage[] = [
  {
    service: "Reports",
    date: "2026-10-31",
    minutes: 101,
    state: "degraded",
    incident: "Reports load slowly",
  },
  {
    service: "Webhooks",
    date: "2026-10-21",
    minutes: 158,
    state: "degraded",
    incident: "Webhook retries delayed",
  },
  {
    service: "API",
    date: "2026-10-03",
    minutes: 64,
    state: "outage",
    incident: "Elevated API error rates",
  },
  {
    service: "Web app",
    date: "2026-10-03",
    minutes: 41,
    state: "degraded",
    incident: "Elevated API error rates",
  },
  {
    service: "Background jobs",
    date: "2026-09-29",
    minutes: 93,
    state: "degraded",
    incident: "Background jobs delayed",
  },
];

const weight: Record<ServiceState, number> = {
  operational: 0,
  degraded: 0.3,
  outage: 1,
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

const days = Array.from({ length: 90 }, (_, index) => {
  const date = new Date(end - (89 - index) * dayMs);
  return {
    date: date.toISOString().slice(0, 10),
    label: shortDay.format(date),
    fullLabel: longDay.format(date),
  };
});

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours ? `${hours} h ${rest} min` : `${rest} min`;
}

function historyFor(service: string): ServiceDay[] {
  return days.map((day) => {
    const hits = outages.filter(
      (outage) => outage.service === service && outage.date === day.date,
    );
    const lost = hits.reduce(
      (total, hit) => total + hit.minutes * weight[hit.state],
      0,
    );
    const state = hits.some((hit) => hit.state === "outage")
      ? "outage"
      : hits.length
        ? "degraded"
        : "operational";
    return {
      ...day,
      state,
      uptime: 100 - (lost / 1440) * 100,
      note: hits.length
        ? hits
            .map(
              (hit) =>
                `${hit.incident}, ${formatMinutes(hit.minutes)} ${stateLabels[hit.state].toLowerCase()}`,
            )
            .join("; ")
        : "No incidents",
    };
  });
}

export function uptimeOf(history: ServiceDay[]) {
  if (history.length === 0) return 100;
  return history.reduce((total, day) => total + day.uptime, 0) / history.length;
}

export function formatUptime(value: number) {
  return `${(Math.floor(value * 100) / 100).toFixed(2)}%`;
}

const names = [
  "Web app",
  "API",
  "Reports",
  "Webhooks",
  "Background jobs",
  "Email delivery",
];

export const services: Service[] = names.map((name) => ({
  name,
  state: name === "Reports" ? "degraded" : "operational",
  history: historyFor(name),
}));

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
