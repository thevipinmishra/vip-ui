import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { isNew } from "@/lib/whats-new";

export function NewBadge({
  added,
  className,
  children = "New",
  ...props
}: ComponentProps<"span"> & { added: string | undefined }) {
  if (!isNew(added)) return null;
  return (
    <span
      data-slot="new-badge"
      className={cn(
        "inline-flex h-4.5 shrink-0 items-center rounded-full bg-success-subtle px-1.5 text-[11px] leading-none font-medium tracking-normal text-success-foreground forced-colors:border",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
