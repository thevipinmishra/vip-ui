"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import type { SiteMode } from "@/lib/site-mode";
import { cn } from "@/lib/utils";

export function ModeSwitch({
  mode,
  onChange,
  pill,
  className,
}: {
  mode: SiteMode;
  onChange: (mode: SiteMode) => void;
  pill?: boolean;
  className?: string;
}) {
  return (
    <ToggleButtonGroup
      aria-label="Appearance"
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[mode]}
      onSelectionChange={(keys) => {
        const [next] = keys;
        if (next === "light" || next === "dark") onChange(next);
      }}
      size={pill ? "sm" : undefined}
      className={cn(
        pill &&
          "gap-0.5 rounded-full border-0 bg-card/60 shadow-[var(--shadow-card)] ring-1 ring-border/60 backdrop-blur-xl *:rounded-full",
        className,
      )}
    >
      <ToggleButton id="light" variant="segmented" aria-label="Light">
        <SunIcon size={16} aria-hidden="true" />
      </ToggleButton>
      <ToggleButton id="dark" variant="segmented" aria-label="Dark">
        <MoonIcon size={16} aria-hidden="true" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
