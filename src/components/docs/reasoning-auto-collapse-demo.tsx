"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Reasoning,
  ReasoningPanel,
  ReasoningTrigger,
} from "@/components/ui/reasoning";

export function ReasoningAutoCollapseDemo() {
  const [status, setStatus] = useState<"thinking" | "complete">("thinking");

  useEffect(() => {
    if (status !== "thinking") return;
    const id = window.setTimeout(() => setStatus("complete"), 3000);
    return () => window.clearTimeout(id);
  }, [status]);

  return (
    <div className="grid w-full max-w-lg justify-items-start gap-2">
      <Reasoning status={status} autoCollapse className="w-full">
        <ReasoningTrigger />
        <ReasoningPanel>
          Checking the two options against the load numbers in the issue.
        </ReasoningPanel>
      </Reasoning>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onPress={() => setStatus("thinking")}
      >
        Run again
      </Button>
    </div>
  );
}
