import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex min-h-6 min-w-6 items-center justify-center gap-1 rounded-sm border border-border bg-muted px-1.5 font-mono text-xs font-medium whitespace-nowrap text-foreground shadow-xs [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  );
}

export function KbdGroup({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn(
        "inline-flex items-center gap-1 font-sans whitespace-nowrap",
        className,
      )}
      {...props}
    />
  );
}

export function InlineCode({ className, ...props }: ComponentProps<"code">) {
  return (
    <code
      data-slot="inline-code"
      className={cn(
        "rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground [overflow-wrap:anywhere] box-decoration-clone",
        className,
      )}
      {...props}
    />
  );
}
