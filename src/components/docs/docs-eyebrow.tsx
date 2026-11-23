import { Fragment } from "react";
import { cn } from "@/lib/utils";

/** Monospace breadcrumb-style label that sits above a page title. */
export function DocsEyebrow({
  trail,
  className,
}: {
  trail: string[];
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mono-label mb-4 flex items-center gap-2 text-muted-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full bg-docs-accent shadow-[0_0_8px_var(--docs-accent)] forced-colors:bg-[Highlight]"
      />
      {trail.map((part, index) => (
        <Fragment key={part}>
          {index > 0 && (
            <span aria-hidden="true" className="text-foreground/25">
              /
            </span>
          )}
          <span
            className={
              index === trail.length - 1 ? "text-foreground/80" : undefined
            }
          >
            {part}
          </span>
        </Fragment>
      ))}
    </p>
  );
}
