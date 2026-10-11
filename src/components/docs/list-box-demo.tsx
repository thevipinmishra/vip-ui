"use client";

import { ListBox, ListBoxItem } from "@/components/ui/list-box";

export function ListBoxDemo() {
  return (
    <div className="w-full max-w-xs">
      <ListBox
        aria-label="Team"
        selectionMode="single"
        defaultSelectedKeys={["design"]}
      >
        <ListBoxItem id="design">Design</ListBoxItem>
        <ListBoxItem id="engineering">Engineering</ListBoxItem>
        <ListBoxItem id="research">Research</ListBoxItem>
      </ListBox>
    </div>
  );
}
