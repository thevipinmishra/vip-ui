"use client";

import { useState } from "react";
import { parseColor } from "react-aria-components";
import { ColorPicker } from "@/components/ui/color-picker";

export function ColorPickerDemo() {
  const [color, setColor] = useState(() => parseColor("#4169bd"));

  return (
    <div className="grid justify-items-start gap-3">
      <ColorPicker label="Accent color" value={color} onChange={setColor} />
      <p className="text-xs text-muted-foreground">
        Selected color:{" "}
        <span className="font-mono">{color.toString("hex")}</span>
      </p>
    </div>
  );
}
