"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TextShimmer } from "@/components/ui/text-shimmer";

const steps = ["Read the brief", "Draft the outline", "Check the sources"];

export function TextShimmerStepsDemo() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= steps.length) return;
    const timer = window.setTimeout(() => setCurrent(current + 1), 2400);
    return () => window.clearTimeout(timer);
  }, [current]);

  return (
    <div className="grid w-full max-w-xs gap-4">
      <ol className="grid gap-2 text-sm">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            <CheckIcon
              aria-hidden="true"
              className={
                index < current ? "text-foreground" : "text-transparent"
              }
            />
            {index === current ? (
              <TextShimmer>{step}</TextShimmer>
            ) : (
              <span
                className={
                  index < current ? "text-foreground" : "text-muted-foreground"
                }
              >
                {step}
              </span>
            )}
          </li>
        ))}
      </ol>
      <div>
        <Button
          size="sm"
          variant="secondary"
          isDisabled={current < steps.length}
          onPress={() => setCurrent(0)}
        >
          Run again
        </Button>
      </div>
    </div>
  );
}
