"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CodeScrollArea } from "./code-scroll-area";
import { CopyButton } from "./copy-button";

export function CodeFrame({
  code,
  filename,
  children,
  copyText,
  header,
  codeLabel,
  embedded = false,
  previewCode = false,
  scrollable = false,
}: {
  code: string;
  filename: string;
  children: ReactNode;
  copyText?: string;
  header?: ReactNode;
  codeLabel?: string;
  embedded?: boolean;
  previewCode?: boolean;
  scrollable?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const headerButtonRef = useRef<HTMLButtonElement>(null);
  const overlayButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const lineCount = code.trim().split("\n").length;
  const canExpand = previewCode && lineCount > 6;
  const expandButton = (
    <Button
      ref={headerButtonRef}
      variant="ghost"
      size="default"
      onPress={() => {
        setExpanded(!expanded);
        if (expanded && window.matchMedia("(max-width: 639px)").matches) {
          requestAnimationFrame(() => overlayButtonRef.current?.focus());
        }
      }}
      aria-expanded={expanded}
      aria-controls={panelId}
    >
      {expanded ? "Show less" : "View code"}
    </Button>
  );

  return (
    <div
      data-slot="code-frame"
      className={cn(
        "code-frame min-w-0 overflow-hidden bg-code text-code-foreground",
        !embedded &&
          "rounded-xl shadow-[var(--shadow-card)] ring-1 ring-border/70",
      )}
    >
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-border/70 px-3 py-2 sm:px-4">
        {header ?? (
          <div
            className={cn(
              "flex min-w-0 flex-1 items-center gap-2.5",
              canExpand && expanded && "max-sm:basis-full",
            )}
          >
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
          {canExpand && (
            <div className={!expanded ? "max-sm:hidden" : undefined}>
              {expandButton}
            </div>
          )}
          <CopyButton
            key={code}
            code={code.trim()}
            label={copyText}
            iconOnly
            variant="minimal"
            className="size-8 data-[status=copied]:text-foreground data-[status=failed]:text-destructive"
          />
        </div>
      </div>
      <motion.div
        className={cn("relative", canExpand && "overflow-hidden")}
        initial={false}
        animate={canExpand ? { height: expanded ? "auto" : 176 } : undefined}
        transition={{
          duration: reduceMotion ? 0 : 0.22,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <div
          id={panelId}
          aria-hidden={canExpand && !expanded ? true : undefined}
          inert={canExpand && !expanded}
        >
          <CodeScrollArea
            label={codeLabel ?? `Code for ${filename}`}
            showScrollbar={!canExpand || expanded}
            scrollable={scrollable}
          >
            {children}
          </CodeScrollArea>
        </div>
        {canExpand && !expanded && (
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-b from-transparent to-code pb-3 pt-12">
            <Button
              ref={overlayButtonRef}
              variant="ghost"
              size="default"
              onPress={() => {
                setExpanded(true);
                requestAnimationFrame(() => headerButtonRef.current?.focus());
              }}
              aria-expanded={false}
              aria-controls={panelId}
            >
              View code
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
