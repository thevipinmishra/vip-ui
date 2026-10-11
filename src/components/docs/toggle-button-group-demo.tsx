"use client";

import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

export function ToggleButtonGroupDemo() {
  return (
    <ToggleButtonGroup
      aria-label="Calendar view"
      selectionMode="single"
      defaultSelectedKeys={["week"]}
      disallowEmptySelection
    >
      <ToggleButton id="day" variant="segmented">
        Day
      </ToggleButton>
      <ToggleButton id="week" variant="segmented">
        Week
      </ToggleButton>
      <ToggleButton id="month" variant="segmented">
        Month
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
