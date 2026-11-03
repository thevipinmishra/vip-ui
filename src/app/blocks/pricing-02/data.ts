export type Cycle = "monthly" | "yearly";

export const brand = {
  name: "Trellis",
  domain: "trellis.app",
  tagline: "Product analytics for teams that ship.",
};

export const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "For one person testing the product.",
    monthly: 0,
    yearly: 0,
    action: "Start free",
    href: "/blocks/signup-01",
    features: [
      "1 seat",
      "1M events a month",
      "1 project",
      "30-day history",
      "Email support",
    ],
    popular: false,
  },
  {
    id: "team",
    name: "Team",
    description: "For small teams that ship each week.",
    monthly: 29,
    yearly: 23,
    action: "Start 14-day trial",
    href: "/blocks/signup-01",
    features: [
      "Up to 50 seats",
      "10M events a month",
      "Unlimited projects",
      "12-month history",
      "Journeys and alerts",
      "Slack and email support",
    ],
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    description: "For companies with audit needs.",
    monthly: 79,
    yearly: 63,
    action: "Talk to sales",
    href: "mailto:sales@trellis.app?subject=Trellis%20Scale",
    features: [
      "Unlimited seats",
      "100M events a month",
      "5-year history",
      "SAML single sign-on",
      "Audit log and 99.99% SLA",
      "Priority support",
    ],
    popular: false,
  },
] as const;

export type ComparisonValue = string | boolean;

export const comparison: {
  group: string;
  feature: string;
  starter: ComparisonValue;
  team: ComparisonValue;
  scale: ComparisonValue;
}[] = [
  {
    group: "Workspace",
    feature: "Seats",
    starter: "1",
    team: "Up to 50",
    scale: "Unlimited",
  },
  {
    group: "Workspace",
    feature: "Projects",
    starter: "1",
    team: "Unlimited",
    scale: "Unlimited",
  },
  {
    group: "Workspace",
    feature: "Events each month",
    starter: "1M",
    team: "10M",
    scale: "100M",
  },
  {
    group: "Workspace",
    feature: "Data history",
    starter: "30 days",
    team: "12 months",
    scale: "5 years",
  },
  {
    group: "Analytics",
    feature: "Funnels",
    starter: true,
    team: true,
    scale: true,
  },
  {
    group: "Analytics",
    feature: "Journeys",
    starter: false,
    team: true,
    scale: true,
  },
  {
    group: "Analytics",
    feature: "Retention cohorts",
    starter: true,
    team: true,
    scale: true,
  },
  {
    group: "Analytics",
    feature: "Session replay",
    starter: "1,000 / mo",
    team: "50,000 / mo",
    scale: "Unlimited",
  },
  {
    group: "Analytics",
    feature: "Warehouse sync",
    starter: false,
    team: false,
    scale: true,
  },
  {
    group: "Analytics",
    feature: "Alerts",
    starter: false,
    team: true,
    scale: true,
  },
  {
    group: "Security",
    feature: "SAML single sign-on",
    starter: false,
    team: false,
    scale: true,
  },
  {
    group: "Security",
    feature: "Audit log",
    starter: false,
    team: false,
    scale: true,
  },
  {
    group: "Security",
    feature: "Data region",
    starter: "US",
    team: "US, EU",
    scale: "US, EU, APAC",
  },
  {
    group: "Security",
    feature: "Uptime SLA",
    starter: false,
    team: "99.9%",
    scale: "99.99%",
  },
  {
    group: "Support",
    feature: "Email support",
    starter: true,
    team: true,
    scale: true,
  },
  {
    group: "Support",
    feature: "Slack support",
    starter: false,
    team: true,
    scale: true,
  },
  {
    group: "Support",
    feature: "Response time",
    starter: "2 days",
    team: "24 hours",
    scale: "4 hours",
  },
  {
    group: "Support",
    feature: "Onboarding",
    starter: "Self-serve",
    team: "Guided",
    scale: "Dedicated",
  },
];

export const faqs = [
  {
    id: "seat",
    question: "How do you count a seat?",
    answer: "A seat is one person who signs in during the billing month.",
  },
  {
    id: "more-seats",
    question: "What happens if my team grows past 50 seats?",
    answer: "Move to Scale at $79 per seat and we prorate the change.",
  },
  {
    id: "yearly",
    question: "How does yearly billing work?",
    answer: "You pay for 12 months at one time and save 20%.",
  },
  {
    id: "change",
    question: "Can I change my plan later?",
    answer:
      "Upgrades start at once, and downgrades start at the end of the paid period.",
  },
  {
    id: "events",
    question: "Do you charge for events above the limit?",
    answer:
      "We keep collecting events and email you at 80% and 100% of the limit.",
  },
  {
    id: "methods",
    question: "Which payment methods do you take?",
    answer: "We take cards and bank transfer for yearly Scale plans.",
  },
];

export const currencyFormat: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
};

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", currencyFormat).format(value);
}
