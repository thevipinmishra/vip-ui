export type AnswerBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface AnswerSource {
  label: string;
  source: string;
  href: string;
  description: string;
}

export interface SearchResult {
  title: string;
  blocks: AnswerBlock[];
  code?: string;
  updated: string;
  sources: AnswerSource[];
  related: string[];
}

export const defaultQuery = "How do I rotate an API key?";

export const popularQueries = [
  "Rotate an API key",
  "Set up SSO",
  "Webhook retries",
  "Usage limits",
];

export const suggestions = [
  { id: "api-keys", label: "Rotate an API key", category: "API keys" },
  { id: "sso", label: "Set up SSO", category: "Security" },
  { id: "webhooks", label: "Webhook retries", category: "Webhooks" },
  { id: "usage", label: "Usage limits", category: "Billing" },
  { id: "invite", label: "Invite a teammate", category: "Members" },
  { id: "audit", label: "Audit log events", category: "Security" },
];

export function answerFor(query: string): SearchResult {
  const text = query.toLowerCase();
  if (text.includes("sso") || text.includes("saml") || text.includes("scim")) {
    return {
      title: "Set up single sign-on",
      updated: "Updated Oct 22, 2026",
      blocks: [
        {
          type: "paragraph",
          text: "SSO is available on the Business plan.",
        },
        {
          type: "list",
          items: [
            "Open Settings → Security → SSO.",
            "Select your identity provider and paste the metadata URL.",
            "Test with one account before you enforce SSO.",
            "Turn on Require SSO to block password sign-in.",
            "Turn on SCIM after SSO works.",
          ],
        },
        {
          type: "paragraph",
          text: "Next step: set a default role for new members.",
        },
      ],
      sources: [
        {
          label: "Single sign-on",
          source: "docs.fernway.app/security/sso",
          href: "https://docs.fernway.app/security/sso",
          description: "Supported providers, metadata, and test steps.",
        },
        {
          label: "SCIM provisioning",
          source: "docs.fernway.app/security/scim",
          href: "https://docs.fernway.app/security/scim",
          description: "Sync members and groups from your identity provider.",
        },
        {
          label: "Security overview",
          source: "docs.fernway.app/security",
          href: "https://docs.fernway.app/security",
          description: "SSO, SCIM, audit logs, and session policy.",
        },
      ],
      related: [
        "Require SSO for everyone",
        "Set up SCIM",
        "Change the default role",
      ],
    };
  }

  if (text.includes("webhook") || text.includes("delivery")) {
    return {
      title: "How webhook retries work",
      updated: "Updated Oct 18, 2026",
      blocks: [
        {
          type: "paragraph",
          text: "Fernway retries failed deliveries 5 times in 2 hours.",
        },
        {
          type: "list",
          items: [
            "Retries run after 10s, 1m, 5m, 30m, and 2h.",
            "A delivery fails without a 2xx response in 10 seconds.",
            "Each retry keeps the same event ID.",
            "After the fifth retry, the event expires.",
          ],
        },
        {
          type: "paragraph",
          text: "Next step: return 2xx as soon as you store the event.",
        },
      ],
      code: `curl -X POST https://api.fernway.app/v1/webhooks \\
  -H "Fernway-Signature: t=...,v1=..." \\
  -d '{"event":"member.created"}'`,
      sources: [
        {
          label: "Webhooks",
          source: "docs.fernway.app/webhooks",
          href: "https://docs.fernway.app/webhooks",
          description: "Events, payloads, and delivery order.",
        },
        {
          label: "Verify a signature",
          source: "docs.fernway.app/webhooks/signatures",
          href: "https://docs.fernway.app/webhooks/signatures",
          description: "Check the timestamp and HMAC on each request.",
        },
        {
          label: "Delivery log",
          source: "docs.fernway.app/webhooks/logs",
          href: "https://docs.fernway.app/webhooks/logs",
          description: "Inspect retries, response codes, and expiry.",
        },
      ],
      related: [
        "Verify a webhook signature",
        "Why did a webhook expire?",
        "Replay a failed delivery",
      ],
    };
  }

  if (
    text.includes("usage") ||
    text.includes("limit") ||
    text.includes("quota")
  ) {
    return {
      title: "API usage limits",
      updated: "Updated Oct 29, 2026",
      blocks: [
        {
          type: "paragraph",
          text: "The Pro plan includes 250,000 API requests each month.",
        },
        {
          type: "list",
          items: [
            "The limit resets at the start of each billing period.",
            "Usage counts successful and failed requests.",
            "At 100%, new requests return 429.",
            "The Business plan includes 1,000,000 requests.",
          ],
        },
        {
          type: "paragraph",
          text: "Next step: set a usage alert in Settings → Billing.",
        },
      ],
      sources: [
        {
          label: "Rate limits",
          source: "docs.fernway.app/reference/rate-limits",
          href: "https://docs.fernway.app/reference/rate-limits",
          description: "Request limits, headers, and 429 responses.",
        },
        {
          label: "Plans and usage",
          source: "fernway.app/pricing",
          href: "https://fernway.app/pricing",
          description: "Request limits for each plan.",
        },
      ],
      related: [
        "Raise the request limit",
        "Set a usage alert",
        "Check current usage",
      ],
    };
  }

  if (
    text.includes("invite") ||
    text.includes("member") ||
    text.includes("teammate")
  ) {
    return {
      title: "Invite a teammate",
      updated: "Updated Oct 12, 2026",
      blocks: [
        {
          type: "paragraph",
          text: "Open Settings → Members, choose Invite, and add email addresses.",
        },
        {
          type: "list",
          items: [
            "Pick a role before you send the invite.",
            "Owner is limited to one person.",
            "The invite expires after 7 days.",
            "SSO members skip the invite email.",
          ],
        },
        {
          type: "paragraph",
          text: "Next step: change a role at any time from the member row.",
        },
      ],
      sources: [
        {
          label: "Members and roles",
          source: "docs.fernway.app/members",
          href: "https://docs.fernway.app/members",
          description: "Invite, remove, and change roles.",
        },
        {
          label: "SSO sign-in",
          source: "docs.fernway.app/security/sso",
          href: "https://docs.fernway.app/security/sso",
          description: "How SSO members join a workspace.",
        },
      ],
      related: ["Change a member role", "Remove a member", "Resend an invite"],
    };
  }

  if (text.includes("audit") || text.includes("siem")) {
    return {
      title: "Audit log events",
      updated: "Updated Oct 24, 2026",
      blocks: [
        {
          type: "paragraph",
          text: "The audit log records sign-ins, key rotations, role changes, and billing changes.",
        },
        {
          type: "list",
          items: [
            "Business plan logs stay for 1 year.",
            "Each event has an actor, an IP address, and a timestamp.",
            "Keys and tokens appear as IDs, never as secrets.",
            "Export the log as CSV or stream it to your SIEM.",
          ],
        },
        {
          type: "paragraph",
          text: "Next step: open Settings → Audit log to filter events.",
        },
      ],
      sources: [
        {
          label: "Audit log",
          source: "docs.fernway.app/reference/audit-log",
          href: "https://docs.fernway.app/reference/audit-log",
          description: "Events, retention, and export.",
        },
        {
          label: "Activity events",
          source: "docs.fernway.app/reference/events",
          href: "https://docs.fernway.app/reference/events",
          description: "The full event name list.",
        },
      ],
      related: [
        "Export the audit log",
        "Stream events to a SIEM",
        "Who rotated a key?",
      ],
    };
  }

  if (
    text.includes("api key") ||
    text.includes("rotate") ||
    text.includes("revoke") ||
    text.includes("key")
  ) {
    return {
      title: "Rotate an API key",
      updated: "Updated Oct 30, 2026",
      blocks: [
        {
          type: "paragraph",
          text: "Open Settings → API keys, select the key, and choose Rotate.",
        },
        {
          type: "list",
          items: [
            "The old key stays active for 24 hours.",
            "Copy the new key before you close the dialog.",
            "Deploy the new key to each service.",
            "Revoke the old key after the last healthy request.",
          ],
        },
        {
          type: "paragraph",
          text: "Next step: check the audit log for the rotation event.",
        },
      ],
      code: `fernway keys rotate --id key_9f2c --grace 24h`,
      sources: [
        {
          label: "API keys",
          source: "docs.fernway.app/guides/api-keys",
          href: "https://docs.fernway.app/guides/api-keys",
          description: "Create, rotate, and revoke keys.",
        },
        {
          label: "Authentication",
          source: "docs.fernway.app/reference",
          href: "https://docs.fernway.app/reference/authentication",
          description: "Headers, scopes, and error codes.",
        },
        {
          label: "Audit log",
          source: "docs.fernway.app/reference/audit-log",
          href: "https://docs.fernway.app/reference/audit-log",
          description: "Key rotation events and retention.",
        },
      ],
      related: [
        "Can I have more than one active key?",
        "How do I revoke a key?",
        "Why does a key stop working?",
      ],
    };
  }

  return {
    title: "Closest guides",
    updated: "Updated Oct 29, 2026",
    blocks: [
      {
        type: "paragraph",
        text: "No exact guide matched your question.",
      },
      {
        type: "paragraph",
        text: "Next step: try a shorter question with the feature name.",
      },
    ],
    sources: [
      {
        label: "Documentation home",
        source: "docs.fernway.app",
        href: "https://docs.fernway.app",
        description: "Guides, references, and release notes.",
      },
      {
        label: "API reference",
        source: "docs.fernway.app/reference",
        href: "https://docs.fernway.app/reference",
        description: "Endpoints, errors, and rate limits.",
      },
    ],
    related: ["Rotate an API key", "Set up SSO", "Webhook retries"],
  };
}

export function answerText(result: SearchResult) {
  const body = result.blocks
    .map((block) =>
      block.type === "paragraph"
        ? block.text
        : block.items.map((item) => `- ${item}`).join("\n"),
    )
    .join("\n\n");
  return `${result.title}\n\n${body}${result.code ? `\n\n${result.code}` : ""}`;
}
