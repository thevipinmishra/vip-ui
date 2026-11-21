"use client";

import { MagnifyingGlassIcon, PulseIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../../vip-ui/code-block";
import { CopyButton } from "../../vip-ui/copy-button";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import { GridList, GridListItem } from "../../vip-ui/grid-list";
import { useMediaQuery } from "../../vip-ui/hooks";
import {
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
} from "../../vip-ui/resizable";
import { ScrollArea } from "../../vip-ui/scroll-area";
import { SearchField } from "../../vip-ui/search-field";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "../../vip-ui/sheet";
import { Switch } from "../../vip-ui/switch";
import { ToggleButton } from "../../vip-ui/toggle-button";
import { ToggleButtonGroup } from "../../vip-ui/toggle-button-group";
import { cn } from "../../vip-ui/utils";
import {
  createEntry,
  formatClock,
  formatFull,
  initialLogs,
  type LogEntry,
  responseBody,
  type StatusClass,
  seededRandom,
  statusClass,
  statusClasses,
  windowMinutes,
} from "./data";
import { LogHistogram } from "./log-histogram";

type Filter = "all" | StatusClass;

const badgeVariant = {
  success: "success",
  client: "warning",
  server: "error",
} as const satisfies Record<StatusClass, string>;

function StatusBadge({ status }: { status: number }) {
  return (
    <Badge variant={badgeVariant[statusClass(status)]} className="tabular-nums">
      {status}
    </Badge>
  );
}

function LogDetails({ entry }: { entry: LogEntry }) {
  const body = responseBody(entry);
  return (
    <div className="grid content-start gap-5">
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <StatusBadge status={entry.status} />
          <span className="font-mono text-xs text-muted-foreground">
            {entry.duration} ms
          </span>
        </div>
        <p className="font-mono text-sm font-medium break-all">
          {entry.method} {entry.path}
        </p>
      </div>
      <DescriptionList className="text-sm">
        <DescriptionTerm>Request ID</DescriptionTerm>
        <DescriptionDetail>
          <span className="flex min-w-0 items-center gap-1">
            <span className="truncate font-mono text-xs">{entry.id}</span>
            <CopyButton
              value={entry.id}
              variant="ghost"
              size="xs"
              iconOnly
              aria-label="Copy request ID"
            />
          </span>
        </DescriptionDetail>
        <DescriptionTerm>Time</DescriptionTerm>
        <DescriptionDetail>{formatFull(entry.time)}</DescriptionDetail>
        <DescriptionTerm>Region</DescriptionTerm>
        <DescriptionDetail className="font-mono text-xs">
          {entry.region}
        </DescriptionDetail>
        <DescriptionTerm>API key</DescriptionTerm>
        <DescriptionDetail className="font-mono text-xs">
          {entry.key}
        </DescriptionDetail>
        <DescriptionTerm>Client IP</DescriptionTerm>
        <DescriptionDetail className="font-mono text-xs">
          {entry.ip}
        </DescriptionDetail>
        <DescriptionTerm>User agent</DescriptionTerm>
        <DescriptionDetail className="font-mono text-xs break-all">
          {entry.userAgent}
        </DescriptionDetail>
      </DescriptionList>
      {body ? (
        <CodeBlock code={body} language="json">
          <CodeBlockHeader>
            <CodeBlockTitle>Response body</CodeBlockTitle>
            <CodeBlockActions />
          </CodeBlockHeader>
          <CodeBlockBody />
        </CodeBlock>
      ) : (
        <p className="text-sm text-muted-foreground">No response body.</p>
      )}
    </div>
  );
}

export function LogExplorer() {
  const [logs, setLogs] = useState(initialLogs);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [live, setLive] = useState(false);
  const [selectedId, setSelectedId] = useState(
    () =>
      initialLogs.find((entry) => entry.status >= 500)?.id ?? initialLogs[0].id,
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const isWide = useMediaQuery("(min-width: 1024px)");
  const random = useRef(seededRandom(77));

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      setLogs((current) => {
        const next = random.current;
        const time = current[0].time + Math.round(800 + next() * 2_400);
        const cutoff = time - windowMinutes * 60_000;
        return [
          createEntry(next, time, current.length),
          ...current.filter((entry) => entry.time > cutoff),
        ];
      });
    }, 1_600);
    return () => window.clearInterval(timer);
  }, [live]);

  const terms = query.trim().toLowerCase();
  const matching = logs.filter((entry) =>
    terms
      ? `${entry.id} ${entry.method} ${entry.path} ${entry.status} ${entry.region}`
          .toLowerCase()
          .includes(terms)
      : true,
  );
  const visible = matching.filter(
    (entry) => filter === "all" || statusClass(entry.status) === filter,
  );
  const counts = {
    all: matching.length,
    success: matching.filter((entry) => statusClass(entry.status) === "success")
      .length,
    client: matching.filter((entry) => statusClass(entry.status) === "client")
      .length,
    server: matching.filter((entry) => statusClass(entry.status) === "server")
      .length,
  };
  const selected = logs.find((entry) => entry.id === selectedId) ?? null;
  const errorRate =
    logs.length === 0
      ? 0
      : (logs.filter((entry) => entry.status >= 500).length / logs.length) *
        100;

  function choose(id: string) {
    setSelectedId(id);
    if (!isWide) setSheetOpen(true);
  }

  const list =
    visible.length === 0 ? (
      <div className="grid h-full place-items-center p-6 text-center">
        <div className="grid justify-items-center gap-2">
          <MagnifyingGlassIcon
            size={22}
            className="text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-sm font-medium">No requests match</p>
          <Button
            variant="outline"
            size="sm"
            onPress={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      </div>
    ) : (
      <ScrollArea className="h-full" aria-label="Requests">
        <GridList
          aria-label="Requests"
          items={visible}
          selectionMode={isWide ? "single" : "none"}
          selectionBehavior="replace"
          disallowEmptySelection
          selectedKeys={selected ? [selected.id] : []}
          onSelectionChange={(keys) => {
            const [key] = keys === "all" ? [] : [...keys];
            if (key !== undefined) choose(String(key));
          }}
          onAction={(key) => choose(String(key))}
          className="gap-0 rounded-none border-0 bg-transparent p-1 shadow-none"
        >
          {(entry) => (
            <GridListItem
              id={entry.id}
              textValue={`${entry.method} ${entry.path} ${entry.status}`}
              className="grid min-h-9 grid-cols-[4.5rem_2.5rem_minmax(0,1fr)] sm:grid-cols-[4.5rem_3.25rem_3rem_minmax(0,1fr)_4rem] gap-3 rounded-md px-3 py-1.5 font-mono text-xs"
            >
              <span className="text-muted-foreground tabular-nums">
                {formatClock(entry.time)}
              </span>
              <span className="text-muted-foreground max-sm:hidden">
                {entry.method}
              </span>
              <span
                className={cn(
                  "tabular-nums",
                  entry.status >= 500 && "font-semibold text-destructive",
                  entry.status >= 400 &&
                    entry.status < 500 &&
                    "text-warning-foreground",
                )}
              >
                {entry.status}
              </span>
              <span className="truncate">{entry.path}</span>
              <span className="text-end text-muted-foreground tabular-nums max-sm:hidden">
                {entry.duration} ms
              </span>
            </GridListItem>
          )}
        </GridList>
      </ScrollArea>
    );

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex h-14 max-w-360 items-center gap-2.5 px-4 sm:px-6">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <PulseIcon size={17} weight="bold" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em]">
            Relay
          </span>
          <span aria-hidden="true" className="text-muted-foreground/60">
            /
          </span>
          <span className="text-sm text-muted-foreground">Logs</span>
          <Badge variant="outline" className="ms-auto">
            Production
          </Badge>
        </div>
      </header>

      <main className="mx-auto grid max-w-360 gap-4 px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <div className="grid gap-1">
            <h1 className="text-2xl font-semibold tracking-[-0.04em]">
              Requests
            </h1>
            <p className="text-sm text-muted-foreground tabular-nums">
              {logs.length} in the last 30 minutes · {errorRate.toFixed(1)}%
              server errors
            </p>
          </div>
          <Switch
            isSelected={live}
            onChange={setLive}
            className="ms-auto self-center"
          >
            <span className="flex items-center gap-2">
              {live && (
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-success motion-safe:animate-pulse"
                />
              )}
              Live tail
            </span>
          </Switch>
        </div>

        <LogHistogram logs={matching} end={logs[0]?.time ?? 0} />

        <div className="flex flex-wrap items-center gap-2">
          <SearchField
            aria-label="Search requests"
            placeholder="Path, status, or request ID"
            size="sm"
            value={query}
            onChange={setQuery}
            className="w-full sm:w-80"
          />
          <ToggleButtonGroup
            aria-label="Status"
            size="sm"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[filter]}
            onSelectionChange={(keys) => {
              const [key] = keys;
              if (
                key === "all" ||
                key === "success" ||
                key === "client" ||
                key === "server"
              ) {
                setFilter(key);
              }
            }}
          >
            <ToggleButton id="all" variant="segmented">
              All{" "}
              <span className="text-muted-foreground tabular-nums">
                {counts.all}
              </span>
            </ToggleButton>
            {statusClasses.map((item) => (
              <ToggleButton key={item.id} id={item.id} variant="segmented">
                {item.name}{" "}
                <span className="text-muted-foreground tabular-nums">
                  {counts[item.id]}
                </span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

        <div className="h-[34rem] overflow-hidden rounded-xl bg-card ring-1 ring-border/70">
          <ResizableGroup defaultLayout={[58, 42]} className="h-full">
            <ResizablePanel
              id="logs-list"
              minSize={40}
              className="flex flex-col"
            >
              <div
                aria-hidden="true"
                className="grid shrink-0 grid-cols-[4.5rem_2.5rem_minmax(0,1fr)] sm:grid-cols-[4.5rem_3.25rem_3rem_minmax(0,1fr)_4rem] gap-3 border-b border-border/70 px-4 py-2 text-xs font-medium text-muted-foreground"
              >
                <span>Time</span>
                <span className="max-sm:hidden">Method</span>
                <span>Status</span>
                <span>Path</span>
                <span className="text-end max-sm:hidden">Duration</span>
              </div>
              <div className="min-h-0 flex-1">{list}</div>
            </ResizablePanel>
            <ResizableHandle
              aria-label="Resize the request list and the details"
              className="max-lg:hidden"
            />
            <ResizablePanel
              id="logs-details"
              minSize={28}
              className="max-lg:hidden"
            >
              <ScrollArea className="h-full" aria-label="Request details">
                <div className="p-5">
                  {selected ? (
                    <LogDetails entry={selected} />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Select a request to see the details.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </ResizablePanel>
          </ResizableGroup>
        </div>
      </main>

      <Sheet
        position="right"
        size="md"
        isOpen={sheetOpen && !isWide}
        onOpenChange={setSheetOpen}
      >
        <SheetHeader>
          <SheetTitle>Request</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <SheetBody className="pb-5">
          {selected && <LogDetails entry={selected} />}
        </SheetBody>
      </Sheet>
    </div>
  );
}
