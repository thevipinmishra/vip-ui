"use client";

import { useState } from "react";
import { FolderPlus, Search, Settings, UserAdd } from "reicon-react";
import { Button } from "@/components/ui/button";
import {
  CommandPalette,
  CommandPaletteItem,
} from "@/components/ui/command-palette";

export function CommandPaletteDemo({
  shortcut = true,
}: {
  shortcut?: boolean;
}) {
  const [isOpen, setOpen] = useState(false);
  const [lastAction, setLastAction] = useState("");

  return (
    <div className="grid justify-items-start gap-3">
      <Button variant="outline" onPress={() => setOpen(true)}>
        <Search size={16} aria-hidden="true" /> Search commands
      </Button>
      {lastAction && (
        <output className="text-xs text-muted-foreground">
          Selected: {lastAction}
        </output>
      )}
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        shortcut={shortcut}
      >
        <CommandPaletteItem onAction={() => setLastAction("New project")}>
          <FolderPlus
            size={17}
            aria-hidden="true"
            className="text-muted-foreground"
          />
          New project
        </CommandPaletteItem>
        <CommandPaletteItem onAction={() => setLastAction("Open settings")}>
          <Settings
            size={17}
            aria-hidden="true"
            className="text-muted-foreground"
          />
          Open settings
        </CommandPaletteItem>
        <CommandPaletteItem onAction={() => setLastAction("Invite teammate")}>
          <UserAdd
            size={17}
            aria-hidden="true"
            className="text-muted-foreground"
          />
          Invite teammate
        </CommandPaletteItem>
      </CommandPalette>
    </div>
  );
}
