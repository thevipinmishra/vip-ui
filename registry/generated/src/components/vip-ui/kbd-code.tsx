import type { HTMLAttributes } from "react";
import { cn } from "./utils";

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex min-h-6 items-center rounded-sm border border-border bg-muted px-1.5 font-mono text-xs font-medium text-foreground shadow-xs",
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
        "break-words rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className,
      )}
      {...props}
    />
  );
}
