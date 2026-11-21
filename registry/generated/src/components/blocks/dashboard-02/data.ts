import { CalendarDate } from "@internationalized/date";

export interface DayRow {
  date: string;
  mrr: number;
  workspaces: number;
  trials: number;
  signups: number;
  churned: number;
  newMrr: number;
  expansionMrr: number;
  contractionMrr: number;
  churnedMrr: number;
}

export interface Bucket {
  start: string;
  end: string;
  days: number;
  label: string;
  mrr: number;
  workspaces: number;
  signups: number;
  churned: number;
  newMrr: number;
  expansionMrr: number;
  contractionMrr: number;
  churnedMrr: number;
}

export type Plan = "Team" | "Business" | "Enterprise";
export type Health = "healthy" | "risk" | "inactive";

export interface Account {
  id: string;
  name: string;
  domain: string;
  plan: Plan;
  seats: number;
  seatLimit: number;
  mrr: number;
  health: Health;
  lastActive: string;
  lastActiveDate: string;
  renewal: string;
  renewalDate: string;
}

const dayMs = 86_400_000;
const firstDay = Date.UTC(2025, 0, 1);
const lastDay = Date.UTC(2026, 9, 31);
const totalDays = Math.round((lastDay - firstDay) / dayMs) + 1;

function random(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

const shortDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const monthYearFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
const fullDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const daily: DayRow[] = (() => {
  const next = random(5);
  let mrr = 164_000;
  let workspaces = 900;
  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(firstDay + index * dayMs);
    const weekday = date.getUTCDay();
    const working = weekday !== 0 && weekday !== 6;
    const conversion =
      0.238 + 0.03 * Math.sin(index / 37) + (next() - 0.5) * 0.02;
    const trials = Math.round(
      (working ? 23 : 9) *
        (1 + 0.18 * Math.sin(index / 29)) *
        (0.85 + next() * 0.3),
    );
    const signups = Math.round(trials * conversion);
    const churned = Math.round(
      (working ? 2.9 : 1.1) *
        (1 + 0.3 * Math.sin(index / 6.3)) *
        (0.7 + next() * 0.6),
    );
    const newMrr = Math.round(signups * (92 + next() * 26));
    const expansionMrr = Math.round(
      (working ? 310 : 120) * (0.7 + next() * 0.6),
    );
    const contractionMrr = Math.round(
      (working ? 95 : 30) * (0.5 + next()) + (index === 640 ? 2_400 : 0),
    );
    const churnedMrr = Math.round(churned * (74 + next() * 40));
    mrr += newMrr + expansionMrr - contractionMrr - churnedMrr;
    workspaces += signups - churned;
    return {
      date: date.toISOString().slice(0, 10),
      mrr,
      workspaces,
      trials,
      signups,
      churned,
      newMrr,
      expansionMrr,
      contractionMrr,
      churnedMrr,
    };
  });
})();

export const referenceDate = new CalendarDate(2026, 10, 31);

export const rangePresets = [
  {
    label: "Last 7 days",
    value: { start: referenceDate.subtract({ days: 6 }), end: referenceDate },
  },
  {
    label: "Last 30 days",
    value: { start: referenceDate.subtract({ days: 29 }), end: referenceDate },
  },
  {
    label: "Last 90 days",
    value: { start: referenceDate.subtract({ days: 89 }), end: referenceDate },
  },
  {
    label: "Year to date",
    value: { start: new CalendarDate(2026, 1, 1), end: referenceDate },
  },
];

export const defaultRange = rangePresets[2].value;

export const compareOptions = [
  { id: "previous", name: "Previous period" },
  { id: "year", name: "Previous year" },
  { id: "none", name: "No comparison" },
];

export function formatRange(start: CalendarDate, end: CalendarDate) {
  const startDate = start.toDate("UTC");
  const endDate = end.toDate("UTC");
  if (start.year === end.year) {
    return `${shortDateFormat.format(startDate)} – ${fullDateFormat.format(endDate)}`;
  }
  return `${fullDateFormat.format(startDate)} – ${fullDateFormat.format(endDate)}`;
}

export function formatShort(date: string) {
  return shortDateFormat.format(new Date(`${date}T00:00:00Z`));
}

export function formatMonthYear(date: string) {
  return monthYearFormat.format(new Date(`${date}T00:00:00Z`));
}

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const compactMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});
const count = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export const formatMoney = (value: number) => money.format(value);
export const formatCompactMoney = (value: number) => compactMoney.format(value);
export const formatCount = (value: number) => count.format(value);

export function formatPercent(value: number, digits = 1) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function rowsInRange(start: CalendarDate, end: CalendarDate) {
  const from = start.toString();
  const to = end.toString();
  return daily.filter((row) => row.date >= from && row.date <= to);
}

export function previousPeriod(start: CalendarDate, end: CalendarDate) {
  const length =
    Math.round(
      (end.toDate("UTC").getTime() - start.toDate("UTC").getTime()) / dayMs,
    ) + 1;
  return {
    start: start.subtract({ days: length }),
    end: start.subtract({ days: 1 }),
  };
}

export function previousYear(start: CalendarDate, end: CalendarDate) {
  return {
    start: start.subtract({ years: 1 }),
    end: end.subtract({ years: 1 }),
  };
}

type SumKey = Exclude<keyof DayRow, "date" | "mrr" | "workspaces">;

function sum(rows: DayRow[], key: SumKey) {
  return rows.reduce((total, row) => total + row[key], 0);
}

export function summarize(rows: DayRow[]) {
  const first = rows[0];
  const last = rows.at(-1);
  if (!first || !last) return null;
  const startWorkspaces = first.workspaces - first.signups + first.churned;
  const churned = sum(rows, "churned");
  const newMrr = sum(rows, "newMrr");
  const expansionMrr = sum(rows, "expansionMrr");
  const contractionMrr = sum(rows, "contractionMrr");
  const churnedMrr = sum(rows, "churnedMrr");
  return {
    mrr: last.mrr,
    workspaces: last.workspaces,
    arpa: last.mrr / last.workspaces,
    conversion: sum(rows, "signups") / sum(rows, "trials"),
    trials: sum(rows, "trials"),
    signups: sum(rows, "signups"),
    churned,
    logoChurn: (churned / startWorkspaces) * (30 / rows.length),
    newMrr,
    expansionMrr,
    contractionMrr,
    churnedMrr,
    netNewMrr: newMrr + expansionMrr - contractionMrr - churnedMrr,
  };
}

export type Summary = NonNullable<ReturnType<typeof summarize>>;

export function bucketRows(rows: DayRow[], maxPoints = 13): Bucket[] {
  if (rows.length === 0) return [];
  const size = Math.max(1, Math.ceil(rows.length / maxPoints));
  const monthly = size >= 28;
  const groups: DayRow[][] = [];
  if (monthly) {
    for (const row of rows) {
      const current = groups.at(-1);
      if (current && current[0].date.slice(0, 7) === row.date.slice(0, 7)) {
        current.push(row);
      } else {
        groups.push([row]);
      }
    }
  } else {
    for (let end = rows.length; end > 0; end -= size) {
      groups.unshift(rows.slice(Math.max(0, end - size), end));
    }
  }
  return groups.map((chunk) => {
    const first = chunk[0];
    const last = chunk[chunk.length - 1];
    return {
      start: first.date,
      end: last.date,
      days: chunk.length,
      label: monthly
        ? monthFormat.format(new Date(`${first.date}T00:00:00Z`))
        : formatShort(first.date),
      mrr: last.mrr,
      workspaces: last.workspaces,
      signups: sum(chunk, "signups"),
      churned: sum(chunk, "churned"),
      newMrr: sum(chunk, "newMrr"),
      expansionMrr: sum(chunk, "expansionMrr"),
      contractionMrr: sum(chunk, "contractionMrr"),
      churnedMrr: sum(chunk, "churnedMrr"),
    };
  });
}

export function bucketRange(bucket: Bucket) {
  if (bucket.days === 1) return formatShort(bucket.start);
  return `${formatShort(bucket.start)} – ${formatShort(bucket.end)}`;
}

const retentionCurve = [0.9, 0.84, 0.8, 0.775, 0.76, 0.75];
const cohortLift = [-0.02, -0.01, 0, 0.01, 0.015, 0.03];

export const cohorts = [
  "2026-04",
  "2026-05",
  "2026-06",
  "2026-07",
  "2026-08",
  "2026-09",
].map((month, index) => {
  const signups = daily
    .filter((row) => row.date.startsWith(month))
    .reduce((total, row) => total + row.signups, 0);
  const months = retentionCurve.length - index;
  return {
    month,
    label: formatMonthYear(`${month}-01`),
    signups,
    retained: retentionCurve
      .slice(0, months)
      .map((rate, step) =>
        Math.min(0.97, rate + cohortLift[index] + (step % 2 ? 0.004 : -0.003)),
      ),
  };
});

const companies: [
  string,
  string,
  Plan,
  number,
  number,
  Health,
  string,
  string,
][] = [
  [
    "Halcyon Health",
    "halcyonhealth.com",
    "Enterprise",
    412,
    450,
    "healthy",
    "2026-10-31",
    "2027-03-01",
  ],
  [
    "Pinecrest Bank",
    "pinecrestbank.com",
    "Enterprise",
    366,
    400,
    "healthy",
    "2026-10-31",
    "2027-06-15",
  ],
  [
    "Tidewater Energy",
    "tidewater.energy",
    "Enterprise",
    248,
    300,
    "risk",
    "2026-10-29",
    "2026-12-01",
  ],
  [
    "Atlas Mutual",
    "atlasmutual.com",
    "Enterprise",
    205,
    250,
    "healthy",
    "2026-10-31",
    "2027-02-10",
  ],
  [
    "Brightline Freight",
    "brightline.io",
    "Business",
    188,
    200,
    "healthy",
    "2026-10-31",
    "2027-01-20",
  ],
  [
    "Kestrel Air",
    "kestrelair.com",
    "Business",
    164,
    180,
    "healthy",
    "2026-10-30",
    "2027-04-05",
  ],
  [
    "Meridian Travel",
    "meridiantravel.co",
    "Business",
    131,
    200,
    "risk",
    "2026-10-24",
    "2026-11-28",
  ],
  [
    "Lumen Robotics",
    "lumenrobotics.com",
    "Business",
    126,
    130,
    "healthy",
    "2026-10-31",
    "2027-05-12",
  ],
  [
    "Granite Systems",
    "granitesys.com",
    "Business",
    118,
    150,
    "healthy",
    "2026-10-31",
    "2027-03-22",
  ],
  [
    "Juniper Bio",
    "juniperbio.com",
    "Business",
    97,
    100,
    "healthy",
    "2026-10-31",
    "2027-01-08",
  ],
  [
    "Summit Legal",
    "summitlegal.com",
    "Business",
    84,
    120,
    "risk",
    "2026-10-21",
    "2026-12-14",
  ],
  [
    "Redwood Media",
    "redwoodmedia.tv",
    "Business",
    76,
    80,
    "healthy",
    "2026-10-30",
    "2027-07-01",
  ],
  [
    "Orchard Pay",
    "orchardpay.com",
    "Business",
    71,
    75,
    "healthy",
    "2026-10-31",
    "2027-02-28",
  ],
  [
    "Northgate Labs",
    "northgatelabs.dev",
    "Team",
    58,
    60,
    "healthy",
    "2026-10-31",
    "2027-03-03",
  ],
  [
    "Fieldstone Retail",
    "fieldstone.shop",
    "Team",
    49,
    80,
    "inactive",
    "2026-10-02",
    "2026-11-19",
  ],
  [
    "Copperleaf Games",
    "copperleaf.gg",
    "Team",
    46,
    50,
    "healthy",
    "2026-10-31",
    "2027-01-30",
  ],
  [
    "Marigold Foods",
    "marigoldfoods.com",
    "Team",
    41,
    50,
    "healthy",
    "2026-10-28",
    "2027-04-17",
  ],
  [
    "Sable Security",
    "sablesec.io",
    "Team",
    38,
    40,
    "healthy",
    "2026-10-31",
    "2027-02-02",
  ],
  [
    "Willow Care",
    "willowcare.org",
    "Team",
    33,
    50,
    "risk",
    "2026-10-19",
    "2026-12-09",
  ],
  [
    "Bluebird Learning",
    "bluebird.school",
    "Team",
    29,
    30,
    "healthy",
    "2026-10-30",
    "2027-06-21",
  ],
  [
    "Quarry Studio",
    "quarry.studio",
    "Team",
    22,
    25,
    "healthy",
    "2026-10-31",
    "2027-01-11",
  ],
  [
    "Harbor & Vine",
    "harborandvine.com",
    "Team",
    18,
    30,
    "inactive",
    "2026-09-27",
    "2026-11-24",
  ],
  [
    "Vantage Logistics",
    "vantagelog.com",
    "Team",
    16,
    20,
    "healthy",
    "2026-10-29",
    "2027-05-06",
  ],
  [
    "Oakridge Analytics",
    "oakridge.ai",
    "Team",
    12,
    15,
    "healthy",
    "2026-10-31",
    "2027-03-30",
  ],
];

const seatPrice: Record<Plan, number> = {
  Team: 18,
  Business: 32,
  Enterprise: 41,
};

export const accounts: Account[] = companies.map(
  ([name, domain, plan, seats, seatLimit, health, active, renewal]) => ({
    id: domain,
    name,
    domain,
    plan,
    seats,
    seatLimit,
    mrr: seatLimit * seatPrice[plan],
    health,
    lastActiveDate: active,
    lastActive: active === "2026-10-31" ? "Today" : formatShort(active),
    renewalDate: renewal,
    renewal: fullDateFormat.format(new Date(`${renewal}T00:00:00Z`)),
  }),
);
