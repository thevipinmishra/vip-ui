export const brand = {
  name: "Trellis",
  domain: "trellis.app",
  tagline: "Product analytics for teams that ship.",
};

export const audiences = [
  "product teams",
  "growth teams",
  "design teams",
  "support teams",
];

export const logotypes = [
  { name: "NORTHWIND", className: "text-sm font-semibold tracking-[0.22em]" },
  { name: "Kepler", className: "text-lg font-medium tracking-[-0.04em]" },
  { name: "OHM", className: "text-base font-bold tracking-[0.3em]" },
  { name: "monarch", className: "text-lg font-semibold tracking-tighter" },
  { name: "Sable", className: "text-lg font-medium italic tracking-[-0.02em]" },
  { name: "LUMEN", className: "text-sm font-semibold tracking-[0.28em]" },
  { name: "Arbor", className: "text-lg font-semibold tracking-[-0.03em]" },
  { name: "Polar", className: "text-lg font-medium tracking-[-0.02em]" },
];

export const stats = [
  { value: "4,000+", label: "product teams" },
  { value: "18B", label: "events each month" },
  { value: "12 min", label: "median setup" },
  { value: "99.99%", label: "uptime in 2026" },
];

export const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "For one person testing the product.",
    monthly: 0,
    yearly: 0,
    seats: "1 seat",
    events: "1M events a month",
    history: "30-day history",
    action: "Start free",
    href: "/blocks/signup-01",
    popular: false,
  },
  {
    id: "team",
    name: "Team",
    description: "For small teams that ship each week.",
    monthly: 29,
    yearly: 23,
    seats: "Up to 50 seats",
    events: "10M events a month",
    history: "12-month history",
    action: "Start 14-day trial",
    href: "/blocks/signup-01",
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    description: "For companies with audit needs.",
    monthly: 79,
    yearly: 63,
    seats: "Unlimited seats",
    events: "100M events a month",
    history: "5-year history",
    action: "Compare plans",
    href: "/blocks/pricing-02#compare",
    popular: false,
  },
] as const;

export const faqs = [
  {
    id: "user-count",
    question: "How do you count a user?",
    answer: "We count a user once when they send an event in the month.",
  },
  {
    id: "event-limit",
    question: "What happens when I pass the event limit?",
    answer:
      "We keep collecting events and email you at 80% and 100% of the limit.",
  },
  {
    id: "trial",
    question: "Can I try Team before I pay?",
    answer: "Yes. Start a 14-day trial without a card.",
  },
  {
    id: "sso",
    question: "Do you support single sign-on?",
    answer:
      "Team supports Google and Microsoft sign-in. Scale adds SAML single sign-on.",
  },
  {
    id: "history",
    question: "How long do you keep my data?",
    answer: "Starter keeps 30 days. Team keeps 12 months. Scale keeps 5 years.",
  },
  {
    id: "cancel",
    question: "Can I cancel at any time?",
    answer:
      "Yes. Cancel from Billing and keep access to the end of the paid period.",
  },
];

export const newsItems = [
  {
    id: "journeys",
    title: "Journeys 2.0",
    description:
      "A new path canvas, side-by-side branches, and share links that open the same view.",
    date: "2026-10-28",
    version: "4.8.0",
  },
  {
    id: "alerts",
    title: "Alerts that know the difference",
    description:
      "Noise reduction, quiet hours, and a Slack thread for each alert.",
    date: "2026-10-14",
    version: "4.7.0",
  },
  {
    id: "sync",
    title: "Warehouse sync",
    description:
      "Send events to BigQuery or Snowflake each hour. No pipeline to maintain.",
    date: "2026-09-24",
    version: "4.6.0",
  },
];

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(value: string) {
  return dateFormat.format(new Date(`${value}T00:00:00Z`));
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatMoney(value: number) {
  return currency.format(value);
}
