export type PaymentStatus = "paid" | "pending" | "refunded" | "failed";
export type FulfillmentStatus =
  | "unfulfilled"
  | "processing"
  | "shipped"
  | "delivered";
export type Channel = "Online store" | "Marketplace" | "Retail";

export interface Product {
  sku: string;
  name: string;
  detail?: string;
  price: number;
}

export interface OrderLine extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  placedAt: string;
  channel: Channel;
  payment: PaymentStatus;
  fulfillment: FulfillmentStatus;
  lines: OrderLine[];
  shipping: number;
  discount: number;
  tracking?: string;
  shipTo: string[];
}

const products = {
  apron: { sku: "APP-01", name: "Linen apron", detail: "Sand", price: 4800 },
  mug: {
    sku: "MUG-02",
    name: "Stoneware mug",
    detail: "Set of 2",
    price: 3600,
  },
  board: { sku: "BRD-01", name: "Walnut serving board", price: 7200 },
  runner: {
    sku: "RUN-01",
    name: "Cotton table runner",
    detail: "Oat",
    price: 3400,
  },
  carafe: { sku: "CAR-01", name: "Glass carafe", detail: "1 L", price: 4200 },
  spoons: { sku: "SPN-01", name: "Olive wood spoon set", price: 2800 },
  candle: { sku: "CND-08", name: "Cedar candle", detail: "8 oz", price: 2400 },
  placemat: {
    sku: "PLM-04",
    name: "Woven placemat",
    detail: "Set of 4",
    price: 3200,
  },
  cups: { sku: "CUP-01", name: "Copper measuring cups", price: 5800 },
  tin: { sku: "TIN-01", name: "Enamel storage tin", price: 2200 },
  napkin: {
    sku: "NPK-04",
    name: "Linen napkin set",
    detail: "Set of 4",
    price: 3800,
  },
  cellar: { sku: "SAL-02", name: "Beechwood salt cellars", price: 2600 },
} satisfies Record<string, Product>;

function line(product: Product, quantity: number): OrderLine {
  return { ...product, quantity };
}

export const orders: Order[] = [
  {
    id: "MF-1084",
    customer: "Olivia Martin",
    email: "olivia.martin@gmail.com",
    placedAt: "2026-10-30T09:42:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "unfulfilled",
    lines: [line(products.apron, 1), line(products.candle, 2)],
    shipping: 800,
    discount: 0,
    shipTo: ["1847 SE Clinton Street", "Portland, OR 97202", "United States"],
  },
  {
    id: "MF-1083",
    customer: "Jackson Lee",
    email: "jackson@finch.dev",
    placedAt: "2026-10-30T08:15:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "processing",
    lines: [line(products.mug, 1), line(products.spoons, 2)],
    shipping: 800,
    discount: 0,
    shipTo: ["88 Marigold Lane", "Austin, TX 78704", "United States"],
  },
  {
    id: "MF-1082",
    customer: "Priya Shah",
    email: "priya@northwind.com",
    placedAt: "2026-10-29T18:03:00Z",
    channel: "Marketplace",
    payment: "pending",
    fulfillment: "unfulfilled",
    lines: [line(products.board, 1)],
    shipping: 1200,
    discount: 0,
    shipTo: ["1420 Pine Street", "San Francisco, CA 94109", "United States"],
  },
  {
    id: "MF-1081",
    customer: "Noah Williams",
    email: "noah.w@harbor.app",
    placedAt: "2026-10-29T14:27:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "shipped",
    lines: [line(products.placemat, 2), line(products.napkin, 1)],
    shipping: 800,
    discount: 0,
    tracking: "1Z88X40W0391827465",
    shipTo: ["3010 NE Alberta Court", "Portland, OR 97211", "United States"],
  },
  {
    id: "MF-1080",
    customer: "Sofia Rossi",
    email: "sofia@kite.studio",
    placedAt: "2026-10-29T11:10:00Z",
    channel: "Retail",
    payment: "paid",
    fulfillment: "delivered",
    lines: [line(products.carafe, 2)],
    shipping: 0,
    discount: 0,
    shipTo: ["424 Valencia Street", "San Francisco, CA 94103", "United States"],
  },
  {
    id: "MF-1079",
    customer: "Ethan Brown",
    email: "ethan.brown@outlook.com",
    placedAt: "2026-10-28T16:45:00Z",
    channel: "Online store",
    payment: "refunded",
    fulfillment: "delivered",
    lines: [line(products.board, 1), line(products.tin, 2)],
    shipping: 800,
    discount: 0,
    shipTo: ["715 Willow Avenue", "Chicago, IL 60614", "United States"],
  },
  {
    id: "MF-1078",
    customer: "Amara Okafor",
    email: "amara@fieldnotes.co",
    placedAt: "2026-10-28T10:22:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "shipped",
    lines: [line(products.runner, 2), line(products.candle, 1)],
    shipping: 800,
    discount: 0,
    tracking: "1Z88X40W0391827190",
    shipTo: ["14 Rosebery Road", "London N16 6TS", "United Kingdom"],
  },
  {
    id: "MF-1077",
    customer: "Lucas Meyer",
    email: "lucas@marlowmail.com",
    placedAt: "2026-10-27T19:36:00Z",
    channel: "Marketplace",
    payment: "failed",
    fulfillment: "unfulfilled",
    lines: [line(products.cups, 1)],
    shipping: 1200,
    discount: 0,
    shipTo: ["Torstraße 148", "10119 Berlin", "Germany"],
  },
  {
    id: "MF-1076",
    customer: "Hana Sato",
    email: "hana@stillform.com",
    placedAt: "2026-10-27T15:08:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "delivered",
    lines: [line(products.mug, 2), line(products.cellar, 1)],
    shipping: 800,
    discount: 0,
    shipTo: ["2-8-1 Jingumae", "Shibuya, Tokyo 150-0001", "Japan"],
  },
  {
    id: "MF-1075",
    customer: "Mateo Rossi",
    email: "mateo@kite.studio",
    placedAt: "2026-10-26T12:54:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "shipped",
    lines: [line(products.apron, 2)],
    shipping: 800,
    discount: 0,
    tracking: "1Z88X40W0391827024",
    shipTo: ["620 Ashbury Street", "San Francisco, CA 94117", "United States"],
  },
  {
    id: "MF-1074",
    customer: "Zara Ahmed",
    email: "zara@northwind.com",
    placedAt: "2026-10-26T09:31:00Z",
    channel: "Retail",
    payment: "paid",
    fulfillment: "delivered",
    lines: [line(products.runner, 1), line(products.placemat, 1)],
    shipping: 0,
    discount: 0,
    shipTo: ["1220 Madison Avenue", "New York, NY 10128", "United States"],
  },
  {
    id: "MF-1073",
    customer: "Liam O'Connor",
    email: "liam@harbor.app",
    placedAt: "2026-10-25T17:19:00Z",
    channel: "Online store",
    payment: "pending",
    fulfillment: "processing",
    lines: [line(products.board, 1), line(products.candle, 2)],
    shipping: 800,
    discount: 0,
    shipTo: ["18 Wellington Quay", "Dublin D02 YX92", "Ireland"],
  },
  {
    id: "MF-1072",
    customer: "Emma Dubois",
    email: "emma@atelierdubois.fr",
    placedAt: "2026-10-25T13:05:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "delivered",
    lines: [
      line(products.carafe, 1),
      line(products.spoons, 1),
      line(products.tin, 1),
    ],
    shipping: 1600,
    discount: 0,
    shipTo: ["27 Rue de Charonne", "75011 Paris", "France"],
  },
  {
    id: "MF-1071",
    customer: "Oliver Smith",
    email: "oliver@finch.dev",
    placedAt: "2026-10-24T16:40:00Z",
    channel: "Marketplace",
    payment: "refunded",
    fulfillment: "unfulfilled",
    lines: [line(products.mug, 1)],
    shipping: 1200,
    discount: 0,
    shipTo: ["74 Grove Street", "Brooklyn, NY 11221", "United States"],
  },
  {
    id: "MF-1070",
    customer: "Isabella Nguyen",
    email: "isabella@orbit.co",
    placedAt: "2026-10-24T10:02:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "delivered",
    lines: [line(products.napkin, 2), line(products.placemat, 2)],
    shipping: 800,
    discount: 1500,
    shipTo: ["905 NW 23rd Avenue", "Portland, OR 97210", "United States"],
  },
  {
    id: "MF-1069",
    customer: "William Kim",
    email: "will@harbor.app",
    placedAt: "2026-10-23T18:55:00Z",
    channel: "Online store",
    payment: "refunded",
    fulfillment: "delivered",
    lines: [line(products.cups, 1)],
    shipping: 800,
    discount: 0,
    shipTo: ["4501 Westheimer Road", "Houston, TX 77027", "United States"],
  },
  {
    id: "MF-1068",
    customer: "Chloe Martin",
    email: "chloe@marlowmail.com",
    placedAt: "2026-10-23T11:23:00Z",
    channel: "Retail",
    payment: "paid",
    fulfillment: "delivered",
    lines: [line(products.candle, 3), line(products.tin, 1)],
    shipping: 0,
    discount: 0,
    shipTo: ["312 South Congress Avenue", "Austin, TX 78704", "United States"],
  },
  {
    id: "MF-1067",
    customer: "Daniel Garcia",
    email: "daniel.g@outlook.com",
    placedAt: "2026-10-22T15:12:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "shipped",
    lines: [line(products.runner, 1), line(products.apron, 1)],
    shipping: 800,
    discount: 0,
    tracking: "1Z88X40W0391826841",
    shipTo: ["1600 Larimer Street", "Denver, CO 80202", "United States"],
  },
  {
    id: "MF-1066",
    customer: "Aisha Patel",
    email: "aisha@fieldnotes.co",
    placedAt: "2026-10-21T09:47:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "delivered",
    lines: [line(products.cellar, 2), line(products.spoons, 1)],
    shipping: 800,
    discount: 0,
    shipTo: ["611 South 3rd Street", "Philadelphia, PA 19147", "United States"],
  },
  {
    id: "MF-1065",
    customer: "Henry Wilson",
    email: "henry@northwind.com",
    placedAt: "2026-10-20T14:31:00Z",
    channel: "Marketplace",
    payment: "pending",
    fulfillment: "unfulfilled",
    lines: [line(products.board, 1), line(products.cups, 1)],
    shipping: 1200,
    discount: 0,
    shipTo: ["2201 2nd Avenue", "Seattle, WA 98121", "United States"],
  },
  {
    id: "MF-1064",
    customer: "Nora Jensen",
    email: "nora@stillform.com",
    placedAt: "2026-10-19T12:18:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "delivered",
    lines: [line(products.carafe, 3)],
    shipping: 800,
    discount: 0,
    shipTo: ["118 Vesterbrogade", "1620 Copenhagen", "Denmark"],
  },
  {
    id: "MF-1063",
    customer: "Felix Wagner",
    email: "felix@atelierdubois.fr",
    placedAt: "2026-10-18T17:26:00Z",
    channel: "Online store",
    payment: "refunded",
    fulfillment: "delivered",
    lines: [line(products.apron, 1), line(products.runner, 1)],
    shipping: 1600,
    discount: 0,
    shipTo: ["Kastanienallee 22", "10405 Berlin", "Germany"],
  },
  {
    id: "MF-1062",
    customer: "Grace Liu",
    email: "grace@orbit.co",
    placedAt: "2026-10-17T10:41:00Z",
    channel: "Online store",
    payment: "paid",
    fulfillment: "delivered",
    lines: [line(products.mug, 1), line(products.candle, 1)],
    shipping: 800,
    discount: 0,
    shipTo: ["238 Elm Street", "New Haven, CT 06511", "United States"],
  },
  {
    id: "MF-1061",
    customer: "Omar Haddad",
    email: "omar@kite.studio",
    placedAt: "2026-10-16T09:05:00Z",
    channel: "Retail",
    payment: "paid",
    fulfillment: "delivered",
    lines: [line(products.placemat, 2)],
    shipping: 0,
    discount: 0,
    shipTo: ["75 Newbury Street", "Boston, MA 02116", "United States"],
  },
];

export const paymentOptions = [
  { id: "paid", name: "Paid" },
  { id: "pending", name: "Pending" },
  { id: "refunded", name: "Refunded" },
  { id: "failed", name: "Failed" },
];

export const fulfillmentOptions = [
  { id: "unfulfilled", name: "Unfulfilled" },
  { id: "processing", name: "Processing" },
  { id: "shipped", name: "Shipped" },
  { id: "delivered", name: "Delivered" },
];

export function orderTotals(
  order: Pick<Order, "lines" | "shipping" | "discount">,
) {
  const subtotal = order.lines.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * 0.0825);
  return {
    subtotal,
    tax,
    total: subtotal - order.discount + order.shipping + tax,
  };
}

export function itemCount(order: Pick<Order, "lines">) {
  return order.lines.reduce((sum, item) => sum + item.quantity, 0);
}

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

const fullDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatMoney(cents: number) {
  return money.format(cents / 100);
}

export function formatDay(value: string) {
  return dayFormat.format(new Date(value));
}

export function formatTime(value: string) {
  return timeFormat.format(new Date(value));
}

export function formatFullDate(value: string) {
  return fullDateFormat.format(new Date(value));
}
