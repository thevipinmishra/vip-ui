export interface HelpArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  updated: string;
  minutes: number;
  keywords: string;
  body: string[];
  steps: string[];
}

export const helpArticles: HelpArticle[] = [
  {
    id: "saml-single-sign-on",
    title: "Set up SAML single sign-on",
    category: "Security",
    summary: "Connect Okta, Entra ID, or Google Workspace.",
    updated: "2026-10-21",
    minutes: 4,
    keywords: "sso saml okta login security identity provider entra google",
    body: [
      "Vela uses SAML 2.0 for single sign-on. Each workspace connects to one identity provider.",
      "Only an owner can change the sign-in method. Test the connection with one user before you enforce it for the team.",
    ],
    steps: [
      "Open Settings, then Security.",
      "Select SAML single sign-on, then Add provider.",
      "Paste the metadata URL from your identity provider.",
      "Sign in in a private window before you enforce SAML.",
    ],
  },
  {
    id: "import-feedback",
    title: "Import feedback from another tool",
    category: "Getting started",
    summary: "Move notes and tags from Zendesk, Intercom, or CSV.",
    updated: "2026-10-14",
    minutes: 6,
    keywords: "import csv zendesk intercom migrate move data feedback",
    body: [
      "The import tool keeps the note text, the author, and the source link. Tags come in as labels.",
      "A CSV file can have up to 50,000 rows. Split larger files into two imports.",
    ],
    steps: [
      "Open Settings, then Imports.",
      "Select a source, or upload a CSV file.",
      "Map the text, author, date, and source columns.",
      "Import a sample of 100 rows before you import the full file.",
    ],
  },
  {
    id: "api-tokens",
    title: "Create an API token",
    category: "Developers",
    summary: "Create a token, set its scopes, and rotate it.",
    updated: "2026-09-30",
    minutes: 3,
    keywords: "api token key developer scopes rotate integration",
    body: [
      "An API token acts as a user. Give each integration its own token so you can revoke it alone.",
      "Vela shows the token one time. Store it in a secret manager, not in your source code.",
    ],
    steps: [
      "Open Settings, then API tokens.",
      "Select Create token and name the integration.",
      "Select the scopes that the integration needs.",
      "Copy the token before you close the dialog.",
    ],
  },
  {
    id: "plan-and-seats",
    title: "Change your plan or seats",
    category: "Billing",
    summary: "Change a plan, add seats, and download the current invoice.",
    updated: "2026-09-18",
    minutes: 2,
    keywords: "billing plan seat invoice payment card upgrade downgrade",
    body: [
      "Owner accounts can change the plan at any time. A change applies at the start of the next billing period.",
      "A downgrade cannot go below the number of people who are active this month.",
    ],
    steps: [
      "Open Settings, then Billing.",
      "Select Change plan.",
      "Compare the plans and select a new one.",
      "Review the cost, then confirm the change.",
    ],
  },
  {
    id: "roles-and-permissions",
    title: "Set roles and permissions",
    category: "Workspace",
    summary: "Choose what owners, admins, editors, and viewers can do.",
    updated: "2026-09-12",
    minutes: 3,
    keywords: "roles permissions admin viewer editor owner access team",
    body: [
      "Each person has one role in a workspace. Roles apply to all projects in that workspace.",
      "A guest can read one project. Use a guest for a person outside your company.",
    ],
    steps: [
      "Open Settings, then People.",
      "Select a person, then Change role.",
      "Select a role and review the access list.",
      "Select Save.",
    ],
  },
  {
    id: "export-data",
    title: "Export feedback and reports",
    category: "Data",
    summary: "Download a CSV file or send a scheduled report to email.",
    updated: "2026-08-29",
    minutes: 3,
    keywords: "export csv download report schedule email data backup",
    body: [
      "A CSV export includes the note text, labels, source, and date. The export does not include attachments.",
      "A scheduled report can go to up to five email addresses each week or month.",
    ],
    steps: [
      "Open Reports.",
      "Select a report or a saved filter.",
      "Select Export, then CSV.",
      "Select Schedule to send the report to your team.",
    ],
  },
  {
    id: "data-protection",
    title: "How Vela protects your data",
    category: "Security",
    summary: "Read about encryption, retention, and our subprocessors.",
    updated: "2026-10-02",
    minutes: 5,
    keywords: "security encryption retention subprocessor gdpr soc 2 data",
    body: [
      "Vela encrypts data in transit with TLS 1.3 and at rest with AES-256. Backups are encrypted with the same key policy.",
      "You can select a data region in the EU or the US. The region is set when the workspace is created.",
    ],
    steps: [
      "Open the trust center for the current audit reports.",
      "Open Settings, then Data to review retention.",
      "Contact support for a data processing agreement.",
    ],
  },
  {
    id: "start-a-pilot",
    title: "Start a 14-day pilot",
    category: "Getting started",
    summary: "Plan a pilot, invite one team, and measure the first results.",
    updated: "2026-10-09",
    minutes: 4,
    keywords: "pilot trial start test team onboarding 14 day",
    body: [
      "A pilot gives one team a full workspace for 14 days. The data stays if the team moves to a paid plan.",
      "Select one goal for the pilot. For example, find the top five themes in last month's feedback.",
    ],
    steps: [
      "Create a workspace from the pilot page.",
      "Invite one team and import a sample of feedback.",
      "Run one review at the end of week one.",
      "Share the results with your sales contact.",
    ],
  },
];

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatArticleDate(value: string) {
  return dateFormat.format(new Date(`${value}T00:00:00Z`));
}
