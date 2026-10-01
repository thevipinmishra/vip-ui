"use client";

import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

export function ToggleButtonGroupDemo() {
  return (
    <div className="grid justify-items-start gap-4">
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
      <ToggleButtonGroup
        aria-label="Text styles"
        selectionMode="multiple"
        defaultSelectedKeys={["bold"]}
      >
        <ToggleButton id="bold" variant="segmented">
          Bold
        </ToggleButton>
        <ToggleButton id="italic" variant="segmented">
          Italic
        </ToggleButton>
        <ToggleButton id="underline" variant="segmented">
          Underline
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
