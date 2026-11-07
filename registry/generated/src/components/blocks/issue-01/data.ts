export interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  since: string;
}

export const people: Person[] = [
  {
    id: "maya",
    name: "Maya Chen",
    email: "maya@kestrel.app",
    role: "Support lead",
    since: "Watching for 2 days",
  },
  {
    id: "leo",
    name: "Leo Park",
    email: "leo@kestrel.app",
    role: "Frontend engineer",
    since: "Watching for 4 days",
  },
  {
    id: "priya",
    name: "Priya Raman",
    email: "priya@kestrel.app",
    role: "Product manager",
    since: "Watching for 3 days",
  },
  {
    id: "ana",
    name: "Ana Souza",
    email: "ana@kestrel.app",
    role: "Support agent",
    since: "Watching for 1 day",
  },
];

export const statusOptions = [
  { id: "backlog", name: "Backlog" },
  { id: "todo", name: "Todo" },
  { id: "in-progress", name: "In progress" },
  { id: "in-review", name: "In review" },
  { id: "done", name: "Done" },
];

export type StatusId =
  | "backlog"
  | "todo"
  | "in-progress"
  | "in-review"
  | "done";

export const statusBadge: Record<
  StatusId,
  "neutral" | "outline" | "warning" | "accent" | "success"
> = {
  backlog: "neutral",
  todo: "outline",
  "in-progress": "warning",
  "in-review": "accent",
  done: "success",
};

export interface ActivityEvent {
  id: string;
  type: "comment" | "status" | "label" | "assign" | "test" | "due";
  actor: Person;
  title: string;
  body?: string;
  at: string;
  atLabel?: string;
}

const maya = people[0];
const leo = people[1];
const priya = people[2];
const ana = people[3];

export const initialActivity: ActivityEvent[] = [
  {
    id: "opened",
    type: "comment",
    actor: {
      id: "ruth",
      name: "Ruth Okafor",
      email: "ruth@kestrel.app",
      role: "QA engineer",
      since: "",
    },
    title: "Ruth Okafor",
    body: "I can reproduce this on staging.",
    at: "2026-10-26T09:14:00Z",
  },
  {
    id: "label",
    type: "label",
    actor: priya,
    title: "Priya Raman added the regression label.",
    at: "2026-10-26T10:02:00Z",
  },
  {
    id: "leo-1",
    type: "comment",
    actor: leo,
    title: "Leo Park",
    body: "The header partial prints `{{sender.name}}` and the preview adds it again. I will remove the second one.",
    at: "2026-10-26T11:36:00Z",
  },
  {
    id: "ana-1",
    type: "comment",
    actor: ana,
    title: "Ana Souza",
    body: "Three customers reported this today.",
    at: "2026-10-27T14:20:00Z",
  },
  {
    id: "status-1",
    type: "status",
    actor: leo,
    title: "Leo Park moved this issue to In progress.",
    at: "2026-10-28T09:05:00Z",
  },
  {
    id: "leo-2",
    type: "comment",
    actor: leo,
    title: "Leo Park",
    body: "The fix is in review. The new test covers both views.",
    at: "2026-10-29T16:40:00Z",
  },
  {
    id: "ruth-2",
    type: "test",
    actor: {
      id: "ruth",
      name: "Ruth Okafor",
      email: "ruth@kestrel.app",
      role: "QA engineer",
      since: "",
    },
    title: "Ruth Okafor tested build 4.8.2 on staging.",
    body: "The sender name shows one time now. I also checked the standalone reply page.",
    at: "2026-10-30T08:22:00Z",
  },
];

export const issue = {
  key: "KES-482",
  title: "Support replies show the sender name twice",
  status: "in-progress" as StatusId,
  assignee: "leo",
  due: "2026-10-31",
  labels: ["inbox", "regression", "templates"],
  reporter: "Ruth Okafor",
  openedAt: "2026-10-26T09:14:00Z",
  build: "Kestrel Desk 4.8.1",
};

export const viewerSeed = ["maya", "leo", "priya", "ana"];

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const time = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

const fullDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatShortDate(iso: string) {
  return shortDate.format(new Date(iso));
}

export function formatTime(iso: string) {
  return time.format(new Date(iso));
}

export function formatFullDate(iso: string) {
  return fullDate.format(new Date(iso));
}

export function formatActivityTime(iso: string) {
  return `${shortDate.format(new Date(iso))} at ${time.format(new Date(iso))}`;
}

export function personById(id: string) {
  return people.find((person) => person.id === id) ?? maya;
}
