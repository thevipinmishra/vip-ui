"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandPalette,
  CommandPaletteItem,
} from "@/components/ui/command-palette";

export function CommandPaletteBasicDemo() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="grid justify-items-start gap-3">
      <Button variant="outline" onPress={() => setOpen(true)}>
        Open commands
      </Button>
      <CommandPalette isOpen={isOpen} onOpenChange={setOpen}>
        <CommandPaletteItem>New project</CommandPaletteItem>
        <CommandPaletteItem>Settings</CommandPaletteItem>
      </CommandPalette>
    </div>
  );
}
