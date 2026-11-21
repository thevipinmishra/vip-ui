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
  shippedAfter?: number;
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

function random(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

const firstNames = [
  "Olivia",
  "Jackson",
  "Priya",
  "Noah",
  "Sofia",
  "Ethan",
  "Amara",
  "Lucas",
  "Mei",
  "Daniel",
  "Chloe",
  "Mateo",
  "Hannah",
  "Omar",
  "Grace",
  "Leo",
  "Isabel",
  "Kenji",
  "Nora",
  "Samuel",
  "Aaliyah",
  "Felix",
  "Zoe",
  "Ravi",
  "Elena",
  "Jonah",
  "Ines",
  "Marcus",
  "Tara",
  "Diego",
  "Freya",
  "Caleb",
];

const lastNames = [
  "Martin",
  "Lee",
  "Shah",
  "Williams",
  "Rossi",
  "Brown",
  "Okafor",
  "Silva",
  "Tanaka",
  "Kim",
  "Dubois",
  "Garcia",
  "Becker",
  "Haddad",
  "Nguyen",
  "Walsh",
  "Moreno",
  "Ito",
  "Patel",
  "Clarke",
  "Johnson",
  "Lindqvist",
  "Reyes",
  "Kapoor",
];

const mailHosts = [
  "gmail.com",
  "gmail.com",
  "gmail.com",
  "icloud.com",
  "outlook.com",
  "fastmail.com",
  "proton.me",
  "hey.com",
];

const addresses = [
  ["1847 SE Clinton Street", "Portland, OR 97202"],
  ["88 Marigold Lane", "Austin, TX 78704"],
  ["1420 Pine Street", "San Francisco, CA 94109"],
  ["3010 NE Alberta Court", "Portland, OR 97211"],
  ["424 Valencia Street", "San Francisco, CA 94103"],
  ["77 Bedford Avenue", "Brooklyn, NY 11211"],
  ["2215 N Damen Avenue", "Chicago, IL 60647"],
  ["915 E Pike Street", "Seattle, WA 98122"],
  ["58 Elm Street", "Burlington, VT 05401"],
  ["1603 S Congress Avenue", "Austin, TX 78704"],
  ["240 W 15th Street", "New York, NY 10011"],
  ["3318 Fremont Avenue N", "Seattle, WA 98103"],
  ["12 Beacon Street", "Boston, MA 02108"],
  ["4120 Main Street", "Kansas City, MO 64111"],
  ["815 Peachtree Street NE", "Atlanta, GA 30308"],
  ["2901 Larimer Street", "Denver, CO 80205"],
];

const catalog = Object.values(products);
const weights = [9, 14, 6, 7, 6, 8, 16, 7, 3, 9, 7, 5];

interface Customer {
  name: string;
  email: string;
  shipTo: string[];
}

const customers: Customer[] = (() => {
  const next = random(41);
  return Array.from({ length: 140 }, (_, index) => {
    const first = firstNames[index % firstNames.length];
    const last =
      lastNames[(index * 7 + Math.floor(next() * 5)) % lastNames.length];
    const host = mailHosts[Math.floor(next() * mailHosts.length)];
    const handle =
      next() < 0.5
        ? `${first}.${last}`
        : `${first}${last.slice(0, 1)}${Math.floor(next() * 90 + 10)}`;
    const address = addresses[Math.floor(next() * addresses.length)];
    return {
      name: `${first} ${last}`,
      email: `${handle.toLowerCase()}@${host}`,
      shipTo: [...address, "United States"],
    };
  });
})();

function pickProduct(next: () => number) {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let roll = next() * total;
  for (const [index, weight] of weights.entries()) {
    roll -= weight;
    if (roll <= 0) return catalog[index];
  }
  return catalog[0];
}

const hourMs = 3_600_000;
const dayMs = 24 * hourMs;
const firstDay = Date.UTC(2026, 7, 1);
const lastDay = Date.UTC(2026, 9, 30);
export const cutoff = Date.UTC(2026, 9, 30, 11, 0);
export const promoCode = "HARVEST15";

function fulfillmentFor(
  next: () => number,
  ageHours: number,
): FulfillmentStatus {
  const roll = next();
  if (ageHours < 20) return roll < 0.72 ? "unfulfilled" : "processing";
  if (ageHours < 48) {
    if (roll < 0.12) return "unfulfilled";
    return roll < 0.55 ? "processing" : "shipped";
  }
  if (ageHours < 120) return roll < 0.04 ? "processing" : "shipped";
  if (ageHours < 192) return roll < 0.45 ? "shipped" : "delivered";
  return roll < 0.01 ? "shipped" : "delivered";
}

export const orders: Order[] = (() => {
  const next = random(77);
  const list: Omit<Order, "id">[] = [];
  for (let day = firstDay; day <= lastDay; day += dayMs) {
    const date = new Date(day);
    const weekday = date.getUTCDay();
    const index = (day - firstDay) / dayMs;
    const weekend = weekday === 0 || weekday === 6 ? 1.3 : 1;
    const promo = day >= Date.UTC(2026, 9, 9) && day <= Date.UTC(2026, 9, 12);
    const count = Math.round(
      (5.2 + index * 0.028) *
        weekend *
        (promo ? 1.7 : 1) *
        (0.75 + next() * 0.5),
    );
    for (let item = 0; item < count; item += 1) {
      const hour = 7 + next() * 15;
      const placed = day + hour * hourMs;
      if (placed > cutoff) continue;
      const customer = customers[Math.floor(next() ** 1.4 * customers.length)];
      const channelRoll = next();
      const channel: Channel =
        channelRoll < 0.68
          ? "Online store"
          : channelRoll < 0.88
            ? "Marketplace"
            : "Retail";
      const lineCount = next() < 0.55 ? 1 : next() < 0.75 ? 2 : 3;
      const lines: OrderLine[] = [];
      for (let entry = 0; entry < lineCount; entry += 1) {
        const product = pickProduct(next);
        const existing = lines.find((line) => line.sku === product.sku);
        if (existing) existing.quantity += 1;
        else lines.push({ ...product, quantity: next() < 0.82 ? 1 : 2 });
      }
      const subtotal = lines.reduce(
        (sum, line) => sum + line.price * line.quantity,
        0,
      );
      const ageHours = (cutoff - placed) / hourMs;
      const paymentRoll = next();
      let payment: PaymentStatus = "paid";
      if (channel === "Marketplace" && ageHours < 30 && paymentRoll < 0.35) {
        payment = "pending";
      } else if (paymentRoll < 0.012) {
        payment = "failed";
      } else if (ageHours > 96 && paymentRoll > 0.975) {
        payment = "refunded";
      }
      const fulfillment: FulfillmentStatus =
        channel === "Retail"
          ? "delivered"
          : payment === "failed"
            ? "unfulfilled"
            : fulfillmentFor(next, ageHours);
      const shipped = fulfillment === "shipped" || fulfillment === "delivered";
      list.push({
        customer: customer.name,
        email: customer.email,
        placedAt: new Date(Math.round(placed / 60_000) * 60_000).toISOString(),
        channel,
        payment,
        fulfillment,
        lines,
        shipping: channel === "Retail" || subtotal >= 7500 ? 0 : 800,
        discount: promo && next() < 0.6 ? Math.round(subtotal * 0.15) : 0,
        tracking:
          shipped && channel !== "Retail"
            ? `1Z88X40W${Math.floor(next() * 1e10)
                .toString()
                .padStart(10, "0")}`
            : undefined,
        shippedAfter: shipped
          ? Math.round(
              channel === "Retail"
                ? 0
                : 6 + next() ** 2 * 60 + (promo ? 18 : 0),
            )
          : undefined,
        shipTo:
          channel === "Retail"
            ? ["Picked up in store", "412 SW 10th Avenue", "Portland, OR 97205"]
            : customer.shipTo,
      });
    }
  }
  list.sort((a, b) => b.placedAt.localeCompare(a.placedAt));
  return list.map((order, index) => ({
    ...order,
    id: `MF-${1600 + list.length - index}`,
  }));
})();

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
