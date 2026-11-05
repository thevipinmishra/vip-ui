"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { GridList, GridListItem } from "@/components/ui/grid-list";

const files = [
  { id: "brief", name: "Project brief", type: "PDF" },
  { id: "assets", name: "Brand assets", type: "Folder" },
  { id: "notes", name: "Meeting notes", type: "Text" },
  { id: "budget", name: "Budget.xlsx", type: "Sheet" },
];

export function GridListSelectionDemo() {
  const [selected, setSelected] = useState<Selection>(new Set(["brief"]));
  const count = selected === "all" ? files.length : selected.size;

  return (
    <div className="grid w-full max-w-sm gap-2">
      <GridList
        aria-label="Files to send"
        items={files}
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {(file) => (
          <GridListItem id={file.id} textValue={file.name}>
            {file.name}
            <span className="ms-auto shrink-0 text-xs text-muted-foreground">
              {file.type}
            </span>
          </GridListItem>
        )}
      </GridList>
      <output
        aria-live="polite"
        className="text-sm text-muted-foreground tabular-nums"
      >
        {count === 0 ? "No files selected" : `${count} selected`}
      </output>
    </div>
  );
}
