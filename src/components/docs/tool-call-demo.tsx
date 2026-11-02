"use client";

import {
  ToolCall,
  ToolCallCode,
  ToolCallPanel,
  ToolCallSection,
  ToolCallTrigger,
} from "@/components/ui/tool-call";

export function ToolCallDemo() {
  return (
    <ToolCall defaultExpanded className="w-full max-w-lg">
      <ToolCallTrigger
        name="search_docs"
        status="complete"
        summary="Found the disclosure guide"
      />
      <ToolCallPanel>
        <ToolCallSection label="Input">
          <ToolCallCode>{`{ "query": "disclosure expansion" }`}</ToolCallCode>
        </ToolCallSection>
        <ToolCallSection label="Output">
          <p>Disclosure supports controlled and default expanded state.</p>
        </ToolCallSection>
      </ToolCallPanel>
    </ToolCall>
  );
}
