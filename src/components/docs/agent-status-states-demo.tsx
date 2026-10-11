"use client";

import { useState } from "react";
import {
  AgentStatus,
  type AgentStatusState,
} from "@/components/ui/agent-status";
import { Button } from "@/components/ui/button";

const states: Record<AgentStatusState, { label: string; detail: string }> = {
  thinking: {
    label: "Planning the next step",
    detail: "Choosing where to look",
  },
  working: {
    label: "Reading the docs",
    detail: "Opening the disclosure guide",
  },
  complete: { label: "Answer ready", detail: "Two sources attached" },
  error: {
    label: "Source unavailable",
    detail: "Try again or choose another source",
  },
};
const stateOrder: AgentStatusState[] = [
  "thinking",
  "working",
  "complete",
  "error",
];

export function AgentStatusStatesDemo() {
  const [selected, setSelected] = useState<AgentStatusState>("thinking");
  const current = states[selected];

  return (
    <div className="grid w-full max-w-md gap-4">
      <AgentStatus
        state={selected}
        label={current.label}
        detail={current.detail}
      />
      <div className="flex flex-wrap gap-2">
        {stateOrder.map((state) => (
          <Button
            key={state}
            size="sm"
            variant={selected === state ? "default" : "outline"}
            onPress={() => setSelected(state)}
            aria-pressed={selected === state}
          >
            {state === "error"
              ? "Error"
              : state === "working"
                ? "Using a tool"
                : state[0].toUpperCase() + state.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}
