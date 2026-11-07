"use client";

import { CheckIcon, HashIcon } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { sectionTitleClass } from "./page-header";

export function SectionHeading({
  section,
  id,
  className,
  children,
}: {
  section: string;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  async function copy() {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    const { origin, pathname, search } = window.location;
    try {
      await navigator.clipboard.writeText(
        `${origin}${pathname}${search}#${section}`,
      );
    } catch {
      setCopied(false);
      return;
    }
    setCopied(true);
    resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={cn("group/heading", sectionTitleClass, className)}>
      <h2 id={id} className="inline">
        {children}
      </h2>
      <a
        href={`#${section}`}
        aria-label={`Copy link to ${typeof children === "string" ? children : "section"}`}
        onClick={(event) => {
          if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          event.preventDefault();
          window.history.replaceState(null, "", `#${section}`);
          void copy();
        }}
        data-copied={copied || undefined}
        className="ms-1.5 inline-flex size-7 translate-y-[-0.1em] items-center justify-center rounded-md align-middle text-muted-foreground opacity-0 outline-offset-0 outline-transparent transition-[opacity,color,background-color,outline-color] duration-150 ease-out-quint group-hover/heading:opacity-100 hover:bg-muted hover:text-foreground focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring data-copied:text-foreground data-copied:opacity-100 motion-reduce:transition-none"
      >
        {copied ? (
          <CheckIcon size={16} weight="bold" aria-hidden="true" />
        ) : (
          <HashIcon size={16} weight="bold" aria-hidden="true" />
        )}
      </a>
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        {copied ? "Link copied to clipboard" : ""}
      </output>
    </div>
  );
}
