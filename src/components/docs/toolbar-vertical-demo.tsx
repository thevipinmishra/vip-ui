"use client";

import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Toolbar } from "@/components/ui/toolbar";

export function ToolbarVerticalDemo() {
  return (
    <Toolbar orientation="vertical" aria-label="Block type">
      <ToggleButtonGroup
        aria-label="Block"
        selectionMode="single"
        defaultSelectedKeys={["body"]}
        disallowEmptySelection
      >
        <ToggleButton id="body" variant="segmented">
          Body
        </ToggleButton>
        <ToggleButton id="heading" variant="segmented">
          Heading
        </ToggleButton>
        <ToggleButton id="quote" variant="segmented">
          Quote
        </ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
  );
}
