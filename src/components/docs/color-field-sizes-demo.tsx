"use client";

import { ColorField } from "@/components/ui/color-field";

export function ColorFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-xs gap-3">
      <ColorField size="xs" aria-label="Accent color" defaultValue="#4567d4" />
      <ColorField size="sm" aria-label="Accent color" defaultValue="#4567d4" />
      <ColorField size="md" aria-label="Accent color" defaultValue="#4567d4" />
      <ColorField aria-label="Accent color" defaultValue="#4567d4" />
    </div>
  );
}
