export type ProjectStatus = "on-track" | "at-risk" | "off-track" | "completed";

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  done: number;
  total: number;
  due: string;
  updatedAt: string;
  members: string[];
  starred: boolean;
  color: 1 | 2 | 3 | 4 | 5;
}

export const today = "2026-10-28";

export const statuses: { id: ProjectStatus; name: string }[] = [
  { id: "on-track", name: "On track" },
  { id: "at-risk", name: "At risk" },
  { id: "off-track", name: "Off track" },
  { id: "completed", name: "Completed" },
];

export const initialProjects: Project[] = [
  {
    id: "harbor-web",
    name: "Website refresh",
    client: "Harbor & Pine",
    status: "on-track",
    done: 18,
    total: 30,
    due: "2026-11-14",
    updatedAt: "2026-10-28T09:12:00Z",
    members: ["Elena Ruiz", "Sam Okoro", "Nora Lind"],
    starred: true,
    color: 2,
  },
  {
    id: "kiln-brand",
    name: "Brand identity",
    client: "Kiln Coffee",
    status: "at-risk",
    done: 9,
    total: 24,
    due: "2026-11-06",
    updatedAt: "2026-10-27T16:40:00Z",
    members: ["Nora Lind", "Theo Park"],
    starred: true,
    color: 3,
  },
  {
    id: "brightside-checkout",
    name: "Mobile checkout",
    client: "Brightside Bank",
    status: "on-track",
    done: 31,
    total: 40,
    due: "2026-11-20",
    updatedAt: "2026-10-28T08:05:00Z",
    members: ["Sam Okoro", "Aisha Bello", "Elena Ruiz", "Theo Park"],
    starred: false,
    color: 4,
  },
  {
    id: "northfield-report",
    name: "Annual report",
    client: "Northfield Trust",
    status: "off-track",
    done: 4,
    total: 22,
    due: "2026-10-30",
    updatedAt: "2026-10-26T11:20:00Z",
    members: ["Theo Park", "Aisha Bello"],
    starred: false,
    color: 5,
  },
  {
    id: "oakmere-packaging",
    name: "Packaging system",
    client: "Oakmere Foods",
    status: "on-track",
    done: 12,
    total: 18,
    due: "2026-12-04",
    updatedAt: "2026-10-25T14:02:00Z",
    members: ["Nora Lind", "Elena Ruiz"],
    starred: false,
    color: 1,
  },
  {
    id: "internal-audit",
    name: "Design system audit",
    client: "Loomwell",
    status: "on-track",
    done: 7,
    total: 12,
    due: "2026-11-11",
    updatedAt: "2026-10-24T10:30:00Z",
    members: ["Aisha Bello"],
    starred: false,
    color: 2,
  },
  {
    id: "clearwater-portal",
    name: "Donor portal",
    client: "Clearwater Fund",
    status: "at-risk",
    done: 15,
    total: 36,
    due: "2026-12-11",
    updatedAt: "2026-10-22T17:45:00Z",
    members: ["Sam Okoro", "Theo Park", "Elena Ruiz"],
    starred: false,
    color: 3,
  },
  {
    id: "vela-booth",
    name: "Trade show booth",
    client: "Vela Audio",
    status: "completed",
    done: 20,
    total: 20,
    due: "2026-10-16",
    updatedAt: "2026-10-16T12:00:00Z",
    members: ["Nora Lind", "Aisha Bello"],
    starred: false,
    color: 4,
  },
  {
    id: "kiln-menu",
    name: "Menu redesign",
    client: "Kiln Coffee",
    status: "completed",
    done: 14,
    total: 14,
    due: "2026-10-09",
    updatedAt: "2026-10-09T15:10:00Z",
    members: ["Theo Park"],
    starred: false,
    color: 5,
  },
];

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDay(value: string) {
  return dayFormat.format(new Date(`${value.slice(0, 10)}T00:00:00Z`));
}
