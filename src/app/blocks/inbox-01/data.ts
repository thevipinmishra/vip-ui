export type Channel = "Email" | "Chat" | "WhatsApp";
export type Priority = "High" | "Normal" | "Low";
export type ConversationStatus = "open" | "snoozed" | "resolved";

export interface Message {
  id: string;
  from: "customer" | "agent";
  name: string;
  at: string;
  body: string;
  attachment?: { name: string; size: string };
}

export interface Conversation {
  id: string;
  subject: string;
  customer: string;
  email: string;
  company: string;
  channel: Channel;
  priority: Priority;
  assignee: string | null;
  status: ConversationStatus;
  snoozedUntil?: string;
  unread: boolean;
  preview: string;
  updatedAt: string;
  messages: Message[];
}

export const agents = ["Maya Chen", "Ana Souza", "Kwame Mensah", "Leo Park"];

export const NOW = "2026-10-30T11:00:00Z";

const mail = "2026-10-30T09:58:00Z";

export const initialConversations: Conversation[] = [
  {
    id: "brightlane-export",
    subject: "October export has no rows",
    customer: "Elena Fischer",
    email: "elena@brightlane.co",
    company: "Brightlane Studio",
    channel: "Email",
    priority: "High",
    assignee: "Maya Chen",
    status: "open",
    unread: true,
    preview: "The October export is empty. September works.",
    updatedAt: "2026-10-30T10:42:00Z",
    messages: [
      {
        id: "brightlane-1",
        from: "customer",
        name: "Elena Fischer",
        at: mail,
        body: "I opened Reports > Exports this morning. The October export has no rows, but September works. I need the file for our board meeting at 3 PM.",
      },
      {
        id: "brightlane-2",
        from: "agent",
        name: "Maya Chen",
        at: "2026-10-30T10:12:00Z",
        body: "I can see zero rows for October. I will check the filter on your workspace. Which time zone do your reports use?",
      },
      {
        id: "brightlane-3",
        from: "customer",
        name: "Elena Fischer",
        at: "2026-10-30T10:32:00Z",
        body: "The workspace uses Central European Time. The board meeting starts at 3 PM CET.",
      },
      {
        id: "brightlane-4",
        from: "agent",
        name: "Maya Chen",
        at: "2026-10-30T10:42:00Z",
        body: "The filter missed records before 1 AM UTC. I sent the corrected file to your email. I will keep this open until you confirm.",
        attachment: { name: "october-export.csv", size: "48 KB" },
      },
    ],
  },
  {
    id: "fernmark-slack",
    subject: "Cannot connect the Slack workspace",
    customer: "Samir Patel",
    email: "samir@fernmark.io",
    company: "Fernmark",
    channel: "Chat",
    priority: "High",
    assignee: null,
    status: "open",
    unread: true,
    preview: "The connect button stops on the loading state.",
    updatedAt: "2026-10-30T10:18:00Z",
    messages: [
      {
        id: "fernmark-1",
        from: "customer",
        name: "Samir Patel",
        at: "2026-10-30T10:04:00Z",
        body: "The Slack connect button stops on the loading state. I tried two browsers.",
      },
      {
        id: "fernmark-2",
        from: "agent",
        name: "Ana Souza",
        at: "2026-10-30T10:18:00Z",
        body: "I see the failed connection in our logs. I sent a new link to your admin address. Open it in a private window.",
      },
    ],
  },
  {
    id: "pallas-invoice",
    subject: "Invoice INV-2048 shows the wrong tax",
    customer: "Grace Lin",
    email: "grace@pallaskit.com",
    company: "Pallas Kit",
    channel: "Email",
    priority: "Normal",
    assignee: "Maya Chen",
    status: "open",
    unread: false,
    preview: "The tax line is 8 percent, but our rate is 5 percent.",
    updatedAt: "2026-10-30T09:56:00Z",
    messages: [
      {
        id: "pallas-1",
        from: "customer",
        name: "Grace Lin",
        at: "2026-10-30T09:20:00Z",
        body: "Invoice INV-2048 shows 8 percent tax. Our rate is 5 percent. Please send a corrected invoice.",
      },
      {
        id: "pallas-2",
        from: "agent",
        name: "Maya Chen",
        at: "2026-10-30T09:56:00Z",
        body: "I found the wrong tax profile. I will send the corrected invoice before 1 PM.",
      },
    ],
  },
  {
    id: "northstar-seats",
    subject: "Add two seats to our plan",
    customer: "Noah Williams",
    email: "noah@northstar.dev",
    company: "Northstar Labs",
    channel: "Email",
    priority: "Normal",
    assignee: "Kwame Mensah",
    status: "open",
    unread: false,
    preview: "We hired two agents. Please add seats from Nov 1.",
    updatedAt: "2026-10-30T09:12:00Z",
    messages: [
      {
        id: "northstar-1",
        from: "customer",
        name: "Noah Williams",
        at: "2026-10-30T08:50:00Z",
        body: "We hired two agents. Please add seats from Nov 1. The billing contact stays the same.",
      },
      {
        id: "northstar-2",
        from: "agent",
        name: "Kwame Mensah",
        at: "2026-10-30T09:12:00Z",
        body: "I added two seats to the Growth plan. The next invoice includes the new total.",
      },
    ],
  },
  {
    id: "kite-webhooks",
    subject: "Webhook retries send duplicate events",
    customer: "Hana Sato",
    email: "hana@kiteandco.jp",
    company: "Kite & Co",
    channel: "Chat",
    priority: "High",
    assignee: "Ana Souza",
    status: "open",
    unread: true,
    preview: "Each event arrives three times after a timeout.",
    updatedAt: "2026-10-30T08:40:00Z",
    messages: [
      {
        id: "kite-1",
        from: "customer",
        name: "Hana Sato",
        at: "2026-10-30T08:26:00Z",
        body: "Each webhook event arrives three times after a timeout. Our queue now has duplicate jobs. Please stop the retries.",
      },
      {
        id: "kite-2",
        from: "agent",
        name: "Ana Souza",
        at: "2026-10-30T08:40:00Z",
        body: "I disabled the retry rule for your workspace. The duplicate jobs stop after the queue clears.",
      },
    ],
  },
  {
    id: "vela-password",
    subject: "Password reset email does not arrive",
    customer: "Mateo Rossi",
    email: "mateo@velafoods.it",
    company: "Vela Foods",
    channel: "Email",
    priority: "High",
    assignee: null,
    status: "open",
    unread: true,
    preview: "Three users asked for a reset. No email arrived.",
    updatedAt: "2026-10-30T08:05:00Z",
    messages: [
      {
        id: "vela-1",
        from: "customer",
        name: "Mateo Rossi",
        at: "2026-10-30T07:50:00Z",
        body: "Three users asked for a password reset. No email arrived. We checked the spam folder.",
      },
      {
        id: "vela-2",
        from: "customer",
        name: "Mateo Rossi",
        at: "2026-10-30T08:05:00Z",
        body: "The affected addresses use our custom domain. Other addresses work.",
      },
    ],
  },
  {
    id: "fieldnote-export",
    subject: "Request: export each folder to CSV",
    customer: "Amara Okafor",
    email: "amara@fieldnote.app",
    company: "Fieldnote",
    channel: "Email",
    priority: "Low",
    assignee: "Kwame Mensah",
    status: "open",
    unread: false,
    preview: "We need one CSV for each project folder.",
    updatedAt: "2026-10-29T17:22:00Z",
    messages: [
      {
        id: "fieldnote-1",
        from: "customer",
        name: "Amara Okafor",
        at: "2026-10-29T16:40:00Z",
        body: "We need one CSV for each project folder. The full export is too large for finance.",
      },
      {
        id: "fieldnote-2",
        from: "agent",
        name: "Kwame Mensah",
        at: "2026-10-29T17:22:00Z",
        body: "This is not possible today. I added it to the product request list and will send an update.",
      },
    ],
  },
  {
    id: "lumen-address",
    subject: "Change the billing address",
    customer: "Jonas Weber",
    email: "jonas@lumenworks.de",
    company: "Lumen Works",
    channel: "Email",
    priority: "Normal",
    assignee: "Maya Chen",
    status: "open",
    unread: false,
    preview: "Our finance team moved to a new address.",
    updatedAt: "2026-10-29T15:04:00Z",
    messages: [
      {
        id: "lumen-1",
        from: "customer",
        name: "Jonas Weber",
        at: "2026-10-29T14:38:00Z",
        body: "Our finance team moved. Please change the billing address on the next invoice.",
      },
      {
        id: "lumen-2",
        from: "agent",
        name: "Maya Chen",
        at: "2026-10-29T15:04:00Z",
        body: "I updated the billing address. The next invoice uses the new address.",
      },
    ],
  },
];

export const snoozeOptions = [
  {
    id: "hour",
    label: "In 1 hour",
    detail: "Today at 12:00 PM",
    until: "2026-10-30T12:00:00Z",
  },
  {
    id: "tomorrow",
    label: "Tomorrow at 9:00",
    detail: "Saturday, Oct 31",
    until: "2026-10-31T09:00:00Z",
  },
  {
    id: "week",
    label: "Next week",
    detail: "Friday, Nov 6 at 9:00",
    until: "2026-11-06T09:00:00Z",
  },
];

const listTime = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const dateTime = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

export function formatListTime(iso: string) {
  const day = iso.slice(0, 10);
  if (day === "2026-10-30") return listTime.format(new Date(iso));
  if (day === "2026-10-29") return "Yesterday";
  return shortDate.format(new Date(iso));
}

export function formatMessageTime(iso: string) {
  return listTime.format(new Date(iso));
}

export function formatFullDate(iso: string) {
  return shortDate.format(new Date(iso));
}

export function formatSnoozeTime(iso: string) {
  return dateTime.format(new Date(iso));
}

export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
