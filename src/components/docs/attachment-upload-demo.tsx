"use client";

import { useEffect, useState } from "react";
import {
  Attachment,
  AttachmentList,
  type AttachmentStatus,
} from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";

type Upload = {
  id: string;
  name: string;
  fileSize: number;
  progress: number;
  status: AttachmentStatus;
  failsAt?: number;
};

const initial: Upload[] = [
  {
    id: "brief",
    name: "Project brief.pdf",
    fileSize: 284672,
    progress: 0,
    status: "uploading",
  },
  {
    id: "preview",
    name: "Homepage-preview.png",
    fileSize: 1064960,
    progress: 0,
    status: "uploading",
    failsAt: 60,
  },
  {
    id: "assets",
    name: "Assets.zip",
    fileSize: 3145728,
    progress: 0,
    status: "uploading",
  },
];

const steps: Record<string, number> = { brief: 18, preview: 12, assets: 7 };

export function AttachmentUploadDemo() {
  const [uploads, setUploads] = useState(initial);
  const active = uploads.some((upload) => upload.status === "uploading");

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => {
      setUploads((current) =>
        current.map((upload) => {
          if (upload.status !== "uploading") return upload;
          const progress = Math.min(100, upload.progress + steps[upload.id]);
          if (upload.failsAt !== undefined && progress >= upload.failsAt) {
            return { ...upload, progress, status: "error" };
          }
          return {
            ...upload,
            progress,
            status: progress >= 100 ? "complete" : "uploading",
          };
        }),
      );
    }, 400);
    return () => window.clearInterval(timer);
  }, [active]);

  return (
    <div className="grid w-full max-w-md gap-3">
      <AttachmentList>
        {uploads.map((upload) => (
          <Attachment
            key={upload.id}
            name={upload.name}
            fileSize={upload.fileSize}
            status={upload.status}
            progress={upload.progress}
            errorMessage="Upload stopped"
            onRetry={() =>
              setUploads((current) =>
                current.map((item) =>
                  item.id === upload.id
                    ? {
                        ...item,
                        progress: 0,
                        status: "uploading",
                        failsAt: undefined,
                      }
                    : item,
                ),
              )
            }
          />
        ))}
      </AttachmentList>
      <div>
        <Button variant="ghost" size="sm" onPress={() => setUploads(initial)}>
          Restart
        </Button>
      </div>
    </div>
  );
}
