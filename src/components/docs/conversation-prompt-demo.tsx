"use client";

import { useEffect, useState } from "react";
import {
  Conversation,
  ConversationContent,
  useConversation,
} from "@/components/ui/conversation";
import { Message } from "@/components/ui/message";
import { PromptInput } from "@/components/ui/prompt-input";
import { Response, ResponseContent } from "@/components/ui/response";

const REPLY =
  "Northwind Labs and Beacon Health both invite from the team page. Together they send 18 percent of all invites, and both teams started in September.";

interface Turn {
  prompt: string;
  answer: string;
  revealed: number;
}

const wordCount = (text: string) => text.split(" ").length;

const INITIAL: Turn[] = [
  {
    prompt: "Who sends the most invites?",
    answer:
      "Northwind Labs sent 118 invites from 14 seats. Beacon Health sent 96 invites, and both teams started in September.",
  },
  {
    prompt: "Do those invites convert?",
    answer:
      "Yes. 71 percent of Northwind invites reached an active seat, against a 58 percent average for team plans.",
  },
].map((turn) => ({ ...turn, revealed: wordCount(turn.answer) }));

export function ConversationPromptDemo() {
  return (
    <Conversation className="h-96 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-(--shadow-card)">
      <ConversationPromptSession />
    </Conversation>
  );
}

function ConversationPromptSession() {
  const { scrollToLatest } = useConversation();
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState(INITIAL);

  const last = turns[turns.length - 1];
  const lastWords = last ? wordCount(last.answer) : 0;
  const streaming = Boolean(last && last.revealed < lastWords);

  useEffect(() => {
    if (!last || last.revealed >= lastWords) return;
    const id = window.setTimeout(() => {
      setTurns((current) =>
        current.map((turn, index) =>
          index === current.length - 1
            ? { ...turn, revealed: turn.revealed + 1 }
            : turn,
        ),
      );
    }, 60);
    return () => window.clearTimeout(id);
  }, [last, lastWords]);

  const send = (value: string) => {
    const prompt = value.trim();
    if (!prompt) return;
    setTurns((current) => [...current, { prompt, answer: REPLY, revealed: 0 }]);
    setDraft("");
    scrollToLatest();
  };

  return (
    <>
      <ConversationContent className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-6">
        {turns.map((turn) => {
          const words = turn.answer.split(" ");
          const pending = turn.revealed < words.length;
          return (
            <div key={turn.prompt} className="grid gap-2">
              <Message sender="You" side="outgoing">
                {turn.prompt}
              </Message>
              <Response status={pending ? "streaming" : "complete"}>
                <ResponseContent>
                  {words.slice(0, turn.revealed).join(" ")}
                </ResponseContent>
              </Response>
            </div>
          );
        })}
      </ConversationContent>
      <div className="border-t border-border p-2">
        <PromptInput
          label="Message"
          placeholder="Ask a follow-up"
          value={draft}
          onChange={setDraft}
          onSubmit={send}
          isPending={streaming}
        />
      </div>
    </>
  );
}
