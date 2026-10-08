"use client";

import { FileText } from "reicon-react";
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
        <FileText size={18} aria-hidden="true" /> Notes.md
      </Button>
      <ContextMenuPopover>
        <ContextMenuContent aria-label="Notes actions">
          <ContextMenuItem href="/components/attachment">
            View attachment docs
          </ContextMenuItem>
          <ContextMenuItem>Pin notes</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem isDisabled>Share (unavailable)</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuPopover>
    </ContextMenuTrigger>
  );
}
