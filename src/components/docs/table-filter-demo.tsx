"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SearchField } from "@/components/ui/search-field";
import { Select } from "@/components/ui/select";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const statusVariants = {
  Paid: "success",
  Pending: "accent",
  Overdue: "warning",
} as const;

type Invoice = {
  id: string;
  customer: string;
  amount: string;
  status: keyof typeof statusVariants;
};

const invoices: Invoice[] = [
  { id: "INV-1048", customer: "Acme Studio", amount: "$2,400", status: "Paid" },
  {
    id: "INV-1049",
    customer: "Northstar Labs",
    amount: "$1,180",
    status: "Overdue",
  },
  {
    id: "INV-1050",
    customer: "Fieldwork Co.",
    amount: "$3,750",
    status: "Pending",
  },
  {
    id: "INV-1051",
    customer: "Meridian Health",
    amount: "$890",
    status: "Paid",
  },
  {
    id: "INV-1052",
    customer: "Paperplane",
    amount: "$1,560",
    status: "Pending",
  },
  {
    id: "INV-1053",
    customer: "Atlas Works",
    amount: "$4,200",
    status: "Overdue",
  },
  { id: "INV-1054", customer: "Goodside", amount: "$640", status: "Paid" },
  {
    id: "INV-1055",
    customer: "Morrow Design",
    amount: "$2,100",
    status: "Pending",
  },
];

export function TableFilterDemo() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const results = invoices.filter(
    (invoice) =>
      (status === "all" || invoice.status === status) &&
      `${invoice.id} ${invoice.customer}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );

  return (
    <div className="w-full max-w-3xl space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <SearchField
          label="Search invoices"
          placeholder="Invoice number or customer"
          value={query}
          onChange={setQuery}
          className="sm:flex-1"
        />
        <Select
          label="Status"
          value={status}
          onValueChange={setStatus}
          options={[
            { id: "all", name: "All statuses" },
            { id: "Paid", name: "Paid" },
            { id: "Pending", name: "Pending" },
            { id: "Overdue", name: "Overdue" },
          ]}
          className="sm:max-w-48"
        />
      </div>
      <output className="block text-xs text-muted-foreground">
        {results.length} of {invoices.length} invoices
      </output>
      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-[var(--shadow-card)]">
        <Table aria-label="Filtered invoices" className="min-w-[540px]">
          <TableHeader>
            <Column id="invoice" isRowHeader>
              Invoice
            </Column>
            <Column id="customer">Customer</Column>
            <Column id="amount">Amount</Column>
            <Column id="status">Status</Column>
          </TableHeader>
          <TableBody
            items={results}
            renderEmptyState={() => (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                <MagnifyingGlassIcon
                  size={20}
                  aria-hidden="true"
                  className="text-muted-foreground"
                />
                <p className="text-sm font-medium">No invoices found</p>
                <p className="text-xs text-muted-foreground">
                  Try another customer or status.
                </p>
              </div>
            )}
          >
            {(invoice) => (
              <Row id={invoice.id}>
                <Cell>
                  <span className="font-medium">{invoice.id}</span>
                </Cell>
                <Cell>{invoice.customer}</Cell>
                <Cell>{invoice.amount}</Cell>
                <Cell>
                  <Badge variant={statusVariants[invoice.status]} dot>
                    {invoice.status}
                  </Badge>
                </Cell>
              </Row>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
