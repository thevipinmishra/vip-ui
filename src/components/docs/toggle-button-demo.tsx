"use client";

import { PushPinIcon } from "@phosphor-icons/react";
import { ToggleButton } from "@/components/ui/toggle-button";

export function ToggleButtonDemo() {
  return (
    <ToggleButton>
      {({ isSelected }) => (
        <>
          <PushPinIcon
            size={16}
            weight={isSelected ? "fill" : "regular"}
            aria-hidden="true"
          />
          Pin to favorites
        </>
      )}
    </ToggleButton>
  );
}
