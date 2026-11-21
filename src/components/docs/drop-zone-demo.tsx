"use client";

import { useRef, useState } from "react";
import type { DropItem, FileDropItem } from "react-aria-components";
import {
  DropZone,
  DropZoneDescription,
  DropZoneIcon,
  DropZoneLabel,
  DropZoneTrigger,
} from "@/components/ui/drop-zone";

const acceptedTypes = ["image/png", "image/jpeg", "application/pdf"];

export function DropZoneDemo() {
  const [files, setFiles] = useState<{ id: number; name: string }[]>([]);
  const nextId = useRef(0);

  function addFiles(added: File[]) {
    const accepted = added
      .filter((file) => acceptedTypes.includes(file.type))
      .map((file) => ({ id: nextId.current++, name: file.name }));
    if (accepted.length) setFiles((current) => [...current, ...accepted]);
  }

  return (
    <div className="grid w-full max-w-md gap-3">
      <DropZone
        getDropOperation={(types) =>
          acceptedTypes.some((type) => types.has(type)) ? "copy" : "cancel"
        }
        onDrop={async ({ items }) => {
          const dropped = await Promise.all(
            items
              .filter(
                (item: DropItem): item is FileDropItem => item.kind === "file",
              )
              .map((item) => item.getFile()),
          );
          addFiles(dropped);
        }}
      >
        <DropZoneIcon />
        <DropZoneLabel>Drop images or PDFs here</DropZoneLabel>
        <DropZoneDescription>PNG, JPEG, or PDF</DropZoneDescription>
        <DropZoneTrigger
          acceptedFileTypes={acceptedTypes}
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
