"use client";

import { Avatar } from "@/components/ui/avatar";
import { CopyButton } from "@/components/ui/copy-button";
import { Message } from "@/components/ui/message";

type Entry = {
  id: string;
  sender: string;
  text: string;
  side: "incoming" | "outgoing" | "system";
};

const entries: Entry[] = [
  {
    id: "joined",
    sender: "Workspace",
    text: "Maya Chen joined the conversation.",
    side: "system",
  },
  {
    id: "question",
    sender: "Maya",
    text: "Can you check the release notes before Friday?",
    side: "incoming",
  },
  {
    id: "answer",
    sender: "You",
    text: "Yes. I will send the corrections here.",
    side: "outgoing",
  },
];

export function MessageDemo() {
  return (
    <div className="grid w-full max-w-lg gap-4">
      {entries.map((entry) => (
        <Message
          key={entry.id}
          sender={entry.sender}
          side={entry.side}
          avatar={
            entry.side === "incoming" ? (
              <Avatar name={entry.sender} initials="M" />
            ) : undefined
          }
          status={entry.side === "outgoing" ? "Sent" : undefined}
          actions={
            entry.side === "system" ? undefined : (
              <CopyButton
                value={entry.text}
                aria-label={`Copy ${entry.sender}'s message`}
                variant="ghost"
              />
            )
          }
        >
          {entry.text}
        </Message>
      ))}
    </div>
  );
}
