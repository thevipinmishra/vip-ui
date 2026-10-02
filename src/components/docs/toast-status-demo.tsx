"use client";

import { useState } from "react";
import { Check, Upload, Warning } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

export function ToastStatusDemo() {
  const [status, setStatus] = useState<
    "queued" | "uploading" | "paused" | "ready"
  >("queued");

  function startUpload() {
    setStatus("uploading");
    showToast(
      {
        title: "Upload started",
        description: "Adding 3 assets to Autumn campaign.",
        variant: "info",
      },
      { timeout: 5000 },
    );
  }

  return (
    <div className="w-full max-w-md rounded-xl bg-card p-5 ring-1 ring-border/70">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Autumn campaign</p>
        <Badge
          variant={
            status === "ready"
              ? "success"
              : status === "paused"
                ? "warning"
                : "neutral"
          }
          dot
        >
          {status === "ready"
            ? "Ready"
            : status === "paused"
              ? "Paused"
              : status === "uploading"
                ? "Uploading"
                : "Queued"}
        </Badge>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        3 files · Studio North
      </p>
      <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
        <Button
          size="sm"
          isDisabled={status !== "uploading"}
          onPress={() => {
            setStatus("ready");
            showToast(
              {
                title: "Files ready",
                description: "3 assets were added to Autumn campaign.",
                variant: "success",
              },
              { timeout: 5000 },
            );
          }}
        >
          <Check size={16} aria-hidden="true" /> Complete upload
        </Button>
        <Button
          variant="outline"
          size="sm"
          isDisabled={status !== "uploading"}
          onPress={() => {
            setStatus("paused");
            showToast({
              title: "Upload paused",
              description: "Check your connection, then try again.",
              variant: "warning",
            });
          }}
        >
          <Warning size={16} aria-hidden="true" /> Pause upload
        </Button>
        <Button
          variant="ghost"
          size="sm"
          isDisabled={status === "uploading"}
          onPress={startUpload}
        >
          <Upload size={16} aria-hidden="true" />{" "}
          {status === "paused" ? "Resume upload" : "Start upload"}
        </Button>
      </div>
    </div>
  );
}
