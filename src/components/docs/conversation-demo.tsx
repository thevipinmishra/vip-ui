"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  useConversation,
} from "@/components/ui/conversation";
import { Message } from "@/components/ui/message";
import { Response, ResponseContent } from "@/components/ui/response";

const TURNS = [
  {
    prompt: "Why did activation drop last week?",
    answer:
      "Activation fell from 61.8% to 57.6% on Sep 24, one day after v2.14 shipped. The new role picker adds a step before the invite screen.",
  },
  {
    prompt: "Which plan is affected most?",
    answer:
      "Team plans fell 6.2 points. Personal plans moved 0.4 points, which is inside the normal weekly range.",
  },
  {
    prompt: "Show the invite funnel",
    answer:
      "1,842 people opened the invite screen and 1,196 sent an invite. The picker step loses 214 people who never choose a role.",
  },
  {
    prompt: "Is the drop still falling?",
    answer:
      "No. The last three weeks read 57.1, 58.4, and 58.9 percent, so the floor is flat and slowly recovering.",
  },
  {
    prompt: "What should we change first?",
    answer:
      "Prefill the role from the invite link and keep the picker as an edit. That removes one decision from the path.",
  },
];

const FOLLOW_UP = "Which segment grew the fastest?";
const FOLLOW_UP_ANSWER =
  "Self-serve trials grew 12.4 percent, the fastest of any segment. Enterprise pilots added six accounts. Mid-market activation stayed flat at 41.2 percent, and the growth starts on Oct 12, two days after the pricing page changed.";
const FOLLOW_UP_WORDS = FOLLOW_UP_ANSWER.split(" ");

export function ConversationDemo() {
  return (
    <Conversation className="h-96 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-(--shadow-card)">
      <ConversationSession />
    </Conversation>
  );
}

function ConversationSession() {
  const { scrollToLatest } = useConversation();
  const [sending, setSending] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const streaming = sending && revealed < FOLLOW_UP_WORDS.length;

  useEffect(() => {
    if (!sending || revealed >= FOLLOW_UP_WORDS.length) return;
    const id = window.setTimeout(() => setRevealed((count) => count + 1), 60);
    return () => window.clearTimeout(id);
  }, [revealed, sending]);

  const send = () => {
    setSending(true);
    setRevealed(1);
    scrollToLatest();
  };

  return (
    <>
      <ConversationContent className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-6">
        {TURNS.map((turn) => (
          <div key={turn.prompt} className="grid gap-2">
            <Message sender="You" side="outgoing">
              {turn.prompt}
            </Message>
            <Response status="complete" className="ms-11">
              <ResponseContent>{turn.answer}</ResponseContent>
            </Response>
          </div>
        ))}
        {sending && (
          <div className="grid gap-2">
            <Message sender="You" side="outgoing">
              {FOLLOW_UP}
            </Message>
            <Response
              status={streaming ? "streaming" : "complete"}
              className="ms-11"
            >
              <ResponseContent>
                {FOLLOW_UP_WORDS.slice(0, revealed).join(" ")}
              </ResponseContent>
            </Response>
          </div>
        )}
      </ConversationContent>
      <div className="flex items-center gap-3 border-t border-border px-4 py-2">
        <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
          {FOLLOW_UP}
        </p>
        <Button size="sm" isDisabled={streaming} onPress={send}>
          Send
        </Button>
      </div>
    </>
  );
}
