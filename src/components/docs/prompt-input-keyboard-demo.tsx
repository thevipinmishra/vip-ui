"use client";

import { useState } from "react";
import { PromptInput } from "@/components/ui/prompt-input";

export function PromptInputKeyboardDemo() {
  const [sent, setSent] = useState<string[]>([]);
  const record = (value: string) => setSent((current) => [...current, value]);
  return (
    <div className="grid w-full max-w-md justify-items-start gap-4">
      <div className="grid w-full gap-2">
        <p className="text-xs leading-5 text-muted-foreground">
          Enter sends. Shift+Enter adds a line. This is the default.
        </p>
        <PromptInput
          label="Message"
          placeholder="Enter to send"
          onSubmit={record}
        />
      </div>
      <div className="grid w-full gap-2">
        <p className="text-xs leading-5 text-muted-foreground">
          Mod+Enter sends. Enter adds a line. Use this for a multi-line editor.
        </p>
        <PromptInput
          label="Message"
          placeholder="Mod+Enter to send"
          submitKey="mod+enter"
          onSubmit={record}
        />
      </div>
      {sent.length > 0 && (
        <p className="text-xs leading-5 text-muted-foreground">
          Sent {sent.length} {sent.length === 1 ? "prompt" : "prompts"}.
        </p>
      )}
    </div>
  );
}
