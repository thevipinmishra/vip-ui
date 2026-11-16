"use client";

import { ChatCircleDotsIcon } from "@phosphor-icons/react";
import { useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmpty,
  useConversation,
} from "@/components/ui/conversation";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Message } from "@/components/ui/message";
import { PromptInput } from "@/components/ui/prompt-input";
import { Response, ResponseContent } from "@/components/ui/response";

const ANSWER =
  "Activation rose 2.8 points after the pricing page moved the calculator above the plan cards. Self-serve trials gained the most, from 48.2 to 51.4 percent, and the lift held for two weeks.";

export function ConversationEmptyDemo() {
  return (
    <Conversation className="h-96 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-(--shadow-card)">
      <ConversationEmptySession />
    </Conversation>
  );
}

function ConversationEmptySession() {
  const { scrollToLatest } = useConversation();
  const [draft, setDraft] = useState("");
  const [prompt, setPrompt] = useState<string | null>(null);

  const send = (value: string) => {
    const next = value.trim();
    if (!next) return;
    setPrompt(next);
    setDraft("");
    scrollToLatest();
  };

  return (
    <>
      <ConversationContent className="mx-auto grid min-h-full w-full max-w-3xl gap-6 px-4 py-6">
        <ConversationEmpty>
          <EmptyState className="max-w-sm border-0 px-0 py-0">
            <EmptyStateIcon>
              <ChatCircleDotsIcon aria-hidden="true" />
            </EmptyStateIcon>
            <EmptyStateTitle>Ask about this week</EmptyStateTitle>
            <EmptyStateDescription>
              Fernway reads the last 30 days of product data and links each
              number to its source.
            </EmptyStateDescription>
          </EmptyState>
        </ConversationEmpty>
        {prompt && (
          <div className="grid gap-2">
            <Message sender="You" side="outgoing">
              {prompt}
            </Message>
            <Response status="complete" className="ms-11">
              <ResponseContent>{ANSWER}</ResponseContent>
            </Response>
          </div>
        )}
      </ConversationContent>
      <div className="border-t border-border p-2">
        <PromptInput
          label="Message"
          placeholder="Ask about activation, invites, or revenue"
          value={draft}
          onChange={setDraft}
          onSubmit={send}
        />
      </div>
    </>
  );
}
