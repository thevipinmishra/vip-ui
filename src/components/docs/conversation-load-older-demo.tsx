"use client";

import { useEffect, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationLoadOlder,
} from "@/components/ui/conversation";
import { Message } from "@/components/ui/message";
import { Response, ResponseContent } from "@/components/ui/response";

interface Turn {
  prompt: string;
  answer: string;
}

const OLDER: Turn[] = [
  {
    prompt: "Did the pricing page change in October?",
    answer:
      "Yes. The page moved the usage calculator above the plan cards on Oct 10. The change moved 3,240 visitors into the calculator.",
  },
  {
    prompt: "Which plan did they pick?",
    answer:
      "Team plans took 58 percent of the calculator sessions. Personal plans took 31 percent, and 11 percent left to compare with another tool.",
  },
  {
    prompt: "Does the calculator change churn?",
    answer:
      "Not yet. Churn stayed at 2.1 percent for both months. The calculator changes how fast a team starts, not how long it stays.",
  },
];

const CURRENT: Turn[] = [
  {
    prompt: "How is activation after the pricing change?",
    answer:
      "Activation rose 2.8 points in the two weeks after Oct 10. Self-serve trials gained the most, from 48.2 to 51.4 percent.",
  },
  {
    prompt: "Is the change holding?",
    answer:
      "Yes. The last seven days read 51.1 percent, which is within a point of the week before. The lift did not fade.",
  },
  {
    prompt: "What else moved that week?",
    answer:
      "Invite sends rose 6 points and the role picker lost fewer people. Both changes share the new pricing page, so the cause is not isolated yet.",
  },
];

export function ConversationLoadOlderDemo() {
  return (
    <Conversation className="h-96 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-(--shadow-card)">
      <ConversationLoadOlderSession />
    </Conversation>
  );
}

function ConversationLoadOlderSession() {
  const [turns, setTurns] = useState(CURRENT);
  const [hasMore, setHasMore] = useState(true);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      for (const id of timers.current) window.clearTimeout(id);
    },
    [],
  );

  const load = () =>
    new Promise<void>((resolve) => {
      const id = window.setTimeout(() => {
        setTurns((current) => [...OLDER, ...current]);
        setHasMore(false);
        resolve();
      }, 900);
      timers.current.push(id);
    });

  return (
    <ConversationContent className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-6">
      <ConversationLoadOlder hasMore={hasMore} onLoad={load} />
      {turns.map((turn) => (
        <div key={turn.prompt} className="grid gap-2">
          <Message sender="You" side="outgoing">
            {turn.prompt}
          </Message>
          <Response status="complete">
            <ResponseContent>{turn.answer}</ResponseContent>
          </Response>
        </div>
      ))}
    </ConversationContent>
  );
}
