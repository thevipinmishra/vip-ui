export const brand = {
  name: "Trellis",
  domain: "trellis.app",
  tagline: "Product analytics for teams that ship.",
};

export type ReleaseType = "new" | "improved" | "fixed";

export const releaseTypes: { id: ReleaseType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "improved", label: "Improved" },
  { id: "fixed", label: "Fixed" },
];

export const releases: {
  id: string;
  version: string;
  date: string;
  type: ReleaseType;
  title: string;
  summary: string;
  changes: string[];
}[] = [
  {
    id: "journeys-2",
    version: "4.8.0",
    date: "2026-10-28",
    type: "new",
    title: "Journeys 2.0",
    summary: "A new path canvas with side-by-side branches and share links.",
    changes: [
      "Drag any step to move it. The path redraws as you go.",
      "Share a path with a link. The link keeps the date range and filters.",
    ],
  },
  {
    id: "dashboard-speed",
    version: "4.7.2",
    date: "2026-10-21",
    type: "fixed",
    title: "Dashboards load faster",
    summary:
      "Most dashboards now open in under a second, even with long ranges.",
    changes: [
      "Fixed a slow retention query for ranges longer than 90 days.",
      "The first chart on a dashboard now renders before the rest.",
    ],
  },
  {
    id: "quiet-alerts",
    version: "4.7.0",
    date: "2026-10-14",
    type: "improved",
    title: "Alerts with less noise",
    summary:
      "A new rule checks the size of a change before it sends a message.",
    changes: [
      "Set quiet hours for each channel.",
      "Each Slack alert starts a thread with the related chart.",
    ],
  },
  {
    id: "csv-order",
    version: "4.6.1",
    date: "2026-10-02",
    type: "fixed",
    title: "CSV export in the right order",
    summary: "Funnel exports now keep the step order that you see on screen.",
    changes: [
      "Fixed the column order in funnel CSV exports.",
      "Empty steps now export a zero, not a blank cell.",
    ],
  },
  {
    id: "warehouse-sync",
    version: "4.6.0",
    date: "2026-09-24",
    type: "new",
    title: "Warehouse sync",
    summary:
      "Send events to BigQuery or Snowflake each hour, with no pipeline to maintain.",
    changes: [
      "Connect BigQuery or Snowflake in Settings, then pick a dataset.",
      "Syncs run each hour. You can start a manual sync at any time.",
    ],
  },
  {
    id: "home-layout",
    version: "4.5.0",
    date: "2026-09-16",
    type: "improved",
    title: "A clearer home",
    summary: "Your home screen now shows the views your team opens most.",
    changes: [
      "Saved views sit at the top of the home screen.",
      "The date range is shared by all cards in a view.",
    ],
  },
  {
    id: "replay-safari",
    version: "4.4.2",
    date: "2026-09-08",
    type: "fixed",
    title: "Replay scrub on Safari",
    summary:
      "The session replay timeline now follows the pointer in Safari 18.",
    changes: [
      "Fixed a drag error in the replay timeline on Safari.",
      "The player keeps its place when you change the window size.",
    ],
  },
  {
    id: "cohort-builder",
    version: "4.4.0",
    date: "2026-09-01",
    type: "new",
    title: "Cohort builder",
    summary:
      "Build a cohort from any event or property, then save it for later.",
    changes: [
      "Add up to five conditions with AND and OR.",
      "Use a saved cohort in funnels, retention, and alerts.",
    ],
  },
];

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(value: string) {
  return dateFormat.format(new Date(`${value}T00:00:00Z`));
}

export function typeCount(type: ReleaseType | "all") {
  if (type === "all") return releases.length;
  return releases.filter((release) => release.type === type).length;
}

export const typeMeta: Record<
  ReleaseType,
  { label: string; variant: "accent" | "success" | "neutral" }
> = {
  new: { label: "New", variant: "accent" },
  improved: { label: "Improved", variant: "success" },
  fixed: { label: "Fixed", variant: "neutral" },
};
