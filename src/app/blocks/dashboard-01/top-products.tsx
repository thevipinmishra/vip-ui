"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  formatCount,
  formatMoney,
  formatPercent,
  month,
  type Product,
  products,
} from "./data";

const rows = products
  .map((product) => {
    const sales = product.units * product.price;
    return {
      ...product,
      sales,
      share: sales / month.sales,
      cover: product.stock / (product.units / 30),
    };
  })
  .sort((a, b) => b.sales - a.sales);

type Row = Product & { sales: number; share: number; cover: number };

const topShare = Math.max(...rows.map((row) => row.share));

const columns: DataTableColumn<Row>[] = [
  {
    id: "product",
    minWidth: 200,
    header: "Product",
    width: "2fr",
    sortValue: (row) => row.name,
    cell: (row) => (
      <span className="block min-w-0">
        <span className="block truncate font-medium">{row.name}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {row.variant} · <span className="font-mono">{row.sku}</span>
        </span>
      </span>
    ),
  },
  {
    id: "units",
    minWidth: 80,
    header: "Units",
    align: "end",
    sortValue: (row) => row.units,
    cell: (row) => (
      <span className="tabular-nums">{formatCount(row.units)}</span>
    ),
  },
  {
    id: "sales",
    minWidth: 130,
    header: "Net sales",
    align: "end",
    sortValue: (row) => row.sales,
    cell: (row) => (
      <span className="grid justify-items-end gap-1">
        <span className="font-medium tabular-nums">
          {formatMoney(row.sales)}
        </span>
        <span
          aria-hidden="true"
          className="h-1 w-full max-w-24 overflow-hidden rounded-full bg-muted"
        >
          <span
            className="block h-full rounded-full bg-primary"
            style={{ width: `${(row.share / topShare) * 100}%` }}
          />
        </span>
      </span>
    ),
  },
  {
    id: "stock",
    minWidth: 150,
    header: "Stock",
    align: "end",
    sortValue: (row) => row.cover,
    cell: (row) => (
      <span className="inline-flex items-center justify-end gap-2">
        {row.cover < 14 && (
          <Badge variant={row.cover < 7 ? "error" : "warning"}>
            {row.cover < 7 ? "Reorder" : "Low"}
          </Badge>
        )}
        <span className="tabular-nums">{formatCount(row.stock)}</span>
      </span>
    ),
  },
  {
    id: "returns",
    minWidth: 100,
    header: "Returns",
    align: "end",
    sortValue: (row) => row.returns,
    cell: (row) => (
      <span
        className={
          row.returns > 0.05
            ? "font-medium text-destructive tabular-nums"
            : "tabular-nums"
        }
      >
        {formatPercent(row.returns)}
      </span>
    ),
  },
];

export function TopProducts() {
  return (
    <DataTable
      label="Top products"
      rows={rows}
      columns={columns}
      getRowId={(row) => row.sku}
      selectable={false}
      pageSize={6}
      className="min-w-0"
    />
  );
}
