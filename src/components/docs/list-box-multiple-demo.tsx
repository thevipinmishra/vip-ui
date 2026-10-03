"use client";

import { ListBox, ListBoxItem } from "@/components/ui/list-box";

export function ListBoxMultipleDemo() {
  return (
    <ListBox
      aria-label="Project teams"
      selectionMode="multiple"
      defaultSelectedKeys={["design", "research"]}
      className="max-w-xs"
    >
      <ListBoxItem id="design">Design</ListBoxItem>
      <ListBoxItem id="engineering">Engineering</ListBoxItem>
      <ListBoxItem id="research">Research</ListBoxItem>
    </ListBox>
  );
}
