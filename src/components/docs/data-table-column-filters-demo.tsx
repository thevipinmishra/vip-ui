"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";

type Invoice = {
  id: string;
  customer: string;
  region: "Americas" | "Europe" | "Asia Pacific";
  status: "Paid" | "Pending" | "Overdue";
  amount: number;
};

const invoices: Invoice[] = [
  {
    id: "INV-1048",
    customer: "Acme Studio",
    region: "Americas",
    status: "Paid",
    amount: 2400,
  },
  {
    id: "INV-1049",
    customer: "Northstar Labs",
    region: "Europe",
    status: "Overdue",
    amount: 1180,
  },
  {
    id: "INV-1050",
    customer: "Fieldwork Co.",
    region: "Asia Pacific",
    status: "Pending",
    amount: 3750,
  },
  {
    id: "INV-1051",
    customer: "Meridian Health",
    region: "Americas",
    status: "Paid",
    amount: 890,
  },
  {
    id: "INV-1052",
    customer: "Paperplane",
    region: "Europe",
    status: "Pending",
    amount: 1560,
  },
  {
    id: "INV-1053",
    customer: "Atlas Works",
    region: "Asia Pacific",
    status: "Overdue",
    amount: 4200,
  },
  {
    id: "INV-1054",
    customer: "Goodside",
    region: "Americas",
    status: "Paid",
    amount: 640,
  },
  {
    id: "INV-1055",
    customer: "Morrow Design",
    region: "Europe",
    status: "Pending",
    amount: 2100,
  },
  {
    id: "INV-1056",
    customer: "Beacon Media",
    region: "Asia Pacific",
    status: "Paid",
    amount: 3250,
  },
  {
    id: "INV-1057",
    customer: "Pioneer Systems",
    region: "Americas",
    status: "Overdue",
    amount: 2870,
  },
  {
    id: "INV-1058",
    customer: "Evergreen Co.",
    region: "Europe",
    status: "Paid",
    amount: 1290,
  },
  {
    id: "INV-1059",
    customer: "Grain Partners",
    region: "Asia Pacific",
    status: "Pending",
    amount: 1950,
  },
  {
    id: "INV-1060",
    customer: "Harbor Group",
    region: "Americas",
    status: "Pending",
    amount: 4740,
  },
  {
    id: "INV-1061",
    customer: "Orbit Creative",
    region: "Europe",
    status: "Overdue",
    amount: 780,
  },
  {
    id: "INV-1062",
    customer: "Folio Agency",
    region: "Asia Pacific",
    status: "Paid",
    amount: 3640,
  },
  {
    id: "INV-1063",
    customer: "Tidal Research",
    region: "Americas",
    status: "Paid",
    amount: 1720,
  },
  {
    id: "INV-1064",
    customer: "Signal House",
    region: "Europe",
    status: "Pending",
    amount: 2260,
  },
  {
    id: "INV-1065",
    customer: "Frame & Form",
    region: "Asia Pacific",
    status: "Overdue",
    amount: 3150,
  },
  {
    id: "INV-1066",
    customer: "Lucent Labs",
    region: "Americas",
    status: "Overdue",
    amount: 980,
  },
  {
    id: "INV-1067",
    customer: "Summit Works",
    region: "Europe",
    status: "Paid",
    amount: 5120,
  },
  {
    id: "INV-1068",
    customer: "Weave Studio",
    region: "Asia Pacific",
    status: "Pending",
    amount: 1470,
  },
  {
    id: "INV-1069",
    customer: "Tempo Health",
    region: "Americas",
    status: "Paid",
    amount: 2590,
  },
];

const statusVariants = {
  Paid: "success",
  Pending: "accent",
  Overdue: "warning",
} as const;

const columns: DataTableColumn<Invoice>[] = [
  {
    id: "id",
    header: "Invoice",
    cell: (row) => <span className="font-medium">{row.id}</span>,
    sortValue: (row) => row.id,
  },
  {
    id: "customer",
    header: "Customer",
    cell: (row) => row.customer,
    sortValue: (row) => row.customer,
    filter: { type: "text" },
  },
  {
    id: "region",
    header: "Region",
    cell: (row) => row.region,
    sortValue: (row) => row.region,
    filter: {
      type: "select",
      options: [
        { id: "Americas", name: "Americas" },
        { id: "Europe", name: "Europe" },
        { id: "Asia Pacific", name: "Asia Pacific" },
      ],
    },
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
    filter: {
      type: "select",
      options: [
        { id: "Paid", name: "Paid" },
        { id: "Pending", name: "Pending" },
        { id: "Overdue", name: "Overdue" },
      ],
    },
  },
  {
    id: "amount",
    header: "Amount",
    align: "end",
    cell: (row) => (
      <span className="tabular-nums">${row.amount.toLocaleString()}</span>
    ),
    sortValue: (row) => row.amount,
  },
];

export function DataTableColumnFiltersDemo() {
  return (
    <DataTable
      label="Invoices"
      rows={invoices}
      columns={columns}
      getRowId={(row) => row.id}
      getSearchText={(row) => `${row.id} ${row.customer}`}
      pageSize={7}
      selectable={false}
    />
  );
}
