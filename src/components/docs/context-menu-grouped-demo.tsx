"use client";

import { FileMdIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPopover,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function ContextMenuGroupedDemo() {
  return (
    <ContextMenuTrigger>
      <Button variant="outline">
        <FileMdIcon size={18} aria-hidden="true" /> Notes.md
      </Button>
      <ContextMenuPopover>
        <ContextMenuContent aria-label="Notes actions">
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Pin notes</ContextMenuItem>
          <ContextMenuItem isDisabled>Share (unavailable)</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuPopover>
    </ContextMenuTrigger>
  );
}
