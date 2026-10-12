"use client";

import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Toolbar } from "@/components/ui/toolbar";

export function ToolbarBasicDemo() {
  return (
    <Toolbar aria-label="Text alignment">
      <ToggleButtonGroup
        aria-label="Alignment"
        selectionMode="single"
        defaultSelectedKeys={["left"]}
        disallowEmptySelection
      >
        <ToggleButton id="left" variant="segmented">
          Left
        </ToggleButton>
        <ToggleButton id="center" variant="segmented">
          Center
        </ToggleButton>
        <ToggleButton id="right" variant="segmented">
          Right
        </ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
  );
}
