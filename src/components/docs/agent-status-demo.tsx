"use client";

import { AgentStatus } from "@/components/ui/agent-status";

export function AgentStatusDemo() {
  return (
    <AgentStatus
      className="w-full max-w-md"
      label="Checking the documentation"
      detail="Searching for the relevant section"
      state="working"
    />
  );
}
