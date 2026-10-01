"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";

export function MenuSelectionDemo() {
  const [selected, setSelected] = useState<Selection>(new Set(["grid"]));

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <MenuTrigger>
        <Button variant="outline">View options</Button>
        <MenuPopover>
          <MenuContent
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            <MenuItem id="grid">Grid</MenuItem>
            <MenuItem id="guides">Guides</MenuItem>
            <MenuItem id="rulers">Rulers</MenuItem>
            <MenuItem id="comments" isDisabled>
              Comments (unavailable)
            </MenuItem>
          </MenuContent>
        </MenuPopover>
      </MenuTrigger>
      <output className="block w-full rounded-lg bg-card px-4 py-3 text-[13px] text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70">
        Visible:{" "}
        {selected === "all" ? "all" : [...selected].join(", ") || "none"}
      </output>
    </div>
  );
}
