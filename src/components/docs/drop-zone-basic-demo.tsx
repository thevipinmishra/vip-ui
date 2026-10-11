"use client";

import { useRef, useState } from "react";
import type { DropItem, FileDropItem } from "react-aria-components";
import { DropZone, DropZoneLabel } from "@/components/ui/drop-zone";

export function DropZoneBasicDemo() {
  const [files, setFiles] = useState<{ id: number; name: string }[]>([]);
  const nextId = useRef(0);

  return (
    <div className="grid w-full max-w-md gap-3">
      <DropZone
        onDrop={async ({ items }) => {
          const dropped = await Promise.all(
            items
              .filter(
                (item: DropItem): item is FileDropItem => item.kind === "file",
              )
              .map((item) => item.getFile()),
          );
          setFiles((current) => [
            ...current,
            ...dropped.map((file) => ({
              id: nextId.current++,
              name: file.name,
            })),
          ]);
        }}
      >
        <DropZoneLabel>Drop files here</DropZoneLabel>
      </DropZone>
      <ul
        aria-live="polite"
        className="grid gap-1 text-sm text-muted-foreground"
      >
        {files.map((file) => (
          <li key={file.id} className="truncate">
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
