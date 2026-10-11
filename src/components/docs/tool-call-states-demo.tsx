"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ToolCall,
  ToolCallPanel,
  type ToolCallStatus,
  ToolCallTrigger,
} from "@/components/ui/tool-call";

export function ToolCallStatesDemo() {
  const [status, setStatus] = useState<ToolCallStatus>("running");

  return (
    <div className="grid w-full max-w-lg gap-4">
      <ToolCall defaultExpanded>
        <ToolCallTrigger
          name="read_page"
          status={status}
          summary={
            status === "error"
              ? "The page could not be loaded"
              : "Opening a source"
          }
        />
        <ToolCallPanel>
          {status === "running"
            ? "Waiting for the source to return."
            : status === "error"
              ? "The source did not respond. Choose another page or retry."
              : "The source returned its heading and expansion options."}
        </ToolCallPanel>
      </ToolCall>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          onPress={() => setStatus("running")}
        >
          Run
        </Button>
        <Button
          size="sm"
          variant="outline"
          onPress={() => setStatus("complete")}
        >
          Complete
        </Button>
        <Button size="sm" variant="outline" onPress={() => setStatus("error")}>
          Fail
        </Button>
      </div>
    </div>
  );
}
