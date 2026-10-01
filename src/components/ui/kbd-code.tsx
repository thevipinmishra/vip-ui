import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex min-h-6 items-center rounded border border-border bg-muted px-1.5 font-mono text-[11px] font-medium text-foreground shadow-[0_1px_0_var(--border)]",
        className,
      )}
      {...props}
    />
  );
}

export function InlineCode({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <code
      data-slot="inline-code"
      className={cn(
        "break-words rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className,
      )}
      {...props}
    />
  );
}
