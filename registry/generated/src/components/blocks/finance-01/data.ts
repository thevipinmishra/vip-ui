export interface Account {
  id: string;
  name: string;
  kind: string;
  mask: string;
  balance: number;
  trend: number;
  icon: "checking" | "savings" | "investment" | "credit";
}

export const accounts: Account[] = [
  {
    id: "everyday",
    name: "Everyday",
    kind: "Checking",
    mask: "4821",
    balance: 31_910.2,
    trend: 2.8,
    icon: "checking",
  },
  {
    id: "reserve",
    name: "Reserve",
    kind: "High-yield savings",
    mask: "9014",
    balance: 54_400,
    trend: 4.1,
    icon: "savings",
  },
  {
    id: "growth",
    name: "Growth",
    kind: "Brokerage",
    mask: "7730",
    balance: 43_120.35,
    trend: 6.7,
    icon: "investment",
  },
  {
    id: "travel-card",
    name: "Travel card",
    kind: "Credit",
    mask: "1182",
    balance: -1_000,
    trend: -1.2,
    icon: "credit",
  },
];

export const balanceHistory = [
  { date: "Aug 24", daysAgo: 92, balance: 116_100 },
  { date: "Sep 7", daysAgo: 78, balance: 118_200 },
  { date: "Sep 21", daysAgo: 64, balance: 117_600 },
  { date: "Oct 5", daysAgo: 50, balance: 121_800 },
  { date: "Oct 24", daysAgo: 31, balance: 124_150.35 },
  { date: "Oct 31", daysAgo: 24, balance: 125_020.15 },
  { date: "Nov 7", daysAgo: 17, balance: 124_690.19 },
  { date: "Nov 14", daysAgo: 10, balance: 126_050.72 },
  { date: "Nov 21", daysAgo: 3, balance: 127_388.25 },
];

export type Category =
  | "Income"
  | "Housing"
  | "Groceries"
  | "Transport"
  | "Dining"
  | "Shopping"
  | "Subscriptions"
  | "Health"
  | "Transfer";

export interface Transaction {
  id: string;
  merchant: string;
  detail: string;
  category: Category;
  date: string;
  amount: number;
  account: string;
  icon:
    | "salary"
    | "home"
    | "cart"
    | "train"
    | "coffee"
    | "play"
    | "heart"
    | "refund"
    | "book"
    | "transfer";
}

export const transactions: Transaction[] = [
  {
    id: "tx-1",
    merchant: "Northwind Studio",
    detail: "November payroll",
    category: "Income",
    date: "Nov 22",
    amount: 6_840,
    account: "Everyday",
    icon: "salary",
  },
  {
    id: "tx-2",
    merchant: "Fable Coffee",
    detail: "Card ending 4821",
    category: "Dining",
    date: "Nov 22",
    amount: -8.4,
    account: "Everyday",
    icon: "coffee",
  },
  {
    id: "tx-3",
    merchant: "Whole Foods",
    detail: "Weekly groceries",
    category: "Groceries",
    date: "Nov 21",
    amount: -126.32,
    account: "Travel card",
    icon: "cart",
  },
  {
    id: "tx-4",
    merchant: "Morrow Rent",
    detail: "Apartment 4B",
    category: "Housing",
    date: "Nov 20",
    amount: -2_150,
    account: "Everyday",
    icon: "home",
  },
  {
    id: "tx-5",
    merchant: "City Transit",
    detail: "Monthly pass",
    category: "Transport",
    date: "Nov 19",
    amount: -84,
    account: "Travel card",
    icon: "train",
  },
  {
    id: "tx-6",
    merchant: "Kindred Health",
    detail: "Annual check-up",
    category: "Health",
    date: "Nov 18",
    amount: -140,
    account: "Everyday",
    icon: "heart",
  },
  {
    id: "tx-7",
    merchant: "Aperture",
    detail: "Photography plan",
    category: "Subscriptions",
    date: "Nov 17",
    amount: -24,
    account: "Travel card",
    icon: "play",
  },
  {
    id: "tx-8",
    merchant: "Readwell Books",
    detail: "Two paperbacks",
    category: "Shopping",
    date: "Nov 16",
    amount: -38.6,
    account: "Everyday",
    icon: "book",
  },
  {
    id: "tx-9",
    merchant: "Grove Market",
    detail: "Refund for returned item",
    category: "Groceries",
    date: "Nov 15",
    amount: 42.18,
    account: "Travel card",
    icon: "refund",
  },
];

export interface SpendingCategory {
  name: Exclude<Category, "Income" | "Transfer">;
  amount: number;
  budget: number;
  tone: string;
  icon: "home" | "cart" | "train" | "coffee" | "play" | "heart";
}

export const spending: SpendingCategory[] = [
  {
    name: "Housing",
    amount: 2_150,
    budget: 2_150,
    tone: "var(--chart-1)",
    icon: "home",
  },
  {
    name: "Groceries",
    amount: 684,
    budget: 760,
    tone: "var(--chart-2)",
    icon: "cart",
  },
  {
    name: "Transport",
    amount: 312,
    budget: 360,
    tone: "var(--chart-3)",
    icon: "train",
  },
  {
    name: "Dining",
    amount: 268,
    budget: 420,
    tone: "var(--chart-4)",
    icon: "coffee",
  },
  {
    name: "Subscriptions",
    amount: 96,
    budget: 140,
    tone: "var(--chart-5)",
    icon: "play",
  },
  {
    name: "Health",
    amount: 140,
    budget: 200,
    tone: "var(--chart-6)",
    icon: "heart",
  },
];

export const spendingTotal = spending.reduce(
  (sum, category) => sum + category.amount,
  0,
);
export const budgetTotal = spending.reduce(
  (sum, category) => sum + category.budget,
  0,
);

export const upcomingBills = [
  { id: "rent", name: "Morrow Rent", due: "Nov 28", amount: 2_150 },
  { id: "internet", name: "Fieldline Fiber", due: "Dec 1", amount: 65 },
  { id: "gym", name: "Soma Club", due: "Dec 3", amount: 42 },
  { id: "insurance", name: "Harbor Insurance", due: "Dec 5", amount: 128 },
];

export const savingsGoal = {
  name: "Emergency fund",
  saved: 18_400,
  target: 24_000,
  monthly: 600,
};

export const categoryOptions = [
  { id: "all", name: "All categories" },
  { id: "Income", name: "Income" },
  { id: "Housing", name: "Housing" },
  { id: "Groceries", name: "Groceries" },
  { id: "Transport", name: "Transport" },
  { id: "Dining", name: "Dining" },
  { id: "Shopping", name: "Shopping" },
  { id: "Subscriptions", name: "Subscriptions" },
  { id: "Health", name: "Health" },
  { id: "Transfer", name: "Transfers" },
];

export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function formatSigned(value: number) {
  return `${value > 0 ? "+" : ""}${money.format(value)}`;
}
