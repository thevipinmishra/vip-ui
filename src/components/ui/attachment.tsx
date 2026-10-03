"use client";

import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { FileText, Warning, X } from "reicon-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ProgressBar } from "./progress-bar";

export interface AttachmentListProps extends ComponentProps<"ul"> {
  children: ReactNode;
}

export function AttachmentList({
  children,
  className,
  ...props
}: AttachmentListProps) {
  return (
    <ul
      {...props}
      data-slot="attachment-list"
      aria-label={props["aria-label"] ?? "Attachments"}
      className={cn("grid min-w-0 gap-2", className)}
    >
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </ul>
  );
}

export interface AttachmentProps
  extends Omit<
    ComponentProps<"li">,
    | "children"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
  > {
  name: string;
  size?: number;
  previewUrl?: string;
  status?: "ready" | "uploading" | "uploaded" | "error";
  progress?: number;
  errorMessage?: string;
  onRemove?: () => void;
  onRetry?: () => void;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Attachment({
  name,
  size,
  previewUrl,
  status = "ready",
  progress,
  errorMessage,
  onRemove,
  onRetry,
  className,
  ...props
}: AttachmentProps) {
  const reduceMotion = useReducedMotion() === true;
  const isPresent = useIsPresent();
  const statusText =
    status === "uploading"
      ? "Uploading"
      : status === "uploaded"
        ? "Uploaded"
        : status === "error"
          ? (errorMessage ?? "Could not upload")
          : "Ready";

  return (
    <motion.li
      {...props}
      data-slot="attachment"
      data-status={status}
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      layout={reduceMotion ? false : "position"}
      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
      transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
      className={cn(
        "flex min-w-0 items-center gap-3 rounded-lg border border-border bg-card p-2.5 text-sm shadow-[var(--shadow-card)]",
        status === "error" && "border-destructive/60",
        className,
      )}
    >
      <span
        aria-hidden="true"
        data-slot="attachment-preview"
        className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground"
      >
        {previewUrl ? (
          // biome-ignore lint/performance/noImgElement: Files can be object URLs in any React app.
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <FileText size={20} aria-hidden="true" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p
          data-slot="attachment-name"
          className="font-medium text-foreground [overflow-wrap:anywhere]"
        >
          {name}
        </p>
        <p
          data-slot="attachment-details"
          className={cn(
            "flex flex-wrap items-center gap-x-1.5 text-xs leading-5 text-muted-foreground",
            status === "error" && "text-destructive",
          )}
        >
          {status === "error" && <Warning size={13} aria-hidden="true" />}
          {size !== undefined && <span>{formatSize(size)}</span>}
          {size !== undefined && <span aria-hidden="true">·</span>}
          <span>{statusText}</span>
        </p>
        {status === "uploading" && (
          <ProgressBar
            aria-label={`${name} upload`}
            value={progress ?? 0}
            isIndeterminate={progress === undefined}
            className="mt-2"
          />
        )}
      </div>
      {status === "error" && onRetry && (
        <Button type="button" variant="ghost" onPress={onRetry}>
          Retry
        </Button>
      )}
      {onRemove && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Remove ${name}`}
          onPress={onRemove}
        >
          <X size={17} aria-hidden="true" />
        </Button>
      )}
    </motion.li>
  );
}
