import { CalendarDate } from "@internationalized/date";

export interface DayRow {
  date: string;
  mrr: number;
  workspaces: number;
  signups: number;
  churned: number;
  newMrr: number;
  expansionMrr: number;
  churnedMrr: number;
  conversion: number;
}

export interface Bucket {
  start: string;
  label: string;
  mrr: number;
  workspaces: number;
  signups: number;
  churned: number;
  newMrr: number;
  expansionMrr: number;
  churnedMrr: number;
}

const dayMs = 86_400_000;
const firstDay = Date.UTC(2025, 0, 1);
const lastDay = Date.UTC(2026, 11, 31);
const totalDays = Math.round((lastDay - firstDay) / dayMs) + 1;

const shortDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const fullDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function round(value: number, digits = 0) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export const daily: DayRow[] = (() => {
  let mrr = 118_000;
  let workspaces = 900;
  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(firstDay + index * dayMs);
    const weekday = date.getUTCDay();
    const working = weekday !== 0 && weekday !== 6;
    const signups = Math.max(
      0,
      Math.round((working ? 5.6 : 2.2) * (1 + 0.22 * Math.sin(index / 4.7))),
    );
    const churned = Math.max(
      0,
      Math.round((working ? 2.9 : 1.1) * (1 + 0.3 * Math.sin(index / 6.3))),
    );
    const newMrr = Math.round(signups * 100);
    const expansionMrr = Math.round(260 + 100 * Math.sin(index / 9.1));
    const churnedMrr = Math.round(churned * 90);
    mrr += newMrr + expansionMrr - churnedMrr;
    workspaces += signups - churned;
    const conversion = round(
      0.24 + 0.035 * Math.sin(index / 11) + 0.006 * Math.sin(index / 3.4),
      4,
    );
    return {
      date: date.toISOString().slice(0, 10),
      mrr: Math.round(mrr),
      workspaces: Math.round(workspaces),
      signups,
      churned,
      newMrr,
      expansionMrr,
      churnedMrr,
      conversion,
    };
  });
})();

export const referenceDate = new CalendarDate(2026, 10, 31);

export const rangePresets = [
  {
    label: "Last 7 days",
    value: {
      start: referenceDate.subtract({ days: 6 }),
      end: referenceDate,
    },
  },
  {
    label: "Last 30 days",
    value: {
      start: referenceDate.subtract({ days: 29 }),
      end: referenceDate,
    },
  },
  {
    label: "Last 90 days",
    value: {
      start: referenceDate.subtract({ days: 89 }),
      end: referenceDate,
    },
  },
  {
    label: "Year to date",
    value: {
      start: new CalendarDate(2026, 1, 1),
      end: referenceDate,
    },
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

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    value,
  );
}

export function formatPercent(value: number, signed = false) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: signed ? "always" : "auto",
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

export function summarize(rows: DayRow[]) {
  const last = rows.at(-1);
  const sum = (key: keyof DayRow) =>
    rows.reduce((total, row) => total + Number(row[key]), 0);
  return {
    mrr: last?.mrr ?? 0,
    workspaces: last?.workspaces ?? 0,
    conversion:
      rows.length > 0
        ? rows.reduce((total, row) => total + row.conversion, 0) / rows.length
        : 0,
    newMrr: sum("newMrr") as number,
    expansionMrr: sum("expansionMrr") as number,
    churnedMrr: sum("churnedMrr") as number,
    signups: sum("signups") as number,
    churned: sum("churned") as number,
    netNewMrr:
      (sum("newMrr") as number) +
      (sum("expansionMrr") as number) -
      (sum("churnedMrr") as number),
  };
}

export function bucketRows(rows: DayRow[], maxPoints = 13): Bucket[] {
  if (rows.length === 0) return [];
  const size = Math.max(1, Math.ceil(rows.length / maxPoints));
  const buckets: Bucket[] = [];
  for (let index = 0; index < rows.length; index += size) {
    const chunk = rows.slice(index, index + size);
    const first = chunk[0];
    const last = chunk.at(-1) ?? first;
    const sum = (key: keyof DayRow) =>
      chunk.reduce((total, row) => total + Number(row[key]), 0);
    buckets.push({
      start: first.date,
      label:
        size >= 28
          ? monthFormat.format(new Date(`${first.date}T00:00:00Z`))
          : formatShort(first.date),
      mrr: last.mrr,
      workspaces: last.workspaces,
      signups: sum("signups") as number,
      churned: sum("churned") as number,
      newMrr: sum("newMrr") as number,
      expansionMrr: sum("expansionMrr") as number,
      churnedMrr: sum("churnedMrr") as number,
    });
  }
  return buckets;
}

export function growthRate(rows: DayRow[]) {
  const first = rows[0];
  const last = rows.at(-1);
  if (!first || !last || first.mrr === 0) return 0;
  return last.mrr / first.mrr - 1;
}
