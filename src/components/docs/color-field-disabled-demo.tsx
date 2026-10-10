"use client";

import { ColorField } from "@/components/ui/color-field";

export function ColorFieldDisabledDemo() {
  return (
    <ColorField
      label="Theme color"
      defaultValue="#a96c22"
      isDisabled
      className="w-full max-w-xs"
    />
  );
}
