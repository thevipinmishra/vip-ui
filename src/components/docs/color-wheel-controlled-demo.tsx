"use client";

import { useState } from "react";
import { parseColor } from "react-aria-components";
import { ColorSwatch } from "@/components/ui/color-swatch";
import { ColorWheel } from "@/components/ui/color-wheel";

export function ColorWheelControlledDemo() {
  const [color, setColor] = useState(() => parseColor("hsl(150, 60%, 40%)"));

  return (
    <div className="grid justify-items-center gap-4">
      <ColorWheel value={color} onChange={setColor}>
        <ColorSwatch color={color} className="size-24 rounded-full" />
      </ColorWheel>
      <output className="text-sm text-muted-foreground">
        Selected: <span className="font-mono">{color.toString("hex")}</span>
      </output>
    </div>
  );
}
