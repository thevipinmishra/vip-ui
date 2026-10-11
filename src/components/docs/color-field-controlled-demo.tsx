"use client";

import { useState } from "react";
import { type Color, parseColor } from "react-aria-components";
import { ColorField } from "@/components/ui/color-field";
import { ColorSwatch } from "@/components/ui/color-swatch";

export function ColorFieldControlledDemo() {
  const [color, setColor] = useState<Color | null>(parseColor("#228571"));

  return (
    <div className="flex w-full max-w-xs items-end gap-3">
      <ColorField
        label="Brand color"
        value={color}
        onChange={setColor}
        className="min-w-0 flex-1"
      />
      <ColorSwatch color={color ?? undefined} className="size-12 rounded-lg" />
    </div>
  );
}
