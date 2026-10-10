"use client";

import { CloudArrowUpIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import type { DropItem, FileDropItem } from "react-aria-components";
import { Attachment, AttachmentList } from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropZone, DropZoneLabel } from "@/components/ui/drop-zone";
import { FileTrigger } from "@/components/ui/file-trigger";

const acceptedTypes = ["image/png", "image/jpeg", "application/pdf"];
const maxSize = 10 * 1024 * 1024;

interface Upload {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "uploaded" | "error";
}

const initialUploads: Upload[] = [
  {
    id: "brief",
    name: "Launch brief.pdf",
    size: 2_400_000,
    progress: 100,
    status: "uploaded",
  },
  {
    id: "cover",
    name: "Cover photo.jpg",
    size: 5_800_000,
    progress: 45,
    status: "uploading",
  },
];

export function FileUpload() {
  const [uploads, setUploads] = useState(initialUploads);
  const [notice, setNotice] = useState("");
  const pickerRef = useRef<HTMLButtonElement>(null);
  const uploading = uploads.some((upload) => upload.status === "uploading");

  useEffect(() => {
    if (!uploading) return;
    const interval = window.setInterval(() => {
      setUploads((current) =>
        current.map((upload) => {
          if (upload.status !== "uploading") return upload;
          const progress = Math.min(100, upload.progress + 8);
          return {
            ...upload,
            progress,
            status: progress === 100 ? "uploaded" : "uploading",
          };
        }),
      );
    }, 400);
    return () => window.clearInterval(interval);
  }, [uploading]);

  function add(files: File[]) {
    const valid = files.filter(
      (file) => acceptedTypes.includes(file.type) && file.size <= maxSize,
    );
    const skipped = files.length - valid.length;
    setUploads((current) => [
      ...current,
      ...valid.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        progress: 0,
        status: "uploading" as const,
      })),
    ]);
    setNotice(
      skipped
        ? `${skipped} file${skipped === 1 ? " was" : "s were"} skipped. Use PNG, JPEG, or PDF up to 10 MB.`
        : `${valid.length} file${valid.length === 1 ? "" : "s"} added.`,
    );
  }

  function remove(upload: Upload) {
    pickerRef.current?.focus();
    setUploads((current) => current.filter((item) => item.id !== upload.id));
    setNotice(`${upload.name} removed.`);
  }

  const done = uploads.filter((upload) => upload.status === "uploaded").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h1" className="text-xl">
          Upload files
        </CardTitle>
        <CardDescription>Add files to the Campaign folder.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <DropZone
          getDropOperation={(types) =>
            acceptedTypes.some((type) => types.has(type)) ? "copy" : "cancel"
          }
          onDrop={async ({ items }) => {
            const files = await Promise.all(
              items
                .filter(
                  (item: DropItem): item is FileDropItem =>
                    item.kind === "file",
                )
                .map((item) => item.getFile()),
            );
            add(files);
          }}
          className="min-h-48"
        >
          <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
            <CloudArrowUpIcon size={24} aria-hidden="true" />
          </span>
          <DropZoneLabel>Drop files here</DropZoneLabel>
          <p className="text-xs text-muted-foreground">
            PNG, JPEG, or PDF up to 10 MB each
          </p>
          <FileTrigger
            acceptedFileTypes={acceptedTypes}
            allowsMultiple
            onSelect={(files) => {
              if (files) add(Array.from(files));
            }}
          >
            <Button ref={pickerRef} variant="outline" size="sm">
              Browse files
            </Button>
          </FileTrigger>
        </DropZone>
        <AttachmentList aria-label="Files">
          {uploads.map((upload) => (
            <Attachment
              key={upload.id}
              name={upload.name}
              size={upload.size}
              status={upload.status}
              progress={upload.progress}
              onRemove={() => remove(upload)}
            />
          ))}
        </AttachmentList>
        <output aria-live="polite" className="text-xs text-muted-foreground">
          {notice}
        </output>
      </CardContent>
      <CardFooter className="justify-between border-t border-border/70 pt-5">
        <p className="text-sm text-muted-foreground">
          {done} of {uploads.length} uploaded
        </p>
        <Button isDisabled={uploading || uploads.length === 0}>Done</Button>
      </CardFooter>
    </Card>
  );
}
