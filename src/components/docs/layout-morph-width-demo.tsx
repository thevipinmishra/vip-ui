"use client";

import { CheckIcon, WarningIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { LayoutMorph } from "@/components/ui/layout-morph";
import { Spinner } from "@/components/ui/spinner";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const states = {
  saved: { name: "Saved", label: "Saved" },
  saving: { name: "Saving", label: "Saving changes" },
  failed: { name: "Failed", label: "Could not save. Check your connection." },
} as const;

type State = keyof typeof states;

export function LayoutMorphWidthDemo() {
  const [state, setState] = useState<State>("saved");

  return (
    <div className="grid w-full max-w-sm justify-items-center gap-4">
      <LayoutMorph
        aria-live="polite"
        contentKey={state}
        className="w-fit max-w-full rounded-full border border-border bg-card px-3.5 py-1.5 text-sm shadow-(--shadow-card)"
      >
        <span className="flex items-center gap-2 whitespace-nowrap">
          {state === "saved" && (
            <CheckIcon
              size={14}
              weight="bold"
              aria-hidden="true"
              className="text-success"
            />
          )}
          {state === "saving" && <Spinner size="xs" decorative />}
          {state === "failed" && (
            <WarningIcon
              size={14}
              weight="bold"
              aria-hidden="true"
              className="text-destructive"
            />
          )}
          {states[state].label}
        </span>
      </LayoutMorph>
      <ToggleButtonGroup
        aria-label="Save state"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[state]}
        onSelectionChange={(keys) => {
          const [key] = keys;
          if (key === "saved" || key === "saving" || key === "failed")
            setState(key);
        }}
      >
        {Object.entries(states).map(([id, { name }]) => (
          <ToggleButton key={id} id={id} variant="segmented">
            {name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
