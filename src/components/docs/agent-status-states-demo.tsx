import { AgentStatus } from "@/components/ui/agent-status";

export function AgentStatusStatesDemo() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <AgentStatus
        state="thinking"
        label="Planning the next step"
        detail="Choosing where to look"
      />
      <AgentStatus
        state="working"
        label="Reading the docs"
        detail="Opening the disclosure guide"
      />
      <AgentStatus
        state="complete"
        label="Answer ready"
        detail="Two sources attached"
      />
      <AgentStatus
        state="error"
        label="Source unavailable"
        detail="Try again or choose another source"
      />
    </div>
  );
}
