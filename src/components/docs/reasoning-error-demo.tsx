import {
  Reasoning,
  ReasoningPanel,
  ReasoningTrigger,
} from "@/components/ui/reasoning";

export function ReasoningErrorDemo() {
  return (
    <Reasoning status="error" defaultExpanded className="w-full max-w-lg">
      <ReasoningTrigger />
      <ReasoningPanel>
        The provider stopped responding before the model finished. Retry the
        request.
      </ReasoningPanel>
    </Reasoning>
  );
}
