"use client";

import { GridList, GridListItem } from "@/components/ui/grid-list";

export function GridListDemo() {
  return (
    <GridList
      aria-label="Project files"
      selectionMode="single"
      className="w-full max-w-sm"
    >
      <GridListItem id="brief" textValue="Project brief">
        Project brief{" "}
        <span className="ms-auto text-xs text-muted-foreground">PDF</span>
      </GridListItem>
      <GridListItem id="assets" textValue="Brand assets">
        Brand assets{" "}
        <span className="ms-auto text-xs text-muted-foreground">Folder</span>
      </GridListItem>
      <GridListItem id="notes" textValue="Meeting notes">
        Meeting notes{" "}
        <span className="ms-auto text-xs text-muted-foreground">Text</span>
      </GridListItem>
    </GridList>
  );
}
