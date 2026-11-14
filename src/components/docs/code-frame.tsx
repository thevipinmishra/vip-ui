"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useId, useState } from "react";
import { usePress } from "react-aria";
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
  const reduceMotion = useReducedMotion();
  const canExpand = previewCode && code.trim().split("\n").length > 8;
  const collapsed = canExpand && !expanded;
  const toggle = () => setExpanded(!expanded);
  const { pressProps } = usePress({ onPress: toggle });

  return (
    <div
      data-slot="code-frame"
      className={cn(
        "code-frame min-w-0 overflow-hidden bg-code text-code-foreground",
        !embedded && "rounded-2xl shadow-(--shadow-card) ring-1 ring-border/60",
      )}
    >
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-border/70 px-3 py-2 sm:px-4">
        {header ?? (
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
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
            <>
              <Button
                variant="minimal"
                size="xs"
                className="h-8 rounded-md px-2.5 text-xs hover:bg-accent pressed:bg-accent"
                onPress={toggle}
                aria-expanded={expanded}
                aria-controls={panelId}
              >
                {expanded ? "Show less" : "Show more"}
              </Button>
              <div aria-hidden="true" className="h-4 w-px bg-border" />
            </>
          )}
          <CopyButton
            key={code}
            code={code.trim()}
            label={copyText}
            iconOnly
            variant="minimal"
            className="size-8 hover:bg-accent pressed:bg-accent data-[status=copied]:text-foreground data-[status=error]:text-destructive"
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
          aria-hidden={collapsed || undefined}
          inert={collapsed}
        >
          <CodeScrollArea
            label={codeLabel ?? `Code for ${filename}`}
            showScrollbar={!collapsed}
            scrollable={scrollable}
          >
            {children}
          </CodeScrollArea>
        </div>
        {canExpand && (
          <div
            {...pressProps}
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 bottom-0 z-10 flex h-20 cursor-pointer items-end justify-center bg-linear-to-b from-code/0 to-code to-70% pb-3 font-medium text-muted-foreground text-xs transition-[opacity,color] duration-200 ease-out-quint hover:text-foreground",
              expanded && "pointer-events-none opacity-0",
            )}
          >
            Show more
          </div>
        )}
      </motion.div>
    </div>
  );
}
