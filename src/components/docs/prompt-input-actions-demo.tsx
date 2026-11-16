"use client";

import { GlobeIcon, PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextArea,
} from "@/components/ui/prompt-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ToggleButton } from "@/components/ui/toggle-button";

const models = [
  { id: "auto", name: "Auto", description: "Picks a model for each prompt" },
  { id: "fast", name: "Fast", description: "Short answers in seconds" },
  { id: "deep", name: "Deep", description: "Checks more sources" },
];

export function PromptInputActionsDemo() {
  const [model, setModel] = useState("auto");
  const [webSearch, setWebSearch] = useState(false);

  return (
    <PromptInput label="Message" className="max-w-md">
      <PromptInputTextArea placeholder="Ask anything" />
      <PromptInputFooter>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Add files"
        >
          <PlusIcon aria-hidden="true" />
        </Button>
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
          value={model}
          onValueChange={setModel}
          className="ms-auto w-auto"
        >
          <SelectTrigger className="border-transparent bg-transparent text-muted-foreground shadow-none hover:border-transparent hover:bg-muted hover:text-foreground" />
          <SelectContent placement="top end" className="w-60">
            {models.map((option) => (
              <SelectItem
                key={option.id}
                id={option.id}
                textValue={option.name}
              >
                <span className="min-w-0">
                  <span className="block font-medium">{option.name}</span>
                  <span className="block text-xs text-muted-foreground group-selected/item:text-accent-foreground">
                    {option.description}
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  );
}
