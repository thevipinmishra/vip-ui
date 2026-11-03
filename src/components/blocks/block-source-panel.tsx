"use client";

import {
  FileTsIcon,
  FileTsxIcon,
  FolderOpenIcon,
  TerminalWindowIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { type CSSProperties, useEffect, useState } from "react";
import { CopyButton } from "@/components/docs/copy-button";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Spinner } from "@/components/ui/spinner";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import type { Block } from "@/lib/blocks";
import type { BlockSource } from "./block-source-types";

const cache = new Map<string, BlockSource>();

function defaultFile(source: BlockSource) {
  return (
    source.files.find((file) => file.path.endsWith("/page.tsx"))?.path ??
    source.files[0]?.path ??
    null
  );
}

export function BlockSourcePanel({ block }: { block: Block }) {
  const cached = cache.get(block.name);
  const [source, setSource] = useState<BlockSource | null>(cached ?? null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    cached ? "ready" : "loading",
  );
  const [activeFile, setActiveFile] = useState<string | null>(
    cached ? defaultFile(cached) : null,
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const ready = cache.get(block.name);
    if (ready) {
      setSource(ready);
      setActiveFile(defaultFile(ready));
      setStatus("ready");
      return;
    }
    let cancelled = false;
    setSource(null);
    setActiveFile(null);
    setStatus("loading");
    fetch(`/api/blocks/${block.name}`, {
      cache: attempt ? "reload" : "force-cache",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.json() as Promise<BlockSource>;
      })
      .then((data) => {
        cache.set(block.name, data);
        if (cancelled) return;
        setSource(data);
        setActiveFile(defaultFile(data));
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [block.name, attempt]);

  if (status === "loading") {
    return (
      <div className="grid min-h-0 flex-1 place-items-center p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner size="sm" decorative />
          Loading source…
        </div>
      </div>
    );
  }

  if (status === "error" || !source) {
    return (
      <div className="grid min-h-0 flex-1 place-items-center p-6">
        <EmptyState className="w-full max-w-sm">
          <EmptyStateIcon>
            <WarningCircleIcon size={24} aria-hidden="true" />
          </EmptyStateIcon>
          <EmptyStateTitle>Could not load the source</EmptyStateTitle>
          <EmptyStateDescription>
            Check your connection, then try again.
          </EmptyStateDescription>
          <EmptyStateActions>
            <Button
              variant="outline"
              size="sm"
              onPress={() => setAttempt((value) => value + 1)}
            >
              Try again
            </Button>
          </EmptyStateActions>
        </EmptyState>
      </div>
    );
  }

  const file =
    source.files.find((item) => item.path === activeFile) ?? source.files[0];
  const directory = file?.path.slice(0, file.path.lastIndexOf("/") + 1);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 p-3 sm:p-4">
      <div className="flex shrink-0 flex-col gap-3">
        <p className="max-w-3xl text-pretty text-sm leading-6 text-muted-foreground">
          {block.description}
        </p>
        <div className="flex min-w-0 flex-col gap-1 rounded-xl bg-muted/50 p-2 ring-1 ring-border/70 sm:flex-row sm:items-center sm:gap-2 sm:py-1 sm:ps-3 sm:pe-1">
          <div className="flex min-w-0 flex-1 items-start gap-2">
            <TerminalWindowIcon
              size={16}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-muted-foreground"
            />
            <code
              className="min-w-0 flex-1 break-all font-mono text-xs leading-5 text-muted-foreground sm:truncate"
              title={source.command}
            >
              {source.command}
            </code>
          </div>
          <CopyButton
            code={source.command}
            label={`Copy ${block.name} install command`}
            text="Copy command"
            variant="ghost"
            className="self-start sm:self-auto"
          />
        </div>
      </div>
      <div className="code-frame flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-code text-code-foreground md:grid md:grid-cols-[14rem_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)]">
        <div className="flex min-h-0 shrink-0 flex-col border-b border-border/70 md:overflow-y-auto md:border-e md:border-b-0">
          <p className="hidden items-center gap-1.5 px-4 pb-1 pt-3 font-mono text-[11px] text-muted-foreground md:flex">
            <FolderOpenIcon size={14} aria-hidden="true" />
            <span className="truncate" title={directory}>
              {directory}
            </span>
          </p>
          <ToggleButtonGroup
            aria-label="Files"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={activeFile ? [activeFile] : []}
            onSelectionChange={(keys) => {
              const [next] = keys;
              if (typeof next === "string") setActiveFile(next);
            }}
            className="flex w-full flex-row flex-nowrap gap-1 overflow-x-auto rounded-none border-0 bg-transparent p-2 md:flex-col md:overflow-visible"
          >
            {source.files.map((item) => {
              const Icon = item.path.endsWith(".tsx")
                ? FileTsxIcon
                : FileTsIcon;
              return (
                <ToggleButton
                  key={item.path}
                  id={item.path}
                  variant="ghost"
                  size="sm"
                  className="min-h-9 shrink-0 justify-start gap-2 px-2 font-mono text-xs font-normal"
                >
                  <Icon size={15} aria-hidden="true" className="shrink-0" />
                  {item.path.slice(item.path.lastIndexOf("/") + 1)}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </div>
        {file && (
          <div className="flex min-h-0 min-w-0 flex-col">
            <div className="flex min-h-12 shrink-0 items-center justify-between gap-3 border-b border-border/70 px-4 py-2">
              <span
                className="min-w-0 truncate font-mono text-[11px]"
                title={file.path}
              >
                {file.path}
              </span>
              <CopyButton
                code={file.code}
                label={`Copy ${file.path}`}
                iconOnly
                variant="minimal"
              />
            </div>
            <section
              aria-label={`Code for ${file.path}`}
              // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users scroll long code with the arrow keys.
              tabIndex={0}
              className="min-h-0 flex-1 overflow-auto overscroll-contain outline-none focus-visible:shadow-[inset_3px_0_0_var(--ring)]"
            >
              <div
                className="code-block min-w-0 text-code-foreground"
                data-language={file.path.endsWith(".ts") ? "ts" : "tsx"}
                style={
                  {
                    "--code-line-digits": String(file.tokens.length).length,
                  } as CSSProperties
                }
              >
                <pre className="shiki">
                  <code>
                    {file.tokens.map((line, lineIndex) => (
                      <span
                        className="line"
                        // biome-ignore lint/suspicious/noArrayIndexKey: token positions are static for a given file
                        key={`${lineIndex}-${line.map((token) => token.content).join("")}`}
                      >
                        {line.map((token, tokenIndex) => (
                          <span
                            // biome-ignore lint/suspicious/noArrayIndexKey: token positions are static for a given file
                            key={`${tokenIndex}-${token.content}`}
                            style={
                              {
                                "--code-token-light": token.light,
                                "--code-token-dark": token.dark,
                              } as CSSProperties
                            }
                          >
                            {token.content}
                          </span>
                        ))}
                      </span>
                    ))}
                  </code>
                </pre>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
