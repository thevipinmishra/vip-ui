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

export function MenuSingleSelectionDemo() {
  const [selected, setSelected] = useState<Selection>(new Set(["list"]));

  return (
    <MenuTrigger>
      <Button variant="outline">
        View: {selected === "all" ? "All" : [...selected][0]}
      </Button>
      <MenuPopover>
        <MenuContent
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <MenuItem id="list">List view</MenuItem>
          <MenuItem id="grid">Grid view</MenuItem>
          <MenuItem id="board">Board view</MenuItem>
        </MenuContent>
      </MenuPopover>
    </MenuTrigger>
  );
}
