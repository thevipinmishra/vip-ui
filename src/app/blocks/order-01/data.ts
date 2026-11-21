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
  id: "MF-2224",
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
    {
      sku: "CND-08",
      name: "Cedar candle",
      detail: "8 oz",
      quantity: 1,
      price: 2400,
    },
    {
      sku: "SPN-01",
      name: "Olive wood spoon set",
      quantity: 1,
      price: 2800,
    },
  ] satisfies OrderLine[],
  shipping: 0,
  discount: 1500,
  discountCode: "THANKYOU15",
  note: "Please leave the parcel with the concierge. The buzzer is not working.",
  customerSince: "December 2025",
  card: { brand: "Visa", last4: "4242", expiry: "08/28" },
  transaction: "pi_3Q8x2K2eZvKYlo2C1pQ7dR4t",
};

export const totals = orderTotals(order);

export const previousOrders = [
  {
    id: "MF-2088",
    placedAt: "2026-10-08T18:21:00Z",
    items: 2,
    total: 8640,
  },
  {
    id: "MF-1731",
    placedAt: "2026-08-14T12:47:00Z",
    items: 3,
    total: 12125,
  },
  {
    id: "MF-0614",
    placedAt: "2025-12-02T20:05:00Z",
    items: 2,
    total: 13400,
  },
];

export const previousSpend = previousOrders.reduce(
  (sum, item) => sum + item.total,
  0,
);

export const customerTags = ["Repeat buyer", "Newsletter", "Portland"];

export const riskChecks = [
  { id: "cvc", label: "Card security code matched" },
  { id: "zip", label: "Billing ZIP code matched" },
  { id: "ip", label: "IP address in Portland, OR, 3 km from the address" },
  { id: "card", label: "Card used on 3 earlier orders" },
];

export const conversion = [
  { term: "First visit", detail: "Oct 22 from Instagram" },
  { term: "Sessions", detail: "4 over 2 days" },
  { term: "Landing page", detail: "/collections/table-linen" },
  { term: "Device", detail: "iPhone · Safari" },
];

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

const shortFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatShortDate(value: string) {
  return shortFormat.format(new Date(value));
}

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
    kind: "placed",
    title: "Order placed",
    dateTime: "2026-10-24T10:02:00Z",
    description: "Online store checkout on iPhone.",
  },
  {
    id: "paid",
    kind: "paid",
    title: "Payment captured",
    dateTime: "2026-10-24T10:03:00Z",
    description: `${formatMoney(totals.total)} on Visa ending in 4242.`,
  },
  {
    id: "email",
    kind: "email",
    title: "Confirmation email sent",
    dateTime: "2026-10-24T10:03:00Z",
    description: "Sent to isabella@orbit.co.",
  },
  {
    id: "packed",
    kind: "packed",
    title: "Packed by Ana Souza",
    dateTime: "2026-10-24T15:40:00Z",
    description: "Portland warehouse, bin C-14. Weight 2.6 lb.",
  },
  {
    id: "label",
    kind: "label",
    title: "Shipping label bought",
    dateTime: "2026-10-24T15:44:00Z",
    description: "UPS Ground, $9.18. Free shipping for the customer.",
  },
  {
    id: "shipped",
    kind: "shipped",
    title: "Picked up by UPS",
    dateTime: "2026-10-25T09:12:00Z",
  },
  {
    id: "transit",
    kind: "transit",
    title: "Out for delivery",
    dateTime: "2026-10-27T08:05:00Z",
  },
  {
    id: "delivered",
    kind: "delivered",
    title: "Delivered",
    dateTime: "2026-10-27T14:26:00Z",
    description: "Left with the concierge.",
  },
];
