"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useId, useRef, useState } from "react";
import {
  ChevronDown,
  DocumentCode2,
  Palette,
  TerminalSquare,
} from "reicon-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CodeScrollArea } from "./code-scroll-area";
import { CopyButton } from "./copy-button";

export function CodeFrame({
  code,
  filename,
  language,
  children,
  copyText,
  header,
  codeLabel,
  expandable = false,
  embedded = false,
  previewCode = false,
  scrollable = false,
}: {
  code: string;
  filename: string;
  language: string;
  children: ReactNode;
  copyText?: string;
  header?: ReactNode;
  codeLabel?: string;
  expandable?: boolean;
  embedded?: boolean;
  previewCode?: boolean;
  scrollable?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const headerButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const lineCount = code.trim().split("\n").length;
  const canExpand = previewCode ? lineCount > 6 : expandable && lineCount > 18;
  const expandButton = (
    <Button
      ref={previewCode ? headerButtonRef : undefined}
      variant="ghost"
      size="default"
      onPress={() => setExpanded(!expanded)}
      aria-expanded={expanded}
      aria-controls={panelId}
    >
      {expanded
        ? "Show less"
        : previewCode
          ? "View code"
          : `Show all ${lineCount} lines`}
      {!previewCode && (
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <ChevronDown size={14} />
        </motion.span>
      )}
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
          {previewCode && canExpand && expandButton}
          <CopyButton
            key={code}
            code={code.trim()}
            label={copyText}
            text={copyText}
          />
        </div>
      </div>
      <motion.div
        className={cn("relative", canExpand && "overflow-hidden")}
        initial={false}
        animate={
          canExpand
            ? { height: expanded ? "auto" : previewCode ? 176 : 320 }
            : undefined
        }
        transition={{
          duration: reduceMotion ? 0 : 0.22,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <div
          id={panelId}
          aria-hidden={previewCode && canExpand && !expanded ? true : undefined}
          inert={previewCode && canExpand && !expanded}
        >
          <CodeScrollArea
            label={codeLabel ?? `Code for ${filename}`}
            showScrollbar={!canExpand || expanded}
            scrollable={scrollable}
          >
            {children}
          </CodeScrollArea>
        </div>
        {previewCode && canExpand && !expanded && (
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-b from-transparent to-code pb-3 pt-12">
            <Button
              variant="ghost"
              size="default"
              onPress={() => {
                headerButtonRef.current?.focus();
                setExpanded(true);
              }}
              aria-expanded={false}
              aria-controls={panelId}
            >
              View code
            </Button>
          </div>
        )}
      </motion.div>
      {!previewCode && canExpand && (
        <div className="flex justify-center border-t border-border/70 px-3 py-2">
          {expandButton}
        </div>
      )}
    </div>
  );
}
