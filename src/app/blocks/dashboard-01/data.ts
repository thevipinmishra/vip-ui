export type Payment = "paid" | "pending" | "refunded";
export type Fulfillment = "unfulfilled" | "shipped" | "delivered" | "late";

export interface Day {
  date: string;
  label: string;
  sessions: number;
  orders: number;
  sales: number;
  refunds: number;
  returning: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: number;
  channel: string;
  payment: Payment;
  fulfillment: Fulfillment;
  placed: string;
  total: number;
}

export interface Product {
  sku: string;
  name: string;
  variant: string;
  price: number;
  units: number;
  stock: number;
  returns: number;
}

const dayMs = 86_400_000;
const firstDay = Date.UTC(2026, 7, 2);

function random(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

const dayLabel = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export const days: Day[] = (() => {
  const next = random(7);
  return Array.from({ length: 60 }, (_, index) => {
    const date = new Date(firstDay + index * dayMs);
    const weekday = date.getUTCDay();
    const weekend = weekday === 0 || weekday === 6 ? 1.24 : 1;
    const payday = date.getUTCDate() === 1 || date.getUTCDate() === 15;
    const launch = index === 47 || index === 48 ? 1.45 : 1;
    const trend = 36 + index * 0.17;
    const orders = Math.round(
      trend * weekend * launch * (payday ? 1.18 : 1) * (0.9 + next() * 0.2),
    );
    const basket = 64 + next() * 9 + (launch > 1 ? 6 : 0);
    const sales = Math.round(orders * basket);
    const conversion = 0.0238 + index * 0.000_04 + next() * 0.0016;
    return {
      date: date.toISOString().slice(0, 10),
      label: dayLabel.format(date),
      sessions: Math.round(orders / conversion),
      orders,
      sales,
      refunds: Math.round(
        sales * ((index < 30 ? 0.011 : 0.0075) + next() * 0.009),
      ),
      returning: Math.round(orders * (0.29 + next() * 0.06)),
    };
  });
})();

export const current = days.slice(30);
export const previous = days.slice(0, 30);

function total(rows: Day[], key: keyof Omit<Day, "date" | "label">) {
  return rows.reduce((sum, row) => sum + row[key], 0);
}

export function summarize(rows: Day[]) {
  const sales = total(rows, "sales");
  const orders = total(rows, "orders");
  return {
    sales,
    orders,
    aov: sales / orders,
    conversion: orders / total(rows, "sessions"),
    returning: total(rows, "returning") / orders,
    refundRate: total(rows, "refunds") / sales,
  };
}

export const month = summarize(current);
export const lastMonth = summarize(previous);

export const channels = (() => {
  const shares = [
    { name: "Online store", share: 0.574, previous: 0.596 },
    { name: "Marketplace", share: 0.226, previous: 0.197 },
    { name: "Retail", share: 0.131, previous: 0.138 },
    { name: "Wholesale", share: 0.069, previous: 0.069 },
  ];
  let left = month.sales;
  return shares.map((channel, index) => {
    const sales =
      index === shares.length - 1
        ? left
        : Math.round(month.sales * channel.share);
    left -= sales;
    return { ...channel, sales };
  });
})();

export const products: Product[] = [
  {
    sku: "MUG-02",
    name: "Stoneware mug",
    variant: "Set of 2",
    price: 36,
    units: 214,
    stock: 386,
    returns: 0.021,
  },
  {
    sku: "BRD-01",
    name: "Walnut serving board",
    variant: "Large",
    price: 72,
    units: 96,
    stock: 58,
    returns: 0.012,
  },
  {
    sku: "TOT-03",
    name: "Linen tote",
    variant: "Natural",
    price: 34,
    units: 131,
    stock: 4,
    returns: 0.008,
  },
  {
    sku: "APP-01",
    name: "Linen apron",
    variant: "Sand",
    price: 48,
    units: 88,
    stock: 142,
    returns: 0.034,
  },
  {
    sku: "CAR-01",
    name: "Glass carafe",
    variant: "1 L",
    price: 42,
    units: 97,
    stock: 21,
    returns: 0.052,
  },
  {
    sku: "CUP-01",
    name: "Copper measuring cups",
    variant: "Set of 4",
    price: 58,
    units: 61,
    stock: 77,
    returns: 0.016,
  },
  {
    sku: "CND-08",
    name: "Cedar candle",
    variant: "8 oz",
    price: 24,
    units: 142,
    stock: 260,
    returns: 0.007,
  },
  {
    sku: "PLM-04",
    name: "Woven placemat",
    variant: "Set of 4",
    price: 32,
    units: 74,
    stock: 18,
    returns: 0.027,
  },
  {
    sku: "RUN-01",
    name: "Cotton table runner",
    variant: "Oat",
    price: 34,
    units: 63,
    stock: 95,
    returns: 0.032,
  },
  {
    sku: "SPN-01",
    name: "Olive wood spoon set",
    variant: "3 pieces",
    price: 28,
    units: 69,
    stock: 133,
    returns: 0.014,
  },
  {
    sku: "TIN-01",
    name: "Enamel storage tin",
    variant: "Medium",
    price: 22,
    units: 58,
    stock: 204,
    returns: 0.017,
  },
  {
    sku: "BWL-02",
    name: "Ceramic salad bowl",
    variant: "Speckled",
    price: 46,
    units: 39,
    stock: 12,
    returns: 0.051,
  },
];

export const orders: Order[] = [
  {
    id: "#3210",
    customer: "Olivia Martin",
    email: "olivia.martin@fastmail.com",
    items: 3,
    channel: "Online store",
    payment: "paid",
    fulfillment: "unfulfilled",
    placed: "Sep 30, 2:58 PM",
    total: 142,
  },
  {
    id: "#3209",
    customer: "Jackson Lee",
    email: "jackson.lee@gmail.com",
    items: 1,
    channel: "Online store",
    payment: "pending",
    fulfillment: "unfulfilled",
    placed: "Sep 30, 2:41 PM",
    total: 36,
  },
  {
    id: "#3208",
    customer: "Isabella Nguyen",
    email: "isa.nguyen@outlook.com",
    items: 2,
    channel: "Marketplace",
    payment: "paid",
    fulfillment: "unfulfilled",
    placed: "Sep 30, 1:16 PM",
    total: 96,
  },
  {
    id: "#3207",
    customer: "William Kim",
    email: "wkim@proton.me",
    items: 1,
    channel: "Online store",
    payment: "refunded",
    fulfillment: "delivered",
    placed: "Sep 29, 6:02 PM",
    total: 42,
  },
  {
    id: "#3206",
    customer: "Sofia Davis",
    email: "sofia.davis@icloud.com",
    items: 4,
    channel: "Retail",
    payment: "paid",
    fulfillment: "delivered",
    placed: "Sep 29, 11:47 AM",
    total: 168,
  },
  {
    id: "#3205",
    customer: "Mateo Rossi",
    email: "mateo.rossi@gmail.com",
    items: 2,
    channel: "Marketplace",
    payment: "paid",
    fulfillment: "shipped",
    placed: "Sep 28, 9:20 PM",
    total: 70,
  },
  {
    id: "#3204",
    customer: "Hannah Okafor",
    email: "h.okafor@yahoo.com",
    items: 1,
    channel: "Online store",
    payment: "paid",
    fulfillment: "late",
    placed: "Sep 26, 4:35 PM",
    total: 72,
  },
  {
    id: "#3203",
    customer: "Northwind Café",
    email: "orders@northwindcafe.com",
    items: 24,
    channel: "Wholesale",
    payment: "pending",
    fulfillment: "unfulfilled",
    placed: "Sep 26, 10:05 AM",
    total: 1_152,
  },
];

export const fulfillment = {
  toFulfill: 12,
  overdue: 3,
  inTransit: 86,
  late: 1,
  onTime: 0.978,
  target: 0.98,
  hoursToShip: 31,
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const cents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const compact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});
const count = new Intl.NumberFormat("en-US");
const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const rate = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatMoney = (value: number) => money.format(value);
export const formatCents = (value: number) => cents.format(value);
export const formatCompact = (value: number) => compact.format(value);
export const formatCount = (value: number) => count.format(value);
export const formatPercent = (value: number) => percent.format(value);
export const formatRate = (value: number) => rate.format(value);

export function change(value: number, before: number) {
  return Math.round(((value - before) / before) * 1_000) / 10;
}

export function changePoints(value: number, before: number) {
  return Math.round((value - before) * 10_000) / 100;
}
