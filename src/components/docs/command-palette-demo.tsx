"use client";

import {
  FolderPlusIcon,
  GearSixIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SignOutIcon,
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
          <CommandPaletteItem textValue="New project" shortcut="N">
            <FolderPlusIcon aria-hidden="true" />
            New project
          </CommandPaletteItem>
          <CommandPaletteItem textValue="Invite teammate" shortcut="I">
            <UserPlusIcon aria-hidden="true" />
            Invite teammate
          </CommandPaletteItem>
        </CommandPaletteSection>
        <CommandPaletteSection title="Preferences">
          <CommandPaletteItem textValue="Open settings" shortcut=",">
            <GearSixIcon aria-hidden="true" />
            Open settings
          </CommandPaletteItem>
          <CommandPaletteItem textValue="Change theme" shortcut="T">
            <MoonIcon aria-hidden="true" />
            Change theme
          </CommandPaletteItem>
          <CommandPaletteItem textValue="Log out" variant="destructive">
            <SignOutIcon aria-hidden="true" />
            Log out
          </CommandPaletteItem>
        </CommandPaletteSection>
      </CommandPalette>
    </div>
  );
}
