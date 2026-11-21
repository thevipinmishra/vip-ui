"use client";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  type Account,
  accounts,
  formatCount,
  formatMoney,
  type Health,
  type Plan,
} from "./data";

const healthBadge: Record<
  Health,
  { label: string; variant: BadgeProps["variant"]; rank: number }
> = {
  healthy: { label: "Healthy", variant: "success", rank: 2 },
  risk: { label: "At risk", variant: "warning", rank: 1 },
  inactive: { label: "Inactive", variant: "error", rank: 0 },
};

const planBadge: Record<Plan, BadgeProps["variant"]> = {
  Enterprise: "accent",
  Business: "outline",
  Team: "neutral",
};

const columns: DataTableColumn<Account>[] = [
  {
    id: "account",
    minWidth: 200,
    header: "Account",
    width: "2fr",
    sortValue: (row) => row.name,
    cell: (row) => (
      <span className="block min-w-0">
        <span className="block truncate font-medium">{row.name}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {row.domain}
        </span>
      </span>
    ),
  },
  {
    id: "plan",
    minWidth: 120,
    header: "Plan",
    sortValue: (row) => row.plan,
    filter: {
      type: "select",
      options: [
        { id: "Enterprise", name: "Enterprise" },
        { id: "Business", name: "Business" },
        { id: "Team", name: "Team" },
      ],
    },
    cell: (row) => <Badge variant={planBadge[row.plan]}>{row.plan}</Badge>,
  },
  {
    id: "mrr",
    minWidth: 100,
    header: "MRR",
    align: "end",
    sortValue: (row) => row.mrr,
    cell: (row) => (
      <span className="font-medium tabular-nums">{formatMoney(row.mrr)}</span>
    ),
  },
  {
    id: "seats",
    minWidth: 150,
    header: "Seats used",
    sortValue: (row) => row.seats / row.seatLimit,
    cell: (row) => {
      const share = row.seats / row.seatLimit;
      return (
        <span className="grid w-28 gap-1">
          <span className="text-xs tabular-nums text-muted-foreground">
            <span className="font-medium text-foreground">
              {formatCount(row.seats)}
            </span>{" "}
            of {formatCount(row.seatLimit)}
          </span>
          <span
            aria-hidden="true"
            className="h-1 overflow-hidden rounded-full bg-muted"
          >
            <span
              className={
                share < 0.7
                  ? "block h-full rounded-full bg-warning"
                  : "block h-full rounded-full bg-primary"
              }
              style={{ width: `${share * 100}%` }}
            />
          </span>
        </span>
      );
    },
  },
  {
    id: "health",
    minWidth: 120,
    header: "Health",
    sortValue: (row) => healthBadge[row.health].rank,
    cell: (row) => (
      <Badge variant={healthBadge[row.health].variant} dot>
        {healthBadge[row.health].label}
      </Badge>
    ),
  },
  {
    id: "active",
    minWidth: 110,
    header: "Last active",
    sortValue: (row) => row.lastActiveDate,
    cell: (row) => (
      <span className="tabular-nums text-muted-foreground">
        {row.lastActive}
      </span>
    ),
  },
  {
    id: "renewal",
    minWidth: 160,
    header: "Renewal",
    sortValue: (row) => row.renewalDate,
    cell: (row) => (
      <span
        className={
          row.renewalDate < "2026-12-31" && row.health !== "healthy"
            ? "font-medium text-destructive tabular-nums"
            : "tabular-nums text-muted-foreground"
        }
      >
        {row.renewal}
      </span>
    ),
  },
];

export function AccountsTable() {
  return (
    <DataTable
      label="Top accounts"
      rows={accounts}
      columns={columns}
      getRowId={(row) => row.id}
      getSearchText={(row) => `${row.name} ${row.domain}`}
      selectable={false}
      pageSize={8}
    />
  );
}
