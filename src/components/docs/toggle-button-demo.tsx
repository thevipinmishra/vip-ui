"use client";

import { Pin, PinOff } from "reicon-react";
import { ToggleButton } from "@/components/ui/toggle-button";

export function ToggleButtonDemo() {
  return (
    <ToggleButton>
      {({ isSelected }) => (
        <>
          {isSelected ? (
            <Pin size={16} aria-hidden="true" />
          ) : (
            <PinOff size={16} aria-hidden="true" />
          )}
          Pin to favorites
        </>
      )}
    </ToggleButton>
  );
}
