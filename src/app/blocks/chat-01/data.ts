export type AnswerBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface ChatSource {
  label: string;
  source: string;
  href: string;
  description: string;
}

export interface ChatTurn {
  id: string;
  prompt: string;
  status: "complete" | "pending" | "stopped";
  time: string;
  attachments: string[];
  reasoning: string;
  duration: number;
  tool: {
    name: string;
    summary: string;
    input: string;
    output: string;
  };
  answer: AnswerBlock[];
  sources: ChatSource[];
}

export const assistantAvatarLabel = "Fernway Assistant";

export const modelOptions = [
  { id: "fast", name: "Fast" },
  { id: "deep", name: "Deep" },
];

export const starterPrompts = [
  "Why did activation drop last week?",
  "Compare activation with August",
  "Show the invite funnel",
];

export const initialTurn: ChatTurn = {
  id: "activation",
  prompt: "Why did activation drop last week?",
  status: "complete",
  time: "10:24 AM",
  attachments: [],
  reasoning:
    "Activation fell on Sep 24, one day after v2.14 shipped. I checked whether the new role picker blocks the invite path.",
  duration: 12,
  tool: {
    name: "query_events",
    summary: "Activation by week, Sep 15 to Oct 26",
    input: `{
  "metric": "activation",
  "from": "2026-09-15",
  "to": "2026-10-26",
  "segment": "all"
}`,
    output: `[
  { "week": "Sep 15", "activation": 61.8 },
  { "week": "Sep 22", "activation": 57.6 },
  { "week": "Sep 29", "activation": 57.1 },
  { "week": "Oct 6", "activation": 58.4 }
]`,
  },
  answer: [
    {
      type: "paragraph",
      text: "Activation fell from 61.8% to 57.6% after v2.14 added the role picker.",
    },
    {
      type: "list",
      items: [
        "The drop starts on Sep 24 and stays low.",
        "38% of invited users close the picker without a role.",
        "That rate was 9% before Sep 23.",
        "Invite completion lost 3.1 points, mostly on desktop.",
        "Android sign-ups lost 1.4 points after the new step.",
      ],
    },
    {
      type: "paragraph",
      text: "Next step: make the role optional for the first 7 days.",
    },
  ],
  sources: [
    {
      label: "Weekly activation report",
      source: "analytics.fernway.app · Oct 27",
      href: "https://analytics.fernway.app/reports/activation-weekly",
      description: "Activation by cohort, platform, and invite step.",
    },
    {
      label: "v2.14 release notes",
      source: "fernway.app/changelog · Sep 23",
      href: "https://fernway.app/changelog/v2-14",
      description: "Adds the role picker to the invite flow.",
    },
    {
      label: "Mobile sign-up funnel",
      source: "analytics.fernway.app · Oct 28",
      href: "https://analytics.fernway.app/reports/mobile-funnel",
      description: "Step-by-step drop-off for iOS and Android.",
    },
  ],
};

const tool = initialTurn.tool;

const sources = initialTurn.sources;

export function replyFor(prompt: string): Pick<ChatTurn, "answer" | "sources"> {
  const text = prompt.toLowerCase();
  if (text.includes("august") || text.includes("compare")) {
    return {
      answer: [
        {
          type: "paragraph",
          text: "Activation was 59.4% in August and is 57.6% today.",
        },
        {
          type: "list",
          items: [
            "The gap opens on Sep 24, after v2.14 shipped.",
            "August had no change to the invite step.",
            "September: 58.1% across 17,960 sign-ups.",
            "October: 57.9% across 16,240 sign-ups.",
          ],
        },
        {
          type: "paragraph",
          text: "Next step: make the role optional and watch activation for 7 days.",
        },
      ],
      sources: [sources[0], sources[2]],
    };
  }
  if (text.includes("android") || text.includes("mobile")) {
    return {
      answer: [
        {
          type: "paragraph",
          text: "Android invite completion is 39.8%, down from 44.6%.",
        },
        {
          type: "list",
          items: [
            "iOS is 47.1%, down 0.8 points.",
            "The Android sheet pushes the picker below the keyboard.",
            "Users close the sheet to reach the invite button.",
            "Desktop invite completion is 44.2%.",
          ],
        },
        {
          type: "paragraph",
          text: "Next step: move the role picker above the keyboard on Android.",
        },
      ],
      sources: [sources[2], sources[1]],
    };
  }
  if (text.includes("funnel") || text.includes("step")) {
    return {
      answer: [
        {
          type: "paragraph",
          text: "4,820 people were invited last week and 1,208 finished.",
        },
        {
          type: "list",
          items: [
            "Role picker opened: 3,140 users.",
            "Role selected: 1,950 users.",
            "Invite sent: 1,208 users.",
            "The picker loses 1,190 users, the largest drop.",
          ],
        },
        {
          type: "paragraph",
          text: "Next step: shorten the role picker step.",
        },
      ],
      sources: [
        {
          label: "Invite funnel, Sep 22 to Sep 28",
          source: "analytics.fernway.app · Oct 27",
          href: "https://analytics.fernway.app/reports/invite-funnel",
          description: "One row for each step in the invite flow.",
        },
        sources[2],
      ],
    };
  }
  return {
    answer: [
      {
        type: "paragraph",
        text: "The role picker still drives most of the change.",
      },
      {
        type: "list",
        items: [
          "Desktop invite completion: 44.2%.",
          "Android invite completion: 39.8%.",
          "iOS invite completion: 47.1%.",
          "Users who skip the role picker complete at 68.4%.",
        ],
      },
      {
        type: "paragraph",
        text: "Next step: make the role optional and measure activation.",
      },
    ],
    sources: [sources[0], sources[2]],
  };
}

export function turnFor(
  id: string,
  prompt: string,
  attachments: string[],
): ChatTurn {
  const reply = replyFor(prompt);
  return {
    id,
    prompt,
    status: "pending",
    time: "Just now",
    attachments,
    reasoning:
      "I should compare the same funnel with the week before and check the role picker step. The release notes and the mobile funnel give the context for the change.",
    duration: 9,
    tool,
    answer: reply.answer,
    sources: reply.sources,
  };
}

export function turnText(turn: ChatTurn) {
  return turn.answer
    .map((block) =>
      block.type === "paragraph"
        ? block.text
        : block.items.map((item) => `- ${item}`).join("\n"),
    )
    .join("\n\n");
}
