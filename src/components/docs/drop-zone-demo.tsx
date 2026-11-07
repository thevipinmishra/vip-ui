"use client";

import { useState } from "react";
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
  const [files, setFiles] = useState<File[]>([]);

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
                (item: DropItem): item is FileDropItem =>
                  item.kind === "file" && acceptedTypes.includes(item.type),
              )
              .map((item) => item.getFile()),
          );
          setFiles((current) => [...current, ...dropped]);
        }}
      >
        <DropZoneIcon />
        <DropZoneLabel>Drop images or PDFs here</DropZoneLabel>
        <DropZoneDescription>PNG, JPEG, or PDF</DropZoneDescription>
        <DropZoneTrigger
          acceptedFileTypes={acceptedTypes}
          allowsMultiple
          onSelect={(selected) => {
            if (selected)
              setFiles((current) => [...current, ...Array.from(selected)]);
          }}
        >
          Browse files
        </DropZoneTrigger>
      </DropZone>
      <ul
        aria-live="polite"
        className="grid gap-1 text-sm text-muted-foreground"
      >
        {files.map((file, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: duplicate file names need the position to stay unique
          <li key={`${file.name}-${index}`} className="truncate">
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
