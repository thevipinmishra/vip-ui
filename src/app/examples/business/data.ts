// Fictional, fixed snapshot. Amounts are integer USD cents; no live billing data is used.
export const asOf = "2026-09-01";

export const plans = {
  Starter: 2900,
  Growth: 9900,
  Scale: 24900,
} as const;

export type Customer = {
  id: string;
  name: string;
  email: string;
  plan: keyof typeof plans;
  joined: string;
  seats: number;
  subscription: "active" | "trialing" | "past_due" | "canceled";
};

export const customers: Customer[] = [
  {
    id: "cus_1001",
    name: "Northstar Studio",
    email: "billing@northstar.example",
    plan: "Growth",
    joined: "2025-02-18",
    seats: 12,
    subscription: "active",
  },
  {
    id: "cus_1002",
    name: "Fieldwork Labs",
    email: "accounts@fieldwork.example",
    plan: "Scale",
    joined: "2025-04-09",
    seats: 34,
    subscription: "active",
  },
  {
    id: "cus_1003",
    name: "Common Ground",
    email: "finance@commonground.example",
    plan: "Starter",
    joined: "2026-07-11",
    seats: 3,
    subscription: "trialing",
  },
  {
    id: "cus_1004",
    name: "Meridian Health",
    email: "ap@meridian.example",
    plan: "Growth",
    joined: "2025-08-23",
    seats: 18,
    subscription: "past_due",
  },
  {
    id: "cus_1005",
    name: "Atlas & Co.",
    email: "billing@atlas.example",
    plan: "Growth",
    joined: "2025-10-02",
    seats: 9,
    subscription: "active",
  },
  {
    id: "cus_1006",
    name: "Forma Works",
    email: "team@forma.example",
    plan: "Starter",
    joined: "2026-01-15",
    seats: 4,
    subscription: "active",
  },
  {
    id: "cus_1007",
    name: "Bluebird Media",
    email: "billing@bluebird.example",
    plan: "Scale",
    joined: "2025-06-04",
    seats: 42,
    subscription: "active",
  },
  {
    id: "cus_1008",
    name: "Harbor Supply",
    email: "finance@harbor.example",
    plan: "Growth",
    joined: "2026-02-19",
    seats: 11,
    subscription: "canceled",
  },
  {
    id: "cus_1009",
    name: "Pinpoint Research",
    email: "accounts@pinpoint.example",
    plan: "Starter",
    joined: "2026-06-08",
    seats: 2,
    subscription: "trialing",
  },
  {
    id: "cus_1010",
    name: "Lumen Creative",
    email: "hello@lumen.example",
    plan: "Growth",
    joined: "2025-12-12",
    seats: 15,
    subscription: "active",
  },
  {
    id: "cus_1011",
    name: "Cedar Analytics",
    email: "billing@cedar.example",
    plan: "Scale",
    joined: "2025-03-26",
    seats: 27,
    subscription: "past_due",
  },
  {
    id: "cus_1012",
    name: "Paperplane Design",
    email: "accounts@paperplane.example",
    plan: "Starter",
    joined: "2026-03-05",
    seats: 5,
    subscription: "active",
  },
];

export type Invoice = {
  id: string;
  customerId: string;
  issued: string;
  due: string;
  amount: number;
  status: "paid" | "open" | "overdue" | "void";
};

export const invoices: Invoice[] = [
  {
    id: "INV-1048",
    customerId: "cus_1001",
    issued: "2026-08-01",
    due: "2026-08-15",
    amount: 9900,
    status: "paid",
  },
  {
    id: "INV-1049",
    customerId: "cus_1002",
    issued: "2026-08-02",
    due: "2026-08-16",
    amount: 24900,
    status: "paid",
  },
  {
    id: "INV-1050",
    customerId: "cus_1004",
    issued: "2026-08-03",
    due: "2026-08-17",
    amount: 9900,
    status: "overdue",
  },
  {
    id: "INV-1051",
    customerId: "cus_1005",
    issued: "2026-08-05",
    due: "2026-08-19",
    amount: 9900,
    status: "paid",
  },
  {
    id: "INV-1052",
    customerId: "cus_1006",
    issued: "2026-08-07",
    due: "2026-08-21",
    amount: 2900,
    status: "paid",
  },
  {
    id: "INV-1053",
    customerId: "cus_1007",
    issued: "2026-08-08",
    due: "2026-08-22",
    amount: 24900,
    status: "paid",
  },
  {
    id: "INV-1054",
    customerId: "cus_1008",
    issued: "2026-08-09",
    due: "2026-08-23",
    amount: 9900,
    status: "void",
  },
  {
    id: "INV-1055",
    customerId: "cus_1010",
    issued: "2026-08-11",
    due: "2026-08-25",
    amount: 9900,
    status: "paid",
  },
  {
    id: "INV-1056",
    customerId: "cus_1011",
    issued: "2026-08-12",
    due: "2026-08-26",
    amount: 24900,
    status: "overdue",
  },
  {
    id: "INV-1057",
    customerId: "cus_1012",
    issued: "2026-08-14",
    due: "2026-08-28",
    amount: 2900,
    status: "paid",
  },
  {
    id: "INV-1058",
    customerId: "cus_1001",
    issued: "2026-09-01",
    due: "2026-09-15",
    amount: 9900,
    status: "open",
  },
  {
    id: "INV-1059",
    customerId: "cus_1002",
    issued: "2026-09-01",
    due: "2026-09-15",
    amount: 24900,
    status: "open",
  },
];

export type Payment = {
  id: string;
  invoiceId: string;
  date: string;
  amount: number;
  status: "succeeded" | "failed" | "refunded";
};

export const payments: Payment[] = [
  {
    id: "PAY-7821",
    invoiceId: "INV-1048",
    date: "2026-08-01",
    amount: 9900,
    status: "succeeded",
  },
  {
    id: "PAY-7822",
    invoiceId: "INV-1049",
    date: "2026-08-02",
    amount: 24900,
    status: "succeeded",
  },
  {
    id: "PAY-7823",
    invoiceId: "INV-1050",
    date: "2026-08-17",
    amount: 9900,
    status: "failed",
  },
  {
    id: "PAY-7824",
    invoiceId: "INV-1051",
    date: "2026-08-05",
    amount: 9900,
    status: "succeeded",
  },
  {
    id: "PAY-7825",
    invoiceId: "INV-1052",
    date: "2026-08-07",
    amount: 2900,
    status: "succeeded",
  },
  {
    id: "PAY-7826",
    invoiceId: "INV-1053",
    date: "2026-08-08",
    amount: 24900,
    status: "succeeded",
  },
  {
    id: "PAY-7827",
    invoiceId: "INV-1055",
    date: "2026-08-11",
    amount: 9900,
    status: "succeeded",
  },
  {
    id: "PAY-7828",
    invoiceId: "INV-1056",
    date: "2026-08-26",
    amount: 24900,
    status: "failed",
  },
  {
    id: "PAY-7829",
    invoiceId: "INV-1057",
    date: "2026-08-14",
    amount: 2900,
    status: "succeeded",
  },
];

export const customerById = (id: string) =>
  customers.find((customer) => customer.id === id);
export const invoiceById = (id: string) =>
  invoices.find((invoice) => invoice.id === id);
export const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );
export const date = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
export const monthlyRevenue = customers
  .filter((customer) => customer.subscription === "active")
  .reduce((sum, customer) => sum + plans[customer.plan], 0);
export const collectedAugust = invoices
  .filter(
    (invoice) =>
      invoice.issued.startsWith("2026-08") && invoice.status === "paid",
  )
  .reduce((sum, invoice) => sum + invoice.amount, 0);

export type Query = {
  q?: string | string[];
  status?: string | string[];
  page?: string | string[];
};
export function filterRows<T>(
  rows: T[],
  query: Query,
  text: (row: T) => string,
  status: (row: T) => string,
) {
  const q = typeof query.q === "string" ? query.q.trim().slice(0, 100) : "";
  const selected = typeof query.status === "string" ? query.status : "all";
  const requested =
    typeof query.page === "string" && /^\d{1,5}$/.test(query.page)
      ? Number(query.page)
      : 1;
  const filtered = rows.filter(
    (row) =>
      text(row).toLowerCase().includes(q.toLowerCase()) &&
      (selected === "all" || status(row) === selected),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 8));
  const page = Math.min(Math.max(1, requested), pages);
  return {
    rows: filtered.slice((page - 1) * 8, page * 8),
    count: filtered.length,
    page,
    pages,
    q,
    selected,
  };
}
