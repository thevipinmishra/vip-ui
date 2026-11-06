"use client";

import { GlobeIcon } from "@phosphor-icons/react";
import { useState } from "react";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextArea,
} from "@/components/ui/prompt-input";
import { Select } from "@/components/ui/select";
import { ToggleButton } from "@/components/ui/toggle-button";

const models = [
  { id: "auto", name: "Auto" },
  { id: "fast", name: "Fast" },
  { id: "deep", name: "Deep" },
];

export function PromptInputActionsDemo() {
  const [model, setModel] = useState("auto");
  const [webSearch, setWebSearch] = useState(false);

  return (
    <PromptInput label="Message" className="max-w-md">
      <PromptInputTextArea placeholder="Ask anything" />
      <PromptInputFooter>
        <ToggleButton
          variant="ghost"
          size="sm"
          isSelected={webSearch}
          onChange={setWebSearch}
        >
          <GlobeIcon aria-hidden="true" />
          Search
        </ToggleButton>
        <Select
          aria-label="Model"
          size="sm"
          options={models}
          value={model}
          onValueChange={setModel}
          className="ms-auto w-28"
        />
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  );
}
