"use client";

import { SlidersHorizontalIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  return (
    <PromptInput
      label="Message"
      className="w-full max-w-md"
      onSubmit={() =>
        setModel(model === "vip-large" ? "vip-fast" : "vip-large")
      }
    >
      <PromptInputTextArea
        aria-label="Message"
        placeholder="Send to flip the model"
      />
      <PromptInputFooter>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Settings"
        >
          <SlidersHorizontalIcon aria-hidden="true" />
        </Button>
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
  );
}
