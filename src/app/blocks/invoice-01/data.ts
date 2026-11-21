export interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string[];
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export const studio = {
  name: "Brightline Studio",
  email: "billing@brightline.studio",
  address: ["214 Mercer Street", "New York, NY 10012"],
};

export const clients: Client[] = [
  {
    id: "cobalt",
    name: "Cobalt Robotics",
    contact: "Hannah Brooks",
    email: "ap@cobaltrobotics.com",
    address: ["1200 Harrison Street", "San Francisco, CA 94103"],
  },
  {
    id: "meridian",
    name: "Meridian Health",
    contact: "Omar Haddad",
    email: "invoices@meridianhealth.org",
    address: ["88 Pearl Street, Floor 9", "Boston, MA 02110"],
  },
  {
    id: "tidewater",
    name: "Tidewater Outfitters",
    contact: "Grace Lin",
    email: "finance@tidewater.co",
    address: ["45 Commercial Wharf", "Portland, ME 04101"],
  },
];

export const terms = [
  { id: "receipt", name: "Due on receipt", days: 0 },
  { id: "net15", name: "Net 15", days: 15 },
  { id: "net30", name: "Net 30", days: 30 },
];

export const initialItems: LineItem[] = [
  {
    id: "l1",
    description: "Product design, October sprint",
    quantity: 64,
    rate: 145,
  },
  {
    id: "l2",
    description: "Usability study, 8 sessions",
    quantity: 1,
    rate: 3200,
  },
  {
    id: "l3",
    description: "Design system maintenance",
    quantity: 12,
    rate: 120,
  },
];

export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const longDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(value: string) {
  return longDate.format(new Date(`${value}T00:00:00Z`));
}

export function cents(value: number) {
  return Math.round(value * 100);
}

export function totals(items: LineItem[], discount: number, tax: number) {
  const subtotal = items.reduce(
    (sum, item) => sum + cents(item.quantity * item.rate),
    0,
  );
  const discountAmount = Math.round((subtotal * discount) / 100);
  const taxable = subtotal - discountAmount;
  const taxAmount = Math.round((taxable * tax) / 100);
  return {
    subtotal,
    discount: discountAmount,
    tax: taxAmount,
    total: taxable + taxAmount,
  };
}
