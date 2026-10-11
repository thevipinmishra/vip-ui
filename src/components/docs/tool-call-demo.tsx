"use client";

import {
  ToolCall,
  ToolCallPanel,
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
        <p className="text-xs font-medium text-muted-foreground">Input</p>
        <pre className="mt-1 overflow-x-auto rounded-md bg-muted/60 p-3 font-mono text-xs leading-5">
          {`{ "query": "disclosure expansion" }`}
        </pre>
        <p className="mt-3 text-xs font-medium text-muted-foreground">Output</p>
        <p className="mt-1">
          Disclosure supports controlled and default expanded state.
        </p>
      </ToolCallPanel>
    </ToolCall>
  );
}
