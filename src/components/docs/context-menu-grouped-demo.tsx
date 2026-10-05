"use client";

import { useState } from "react";
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
  const [isPinned, setIsPinned] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-3">
      <ContextMenuTrigger>
        <Button
          variant="outline"
          onPress={() => setIsSelected((value) => !value)}
        >
          <FileText size={18} aria-hidden="true" /> Notes.md
        </Button>
        <ContextMenuPopover>
          <ContextMenuContent aria-label="Notes actions">
            <ContextMenuItem href="/components/attachment">
              View attachment docs
            </ContextMenuItem>
            <ContextMenuItem onAction={() => setIsPinned((value) => !value)}>
              {isPinned ? "Unpin notes" : "Pin notes"}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem isDisabled>Share (unavailable)</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenuPopover>
      </ContextMenuTrigger>
      <output className="text-sm text-muted-foreground">
        {isSelected ? "Selected · " : ""}
        {isPinned ? "Pinned" : "Not pinned"}
      </output>
    </div>
  );
}
