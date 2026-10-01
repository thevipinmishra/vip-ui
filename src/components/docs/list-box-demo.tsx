"use client";

import { useState } from "react";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

export function ListBoxDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["design"]));
  return (
    <div className="grid w-full max-w-xs gap-3">
      <ListBox
        aria-label="Team"
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={(keys) => {
          if (keys !== "all") setSelected(new Set(Array.from(keys, String)));
        }}
      >
        <ListBoxItem id="design">Design</ListBoxItem>
        <ListBoxItem id="engineering">Engineering</ListBoxItem>
        <ListBoxItem id="research">Research</ListBoxItem>
      </ListBox>
      <p className="text-xs text-muted-foreground">
        Selected: {Array.from(selected).join(", ") || "None"}
      </p>
    </div>
  );
}
