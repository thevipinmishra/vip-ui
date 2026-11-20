"use client";

import type { Size } from "@/components/ui/size";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const sizes: (Size | undefined)[] = ["xs", "sm", undefined, "lg"];

export function ToggleButtonGroupSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      {sizes.map((size) => (
        <ToggleButtonGroup
          key={size ?? "default"}
          size={size}
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
      ))}
    </div>
  );
}
