export type OrderStatus = "paid" | "pending" | "refunded";

export interface Order {
  id: string;
  customer: string;
  email: string;
  status: OrderStatus;
  date: string;
  amount: number;
}

export const metrics = [
  { label: "Revenue", value: "$48,210", change: "+12.4%", trend: "up" },
  { label: "Orders", value: "1,284", change: "+4.1%", trend: "up" },
  { label: "New customers", value: "312", change: "+18", trend: "up" },
  { label: "Refund rate", value: "1.2%", change: "−0.3 pts", trend: "down" },
] as const;

export const revenue = [
  { day: "Sep 1", value: 1.2 },
  { day: "Sep 2", value: 1.6 },
  { day: "Sep 3", value: 1.4 },
  { day: "Sep 4", value: 1.9 },
  { day: "Sep 5", value: 2.3 },
  { day: "Sep 6", value: 1.7 },
  { day: "Sep 7", value: 1.5 },
  { day: "Sep 8", value: 1.8 },
  { day: "Sep 9", value: 2.1 },
  { day: "Sep 10", value: 2.6 },
  { day: "Sep 11", value: 2.4 },
  { day: "Sep 12", value: 2.2 },
  { day: "Sep 13", value: 1.9 },
  { day: "Sep 14", value: 1.6 },
  { day: "Sep 15", value: 2.0 },
  { day: "Sep 16", value: 2.5 },
  { day: "Sep 17", value: 2.8 },
  { day: "Sep 18", value: 2.6 },
  { day: "Sep 19", value: 3.1 },
  { day: "Sep 20", value: 2.7 },
  { day: "Sep 21", value: 2.2 },
  { day: "Sep 22", value: 2.6 },
  { day: "Sep 23", value: 3.0 },
  { day: "Sep 24", value: 3.4 },
  { day: "Sep 25", value: 3.2 },
  { day: "Sep 26", value: 3.6 },
  { day: "Sep 27", value: 3.1 },
  { day: "Sep 28", value: 2.9 },
  { day: "Sep 29", value: 3.5 },
  { day: "Sep 30", value: 3.9 },
];

export const orders: Order[] = [
  {
    id: "#3210",
    customer: "Olivia Martin",
    email: "olivia@lumen.io",
    status: "paid",
    date: "Sep 30",
    amount: 1999,
  },
  {
    id: "#3209",
    customer: "Jackson Lee",
    email: "jackson@finch.dev",
    status: "pending",
    date: "Sep 30",
    amount: 39,
  },
  {
    id: "#3208",
    customer: "Isabella Nguyen",
    email: "isabella@orbit.co",
    status: "paid",
    date: "Sep 29",
    amount: 299,
  },
  {
    id: "#3207",
    customer: "William Kim",
    email: "will@harbor.app",
    status: "refunded",
    date: "Sep 29",
    amount: 99,
  },
  {
    id: "#3206",
    customer: "Sofia Davis",
    email: "sofia@northwind.com",
    status: "paid",
    date: "Sep 28",
    amount: 450,
  },
  {
    id: "#3205",
    customer: "Mateo Rossi",
    email: "mateo@kite.studio",
    status: "pending",
    date: "Sep 28",
    amount: 720,
  },
];

export const activity = [
  { name: "Olivia Martin", action: "paid invoice #3210", time: "2 min ago" },
  { name: "Jackson Lee", action: "started a checkout", time: "18 min ago" },
  { name: "William Kim", action: "got a refund for #3207", time: "1 h ago" },
  { name: "Sofia Davis", action: "upgraded to Business", time: "3 h ago" },
];

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
