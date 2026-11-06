"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptInput } from "@/components/ui/prompt-input";

const suggestions = [
  "Summarize this week's changes",
  "Draft a reply to the review",
  "Explain the failing test",
];

export function PromptInputSuggestionsDemo() {
  const [draft, setDraft] = useState("");

  return (
    <div className="grid w-full max-w-md gap-3">
      <PromptInput
        label="Message"
        placeholder="Ask anything"
        value={draft}
        onChange={setDraft}
        onSubmit={() => setDraft("")}
      />
      <ul aria-label="Suggestions" className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <li key={suggestion} className="min-w-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="max-w-full rounded-full"
              onPress={() => setDraft(suggestion)}
            >
              {suggestion}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
