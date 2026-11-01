"use client";

import { useState } from "react";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextArea,
} from "@/components/ui/prompt-input";
import { Select } from "@/components/ui/select";

const models = [
  { id: "vip-large", name: "vip/large" },
  { id: "vip-fast", name: "vip/fast" },
];

export function PromptInputModelDemo() {
  const [model, setModel] = useState("vip-large");
  const [sentTo, setSentTo] = useState<string | null>(null);
  return (
    <div className="grid w-full max-w-md justify-items-start gap-3">
      <PromptInput
        label="Message"
        onSubmit={() =>
          setSentTo(models.find((entry) => entry.id === model)?.name ?? model)
        }
      >
        <PromptInputTextArea placeholder="Ask about a component" />
        <PromptInputFooter>
          <Select
            aria-label="Model"
            size="sm"
            options={models}
            value={model}
            onValueChange={setModel}
            className="w-36"
          />
          <PromptInputSubmit className="ms-auto" />
        </PromptInputFooter>
      </PromptInput>
      <p className="text-xs leading-5 text-muted-foreground">
        {sentTo ? `Sent to ${sentTo}.` : "Select a model, then send."}
      </p>
    </div>
  );
}
