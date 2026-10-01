export type Message = { id: string; role: "user" | "assistant"; text: string };
export type Conversation = { id: string; title: string; messages: Message[] };

function thread(
  id: string,
  title: string,
  turns: [string, string][],
): Conversation {
  return {
    id,
    title,
    messages: turns.flatMap(([question, answer], index) => [
      { id: `${id}-u${index}`, role: "user" as const, text: question },
      { id: `${id}-a${index}`, role: "assistant" as const, text: answer },
    ]),
  };
}

export const initialConversations: Conversation[] = [
  thread("welcome", "Planning a focused morning", [
    [
      "Help me plan a focused morning. I have a design review at 11 and need to finish a draft first.",
      "Start with the draft while your attention is fresh. Give it a 75-minute block, then take 10 minutes away from the screen. Use the next 30 minutes to mark decisions you need from the review. Before 11, write down the two questions that would unblock the most work.",
    ],
    [
      "I always spend too long polishing the opening. What should I leave for later?",
      "Write a rough opening in five minutes and move on. Put a note beside anything you want to revisit, but do not edit it yet. Finish the argument and examples first. A clear opening is much easier to write when you know what the draft actually says.",
    ],
    [
      "Can you turn that into a schedule?",
      "9:00–9:05  Rough opening\n9:05–10:10  Draft the main argument and examples\n10:10–10:20  Break\n10:20–10:45  Mark open decisions and prepare review questions\n10:45–11:00  Read through once, then join the review\n\nIf the draft runs long, keep the last 15 minutes for review prep. Go in with questions rather than a perfect document.",
    ],
  ]),
  thread("project-update", "Weekly project update", [
    [
      "Write a concise update for the team. The onboarding screens are approved, but the empty states still need copy.",
      "Onboarding screens are approved and ready for implementation. The remaining content work is the empty-state copy. I will share a first pass for review before the next handoff.",
    ],
    [
      "Make it a little more specific. The handoff is Thursday and we need feedback by Wednesday noon.",
      "Onboarding screens are approved and ready for implementation. I am finishing the empty-state copy and will share it for review by Wednesday morning. Please add feedback by noon Wednesday so I can include changes in Thursday's handoff.",
    ],
  ]),
  thread("reading-app", "Names for a reading app", [
    [
      "I need a name for a quiet reading app that saves passages and notes. Nothing too clever.",
      "A few directions: Margin, Folio, Dogear, and Underline. Margin feels spacious and works well for both notes and highlights. Folio is shorter and more bookish. Check trademarks and domains before choosing one.",
    ],
    [
      "I like Margin. What might a one-line description be?",
      "Margin keeps the passages you want to return to, with room for your own notes.\n\nFor a shorter version: Save what you read. Remember why it mattered.",
    ],
  ]),
  thread("design-review", "Explaining a design decision", [
    [
      "How do I explain why we kept the primary action visible while scrolling?",
      "Lead with the job it does: people may decide to act anywhere on the page. Keeping the action visible avoids a trip back to the top. The tradeoff is less screen space, so the bar should stay compact and never cover the content.",
    ],
    [
      "Can you phrase that for a design review?",
      "We kept the primary action visible because people reach a decision at different points in the page. A compact sticky bar lets them act when they are ready, without scrolling back to the start. We will check on small screens that it does not obscure the content or compete with navigation.",
    ],
    [
      "What would you measure after launch?",
      "Track where people are on the page when they use the action, along with completion rate and accidental taps on mobile. If most use it near the top, the persistent bar may not earn its space. Pair the numbers with a few session reviews to see whether it interrupts reading.",
    ],
  ]),
  thread("meeting-notes", "Turning notes into next steps", [
    [
      "I have rough meeting notes: revise pricing copy, confirm the legal review, and share the new timeline. How should I organize the follow-up?",
      "Separate decisions from actions so the team can scan it.\n\nDecisions: The pricing page needs clearer plan language. The launch date is still pending legal review.\n\nNext steps: Assign an owner and due date for the copy revision, confirm who will request legal sign-off, then send the revised timeline once that date is known.",
    ],
    [
      "Write a short message I can send to the group.",
      "Thanks for the discussion. I will revise the pricing copy and share it for review. Could someone confirm the owner and expected date for legal sign-off? Once we have that, I will circulate an updated launch timeline.",
    ],
  ]),
];

export const suggestions = [
  { label: "Plan a focused day", prompt: "Help me plan my day" },
  { label: "Write a project update", prompt: "Draft a short project update" },
  { label: "Explain a design choice", prompt: "Explain a design decision" },
  { label: "Find a name", prompt: "Brainstorm names for a reading app" },
];

export function replyFor(input: string) {
  const prompt = input.toLowerCase();
  if (prompt.includes("plan") || prompt.includes("day"))
    return "Pick the one outcome that would make today feel complete. Block 60 to 90 minutes for it before meetings, then leave a short buffer for messages and loose ends. What deadline should the plan work around?";
  if (prompt.includes("update") || prompt.includes("draft"))
    return "Here is a starting point:\n\nThe first pass is complete and we are checking the remaining questions. Next, we will review feedback and share a revised version. I will flag any changes to the timeline when we know more.\n\nReplace the general details with your project's specifics before sending.";
  if (prompt.includes("design") || prompt.includes("decision"))
    return "Name the constraint first, then the tradeoff. For instance: We kept the primary action visible because people need it throughout the page. This takes up some space, but removes a repeated trip back to the top. Which decision are you documenting?";
  if (prompt.includes("name") || prompt.includes("reading"))
    return "A few directions: Margin, Folio, Dogear, and Underline. Check trademark and domain availability before choosing one. Should the name feel quiet and literary or more playful?";
  return "I can't respond to that request here. This workspace has prewritten replies for planning, project updates, design decisions, and naming. No AI service is connected.";
}
