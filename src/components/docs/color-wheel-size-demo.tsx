"use client";

import { ColorWheel } from "@/components/ui/color-wheel";

export function ColorWheelSizeDemo() {
  return <ColorWheel outerRadius={64} defaultValue="hsl(30, 90%, 50%)" />;
}
