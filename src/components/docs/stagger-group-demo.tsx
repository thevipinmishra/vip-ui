"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger-group";

const words = ["Type", "Form", "Light"];

export function StaggerGroupDemo() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="grid w-full max-w-md gap-4">
      <StaggerGroup
        key={replay}
        as="ul"
        trigger="mount"
        className="grid grid-cols-3 gap-2"
      >
        {words.map((word) => (
          <StaggerItem
            as="li"
            key={word}
            className="grid min-h-32 content-between rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:p-4"
          >
            <span
              aria-hidden="true"
              className="h-1 w-7 rounded-full bg-primary"
            />
            <span className="min-w-0 text-lg font-semibold tracking-tight sm:text-xl">
              {word}
            </span>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <div>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setReplay((value) => value + 1)}
        >
          Replay
        </Button>
      </div>
    </div>
  );
}
