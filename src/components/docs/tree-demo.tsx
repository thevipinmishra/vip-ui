"use client";

import { Tree, TreeItem } from "@/components/ui/tree";

export function TreeDemo() {
  return (
    <div className="w-full max-w-sm">
      <Tree
        aria-label="Project files"
        selectionMode="single"
        defaultExpandedKeys={["design"]}
      >
        <TreeItem id="design" title="Design">
          <TreeItem id="wireframes" title="Wireframes.fig" />
          <TreeItem id="palette" title="Palette.pdf" />
        </TreeItem>
        <TreeItem id="notes" title="Notes">
          <TreeItem id="brief" title="Project brief.md" />
          <TreeItem id="feedback" title="Feedback.md" />
        </TreeItem>
        <TreeItem
          id="readme"
          title="README.md"
          content={
            <span className="flex min-w-0 items-center justify-between gap-2">
              <span className="truncate">README.md</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                12 KB
              </span>
            </span>
          }
        />
      </Tree>
      <p className="mt-3 text-xs text-muted-foreground">
        Use the arrow keys to move, expand folders, and select a file.
      </p>
    </div>
  );
}
