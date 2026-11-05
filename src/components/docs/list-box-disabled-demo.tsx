"use client";

import { ListBox, ListBoxItem } from "@/components/ui/list-box";

export function ListBoxDisabledDemo() {
  return (
    <div className="w-full max-w-xs">
      <ListBox
        aria-label="Workspace"
        selectionMode="single"
        defaultSelectedKeys={["studio"]}
      >
        <ListBoxItem id="studio">Studio</ListBoxItem>
        <ListBoxItem id="archive" textValue="Archive" isDisabled>
          Archive
          <span className="text-xs text-muted-foreground">Owner only</span>
        </ListBoxItem>
        <ListBoxItem id="sandbox">Sandbox</ListBoxItem>
      </ListBox>
    </div>
  );
}
