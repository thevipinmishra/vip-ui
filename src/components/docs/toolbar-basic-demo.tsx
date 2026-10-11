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
      >
        <ToggleButton id="left" variant="segmented">
          Left
        </ToggleButton>
        <ToggleButton id="center" variant="segmented">
          Center
        </ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
  );
}
