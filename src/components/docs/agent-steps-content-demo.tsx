import { AgentStep, AgentSteps } from "@/components/ui/agent-steps";
import { Badge } from "@/components/ui/badge";
import {
  ToolCall,
  ToolCallCode,
  ToolCallPanel,
  ToolCallSection,
  ToolCallTrigger,
} from "@/components/ui/tool-call";

export function AgentStepsContentDemo() {
  return (
    <AgentSteps
      status="complete"
      label="Researched in 2 steps"
      defaultExpanded
      className="w-full max-w-md"
    >
      <AgentStep title="Searched the web">
        <div className="flex flex-wrap gap-1.5">
          <Badge>react-spectrum.adobe.com</Badge>
          <Badge>developer.mozilla.org</Badge>
        </div>
      </AgentStep>
      <AgentStep title="Ran a query">
        <ToolCall>
          <ToolCallTrigger
            name="query_metrics"
            status="complete"
            summary="12 rows"
          />
          <ToolCallPanel>
            <ToolCallSection label="Input">
              <ToolCallCode>{`{ "metric": "signups", "days": 7 }`}</ToolCallCode>
            </ToolCallSection>
          </ToolCallPanel>
        </ToolCall>
      </AgentStep>
    </AgentSteps>
  );
}
