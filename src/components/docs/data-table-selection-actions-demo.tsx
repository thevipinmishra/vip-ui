"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  DataTable,
  type DataTableColumn,
  type DataTableSelectionState,
} from "@/components/ui/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Invoice = {
  id: string;
  customer: string;
  amount: number;
};

const invoices: Invoice[] = [
  { id: "INV-1048", customer: "Acme Studio", amount: 2400 },
  { id: "INV-1049", customer: "Northstar Labs", amount: 1180 },
  { id: "INV-1050", customer: "Fieldwork Co.", amount: 3750 },
  { id: "INV-1051", customer: "Meridian Health", amount: 890 },
  { id: "INV-1052", customer: "Paperplane", amount: 1560 },
  { id: "INV-1053", customer: "Atlas Works", amount: 4200 },
  { id: "INV-1054", customer: "Goodside", amount: 640 },
  { id: "INV-1055", customer: "Morrow Design", amount: 2100 },
  { id: "INV-1056", customer: "Beacon Media", amount: 3250 },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const columns: DataTableColumn<Invoice>[] = [
  {
    id: "id",
    header: "Invoice",
    cell: (invoice) => <span className="font-medium">{invoice.id}</span>,
    sortValue: (invoice) => invoice.id,
  },
  {
    id: "customer",
    header: "Customer",
    cell: (invoice) => invoice.customer,
    sortValue: (invoice) => invoice.customer,
  },
  {
    id: "amount",
    header: "Amount",
    align: "end",
    cell: (invoice) => (
      <span className="tabular-nums">{currency.format(invoice.amount)}</span>
    ),
    sortValue: (invoice) => invoice.amount,
  },
];

function exportInvoices(rows: readonly Invoice[], keys: Set<Key>) {
  const selected = rows.filter((invoice) => keys.has(invoice.id));
  const lines = selected.map(
    (invoice) => `${invoice.id},${invoice.customer},${invoice.amount}`,
  );
  const url = URL.createObjectURL(
    new Blob([["Invoice,Customer,Amount", ...lines].join("\n")], {
      type: "text/csv",
    }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "invoices.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export function DataTableSelectionActionsDemo() {
  const [rows, setRows] = useState(invoices);

  function renderSelectionActions({
    selectedKeys,
    selectedCount,
    clearSelection,
  }: DataTableSelectionState) {
    return (
      <>
        <Button
          variant="ghost"
          onPress={() => exportInvoices(rows, selectedKeys)}
        >
          Export
        </Button>
        <Dialog>
          <DialogTrigger variant="destructive">Delete</DialogTrigger>
          <DialogContent role="alertdialog" size="sm">
            <DialogHeader>
              <DialogTitle>
                {selectedCount === 1
                  ? "Delete this invoice?"
                  : "Delete these invoices?"}
              </DialogTitle>
              <DialogDescription>
                This removes the selected invoices from the list for everyone.
                You cannot undo this.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose variant="outline">Cancel</DialogClose>
              <DialogClose
                variant="destructive"
                onPress={() => {
                  setRows((current) =>
                    current.filter((invoice) => !selectedKeys.has(invoice.id)),
                  );
                  clearSelection();
                }}
              >
                Delete
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <DataTable
      label="Invoices"
      rows={rows}
      columns={columns}
      getRowId={(invoice) => invoice.id}
      pageSize={4}
      renderSelectionActions={renderSelectionActions}
    />
  );
}
