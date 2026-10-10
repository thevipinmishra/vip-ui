"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Link as AriaLink, type LinkProps } from "react-aria-components";
import { cn } from "./utils";

export interface SourceLinkProps
  extends Omit<LinkProps, "children" | "className"> {
  href: string;
  label: string;
  source: string;
  index?: number;
  description?: string;
  className?: string;
}

export function SourceLink({
  label,
  source,
  index,
  description,
  className,
  ...props
}: SourceLinkProps) {
  return (
    <AriaLink
      {...props}
      data-slot="source-link"
      className={cn(
        "group flex min-w-0 items-start gap-3 rounded-xl border border-border bg-card p-3.5 text-start shadow-[var(--shadow-card)] outline-none motion-safe:transition-[border-color,background-color,transform] motion-safe:duration-200 hover:border-primary/40 hover:bg-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-safe:hover:-translate-y-0.5 data-[disabled]:cursor-default data-[disabled]:opacity-50 motion-safe:data-[disabled]:hover:translate-y-0",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent font-mono text-xs font-semibold text-primary"
      >
        {index ?? <ArrowUpRightIcon size={16} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium leading-5 text-foreground [overflow-wrap:anywhere]">
          {label}
        </span>
        <span className="mt-0.5 block text-xs leading-5 text-muted-foreground [overflow-wrap:anywhere]">
          {source}
        </span>
        {description && (
          <span className="mt-1 block text-xs leading-5 text-muted-foreground [overflow-wrap:anywhere]">
            {description}
          </span>
        )}
      </span>
      <ArrowUpRightIcon
        size={16}
        aria-hidden="true"
        className="mt-0.5 shrink-0 text-muted-foreground motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
      />
    </AriaLink>
  );
}
