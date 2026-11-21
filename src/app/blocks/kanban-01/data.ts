export type Status = "backlog" | "progress" | "review" | "done";
export type Priority = "urgent" | "high" | "medium" | "low";
export type Label = "ios" | "android" | "design" | "bug" | "api";

export interface Task {
  id: string;
  key: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  labels: Label[];
  due: string | null;
  description: string;
}

export const today = "2026-10-28";
export const sprint = {
  name: "Sprint 14",
  start: "2026-10-19",
  end: "2026-10-30",
};

export const columns: { id: Status; name: string; limit?: number }[] = [
  { id: "backlog", name: "Backlog" },
  { id: "progress", name: "In progress", limit: 4 },
  { id: "review", name: "In review", limit: 3 },
  { id: "done", name: "Done" },
];

export const priorities: { id: Priority; name: string }[] = [
  { id: "urgent", name: "Urgent" },
  { id: "high", name: "High" },
  { id: "medium", name: "Medium" },
  { id: "low", name: "Low" },
];

export const labels: { id: Label; name: string }[] = [
  { id: "ios", name: "iOS" },
  { id: "android", name: "Android" },
  { id: "design", name: "Design" },
  { id: "bug", name: "Bug" },
  { id: "api", name: "API" },
];

export const members = [
  "Rosa Delgado",
  "Ben Okafor",
  "Hana Sato",
  "Marcus Lee",
  "Ines Moreau",
];

export const currentUser = "Hana Sato";

export const initialTasks: Task[] = [
  {
    id: "t1",
    key: "FN-218",
    title: "Offline mode for saved notes",
    status: "backlog",
    priority: "high",
    assignee: null,
    labels: ["ios", "android"],
    due: null,
    description:
      "Keep the last 50 notes on the device. Sync changes when the connection returns.",
  },
  {
    id: "t2",
    key: "FN-221",
    title: "Export a notebook as PDF",
    status: "backlog",
    priority: "medium",
    assignee: "Marcus Lee",
    labels: ["api"],
    due: "2026-11-06",
    description: "Render each note on its own page with the title as a header.",
  },
  {
    id: "t3",
    key: "FN-224",
    title: "Empty state for shared folders",
    status: "backlog",
    priority: "low",
    assignee: "Ines Moreau",
    labels: ["design"],
    due: null,
    description: "Explain what a shared folder is and link to the invite flow.",
  },
  {
    id: "t4",
    key: "FN-226",
    title: "Reminder time ignores the time zone",
    status: "backlog",
    priority: "urgent",
    assignee: "Ben Okafor",
    labels: ["bug", "api"],
    due: "2026-10-29",
    description:
      "Reminders fire one hour late for users east of UTC. Store the time zone with each reminder.",
  },
  {
    id: "t5",
    key: "FN-205",
    title: "New onboarding screens",
    status: "progress",
    priority: "high",
    assignee: "Ines Moreau",
    labels: ["design", "ios"],
    due: "2026-10-30",
    description:
      "Three screens: capture, organize, and share. Skip is always visible.",
  },
  {
    id: "t6",
    key: "FN-209",
    title: "Sign in with a passkey",
    status: "progress",
    priority: "high",
    assignee: "Rosa Delgado",
    labels: ["ios", "android", "api"],
    due: "2026-10-30",
    description:
      "Offer a passkey after the first sign-in. Keep the email link as a fallback.",
  },
  {
    id: "t7",
    key: "FN-212",
    title: "Crash when a photo is larger than 20 MB",
    status: "progress",
    priority: "urgent",
    assignee: "Ben Okafor",
    labels: ["bug", "android"],
    due: "2026-10-27",
    description:
      "Scale the photo down before upload. Show an error if it still fails.",
  },
  {
    id: "t8",
    key: "FN-199",
    title: "Search results show the matching text",
    status: "review",
    priority: "medium",
    assignee: "Marcus Lee",
    labels: ["api"],
    due: "2026-10-29",
    description: "Return a short excerpt around each match and mark the match.",
  },
  {
    id: "t9",
    key: "FN-203",
    title: "Dark mode for the widget",
    status: "review",
    priority: "low",
    assignee: "Hana Sato",
    labels: ["ios", "design"],
    due: "2026-10-30",
    description: "Use the system appearance. Match the app colors.",
  },
  {
    id: "t10",
    key: "FN-188",
    title: "Tag suggestions while typing",
    status: "done",
    priority: "medium",
    assignee: "Rosa Delgado",
    labels: ["ios", "android"],
    due: "2026-10-23",
    description:
      "Suggest the five most used tags that start with the typed text.",
  },
  {
    id: "t11",
    key: "FN-191",
    title: "Faster sync for large notebooks",
    status: "done",
    priority: "high",
    assignee: "Ben Okafor",
    labels: ["api"],
    due: "2026-10-22",
    description:
      "Send only changed blocks. Sync time for 1,000 notes went from 9 s to 2 s.",
  },
  {
    id: "t12",
    key: "FN-195",
    title: "Haptic feedback on swipe actions",
    status: "done",
    priority: "low",
    assignee: "Hana Sato",
    labels: ["ios"],
    due: "2026-10-26",
    description: "Light impact when the swipe passes the action point.",
  },
];

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDay(value: string) {
  return dayFormat.format(new Date(`${value}T00:00:00Z`));
}
