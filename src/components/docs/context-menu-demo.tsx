"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function ContextMenuDemo() {
  const [action, setAction] = useState("Choose a file action.");

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <ContextMenuTrigger>
        <Button
          variant="outline"
          onPress={() => setAction("Opened brief.pdf.")}
        >
          brief.pdf
        </Button>
        <ContextMenu aria-label="File actions">
          <ContextMenuItem onAction={() => setAction("Opened brief.pdf.")}>
            Open file
          </ContextMenuItem>
          <ContextMenuItem onAction={() => setAction("Renamed brief.pdf.")}>
            Rename file
          </ContextMenuItem>
          <ContextMenuItem onAction={() => setAction("Copied brief.pdf.")}>
            Copy file
          </ContextMenuItem>
        </ContextMenu>
      </ContextMenuTrigger>
      <output className="block w-full rounded-lg bg-card px-4 py-3 text-[13px] text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70">
        {action}
      </output>
    </div>
  );
}
