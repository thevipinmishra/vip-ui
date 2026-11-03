export type PaymentStatus = "paid" | "pending" | "refunded" | "failed";
export type FulfillmentStatus =
  | "unfulfilled"
  | "processing"
  | "shipped"
  | "delivered";

export interface OrderLine {
  sku: string;
  name: string;
  detail?: string;
  quantity: number;
  price: number;
}

export const order = {
  id: "MF-1070",
  customer: "Isabella Nguyen",
  email: "isabella@orbit.co",
  placedAt: "2026-10-24T10:02:00Z",
  channel: "Online store",
  payment: "paid" as PaymentStatus,
  fulfillment: "delivered" as FulfillmentStatus,
  tracking: "1Z88X40W0391826513",
  shipTo: [
    "Isabella Nguyen",
    "905 NW 23rd Avenue",
    "Portland, OR 97210",
    "United States",
  ],
  lines: [
    {
      sku: "NPK-04",
      name: "Linen napkin set",
      detail: "Set of 4",
      quantity: 2,
      price: 3800,
    },
    {
      sku: "PLM-04",
      name: "Woven placemat",
      detail: "Set of 4",
      quantity: 2,
      price: 3200,
    },
  ] satisfies OrderLine[],
  shipping: 800,
  discount: 1500,
  note: "Please leave the parcel with the concierge. The buzzer is not working.",
  customerSince: "June 2024",
  previousOrders: 3,
  previousSpend: 34165,
  card: { brand: "Visa", last4: "4242", expiry: "08/28" },
  transaction: "pi_3Q8x2K2eZvKYlo2C1pQ7dR4t",
};

export const totals = orderTotals(order);

export function orderTotals(
  value: Pick<typeof order, "lines" | "shipping" | "discount">,
) {
  const subtotal = value.lines.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * 0.0825);
  return {
    subtotal,
    tax,
    total: subtotal - value.discount + value.shipping + tax,
  };
}

export function itemCount(value: Pick<typeof order, "lines">) {
  return value.lines.reduce((sum, item) => sum + item.quantity, 0);
}

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const stampFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

const eventFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

export function formatMoney(cents: number) {
  return money.format(cents / 100);
}

export function formatDate(value: string) {
  return dateFormat.format(new Date(value));
}

export function formatStamp(value: string) {
  return stampFormat.format(new Date(value));
}

export function formatEventTime(value: string) {
  return eventFormat.format(new Date(value));
}

export const refundReasons = [
  { id: "request", name: "Customer request" },
  { id: "damaged", name: "Damaged item" },
  { id: "wrong", name: "Wrong item" },
  { id: "late", name: "Late delivery" },
  { id: "other", name: "Other" },
];

export function refundReasonLabel(id: string) {
  return refundReasons.find((reason) => reason.id === id)?.name ?? "Other";
}

export const timeline = [
  {
    id: "placed",
    title: "Order placed",
    dateTime: "2026-10-24T10:02:00Z",
  },
  {
    id: "paid",
    title: "Payment confirmed",
    dateTime: "2026-10-24T10:03:00Z",
    description: formatMoney(totals.total),
  },
  {
    id: "packed",
    title: "Packed",
    dateTime: "2026-10-24T15:40:00Z",
    description: "Packed at the Portland warehouse.",
  },
  {
    id: "shipped",
    title: "Shipped",
    dateTime: "2026-10-25T09:12:00Z",
    description: "UPS Ground",
  },
  {
    id: "delivered",
    title: "Delivered",
    dateTime: "2026-10-27T14:26:00Z",
    description: "Left with the concierge.",
  },
];
