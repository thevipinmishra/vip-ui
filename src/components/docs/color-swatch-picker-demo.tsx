"use client";

import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-swatch-picker";

export function ColorSwatchPickerDemo() {
  return (
    <div className="grid gap-3">
      <span className="text-[13px] font-medium" id="palette-label">
        Accent color
      </span>
      <ColorSwatchPicker aria-labelledby="palette-label" defaultValue="#4567d4">
        <ColorSwatchPickerItem color="#4567d4" aria-label="Blue" />
        <ColorSwatchPickerItem color="#af4d65" aria-label="Rose" />
        <ColorSwatchPickerItem color="#228571" aria-label="Teal" />
        <ColorSwatchPickerItem color="#a96c22" aria-label="Amber" />
      </ColorSwatchPicker>
    </div>
  );
}
