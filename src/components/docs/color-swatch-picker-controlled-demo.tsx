"use client";

import { useState } from "react";
import { type Color, parseColor } from "react-aria-components";
import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-swatch-picker";

const colors = [
  { name: "Blue", value: "#4567d4" },
  { name: "Rose", value: "#af4d65" },
  { name: "Teal", value: "#228571" },
  { name: "Amber", value: "#a96c22" },
];

export function ColorSwatchPickerControlledDemo() {
  const [color, setColor] = useState<Color>(parseColor("#af4d65"));
  const name = colors.find(
    ({ value }) => value === color.toString("hex").toLowerCase(),
  )?.name;

  return (
    <div className="grid gap-3">
      <span id="label-color-label" className="text-sm font-medium">
        Label color
      </span>
      <ColorSwatchPicker
        aria-labelledby="label-color-label"
        value={color}
        onChange={setColor}
      >
        {colors.map(({ name, value }) => (
          <ColorSwatchPickerItem key={value} color={value} aria-label={name} />
        ))}
      </ColorSwatchPicker>
      <output className="text-sm text-muted-foreground">
        Selected: {name}
      </output>
    </div>
  );
}
