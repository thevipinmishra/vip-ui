"use client";

import { ListBox, ListBoxItem } from "@/components/ui/list-box";

export function MotionHighlightDemo() {
  return (
    <div className="w-full max-w-xs">
      <ListBox
        aria-label="Release channel"
        selectionMode="single"
        defaultSelectedKeys={["stable"]}
      >
        <ListBoxItem id="stable">Stable</ListBoxItem>
        <ListBoxItem id="beta">Beta</ListBoxItem>
        <ListBoxItem id="canary">Canary</ListBoxItem>
        <ListBoxItem id="nightly">Nightly</ListBoxItem>
      </ListBox>
    </div>
  );
}
