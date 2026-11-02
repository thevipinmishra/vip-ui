"use client";

import { useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";

type Ticket = {
  id: string;
  title: string;
  requester: string;
  priority: "Low" | "Medium" | "High";
};

const tickets: Ticket[] = [
  {
    id: "T-311",
    title: "Export fails for reports with more than 10,000 rows",
    requester: "Maya Chen",
    priority: "High",
  },
  {
    id: "T-312",
    title: "Add a dark theme to the invoice PDF",
    requester: "Sam Rivera",
    priority: "Low",
  },
  {
    id: "T-313",
    title: "Password reset email arrives late",
    requester: "Jo Park",
    priority: "Medium",
  },
  {
    id: "T-314",
    title: "Team invite link expires too soon",
    requester: "Alex Kim",
    priority: "Medium",
  },
];

const priorityRank = { Low: 0, Medium: 1, High: 2 };

const columns: DataTableColumn<Ticket>[] = [
  {
    id: "id",
    header: "Ticket",
    cell: (ticket) => <span className="font-medium">{ticket.id}</span>,
    sortValue: (ticket) => ticket.id,
    width: 110,
  },
  {
    id: "title",
    header: "Title",
    cell: (ticket) => <span className="block truncate">{ticket.title}</span>,
    width: "2fr",
    minWidth: 160,
  },
  {
    id: "requester",
    header: "Requester",
    cell: (ticket) => ticket.requester,
    sortValue: (ticket) => ticket.requester,
    width: "1fr",
  },
  {
    id: "priority",
    header: "Priority",
    cell: (ticket) => ticket.priority,
    sortValue: (ticket) => priorityRank[ticket.priority],
    width: 120,
  },
];

export function DataTableResizableDemo() {
  const [opened, setOpened] = useState<string | null>(null);

  return (
    <div className="grid w-full max-w-3xl gap-2">
      <DataTable
        label="Support tickets"
        rows={tickets}
        columns={columns}
        getRowId={(ticket) => ticket.id}
        resizable
        selectable={false}
        onRowAction={(key) => setOpened(String(key))}
      />
      <output aria-live="polite" className="text-sm text-muted-foreground">
        {opened ? `Opened ${opened}` : "Select a row to open the ticket."}
      </output>
    </div>
  );
}
