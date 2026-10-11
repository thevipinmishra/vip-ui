"use client";

import { useState } from "react";
import { parseColor } from "react-aria-components";
import { ColorPicker } from "@/components/ui/color-picker";

export function ColorPickerControlledDemo() {
  const [color, setColor] = useState(() => parseColor("#4169bd"));

  return (
    <div className="grid justify-items-start gap-4">
      <ColorPicker label="Accent color" value={color} onChange={setColor} />
      <output className="text-sm text-muted-foreground">
        Selected: <span className="font-mono">{color.toString("hex")}</span>
      </output>
    </div>
  );
}
