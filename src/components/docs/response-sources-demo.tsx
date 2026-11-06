import {
  Reasoning,
  ReasoningPanel,
  ReasoningTrigger,
} from "@/components/ui/reasoning";
import {
  Response,
  ResponseContent,
  ResponseFooter,
} from "@/components/ui/response";
import { SourceLink } from "@/components/ui/source-link";

export function ResponseSourcesDemo() {
  return (
    <div className="grid w-full max-w-lg gap-2">
      <Reasoning status="complete" duration={8} className="w-full">
        <ReasoningTrigger />
        <ReasoningPanel>
          Checked the registry files before answering.
        </ReasoningPanel>
      </Reasoning>
      <Response status="complete" className="w-full">
        <ResponseContent>
          The composer grows one row at a time up to eight rows, then scrolls so
          Send stays in view. Dropped files show as attachments above the text.
        </ResponseContent>
        <ResponseFooter>
          <SourceLink
            href="https://vip-ui.dev/components/prompt-input"
            label="Prompt input"
            source="vip/ui"
            index={1}
          />
          <SourceLink
            href="https://vip-ui.dev/components/attachment"
            label="Attachment"
            source="vip/ui"
            index={2}
          />
        </ResponseFooter>
      </Response>
    </div>
  );
}
