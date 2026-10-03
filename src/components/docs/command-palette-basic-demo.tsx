"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandPalette,
  CommandPaletteItem,
} from "@/components/ui/command-palette";

export function CommandPaletteBasicDemo() {
  const [isOpen, setOpen] = useState(false);
  const [selection, setSelection] = useState("");

  return (
    <div className="grid justify-items-start gap-3">
      <Button variant="outline" onPress={() => setOpen(true)}>
        Open commands
      </Button>
      <CommandPalette isOpen={isOpen} onOpenChange={setOpen}>
        <CommandPaletteItem onAction={() => setSelection("New project")}>
          New project
        </CommandPaletteItem>
        <CommandPaletteItem onAction={() => setSelection("Settings")}>
          Settings
        </CommandPaletteItem>
      </CommandPalette>
      {selection && (
        <output className="text-sm text-muted-foreground">
          Selected: {selection}
        </output>
      )}
    </div>
  );
}
