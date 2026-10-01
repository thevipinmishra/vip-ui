"use client";

import { useState } from "react";
import type { DropItem, FileDropItem } from "react-aria-components";
import { DropZone, DropZoneLabel } from "@/components/ui/drop-zone";
import { FileTrigger } from "@/components/ui/file-trigger";

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
        <DropZoneLabel>Drop images or PDFs here</DropZoneLabel>
        <p className="text-xs text-muted-foreground">PNG, JPEG, or PDF</p>
        <FileTrigger
          label="Browse files"
          acceptedFileTypes={acceptedTypes}
          allowsMultiple
          onSelect={(selected) => {
            if (selected)
              setFiles((current) => [...current, ...Array.from(selected)]);
          }}
        />
      </DropZone>
      <ul
        aria-live="polite"
        className="grid gap-1 text-sm text-muted-foreground"
      >
        {files.map((file, index) => (
          <li key={`${file.name}-${index}`} className="truncate">
            {file.name}
          </li>
        ))}
      </ul>
      {files.length === 0 && (
        <p className="text-xs text-muted-foreground">
          Files stay in this browser preview; nothing is uploaded.
        </p>
      )}
    </div>
  );
}
