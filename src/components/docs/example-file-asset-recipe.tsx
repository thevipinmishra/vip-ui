"use client";

import { useRef, useState } from "react";
import type { DropItem, FileDropItem } from "react-aria-components";
import { Attachment, AttachmentList } from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import { DropZone, DropZoneLabel } from "@/components/ui/drop-zone";
import { FileTrigger } from "@/components/ui/file-trigger";
import {
  Tag,
  TagGroup,
  TagGroupLabel,
  TagListView,
} from "@/components/ui/tag-group";

const acceptedTypes = ["image/png", "image/jpeg", "application/pdf"];
const categories = [
  { id: "campaign", name: "Campaign" },
  { id: "brand", name: "Brand" },
  { id: "social", name: "Social" },
];

export function ExampleFileAssetRecipe() {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");
  const pickerRef = useRef<HTMLButtonElement>(null);

  function addFile(incoming: File | undefined) {
    if (!incoming) return;
    if (!acceptedTypes.includes(incoming.type)) {
      setError("That file type is not supported. Use PNG, JPEG, or PDF.");
      return;
    }
    setError("");
    setSaved("");
    setCategory("");
    setFile(incoming);
  }

  return (
    <div className="grid w-full max-w-md gap-4">
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
          addFile(dropped[0]);
        }}
      >
        <DropZoneLabel>Add a cover asset</DropZoneLabel>
        <p className="text-xs text-muted-foreground">
          PNG, JPEG, or PDF. Kept in this browser tab.
        </p>
        <FileTrigger
          acceptedFileTypes={acceptedTypes}
          onSelect={(files) => addFile(files?.[0])}
        >
          <Button ref={pickerRef} variant="outline">
            Browse files
          </Button>
        </FileTrigger>
      </DropZone>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      {file ? (
        <div className="grid gap-4">
          <AttachmentList>
            <Attachment
              name={file.name}
              size={file.size}
              onRemove={() => {
                pickerRef.current?.focus();
                setFile(null);
                setCategory("");
                setSaved("");
              }}
            />
          </AttachmentList>
          <TagGroup
            selectionMode="single"
            selectedKeys={category ? new Set([category]) : new Set()}
            onSelectionChange={(keys) => {
              setCategory(keys === "all" ? "" : String([...keys][0] ?? ""));
              setSaved("");
            }}
          >
            <TagGroupLabel>Category</TagGroupLabel>
            <TagListView items={categories}>
              {(item) => <Tag id={item.id}>{item.name}</Tag>}
            </TagListView>
          </TagGroup>
          <Button isDisabled={!category} onPress={() => setSaved(category)}>
            Save classification
          </Button>
        </div>
      ) : (
        <p className="text-sm leading-6 text-muted-foreground">
          Add a PNG, JPEG, or PDF to choose its category.
        </p>
      )}

      <div aria-live="polite">
        {file && saved ? (
          <p className="rounded-lg bg-success-subtle p-3 text-sm text-success-foreground">
            {file.name} classified as {saved}. Saved to this browser session;
            nothing was uploaded.
          </p>
        ) : (
          <p className="text-xs leading-5 text-muted-foreground">
            Files stay on this device. Nothing is uploaded or persisted.
          </p>
        )}
      </div>
    </div>
  );
}
