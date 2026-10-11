"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";

type Project = {
  id: string;
  name: string;
  owner: string;
  status: "In progress" | "Review" | "Published" | "On hold";
  tasks: number;
  budget: number;
};

const projects: Project[] = [
  {
    id: "north",
    name: "Studio North",
    owner: "Maya Chen",
    status: "In progress",
    tasks: 12,
    budget: 24800,
  },
  {
    id: "atlas",
    name: "Atlas",
    owner: "Sam Rivera",
    status: "Review",
    tasks: 8,
    budget: 18500,
  },
  {
    id: "field",
    name: "Field Notes",
    owner: "Jo Park",
    status: "Published",
    tasks: 3,
    budget: 9600,
  },
  {
    id: "signal",
    name: "Signal",
    owner: "Maya Chen",
    status: "In progress",
    tasks: 18,
    budget: 42000,
  },
  {
    id: "morrow",
    name: "Morrow",
    owner: "Alex Kim",
    status: "Review",
    tasks: 5,
    budget: 13200,
  },
  {
    id: "orbit",
    name: "Orbit",
    owner: "Sam Rivera",
    status: "Published",
    tasks: 21,
    budget: 31800,
  },
  {
    id: "grain",
    name: "Grain",
    owner: "Jo Park",
    status: "On hold",
    tasks: 0,
    budget: 6800,
  },
  {
    id: "horizon",
    name: "Horizon",
    owner: "Alex Kim",
    status: "In progress",
    tasks: 14,
    budget: 27300,
  },
  {
    id: "relay",
    name: "Relay",
    owner: "Maya Chen",
    status: "Review",
    tasks: 7,
    budget: 15600,
  },
  {
    id: "tidal",
    name: "Tidal",
    owner: "Sam Rivera",
    status: "On hold",
    tasks: 2,
    budget: 8200,
  },
  {
    id: "folio",
    name: "Folio",
    owner: "Jo Park",
    status: "Published",
    tasks: 11,
    budget: 22400,
  },
  {
    id: "ember",
    name: "Ember",
    owner: "Alex Kim",
    status: "In progress",
    tasks: 9,
    budget: 19700,
  },
  {
    id: "pioneer",
    name: "Pioneer",
    owner: "Maya Chen",
    status: "Review",
    tasks: 16,
    budget: 35500,
  },
  {
    id: "arc",
    name: "Arc",
    owner: "Sam Rivera",
    status: "Published",
    tasks: 4,
    budget: 11900,
  },
  {
    id: "grove",
    name: "Grove",
    owner: "Jo Park",
    status: "In progress",
    tasks: 13,
    budget: 28600,
  },
  {
    id: "current",
    name: "Current",
    owner: "Alex Kim",
    status: "Review",
    tasks: 6,
    budget: 14300,
  },
  {
    id: "lantern",
    name: "Lantern",
    owner: "Maya Chen",
    status: "On hold",
    tasks: 1,
    budget: 7400,
  },
  {
    id: "harbor",
    name: "Harbor",
    owner: "Sam Rivera",
    status: "In progress",
    tasks: 20,
    budget: 38500,
  },
  {
    id: "outline",
    name: "Outline",
    owner: "Jo Park",
    status: "Published",
    tasks: 10,
    budget: 20400,
  },
  {
    id: "summit",
    name: "Summit",
    owner: "Alex Kim",
    status: "Review",
    tasks: 15,
    budget: 33700,
  },
  {
    id: "lucent",
    name: "Lucent",
    owner: "Maya Chen",
    status: "Published",
    tasks: 2,
    budget: 10100,
  },
  {
    id: "weave",
    name: "Weave",
    owner: "Sam Rivera",
    status: "In progress",
    tasks: 17,
    budget: 36100,
  },
  {
    id: "frame",
    name: "Frame",
    owner: "Jo Park",
    status: "Review",
    tasks: 5,
    budget: 12800,
  },
  {
    id: "tempo",
    name: "Tempo",
    owner: "Alex Kim",
    status: "In progress",
    tasks: 19,
    budget: 40100,
  },
];

const statusVariants = {
  "In progress": "accent",
  Review: "warning",
  Published: "success",
  "On hold": "neutral",
} as const;

const columns: DataTableColumn<Project>[] = [
  {
    id: "name",
    header: "Project",
    cell: (row) => <span className="font-medium">{row.name}</span>,
    sortValue: (row) => row.name,
  },
  {
    id: "owner",
    header: "Owner",
    cell: (row) => row.owner,
    sortValue: (row) => row.owner,
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => (
      <Badge variant={statusVariants[row.status]} dot>
        {row.status}
      </Badge>
    ),
    sortValue: (row) => row.status,
  },
  {
    id: "tasks",
    header: "Open tasks",
    align: "end",
    cell: (row) => <span className="tabular-nums">{row.tasks}</span>,
    sortValue: (row) => row.tasks,
  },
  {
    id: "budget",
    header: "Budget",
    align: "end",
    cell: (row) => (
      <span className="tabular-nums">${row.budget.toLocaleString()}</span>
    ),
    sortValue: (row) => row.budget,
  },
];

export function DataTableDemo() {
  return (
    <DataTable
      label="Projects"
      rows={projects}
      columns={columns}
      getRowId={(row) => row.id}
      getSearchText={(row) => `${row.name} ${row.owner} ${row.status}`}
      pageSize={8}
    />
  );
}
