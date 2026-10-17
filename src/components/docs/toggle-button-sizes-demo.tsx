"use client";

import { PushPinIcon } from "@phosphor-icons/react";
import { ToggleButton } from "@/components/ui/toggle-button";

export function ToggleButtonSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2">
        <ToggleButton size="xs">
          <PushPinIcon aria-hidden="true" />
          Pin
        </ToggleButton>
        <ToggleButton size="xs" iconOnly aria-label="Pin">
          <PushPinIcon aria-hidden="true" />
        </ToggleButton>
      </div>
      <div className="flex items-center gap-2">
        <ToggleButton size="sm">
          <PushPinIcon aria-hidden="true" />
          Pin
        </ToggleButton>
        <ToggleButton size="sm" iconOnly aria-label="Pin">
          <PushPinIcon aria-hidden="true" />
        </ToggleButton>
      </div>
      <div className="flex items-center gap-2">
        <ToggleButton>
          <PushPinIcon aria-hidden="true" />
          Pin
        </ToggleButton>
        <ToggleButton iconOnly aria-label="Pin">
          <PushPinIcon aria-hidden="true" />
        </ToggleButton>
      </div>
      <div className="flex items-center gap-2">
        <ToggleButton size="lg">
          <PushPinIcon aria-hidden="true" />
          Pin
        </ToggleButton>
        <ToggleButton size="lg" iconOnly aria-label="Pin">
          <PushPinIcon aria-hidden="true" />
        </ToggleButton>
      </div>
      <div className="flex items-center gap-2">
        <ToggleButton size="xl">
          <PushPinIcon aria-hidden="true" />
          Pin
        </ToggleButton>
        <ToggleButton size="xl" iconOnly aria-label="Pin">
          <PushPinIcon aria-hidden="true" />
        </ToggleButton>
      </div>
    </div>
  );
}
