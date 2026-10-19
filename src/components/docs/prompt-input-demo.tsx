"use client";

import { useState } from "react";
import { PromptInput } from "@/components/ui/prompt-input";

export function PromptInputDemo() {
  const [sent, setSent] = useState<string[]>([]);
  return (
    <div className="grid w-full max-w-md justify-items-start gap-3">
      <PromptInput
        label="Message"
        placeholder="Ask about a component"
        onSubmit={(value) => setSent((current) => [...current, value])}
      />
      <p className="text-xs leading-5 text-muted-foreground">
        {sent.length === 0
          ? "Press Enter or Send to try it. Shift+Enter adds a line."
          : `Last prompt: ${sent[sent.length - 1]}`}
      </p>
    </div>
  );
}
