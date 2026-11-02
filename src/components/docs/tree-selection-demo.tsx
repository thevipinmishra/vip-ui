"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Tree, TreeItem } from "@/components/ui/tree";

export function TreeSelectionDemo() {
  const [selected, setSelected] = useState<Selection>(
    new Set(["tokens", "buttons"]),
  );
  const count = selected === "all" ? "All" : selected.size;

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Tree
        aria-label="Files to export"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        defaultExpandedKeys={["foundations", "components"]}
        disabledKeys={["legacy"]}
      >
        <TreeItem id="foundations" title="Foundations">
          <TreeItem id="tokens" title="Tokens.json" />
          <TreeItem id="type" title="Type scale.md" />
        </TreeItem>
        <TreeItem id="components" title="Components">
          <TreeItem id="buttons" title="Buttons.tsx" />
          <TreeItem id="fields" title="Fields.tsx" />
          <TreeItem id="legacy" title="Legacy grid.tsx" />
        </TreeItem>
      </Tree>
      <output
        aria-live="polite"
        className="text-sm text-muted-foreground tabular-nums"
      >
        {count} selected
      </output>
    </div>
  );
}
