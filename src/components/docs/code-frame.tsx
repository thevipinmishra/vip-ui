"use client";

import { type ReactNode, useState } from "react";
import {
  ChevronDown,
  DocumentCode2,
  Palette,
  TerminalSquare,
} from "reicon-react";
import { cn } from "@/lib/utils";
import { CodeScrollArea } from "./code-scroll-area";
import { CopyButton } from "./copy-button";

export function CodeFrame({
  code,
  filename,
  language,
  children,
  header,
  codeLabel,
  expandable = false,
  embedded = false,
  scrollable = false,
}: {
  code: string;
  filename: string;
  language: string;
  children: ReactNode;
  header?: ReactNode;
  codeLabel?: string;
  expandable?: boolean;
  embedded?: boolean;
  scrollable?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const lineCount = code.trim().split("\n").length;
  const canExpand = expandable && lineCount > 18;

  return (
    <div
      className={cn(
        "code-frame min-w-0 overflow-hidden bg-code text-code-foreground",
        !embedded &&
          "rounded-xl shadow-[var(--shadow-card)] ring-1 ring-border/70",
      )}
    >
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-border/70 px-3 py-2 sm:px-4">
        {header ?? (
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="grid size-7 shrink-0 place-items-center rounded-md bg-card text-muted-foreground ring-1 ring-border/70"
              aria-hidden="true"
            >
              {language === "bash" ? (
                <TerminalSquare size={15} />
              ) : language === "css" ? (
                <Palette size={15} />
              ) : (
                <DocumentCode2 size={15} />
              )}
            </span>
            {filename && (
              <span
                className="min-w-0 truncate font-mono text-[11px] text-code-foreground"
                title={filename}
              >
                {filename}
              </span>
            )}
          </div>
        )}
        <div className="flex shrink-0 items-center gap-1.5">
          <CopyButton key={code} code={code.trim()} />
        </div>
      </div>
      <div className={cn(canExpand && !expanded && "max-h-80 overflow-hidden")}>
        <CodeScrollArea
          label={codeLabel ?? `Code for ${filename}`}
          showScrollbar={!canExpand || expanded}
          scrollable={scrollable}
        >
          {children}
        </CodeScrollArea>
      </div>
      {canExpand && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 border-t border-border/70 px-4 text-xs font-medium text-code-foreground hover:bg-card/60"
        >
          {expanded ? "Show less" : `Show all ${lineCount} lines`}
          <ChevronDown
            size={14}
            aria-hidden="true"
            className={expanded ? "rotate-180" : undefined}
          />
        </button>
      )}
    </div>
  );
}
