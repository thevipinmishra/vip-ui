"use client";

import { ColorField } from "@/components/ui/color-field";

export function ColorFieldDemo() {
  return (
    <ColorField
      label="Accent color"
      defaultValue="#4567d4"
      className="w-full max-w-xs"
    />
  );
}
