"use client";

import { type ComponentProps, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "./utils";

const avatarStyles = tv({
  base: "inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-accent font-semibold text-accent-foreground ring-1 ring-border/70 select-none *:col-start-1 *:row-start-1",
  variants: {
    size: {
      sm: "size-8 text-[0.6875rem]",
      md: "size-10 text-xs",
      lg: "size-12 text-sm",
    },
  },
  defaultVariants: { size: "md" },
});

export interface AvatarProps extends ComponentProps<"span"> {
  name: string;
  src?: string;
  initials?: string;
  size?: NonNullable<VariantProps<typeof avatarStyles>["size"]>;
}

export function Avatar({
  name,
  src,
  initials,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | undefined>();
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const showImage = Boolean(src && src !== failedSrc);
  const imageLoaded = showImage && src === loadedSrc;
  const fallback =
    initials ??
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => Array.from(part)[0] ?? "")
      .join("")
      .toLocaleUpperCase();

  return (
    <span
      {...props}
      role="img"
      aria-label={name}
      data-slot="avatar"
      data-size={size}
      className={avatarStyles({ size, className })}
    >
      {!imageLoaded && (
        <span aria-hidden="true" data-slot="avatar-fallback">
          {fallback}
        </span>
      )}
      {showImage && (
        // biome-ignore lint/performance/noImgElement: Keep the avatar usable outside Next.js.
        <img
          ref={(image) => {
            if (!image?.complete) return;
            if (image.naturalWidth > 0) setLoadedSrc(src);
            else setFailedSrc(src);
          }}
          src={src}
          alt=""
          data-slot="avatar-image"
          className="size-full object-cover"
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
        />
      )}
    </span>
  );
}

export function AvatarGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: Avatars are not form controls.
    <div
      role="group"
      data-slot="avatar-group"
      className={cn(
        "flex items-center -space-x-2 rtl:space-x-reverse [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-background",
        className,
      )}
      {...props}
    />
  );
}
