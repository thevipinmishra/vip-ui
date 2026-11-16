import {
  Reasoning,
  ReasoningPanel,
  ReasoningTrigger,
} from "@/components/ui/reasoning";
import { Response, ResponseContent } from "@/components/ui/response";

export function ResponseReasoningDemo() {
  return (
    <div className="grid w-full max-w-lg gap-2">
      <Reasoning status="complete" duration={8} className="w-full">
        <ReasoningTrigger />
        <ReasoningPanel>
          The question is about the composer height, so I checked the row limits
          before answering.
        </ReasoningPanel>
      </Reasoning>
      <Response status="complete" className="w-full">
        <ResponseContent>
          The composer grows one row at a time up to eight rows, then scrolls so
          Send stays in view. Dropped files show as attachments above the text.
        </ResponseContent>
      </Response>
    </div>
  );
}
