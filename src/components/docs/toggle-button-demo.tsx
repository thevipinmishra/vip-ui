"use client";

import { useState } from "react";
import { ToggleButton } from "@/components/ui/toggle-button";

export function ToggleButtonDemo() {
  const [selected, setSelected] = useState(false);
  return (
    <div className="grid justify-items-start gap-3">
      <ToggleButton isSelected={selected} onChange={setSelected}>
        Pin to favorites
      </ToggleButton>
      <p className="text-xs text-muted-foreground">
        {selected ? "Pinned to favorites" : "Not pinned"}
      </p>
    </div>
  );
}
