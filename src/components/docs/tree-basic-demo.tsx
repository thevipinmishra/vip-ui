"use client";

import { Tree, TreeItem } from "@/components/ui/tree";

export function TreeBasicDemo() {
  return (
    <Tree
      aria-label="Project files"
      selectionMode="single"
      defaultExpandedKeys={["design"]}
      defaultSelectedKeys={["wireframes"]}
      className="w-full max-w-sm"
    >
      <TreeItem id="design" title="Design">
        <TreeItem id="wireframes" title="Wireframes.fig" />
        <TreeItem id="palette" title="Palette.pdf" />
      </TreeItem>
      <TreeItem id="notes" title="Notes.md" />
    </Tree>
  );
}
