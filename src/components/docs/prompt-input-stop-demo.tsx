"use client";

import { useEffect, useRef, useState } from "react";
import { PromptInput } from "@/components/ui/prompt-input";
import {
  Response,
  ResponseContent,
  ResponseNotice,
  type ResponseStatus,
} from "@/components/ui/response";

const WORDS =
  "The new composer grows with the prompt, accepts dropped files, and keeps Send in view while the text scrolls. Stop ends a run at once, and the draft stays in place for the next prompt.".split(
    " ",
  );

export function PromptInputStopDemo() {
  const [draft, setDraft] = useState("Write a release note for the composer");
  const [status, setStatus] = useState<ResponseStatus | null>(null);
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const isPending = status === "streaming";

  useEffect(() => {
    if (!isPending) return;
    const id = window.setInterval(() => {
      if (countRef.current >= WORDS.length) {
        setStatus("complete");
        return;
      }
      countRef.current += 1;
      setCount(countRef.current);
    }, 90);
    return () => window.clearInterval(id);
  }, [isPending]);

  const start = () => {
    countRef.current = 0;
    setCount(0);
    setStatus("streaming");
  };

  return (
    <div className="grid w-full max-w-md gap-4">
      {status && (
        <Response status={status}>
          <ResponseContent>{WORDS.slice(0, count).join(" ")}</ResponseContent>
          <ResponseNotice />
        </Response>
      )}
      <PromptInput
        label="Message"
        placeholder="Ask for a draft"
        value={draft}
        onChange={setDraft}
        isPending={isPending}
        onSubmit={start}
        onStop={() => setStatus("stopped")}
      />
    </div>
  );
}
