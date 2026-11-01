"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import type { SiteMode } from "@/lib/site-mode";

export function ModeSwitch({
  mode,
  onChange,
  className,
}: {
  mode: SiteMode;
  onChange: (mode: SiteMode) => void;
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
      className={className}
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
