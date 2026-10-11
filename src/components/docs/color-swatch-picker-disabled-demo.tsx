"use client";

import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-swatch-picker";

export function ColorSwatchPickerDisabledDemo() {
  return (
    <div className="grid gap-3">
      <span id="team-color-label" className="text-sm font-medium">
        Team color
      </span>
      <ColorSwatchPicker
        aria-labelledby="team-color-label"
        defaultValue="#4567d4"
      >
        <ColorSwatchPickerItem color="#4567d4" aria-label="Blue" />
        <ColorSwatchPickerItem color="#af4d65" aria-label="Rose" isDisabled />
        <ColorSwatchPickerItem color="#228571" aria-label="Teal" />
        <ColorSwatchPickerItem color="#a96c22" aria-label="Amber" isDisabled />
      </ColorSwatchPicker>
    </div>
  );
}
