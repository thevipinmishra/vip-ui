"use client";

import { useEffect, useState } from "react";
import {
  AgentStep,
  type AgentStepStatus,
  AgentSteps,
} from "@/components/ui/agent-steps";
import { Button } from "@/components/ui/button";

const steps = ["Read the invoice", "Match the purchase order", "Check totals"];

export function AgentStepsAutoCollapseDemo() {
  const [current, setCurrent] = useState(0);
  const running = current < steps.length;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setCurrent((value) => Math.min(steps.length, value + 1));
    }, 1400);
    return () => window.clearInterval(id);
  }, [running]);

  const statusFor = (index: number): AgentStepStatus =>
    index < current ? "complete" : index === current ? "running" : "pending";

  return (
    <div className="grid w-full max-w-md justify-items-start gap-2">
      <AgentSteps
        status={running ? "running" : "complete"}
        label={running ? "Checking the invoice" : "Invoice checked"}
        detail={running ? `Step ${current + 1} of 3` : "3 steps"}
        autoCollapse
        className="w-full"
      >
        {steps.map((title, index) => (
          <AgentStep key={title} title={title} status={statusFor(index)} />
        ))}
      </AgentSteps>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        isDisabled={running}
        onPress={() => setCurrent(0)}
      >
        Run again
      </Button>
    </div>
  );
}
