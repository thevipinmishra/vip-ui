"use client";

import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { TextLoop } from "@/components/ui/text-loop";
import { ToggleButton } from "@/components/ui/toggle-button";

const tips = [
  "Press / to search.",
  "Drag a card to change its status.",
  "Type @ to mention a teammate.",
];

export function TextLoopPauseDemo() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-border bg-card p-2 ps-4 shadow-[var(--shadow-card)]">
      <p className="min-w-0 flex-1 text-sm">
        <TextLoop values={tips} interval={4} active={!paused} />
      </p>
      <ToggleButton
        size="sm"
        variant="ghost"
        iconOnly
        aria-label="Pause tips"
        isSelected={paused}
        onChange={setPaused}
      >
        {paused ? (
          <PlayIcon aria-hidden="true" />
        ) : (
          <PauseIcon aria-hidden="true" />
        )}
      </ToggleButton>
    </div>
  );
}
