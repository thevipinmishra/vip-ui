"use client";

import { useState } from "react";
import { ArrowUp } from "reicon-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Message } from "@/components/ui/message";
import { PresenceList } from "@/components/ui/presence-list";
import { TextArea } from "@/components/ui/text-area";

type Entry = {
  id: string;
  sender: string;
  text: string;
  side: "incoming" | "outgoing";
};
const initialMessages: Entry[] = [
  {
    id: "question",
    sender: "Maya",
    text: "Can you check the release notes before Friday? The document is at https://example.org/projects/launch/release-notes-and-known-issues.",
    side: "incoming",
  },
  {
    id: "answer",
    sender: "You",
    text: "Yes. I will review the mobile screenshots and send the corrections here.",
    side: "outgoing",
  },
];

export function MessageDemo() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  return (
    <div className="grid w-full max-w-lg gap-4">
      <PresenceList
        items={messages}
        getKey={(entry) => entry.id}
        role="log"
        aria-label="Support conversation"
        aria-live="polite"
        aria-relevant="additions"
        className="gap-4"
      >
        {(entry) => (
          <Message
            sender={entry.sender}
            side={entry.side}
            avatar={
              entry.side === "incoming" ? (
                <Avatar name={entry.sender} initials="M" />
              ) : undefined
            }
            status={entry.id !== "question" ? "Local note" : undefined}
            actions={
              <CopyButton
                value={entry.text}
                label={`Copy ${entry.sender}'s message`}
                variant="ghost"
              />
            }
          >
            {entry.text}
          </Message>
        )}
      </PresenceList>
      <form
        className="grid gap-3 border-t border-border pt-4"
        onSubmit={(event) => {
          event.preventDefault();
          const text = draft.trim();
          if (!text) return;
          setMessages((current) => [
            ...current,
            { id: crypto.randomUUID(), sender: "You", text, side: "outgoing" },
          ]);
          setDraft("");
        }}
      >
        <TextArea
          label="Reply"
          rows={2}
          placeholder="Write a local note…"
          value={draft}
          onChange={setDraft}
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Enter starts a new line. Notes stay on this page.
          </p>
          <Button type="submit" size="sm" isDisabled={!draft.trim()}>
            Send note <ArrowUp size={16} aria-hidden="true" />
          </Button>
        </div>
      </form>
    </div>
  );
}
