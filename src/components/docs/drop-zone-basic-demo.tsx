"use client";

import { useRef, useState } from "react";
import type { DropItem, FileDropItem } from "react-aria-components";
import {
  DropZone,
  DropZoneIcon,
  DropZoneLabel,
  DropZoneTrigger,
} from "@/components/ui/drop-zone";

export function DropZoneBasicDemo() {
  const [files, setFiles] = useState<{ id: number; name: string }[]>([]);
  const nextId = useRef(0);

  function addFiles(added: File[]) {
    setFiles((current) => [
      ...current,
      ...added.map((file) => ({ id: nextId.current++, name: file.name })),
    ]);
  }

  return (
    <div className="grid w-full max-w-md gap-3">
      <DropZone
        onDrop={async ({ items }) => {
          addFiles(
            await Promise.all(
              items
                .filter(
                  (item: DropItem): item is FileDropItem =>
                    item.kind === "file",
                )
                .map((item) => item.getFile()),
            ),
          );
        }}
      >
        <DropZoneIcon />
        <DropZoneLabel>Drop files here</DropZoneLabel>
        <DropZoneTrigger
          allowsMultiple
          onSelect={(selected) => {
            if (selected) addFiles(Array.from(selected));
          }}
        >
          Browse files
        </DropZoneTrigger>
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
