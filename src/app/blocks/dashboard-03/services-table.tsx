"use client";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  formatCompact,
  formatMs,
  formatRate,
  type Service,
  type ServiceStatus,
  services,
} from "./data";

const statusBadge: Record<
  ServiceStatus,
  { label: string; variant: BadgeProps["variant"]; rank: number }
> = {
  degraded: { label: "Degraded", variant: "error", rank: 0 },
  recovering: { label: "Recovering", variant: "warning", rank: 1 },
  healthy: { label: "Healthy", variant: "success", rank: 2 },
};

const units: Record<Service["unit"], string> = {
  rpm: "req/min",
  qpm: "queries/min",
  ops: "ops/min",
};

function Bar({ value, tone }: { value: number; tone: string }) {
  return (
    <span
      aria-hidden="true"
      className="h-1 w-16 overflow-hidden rounded-full bg-muted"
    >
      <span
        className={`block h-full rounded-full ${tone}`}
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </span>
  );
}

const columns: DataTableColumn<Service>[] = [
  {
    id: "service",
    minWidth: 170,
    header: "Service",
    width: "1.6fr",
    sortValue: (row) => row.name,
    cell: (row) => (
      <span className="block min-w-0">
        <span className="block truncate font-mono text-[13px] font-medium">
          {row.name}
        </span>
        <span className="block truncate text-xs text-muted-foreground">
          {row.team}
        </span>
      </span>
    ),
  },
  {
    id: "status",
    minWidth: 130,
    header: "Status",
    sortValue: (row) => statusBadge[row.status].rank,
    filter: {
      type: "select",
      options: [
        { id: "0", name: "Degraded" },
        { id: "1", name: "Recovering" },
        { id: "2", name: "Healthy" },
      ],
    },
    cell: (row) => (
      <Badge variant={statusBadge[row.status].variant} dot>
        {statusBadge[row.status].label}
      </Badge>
    ),
  },
  {
    id: "throughput",
    minWidth: 150,
    header: "Throughput",
    align: "end",
    sortValue: (row) => row.requests,
    cell: (row) => (
      <span className="tabular-nums">
        {formatCompact(row.requests)}{" "}
        <span className="text-xs text-muted-foreground">{units[row.unit]}</span>
      </span>
    ),
  },
  {
    id: "errors",
    minWidth: 90,
    header: "Errors",
    align: "end",
    sortValue: (row) => row.errorRate,
    cell: (row) => (
      <span
        className={
          row.errorRate >= 0.01
            ? "font-medium text-destructive tabular-nums"
            : "tabular-nums"
        }
      >
        {formatRate(row.errorRate)}
      </span>
    ),
  },
  {
    id: "p95",
    minWidth: 90,
    header: "p95",
    align: "end",
    sortValue: (row) => row.p95,
    cell: (row) => (
      <span
        className={
          row.status === "degraded"
            ? "font-medium text-destructive tabular-nums"
            : "tabular-nums"
        }
      >
        {formatMs(row.p95)}
      </span>
    ),
  },
  {
    id: "cpu",
    minWidth: 130,
    header: "CPU",
    sortValue: (row) => row.cpu,
    cell: (row) => (
      <span className="inline-flex items-center gap-2">
        <Bar
          value={row.cpu}
          tone={row.cpu >= 0.7 ? "bg-warning" : "bg-muted-foreground/60"}
        />
        <span className="w-9 text-end text-xs tabular-nums">
          {Math.round(row.cpu * 100)}%
        </span>
      </span>
    ),
  },
  {
    id: "budget",
    minWidth: 150,
    header: "Error budget",
    sortValue: (row) => row.budget,
    cell: (row) => (
      <span className="inline-flex items-center gap-2">
        <Bar
          value={row.budget}
          tone={
            row.budget < 0.25
              ? "bg-destructive"
              : row.budget < 0.5
                ? "bg-warning"
                : "bg-success"
          }
        />
        <span className="w-9 text-end text-xs tabular-nums">
          {Math.round(row.budget * 100)}%
        </span>
      </span>
    ),
  },
];

export function ServicesTable() {
  return (
    <DataTable
      label="Services"
      rows={services}
      columns={columns}
      getRowId={(row) => row.name}
      getSearchText={(row) => `${row.name} ${row.team}`}
      selectable={false}
      pageSize={8}
    />
  );
}
