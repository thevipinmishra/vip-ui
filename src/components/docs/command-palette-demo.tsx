"use client";

import {
  FolderPlusIcon,
  GearSixIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandPalette,
  CommandPaletteItem,
  CommandPaletteSection,
} from "@/components/ui/command-palette";

export function CommandPaletteDemo({
  shortcut = true,
}: {
  shortcut?: boolean;
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="grid justify-items-start gap-3">
      <Button variant="outline" onPress={() => setOpen(true)}>
        <MagnifyingGlassIcon size={16} aria-hidden="true" /> Search commands
      </Button>
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        shortcut={shortcut}
      >
        <CommandPaletteSection title="Project">
          <CommandPaletteItem textValue="New project">
            <FolderPlusIcon
              size={17}
              aria-hidden="true"
              className="text-muted-foreground"
            />
            New project
          </CommandPaletteItem>
          <CommandPaletteItem textValue="Invite teammate">
            <UserPlusIcon
              size={17}
              aria-hidden="true"
              className="text-muted-foreground"
            />
            Invite teammate
          </CommandPaletteItem>
        </CommandPaletteSection>
        <CommandPaletteSection title="Preferences">
          <CommandPaletteItem textValue="Open settings">
            <GearSixIcon
              size={17}
              aria-hidden="true"
              className="text-muted-foreground"
            />
            Open settings
          </CommandPaletteItem>
          <CommandPaletteItem textValue="Change theme">
            <MoonIcon
              size={17}
              aria-hidden="true"
              className="text-muted-foreground"
            />
            Change theme
          </CommandPaletteItem>
        </CommandPaletteSection>
      </CommandPalette>
    </div>
  );
}
