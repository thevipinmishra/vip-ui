"use client";

import { FilePdfIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function ContextMenuDemo() {
  return (
    <div className="grid justify-items-center gap-3">
      <ContextMenuTrigger>
        <Button variant="outline">
          <FilePdfIcon size={18} aria-hidden="true" /> brief.pdf
        </Button>
        <ContextMenu aria-label="File actions">
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuItem>Copy filename</ContextMenuItem>
        </ContextMenu>
      </ContextMenuTrigger>
      <p className="text-xs text-muted-foreground">
        Right-click or long-press the file.
      </p>
    </div>
  );
}
