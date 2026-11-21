export type OrderStatus = "delivered" | "shipped" | "refunded" | "partial";
export type ActivityKind =
  | "note"
  | "order"
  | "refund"
  | "subscription"
  | "account"
  | "email";

export interface CustomerOrder {
  id: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
}

export interface Activity {
  id: string;
  kind: ActivityKind;
  text: string;
  author?: string;
  at: string;
}

export interface Subscription {
  product: string;
  plan: string;
  price: number;
  everyDays: number;
  status: "active" | "paused";
  next: string;
}

export interface Customer {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  location: string;
  since: string;
  tags: string[];
  emailOptIn: boolean;
  smsOptIn: boolean;
  ordersCount: number;
  spent: number;
  subscription?: Subscription;
  orders: CustomerOrder[];
  activity: Activity[];
}

export const store = { name: "Northfield Coffee", agent: "Leo Park" };
export const today = "2026-10-28";

export const tagSuggestions = [
  "VIP",
  "Whole bean",
  "Ground",
  "Wholesale",
  "Net 30",
  "Gift buyer",
  "Decaf",
];

export const customers: Customer[] = [
  {
    id: "cus_8F2K41",
    name: "Amara Osei",
    email: "amara.osei@fastmail.com",
    phone: "+1 (503) 555-0148",
    location: "Portland, OR",
    since: "2024-03-14",
    tags: ["VIP", "Whole bean"],
    emailOptIn: true,
    smsOptIn: false,
    ordersCount: 23,
    spent: 128460,
    subscription: {
      product: "Kitale AA, whole bean",
      plan: "2 bags every 2 weeks",
      price: 4800,
      everyDays: 14,
      status: "active",
      next: "2026-11-04",
    },
    orders: [
      {
        id: "NF-4821",
        date: "2026-10-21",
        items: 2,
        total: 4800,
        status: "delivered",
      },
      {
        id: "NF-4690",
        date: "2026-10-07",
        items: 2,
        total: 4800,
        status: "delivered",
      },
      {
        id: "NF-4633",
        date: "2026-09-30",
        items: 3,
        total: 7250,
        status: "delivered",
      },
      {
        id: "NF-4555",
        date: "2026-09-23",
        items: 2,
        total: 4800,
        status: "partial",
      },
      {
        id: "NF-4410",
        date: "2026-09-09",
        items: 2,
        total: 4800,
        status: "delivered",
      },
    ],
    activity: [
      {
        id: "a1",
        kind: "order",
        text: "Placed order NF-4821 from the subscription.",
        at: "2026-10-21T09:02:00",
      },
      {
        id: "a2",
        kind: "note",
        text: "Asked for whole bean from now on. I changed the subscription.",
        author: "Leo Park",
        at: "2026-10-02T15:40:00",
      },
      {
        id: "a3",
        kind: "refund",
        text: "Refunded $12.00 on NF-4555. One bag arrived torn.",
        author: "Leo Park",
        at: "2026-09-25T11:18:00",
      },
      {
        id: "a4",
        kind: "account",
        text: "Created an account.",
        at: "2024-03-14T19:26:00",
      },
    ],
  },
  {
    id: "cus_3TQ907",
    name: "Daniel Reyes",
    company: "Corner Room Café",
    email: "daniel@cornerroom.cafe",
    phone: "+1 (206) 555-0192",
    location: "Seattle, WA",
    since: "2023-06-02",
    tags: ["Wholesale", "Net 30"],
    emailOptIn: true,
    smsOptIn: true,
    ordersCount: 61,
    spent: 1439600,
    subscription: {
      product: "House espresso, 5 lb",
      plan: "4 bags every week",
      price: 23600,
      everyDays: 7,
      status: "paused",
      next: "2026-11-11",
    },
    orders: [
      {
        id: "NF-4790",
        date: "2026-10-14",
        items: 4,
        total: 23600,
        status: "delivered",
      },
      {
        id: "NF-4712",
        date: "2026-10-07",
        items: 4,
        total: 23600,
        status: "delivered",
      },
      {
        id: "NF-4650",
        date: "2026-09-30",
        items: 4,
        total: 23600,
        status: "delivered",
      },
      {
        id: "NF-4588",
        date: "2026-09-23",
        items: 4,
        total: 23600,
        status: "delivered",
      },
      {
        id: "NF-4499",
        date: "2026-09-16",
        items: 4,
        total: 23600,
        status: "delivered",
      },
    ],
    activity: [
      {
        id: "b1",
        kind: "subscription",
        text: "Paused the subscription until Nov 11. The café is closed for repairs.",
        author: "Leo Park",
        at: "2026-10-15T10:05:00",
      },
      {
        id: "b2",
        kind: "order",
        text: "Placed order NF-4790 from the subscription.",
        at: "2026-10-14T06:30:00",
      },
      {
        id: "b3",
        kind: "note",
        text: "Invoices go to accounts@cornerroom.cafe. Terms are net 30.",
        author: "Leo Park",
        at: "2025-01-08T13:12:00",
      },
      {
        id: "b4",
        kind: "account",
        text: "Created an account.",
        at: "2023-06-02T08:47:00",
      },
    ],
  },
  {
    id: "cus_9WD215",
    name: "Hana Sato",
    email: "hana.sato@proton.me",
    phone: "",
    location: "Austin, TX",
    since: "2026-10-26",
    tags: [],
    emailOptIn: true,
    smsOptIn: false,
    ordersCount: 0,
    spent: 0,
    orders: [],
    activity: [
      {
        id: "c1",
        kind: "account",
        text: "Created an account.",
        at: "2026-10-26T21:14:00",
      },
    ],
  },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatMoney(cents: number) {
  return money.format(cents / 100);
}

const day = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const stamp = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

export function formatDay(value: string) {
  return day.format(new Date(`${value.slice(0, 10)}T00:00:00Z`));
}

const shortDay = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatShortDay(value: string) {
  return shortDay.format(new Date(`${value}T00:00:00Z`));
}

export function formatStamp(value: string) {
  return stamp.format(new Date(`${value}Z`));
}

export function addDays(value: string, days: number) {
  const date = new Date(`${value}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function nowStamp() {
  return `${today}T14:32:00`;
}
