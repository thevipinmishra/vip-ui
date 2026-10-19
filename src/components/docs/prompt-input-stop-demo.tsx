"use client";

import { useEffect, useRef, useState } from "react";
import { PromptInput } from "@/components/ui/prompt-input";

const REPLY =
  "Release notes summarize what changed for the people who install it.";
const WORDS = REPLY.split(" ");

export function PromptInputStopDemo() {
  const [draft, setDraft] = useState("Draft a release note for the composer.");
  const [reply, setReply] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [stopped, setStopped] = useState(false);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    if (!isPending) return;
    const id = window.setInterval(() => {
      const index = wordIndexRef.current;
      if (index >= WORDS.length) {
        setIsPending(false);
        return;
      }
      wordIndexRef.current = index + 1;
      setReply((current) =>
        current ? `${current} ${WORDS[index]}` : WORDS[index],
      );
    }, 120);
    return () => window.clearInterval(id);
  }, [isPending]);

  const start = () => {
    wordIndexRef.current = 0;
    setReply("");
    setStopped(false);
    setIsPending(true);
  };

  return (
    <div className="grid w-full max-w-md justify-items-start gap-3">
      {reply && (
        <p className="text-sm leading-6" data-testid="reply">
          {reply}
          {isPending && "…"}
          {!isPending && stopped && (
            <span className="ms-2 text-xs text-muted-foreground">Stopped</span>
          )}
        </p>
      )}
      <PromptInput
        label="Message"
        value={draft}
        onChange={setDraft}
        isPending={isPending}
        placeholder="Ask for a draft"
        onSubmit={start}
        onStop={() => {
          setStopped(true);
          setIsPending(false);
        }}
      />
      <p className="text-xs leading-5 text-muted-foreground">
        While the answer streams, Send becomes Stop.
      </p>
    </div>
  );
}
