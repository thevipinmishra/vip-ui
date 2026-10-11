"use client";

import { ColorField } from "@/components/ui/color-field";

export function ColorFieldChannelDemo() {
  return (
    <ColorField
      label="Hue"
      colorSpace="hsl"
      channel="hue"
      defaultValue="hsl(225, 60%, 55%)"
      className="w-full max-w-xs"
    />
  );
}
