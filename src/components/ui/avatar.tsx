"use client";

import { type HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
  initials?: string;
}

export function Avatar({
  name,
  src,
  initials,
  className,
  ...props
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const showImage = Boolean(src && src !== failedSrc);
  const fallback =
    initials ??
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toLocaleUpperCase();

  return (
    <span
      {...props}
      role="img"
      aria-label={name}
      data-slot="avatar"
      className={cn(
        "inline-grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-accent text-xs font-semibold text-accent-foreground ring-1 ring-border/70",
        className,
      )}
    >
      {showImage ? (
        // Portable copyable component; Next Image would require a Next.js dependency.
        // biome-ignore lint/performance/noImgElement: Keep the avatar usable outside Next.js.
        <img
          src={src}
          alt=""
          data-slot="avatar-image"
          className="size-full object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span aria-hidden="true" data-slot="avatar-fallback">
          {fallback}
        </span>
      )}
    </span>
  );
}

export function AvatarGroup({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "flex items-center -space-x-2 rtl:space-x-reverse [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-background",
        className,
      )}
      {...props}
    />
  );
}
