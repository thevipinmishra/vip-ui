"use client";

import {
  CheckCircleIcon,
  FileCodeIcon,
  FileImageIcon,
  FilePdfIcon,
  FileTextIcon,
  FileZipIcon,
  WarningIcon,
  XIcon,
} from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { duration, easeOut, springLayout, transitionFor } from "@/lib/motion";
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

export type AttachmentStatus = "ready" | "uploading" | "complete" | "error";

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
  size?: "sm" | "md";
  fileSize?: number;
  previewUrl?: string;
  status?: AttachmentStatus;
  progress?: number;
  errorMessage?: string;
  onRemove?: () => void;
  onRetry?: () => void;
}

const sizeUnits = ["B", "KB", "MB", "GB", "TB"];

function formatSize(bytes: number) {
  let value = Math.max(0, bytes);
  let unit = 0;
  while (unit < sizeUnits.length - 1 && Number(value.toFixed(1)) >= 1024) {
    value /= 1024;
    unit += 1;
  }
  const amount = unit === 0 ? Math.round(value) : Number(value.toFixed(1));
  return `${amount} ${sizeUnits[unit]}`;
}

export function Attachment({
  name,
  size = "md",
  fileSize,
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
  const extension = name.split(".").pop()?.toLowerCase();
  const FileIcon =
    extension === "pdf"
      ? FilePdfIcon
      : extension === "zip"
        ? FileZipIcon
        : ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(extension ?? "")
          ? FileImageIcon
          : ["js", "jsx", "ts", "tsx", "json", "html", "css"].includes(
                extension ?? "",
              )
            ? FileCodeIcon
            : FileTextIcon;
  const small = size === "sm";
  const percent =
    progress === undefined
      ? undefined
      : Math.round(Math.min(100, Math.max(0, progress)));
  const statusText =
    status === "uploading"
      ? percent === undefined
        ? "Uploading"
        : `Uploading ${percent}%`
      : status === "complete"
        ? "Uploaded"
        : status === "error"
          ? (errorMessage ?? "Could not upload")
          : "Ready";

  return (
    <motion.li
      {...props}
      data-slot="attachment"
      data-status={status}
      data-size={size}
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      layout={reduceMotion ? false : "position"}
      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
      transition={transitionFor(reduceMotion, {
        duration: duration.base,
        ease: easeOut,
        layout: springLayout,
      })}
      className={cn(
        "flex min-w-0 items-center rounded-lg border border-border bg-card text-sm transition-[border-color] duration-200 ease-out-quint",
        small
          ? "w-fit max-w-[min(13rem,100%)] gap-2.5 p-1.5 pe-1"
          : "gap-3 p-2 shadow-[var(--shadow-card)]",
        status === "error" && "border-destructive/60",
        className,
      )}
    >
      <span
        aria-hidden="true"
        data-slot="attachment-preview"
        className={cn(
          "flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground",
          small ? "size-9" : "size-11",
        )}
      >
        {previewUrl ? (
          // biome-ignore lint/performance/noImgElement: Files can be object URLs in any React app.
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <FileIcon size={small ? 18 : 20} aria-hidden="true" />
        )}
      </span>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3">
        <div className="min-w-[min(8rem,100%)] flex-1">
          <p
            data-slot="attachment-name"
            className={cn(
              "font-medium text-foreground",
              small ? "truncate text-xs leading-4" : "[overflow-wrap:anywhere]",
            )}
          >
            {name}
          </p>
          <p
            data-slot="attachment-details"
            className={cn(
              "text-muted-foreground",
              small
                ? "truncate text-[11px] leading-4"
                : "text-xs leading-5 [overflow-wrap:anywhere]",
              status === "error" && "text-destructive",
            )}
          >
            {status === "error" && (
              <WarningIcon
                size={13}
                weight="bold"
                aria-hidden="true"
                className="me-1 inline-block align-[-2px]"
              />
            )}
            {status === "complete" && (
              <CheckCircleIcon
                size={13}
                weight="fill"
                aria-hidden="true"
                className="me-1 inline-block align-[-2px] text-success transition-[opacity,scale] duration-350 ease-spring starting:scale-50 starting:opacity-0"
              />
            )}
            {fileSize !== undefined && (
              <>
                <span>{formatSize(fileSize)}</span>
                <span aria-hidden="true"> · </span>
              </>
            )}
            <span>{statusText}</span>
          </p>
          {status === "uploading" && (
            <ProgressBar
              aria-label={`${name} upload`}
              value={progress ?? 0}
              isIndeterminate={progress === undefined}
              className={cn(
                "gap-0 transition-opacity duration-200 ease-out-quint starting:opacity-0 *:not-data-[slot=progress-bar-track]:hidden",
                small
                  ? "mt-1 [&_[data-slot=progress-bar-track]]:h-1"
                  : "mt-2 [&_[data-slot=progress-bar-track]]:h-1.5",
              )}
            />
          )}
        </div>
        {status === "error" && onRetry && (
          <Button
            type="button"
            variant="ghost"
            size={small ? "xs" : "sm"}
            onPress={onRetry}
          >
            Retry
          </Button>
        )}
      </div>
      {onRemove && (
        <Button
          type="button"
          variant="ghost"
          size={small ? "xs" : "sm"}
          iconOnly
          aria-label={`Remove ${name}`}
          onPress={onRemove}
        >
          <XIcon aria-hidden="true" />
        </Button>
      )}
    </motion.li>
  );
}
