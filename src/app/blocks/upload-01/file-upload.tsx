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
import {
  DropZone,
  DropZoneDescription,
  DropZoneIcon,
  DropZoneLabel,
  DropZoneTrigger,
} from "@/components/ui/drop-zone";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Select } from "@/components/ui/select";
import { showToast } from "@/components/ui/toast";

const acceptedTypes = ["image/png", "image/jpeg", "application/pdf"];
const maxSize = 10 * 1024 * 1024;

const storageUsed = 38.4 * 1024 ** 3;
const storageLimit = 100 * 1024 ** 3;

const folders = [
  { id: "fall", name: "Marketing / Fall campaign" },
  { id: "brand", name: "Marketing / Brand assets" },
  { id: "launch", name: "Product / Q4 launch" },
  { id: "legal", name: "Operations / Contracts" },
];

interface Upload {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "complete" | "error";
  error?: string;
  speed?: number;
}

const initialUploads: Upload[] = [
  {
    id: "brief",
    name: "Fall campaign brief.pdf",
    size: 2_400_000,
    progress: 100,
    status: "complete",
  },
  {
    id: "media-plan",
    name: "Media plan, Q4.pdf",
    size: 1_180_000,
    progress: 100,
    status: "complete",
  },
  {
    id: "hero",
    name: "Hero, mountain trail.jpg",
    size: 8_900_000,
    progress: 62,
    status: "uploading",
    speed: 4,
  },
  {
    id: "cover",
    name: "Cover photo, 4x5.jpg",
    size: 5_800_000,
    progress: 28,
    status: "uploading",
    speed: 6,
  },
  {
    id: "lookbook",
    name: "Lookbook spreads.pdf",
    size: 9_600_000,
    progress: 41,
    status: "error",
    error: "The connection stopped at 41%.",
  },
  {
    id: "logo",
    name: "Partner logo, white.png",
    size: 310_000,
    progress: 4,
    status: "uploading",
    speed: 12,
  },
];

function formatBytes(bytes: number) {
  const gigabyte = 1024 ** 3;
  if (bytes >= gigabyte) return `${(bytes / gigabyte).toFixed(1)} GB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

export function FileUpload() {
  const [uploads, setUploads] = useState(initialUploads);
  const [notice, setNotice] = useState("");
  const [folder, setFolder] = useState("fall");
  const pickerRef = useRef<HTMLButtonElement>(null);
  const uploading = uploads.some((upload) => upload.status === "uploading");

  useEffect(() => {
    if (!uploading) return;
    const interval = window.setInterval(() => {
      setUploads((current) =>
        current.map((upload) => {
          if (upload.status !== "uploading") return upload;
          const progress = Math.min(100, upload.progress + (upload.speed ?? 8));
          return {
            ...upload,
            progress,
            status: progress === 100 ? "complete" : "uploading",
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
        speed: 8,
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

  function retry(upload: Upload) {
    setUploads((current) =>
      current.map((item) =>
        item.id === upload.id
          ? { ...item, status: "uploading", error: undefined, speed: 7 }
          : item,
      ),
    );
    setNotice(`${upload.name} restarted.`);
  }

  const done = uploads.filter((upload) => upload.status === "complete").length;
  const failed = uploads.filter((upload) => upload.status === "error").length;
  const totalBytes = uploads.reduce((sum, upload) => sum + upload.size, 0);
  const sentBytes = uploads.reduce(
    (sum, upload) => sum + (upload.size * upload.progress) / 100,
    0,
  );
  const folderName =
    folders.find((item) => item.id === folder)?.name.split(" / ")[1] ?? "";

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle as="h1" className="text-2xl leading-tight tracking-tight">
          Upload files
        </CardTitle>
        <CardDescription>
          {formatBytes(storageUsed + totalBytes)} of {formatBytes(storageLimit)}{" "}
          used in the Northwind workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Select
          label="Upload to"
          options={folders}
          value={folder}
          onChange={(key) => setFolder(String(key))}
        />
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
          className="min-h-44 bg-background"
        >
          <DropZoneIcon className="size-10 rounded-lg">
            <CloudArrowUpIcon size={24} />
          </DropZoneIcon>
          <DropZoneLabel>Drop files here</DropZoneLabel>
          <DropZoneDescription>
            PNG, JPEG, or PDF up to 10 MB each
          </DropZoneDescription>
          <DropZoneTrigger
            ref={pickerRef}
            variant="default"
            acceptedFileTypes={acceptedTypes}
            allowsMultiple
            onSelect={(files) => {
              if (files) add(Array.from(files));
            }}
          >
            Browse files
          </DropZoneTrigger>
        </DropZone>
        <AttachmentList aria-label="Files">
          {uploads.map((upload) => (
            <Attachment
              key={upload.id}
              name={upload.name}
              fileSize={upload.size}
              status={upload.status}
              progress={upload.progress}
              errorMessage={upload.error}
              onRetry={() => retry(upload)}
              onRemove={() => remove(upload)}
            />
          ))}
        </AttachmentList>
        {uploads.length > 0 && (
          <ProgressBar
            label={`${formatBytes(sentBytes)} of ${formatBytes(totalBytes)}`}
            value={totalBytes > 0 ? (sentBytes / totalBytes) * 100 : 0}
          />
        )}
        <output
          aria-live="polite"
          className="text-xs text-muted-foreground empty:sr-only"
        >
          {notice}
        </output>
      </CardContent>
      <CardFooter className="justify-between border-t border-border/70 pt-5">
        <p className="text-sm text-muted-foreground">
          {done} of {uploads.length} uploaded
          {failed > 0 ? ` · ${failed} failed` : ""}
        </p>
        <Button
          variant="outline"
          isDisabled={uploading || done === 0}
          onPress={() => {
            showToast({
              title: `${done} ${done === 1 ? "file is" : "files are"} in ${folderName}`,
              variant: "success",
            });
            setUploads([]);
          }}
        >
          Done
        </Button>
      </CardFooter>
    </Card>
  );
}
