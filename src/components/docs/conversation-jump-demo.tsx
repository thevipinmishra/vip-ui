"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationJump,
} from "@/components/ui/conversation";
import { Message } from "@/components/ui/message";
import { Response, ResponseContent } from "@/components/ui/response";

const SCRIPT = [
  {
    prompt: "How many invites went out this week?",
    answer:
      "Teams sent 1,196 invites this week, up from 1,048 last week. The invite screen converts 64.9 percent of the people who open it.",
  },
  {
    prompt: "Which team sends the most invites?",
    answer:
      "Northwind Labs sent 118 invites across 14 seats. Beacon Health follows with 96 invites, and both teams joined in September.",
  },
  {
    prompt: "Did the reminder email help?",
    answer:
      "Yes. Invites sent within a day of the reminder rose 18 points. The reminder goes out on day three, when interest is still high.",
  },
  {
    prompt: "Where do invites get stuck?",
    answer:
      "Most stuck invites wait on the role picker. 214 people opened the screen, chose no role, and closed the tab before the invite sent.",
  },
  {
    prompt: "Can we test a prefilled role?",
    answer:
      "Yes. Start with the Sales role on team invites, keep the picker editable, and compare the send rate over two weeks before a wider rollout.",
  },
  {
    prompt: "Which role should we prefill?",
    answer:
      "Sales. It is the role that 42 percent of invited seats choose, and it is the first option in the current list on 8 of 10 team invites.",
  },
];

interface Line {
  prompt: string;
  answer: string;
  revealed: number;
}

const wordCount = (text: string) => text.split(" ").length;
const initialLines: Line[] = SCRIPT.slice(0, 4).map((turn) => ({
  ...turn,
  revealed: wordCount(turn.answer),
}));

export function ConversationJumpDemo() {
  const [started, setStarted] = useState(false);
  const [lines, setLines] = useState(initialLines);
  const last = lines[lines.length - 1];
  const revealing = last.revealed < wordCount(last.answer);
  const running = started && (revealing || lines.length < SCRIPT.length);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(
      () => {
        setLines(
          revealing
            ? [...lines.slice(0, -1), { ...last, revealed: last.revealed + 1 }]
            : [...lines, { ...SCRIPT[lines.length], revealed: 0 }],
        );
      },
      revealing ? 50 : 1800,
    );
    return () => window.clearTimeout(id);
  }, [last, lines, revealing, running]);

  return (
    <div className="grid w-full max-w-xl justify-items-start gap-2">
      <Conversation className="h-96 w-full overflow-hidden rounded-xl border border-border bg-card shadow-(--shadow-card)">
        <ConversationContent className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-6">
          {lines.map((line) => {
            const words = line.answer.split(" ");
            const streaming = line.revealed < words.length;
            return (
              <div key={line.prompt} className="grid gap-2">
                <Message sender="You" side="outgoing">
                  {line.prompt}
                </Message>
                <Response status={streaming ? "streaming" : "complete"}>
                  <ResponseContent>
                    {words.slice(0, line.revealed).join(" ")}
                  </ResponseContent>
                </Response>
              </div>
            );
          })}
        </ConversationContent>
        <ConversationJump />
      </Conversation>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        isPending={running}
        onPress={() => {
          setLines(initialLines);
          setStarted(true);
        }}
      >
        Stream replies
      </Button>
    </div>
  );
}
