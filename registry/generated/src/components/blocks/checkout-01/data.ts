export interface SummaryLine {
  key: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  colorHex: string;
  kind: "jacket" | "cap";
}

export const orderNumber = "BS-24817";

export const summaryLines: SummaryLine[] = [
  {
    key: "jacket-moss-m",
    name: "Field Jacket",
    variant: "Moss · M",
    price: 24800,
    quantity: 1,
    colorHex: "#4f5b45",
    kind: "jacket",
  },
  {
    key: "cap-moss",
    name: "Field Cap",
    variant: "Moss · One size",
    price: 3800,
    quantity: 1,
    colorHex: "#4f5b45",
    kind: "cap",
  },
];

export const freeShippingOver = 15000;
export const promoCode = "FIELD15";
export const promoRate = 0.15;

export const countries = [
  { id: "US", name: "United States" },
  { id: "CA", name: "Canada" },
  { id: "GB", name: "United Kingdom" },
  { id: "AU", name: "Australia" },
  { id: "JP", name: "Japan" },
];

export const usStates = [
  { id: "WA", name: "Washington" },
  { id: "OR", name: "Oregon" },
  { id: "CA", name: "California" },
  { id: "CO", name: "Colorado" },
  { id: "IL", name: "Illinois" },
  { id: "MA", name: "Massachusetts" },
  { id: "NY", name: "New York" },
  { id: "NC", name: "North Carolina" },
  { id: "TX", name: "Texas" },
  { id: "GA", name: "Georgia" },
];

export const caProvinces = [
  { id: "BC", name: "British Columbia" },
  { id: "AB", name: "Alberta" },
  { id: "MB", name: "Manitoba" },
  { id: "ON", name: "Ontario" },
  { id: "QC", name: "Quebec" },
];

export interface ShippingOption {
  id: string;
  name: string;
  note: string;
  price: number;
  arrivalStart: string;
  arrivalEnd: string;
}

export function isSupportedCountry(country: string) {
  return country === "US" || country === "CA";
}

export function countryName(id: string) {
  return countries.find((country) => country.id === id)?.name ?? id;
}

export function regionsFor(country: string) {
  return country === "CA" ? caProvinces : usStates;
}

export function regionLabel(country: string) {
  return country === "CA" ? "Province" : "State";
}

export function postalLabel(country: string) {
  return country === "CA" ? "Postal code" : "ZIP code";
}

export function shippingOptions(country: string): ShippingOption[] {
  if (country === "CA") {
    return [
      {
        id: "standard",
        name: "Standard",
        note: "7–10 business days",
        price: 1200,
        arrivalStart: "2026-11-10",
        arrivalEnd: "2026-11-13",
      },
      {
        id: "express",
        name: "Express",
        note: "3–5 business days",
        price: 2800,
        arrivalStart: "2026-11-04",
        arrivalEnd: "2026-11-06",
      },
    ];
  }
  return [
    {
      id: "standard",
      name: "Standard",
      note: "5–7 business days",
      price: 0,
      arrivalStart: "2026-11-06",
      arrivalEnd: "2026-11-10",
    },
    {
      id: "express",
      name: "Express",
      note: "2–3 business days",
      price: 1800,
      arrivalStart: "2026-11-03",
      arrivalEnd: "2026-11-04",
    },
  ];
}

export function taxRate(country: string) {
  return country === "CA" ? 0.05 : 0.0825;
}

export function taxLabel(country: string, region: string) {
  const name =
    regionsFor(country).find((item) => item.id === region)?.name ?? region;
  return country === "CA"
    ? `GST is estimated for ${name}.`
    : `Tax is estimated for ${name}.`;
}

export function orderTotals(
  lines: SummaryLine[],
  shipping: number,
  discount: number,
  country: string,
) {
  const subtotal = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  const taxable = Math.max(0, subtotal - discount);
  const tax = Math.round(taxable * taxRate(country));
  return {
    subtotal,
    shipping,
    discount,
    tax,
    total: subtotal - discount + shipping + tax,
  };
}

export function promoDiscount(subtotal: number) {
  return Math.round(subtotal * promoRate);
}

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const fullDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function toDate(value: string) {
  return new Date(`${value}T00:00:00Z`);
}

export function formatArrival(start: string, end: string) {
  return `${shortDate.format(toDate(start))} – ${shortDate.format(toDate(end))}`;
}

export function formatFullDate(value: string) {
  return fullDate.format(toDate(value));
}
