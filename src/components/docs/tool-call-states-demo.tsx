"use client";

import { useState } from "react";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import {
  ToolCall,
  ToolCallPanel,
  type ToolCallStatus,
  ToolCallTrigger,
} from "@/components/ui/tool-call";

const statuses: Record<
  ToolCallStatus,
  { name: string; summary: string; output: string }
> = {
  running: {
    name: "Running",
    summary: "Loading the page",
    output: "Waiting for a response.",
  },
  complete: {
    name: "Complete",
    summary: "Read 1 page",
    output: "The page has 4 sections and 2 code examples.",
  },
  error: {
    name: "Error",
    summary: "The page did not load",
    output: "The server did not respond. Try again.",
  },
};

function isStatus(key: unknown): key is ToolCallStatus {
  return typeof key === "string" && key in statuses;
}

export function ToolCallStatesDemo() {
  const [status, setStatus] = useState<ToolCallStatus>("running");
  const { summary, output } = statuses[status];

  return (
    <div className="grid w-full max-w-lg gap-3">
      <ToolCall defaultExpanded>
        <ToolCallTrigger name="read_page" status={status} summary={summary} />
        <ToolCallPanel>{output}</ToolCallPanel>
      </ToolCall>
      <ToggleButtonGroup
        aria-label="Status"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[status]}
        onSelectionChange={(keys) => {
          const [key] = keys;
          if (isStatus(key)) setStatus(key);
        }}
      >
        {Object.entries(statuses).map(([id, { name }]) => (
          <ToggleButton key={id} id={id} variant="segmented">
            {name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
