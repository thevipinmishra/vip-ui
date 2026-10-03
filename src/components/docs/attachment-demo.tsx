"use client";

import { useEffect, useRef, useState } from "react";
import type { DropItem, FileDropItem } from "react-aria-components";
import { Attachment, AttachmentList } from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import { DropZone, DropZoneLabel } from "@/components/ui/drop-zone";
import { FileTrigger } from "@/components/ui/file-trigger";

type LocalAttachment = { id: string; file: File; previewUrl?: string };
const acceptedTypes = ["image/png", "image/jpeg", "application/pdf"];
const maxSize = 5 * 1024 * 1024;

export function AttachmentDemo() {
  const [attachments, setAttachments] = useState<LocalAttachment[]>([]);
  const [notice, setNotice] = useState("");
  const pickerRef = useRef<HTMLButtonElement>(null);
  const previewUrls = useRef(new Set<string>());

  useEffect(() => {
    const urls = previewUrls.current;
    return () => {
      for (const url of urls) URL.revokeObjectURL(url);
    };
  }, []);

  function addFiles(incoming: File[]) {
    const valid = incoming.filter(
      (file) => acceptedTypes.includes(file.type) && file.size <= maxSize,
    );
    const rejected = incoming.length - valid.length;
    const next = valid.map((file) => {
      const previewUrl = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined;
      if (previewUrl) previewUrls.current.add(previewUrl);
      return { id: crypto.randomUUID(), file, previewUrl };
    });
    setAttachments((current) => [...current, ...next]);
    setNotice(
      rejected
        ? `${rejected} file${rejected === 1 ? " was" : "s were"} skipped. Choose PNG, JPEG, or PDF under 5 MB.`
        : `${next.length} file${next.length === 1 ? "" : "s"} added locally. Nothing was uploaded.`,
    );
  }

  function remove(item: LocalAttachment) {
    pickerRef.current?.focus();
    setAttachments((current) => current.filter(({ id }) => id !== item.id));
    setNotice(`${item.file.name} removed.`);
    const previewUrl = item.previewUrl;
    if (previewUrl) {
      window.setTimeout(() => {
        URL.revokeObjectURL(previewUrl);
        previewUrls.current.delete(previewUrl);
      }, 200);
    }
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
        <DropZoneLabel>Add files to a support request</DropZoneLabel>
        <p className="text-xs text-muted-foreground">
          PNG, JPEG, or PDF up to 5 MB each
        </p>
        <FileTrigger
          acceptedFileTypes={acceptedTypes}
          allowsMultiple
          onSelect={(files) => {
            if (files) addFiles(Array.from(files));
          }}
        >
          <Button ref={pickerRef} variant="outline">
            Browse files
          </Button>
        </FileTrigger>
      </DropZone>
      <AttachmentList>
        {attachments.map((item) => (
          <Attachment
            key={item.id}
            name={item.file.name}
            size={item.file.size}
            previewUrl={item.previewUrl}
            onRemove={() => remove(item)}
          />
        ))}
      </AttachmentList>
      <output aria-live="polite" className="text-xs text-muted-foreground">
        {notice || "Files stay on this device until you choose to upload them."}
      </output>
    </div>
  );
}
