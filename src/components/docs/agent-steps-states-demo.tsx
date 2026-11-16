import { AgentStep, AgentSteps } from "@/components/ui/agent-steps";

export function AgentStepsStatesDemo() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <AgentSteps status="stopped" label="Run stopped" defaultExpanded>
        <AgentStep title="Read the invoice" />
        <AgentStep
          status="stopped"
          title="Match the purchase order"
          description="Stopped by you"
        />
      </AgentSteps>
      <AgentSteps status="error" label="Run failed" defaultExpanded>
        <AgentStep title="Read the invoice" />
        <AgentStep
          status="error"
          title="Match the purchase order"
          description="PO-4471 was not found"
        />
      </AgentSteps>
    </div>
  );
}
