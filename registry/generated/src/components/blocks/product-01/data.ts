export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
}

export interface SizeOption {
  id: string;
  label: string;
  soldOut?: boolean;
}

export interface CartLine {
  key: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  colorId: string;
  kind: "jacket" | "cap";
}

export const product = {
  name: "Field Jacket",
  line: "Field series",
  price: 24800,
  rating: 4.8,
  reviewCount: 126,
  sku: "BRK-FJ-01",
};

export const colors: ColorVariant[] = [
  { id: "moss", name: "Moss", hex: "#4f5b45" },
  { id: "clay", name: "Clay", hex: "#a05f43" },
  { id: "slate", name: "Slate", hex: "#495a6b" },
  { id: "dune", name: "Dune", hex: "#c6b08a" },
];

export const sizes: SizeOption[] = [
  { id: "xs", label: "XS", soldOut: true },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
  { id: "xxl", label: "XXL" },
];

export const initialCart: CartLine[] = [
  {
    key: "jacket-moss-m",
    name: "Field Jacket",
    subtitle: "Moss · M",
    price: 24800,
    quantity: 1,
    colorId: "moss",
    kind: "jacket",
  },
  {
    key: "cap-moss",
    name: "Field Cap",
    subtitle: "Moss · One size",
    price: 3800,
    quantity: 1,
    colorId: "moss",
    kind: "cap",
  },
];

export const TAX_RATE = 0.0825;
export const FREE_SHIPPING = 15000;

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function cartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  const shipping = subtotal >= FREE_SHIPPING || subtotal === 0 ? 0 : 900;
  const tax = Math.round(subtotal * TAX_RATE);
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export const reviews = [
  {
    id: "elena",
    name: "Elena Vasquez",
    location: "Bend, OR",
    rating: 5,
    date: "2026-10-18",
    title: "Warm without the bulk",
    body: "Warm on cold mornings in the Cascades. The Moss color looks better in person.",
    verified: true,
  },
  {
    id: "tom",
    name: "Tom Becker",
    location: "Seattle, WA",
    rating: 5,
    date: "2026-10-09",
    title: "True to size",
    body: "The fit works over a shirt and a light sweater. The chest pockets hold a phone and gloves.",
    verified: true,
  },
  {
    id: "priya",
    name: "Priya Raman",
    location: "Vancouver, BC",
    rating: 4,
    date: "2026-09-28",
    title: "Good in rain, slow to dry",
    body: "The shell keeps rain out on a 30-minute walk. The cuffs stay wet for a while.",
    verified: true,
  },
  {
    id: "marcus",
    name: "Marcus Hill",
    location: "Denver, CO",
    rating: 5,
    date: "2026-09-21",
    title: "My third jacket from Bracken",
    body: "My first Bracken jacket lasted six winters. This one feels the same.",
    verified: true,
  },
  {
    id: "aya",
    name: "Aya Nakamura",
    location: "Portland, OR",
    rating: 5,
    date: "2026-09-12",
    title: "Sleeves are the right length",
    body: "I am 165 cm and size S fits well. The jacket covers the hip when I sit.",
    verified: true,
  },
  {
    id: "daniel",
    name: "Daniel Okafor",
    location: "Chicago, IL",
    rating: 4,
    date: "2026-09-03",
    title: "Warm, but size up for a sweater",
    body: "Size M fits over a shirt. Choose L if you wear a heavy sweater.",
    verified: true,
  },
];

export const ratingBreakdown = [
  { stars: 5, count: 105 },
  { stars: 4, count: 15 },
  { stars: 3, count: 4 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
];

export const specifications = [
  { term: "Shell", detail: "8.5 oz organic cotton canvas" },
  { term: "Lining", detail: "Recycled polyester fleece" },
  { term: "Weight", detail: "780 g (size M)" },
  { term: "Finish", detail: "PFC-free water repellent" },
  { term: "Pockets", detail: "2 chest, 2 hand" },
  { term: "Fit", detail: "Regular, hip length" },
  { term: "Made in", detail: "Portugal" },
  { term: "SKU", detail: product.sku },
];

export const sizeGuide = [
  { size: "S", chest: "96–102 cm" },
  { size: "M", chest: "104–110 cm" },
  { size: "L", chest: "112–118 cm" },
  { size: "XL", chest: "120–126 cm" },
  { size: "XXL", chest: "128–134 cm" },
];

const reviewDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatReviewDate(value: string) {
  return reviewDate.format(new Date(`${value}T00:00:00Z`));
}
