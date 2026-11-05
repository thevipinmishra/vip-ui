"use client";

import { Button } from "@/components/ui/button";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";

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

export function DataTableFooterDemo() {
  const total = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <DataTable
      label="Invoices"
      rows={invoices}
      columns={columns}
      getRowId={(invoice) => invoice.id}
      pageSize={4}
      selectable={false}
      renderFooter={({
        firstRow,
        lastRow,
        filteredCount,
        pageIndex,
        pageCount,
        setPageIndex,
      }) => (
        <>
          <span className="tabular-nums">
            {filteredCount} invoices · {currency.format(total)} total
            <span className="block text-xs">
              Showing {firstRow}–{lastRow}
            </span>
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              isDisabled={pageIndex === 0}
              onPress={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              isDisabled={pageIndex >= pageCount - 1}
              onPress={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    />
  );
}
