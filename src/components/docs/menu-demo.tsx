"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

export function MenuDemo() {
  const [action, setAction] = useState("Choose a project action.");

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <MenuTrigger>
        <Button variant="outline">Project actions</Button>
        <MenuPopover>
          <MenuContent>
            <MenuItem onAction={() => setAction("Opened Studio North.")}>
              Open project
            </MenuItem>
            <MenuItem onAction={() => setAction("Duplicated Studio North.")}>
              Duplicate project
            </MenuItem>
            <MenuSeparator />
            <MenuItem onAction={() => setAction("Archived Studio North.")}>
              Archive project
            </MenuItem>
          </MenuContent>
        </MenuPopover>
      </MenuTrigger>
      <output className="block w-full rounded-lg bg-card px-4 py-3 text-[13px] text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70">
        {action}
      </output>
    </div>
  );
}
