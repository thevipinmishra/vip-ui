"use client";

import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ToolCall,
  ToolCallCode,
  ToolCallPanel,
  ToolCallSection,
  type ToolCallStatus,
  ToolCallTrigger,
} from "@/components/ui/tool-call";

const steps = [
  {
    name: "list_files",
    summary: "src/components",
    output: "42 files",
  },
  {
    name: "read_file",
    summary: "button.tsx",
    output: "68 lines",
  },
  {
    name: "run_tests",
    summary: "button.test.tsx",
    output: "12 passed",
  },
];

export function ToolCallSequenceDemo() {
  const [done, setDone] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (done >= steps.length) return;
    const timer = window.setTimeout(() => setDone((count) => count + 1), 1400);
    return () => window.clearTimeout(timer);
  }, [done]);

  return (
    <div className="grid w-full max-w-lg gap-2">
      {steps.map((step, index) => {
        if (index > done) return null;
        const status: ToolCallStatus = index < done ? "complete" : "running";
        return (
          <ToolCall
            key={`${run}-${step.name}`}
            className="transition-[opacity,translate] duration-300 ease-out-quint starting:opacity-0 motion-safe:starting:translate-y-1"
          >
            <ToolCallTrigger
              name={step.name}
              status={status}
              summary={step.summary}
            />
            <ToolCallPanel>
              <ToolCallSection label="Output">
                <ToolCallCode>
                  {status === "complete" ? step.output : "Waiting"}
                </ToolCallCode>
              </ToolCallSection>
            </ToolCallPanel>
          </ToolCall>
        );
      })}
      <div className="mt-1">
        <Button
          variant="ghost"
          size="sm"
          onPress={() => {
            setDone(0);
            setRun((count) => count + 1);
          }}
        >
          <ArrowCounterClockwiseIcon aria-hidden="true" />
          Replay
        </Button>
      </div>
    </div>
  );
}
