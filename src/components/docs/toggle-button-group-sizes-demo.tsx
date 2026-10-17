"use client";

import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

export function ToggleButtonGroupSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <ToggleButtonGroup
        size="xs"
        aria-label="Chart range"
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
        size="sm"
        aria-label="Chart range"
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
        size="md"
        aria-label="Chart range"
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
    </div>
  );
}
