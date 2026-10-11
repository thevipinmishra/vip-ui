"use client";

import { GridList, GridListItem } from "@/components/ui/grid-list";

export function GridListDisabledDemo() {
  return (
    <GridList
      aria-label="Project files"
      selectionMode="single"
      className="w-full max-w-sm"
    >
      <GridListItem id="brief" textValue="Project brief">
        Project brief
      </GridListItem>
      <GridListItem id="draft" textValue="Draft report" isDisabled>
        Draft report
        <span className="ms-auto text-xs text-muted-foreground">
          Unavailable
        </span>
      </GridListItem>
    </GridList>
  );
}
