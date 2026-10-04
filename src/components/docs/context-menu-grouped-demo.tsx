"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPopover,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function ContextMenuGroupedDemo() {
  const [action, setAction] = useState("No action chosen.");

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <ContextMenuTrigger>
        <Button variant="outline" onPress={() => setAction("Opened project.")}>
          Project actions
        </Button>
        <ContextMenuPopover>
          <ContextMenuContent aria-label="Project actions">
            <ContextMenuItem onAction={() => setAction("Duplicated project.")}>
              Duplicate project
            </ContextMenuItem>
            <ContextMenuItem isDisabled>Share project</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onAction={() => setAction("Archived project.")}>
              Archive project
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenuPopover>
      </ContextMenuTrigger>
      <output className="block w-full rounded-lg bg-card px-4 py-3 text-[13px] text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70">
        {action}
      </output>
    </div>
  );
}
