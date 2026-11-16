import { AgentStep, AgentSteps } from "@/components/ui/agent-steps";

export function AgentStepsDemo() {
  return (
    <AgentSteps
      status="running"
      label="Checking the documentation"
      detail="Step 2 of 3"
      className="w-full max-w-md"
    >
      <AgentStep
        title="Searched the component pages"
        description="Found 3 matches"
      />
      <AgentStep status="running" title="Reading the disclosure guide" />
      <AgentStep status="pending" title="Write the answer" />
    </AgentSteps>
  );
}
