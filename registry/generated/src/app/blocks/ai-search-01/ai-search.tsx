"use client";

import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Autocomplete } from "../../../components/vip-ui/autocomplete";
import { Badge } from "../../../components/vip-ui/badge";
import { Button } from "../../../components/vip-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/vip-ui/card";
import { CopyButton } from "../../../components/vip-ui/copy-button";
import { ListBox, ListBoxItem } from "../../../components/vip-ui/list-box";
import {
  Response,
  ResponseActions,
  ResponseContent,
  ResponseFooter,
} from "../../../components/vip-ui/response";
import { SearchField } from "../../../components/vip-ui/search-field";
import { Skeleton } from "../../../components/vip-ui/skeleton";
import { SourceLink } from "../../../components/vip-ui/source-link";
import { TextScramble } from "../../../components/vip-ui/text-scramble";
import {
  answerFor,
  answerText,
  defaultQuery,
  popularQueries,
  type SearchResult,
  suggestions,
} from "./data";

const loadingLabels = [
  "READING GUIDES",
  "CHECKING API REFERENCES",
  "MATCHING SOURCES",
];

export function AiSearch() {
  const [query, setQuery] = useState(defaultQuery);
  const [result, setResult] = useState<SearchResult>(() =>
    answerFor(defaultQuery),
  );
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(0);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      for (const id of timers.current) window.clearTimeout(id);
    },
    [],
  );

  useEffect(() => {
    if (!suggestionsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        setSuggestionsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSuggestionsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [suggestionsOpen]);

  function startSearch(value: string) {
    const next = value.trim() || defaultQuery;
    for (const id of timers.current) window.clearTimeout(id);
    setQuery(next);
    setResult(answerFor(next));
    setSuggestionsOpen(false);
    setLoading(true);
    setPhase(0);
    timers.current = [
      window.setTimeout(() => setPhase(1), 380),
      window.setTimeout(() => setPhase(2), 760),
      window.setTimeout(() => setLoading(false), 1150),
    ];
  }

  function focusSearch() {
    searchRef.current?.querySelector("input")?.focus();
    setSuggestionsOpen(true);
  }

  return (
    <div className="min-h-svh bg-muted/40 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <header className="relative isolate text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 -z-10 mx-auto h-80 max-w-2xl rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--chart-3) 18%, transparent) 0%, transparent 70%)",
            }}
          />
          <span
            aria-hidden="true"
            className="mx-auto grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-float)]"
          >
            <BookOpenIcon size={22} weight="fill" />
          </span>
          <p className="mt-4 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Fernway docs
          </p>
          <h1 className="mt-2 text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.045em] text-balance">
            Get the answer,{" "}
            <span className="text-muted-foreground">not the page.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-6 text-muted-foreground">
            Search guides, API references, and release notes.
          </p>
        </header>

        <div ref={searchRef} className="relative z-20 mx-auto mt-8 max-w-2xl">
          <Autocomplete>
            <SearchField
              aria-label="Search the docs"
              size="lg"
              placeholder="Ask a question about Fernway"
              value={query}
              onChange={(value) => {
                setQuery(value);
                setSuggestionsOpen(value.trim().length > 0);
              }}
              onFocus={() => {
                if (query.trim()) setSuggestionsOpen(true);
              }}
              onSubmit={(value) => startSearch(value)}
            />
            {suggestionsOpen && (
              <div className="absolute inset-x-0 top-full z-30 mt-2">
                <ListBox
                  aria-label="Suggested searches"
                  items={suggestions}
                  onAction={(key) => {
                    const suggestion = suggestions.find(
                      (item) => item.id === String(key),
                    );
                    if (suggestion) startSearch(suggestion.label);
                  }}
                  className="max-h-72 shadow-[var(--shadow-float)]"
                >
                  {(item) => (
                    <ListBoxItem
                      id={item.id}
                      textValue={`${item.label} ${item.category}`}
                      className="gap-3"
                    >
                      <span className="flex min-w-0 flex-1 items-center gap-2.5">
                        <MagnifyingGlassIcon
                          size={15}
                          aria-hidden="true"
                          className="shrink-0 text-muted-foreground"
                        />
                        <span className="truncate">{item.label}</span>
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {item.category}
                      </span>
                    </ListBoxItem>
                  )}
                </ListBox>
              </div>
            )}
          </Autocomplete>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground">Popular</span>
          {popularQueries.map((item) => (
            <Button
              key={item}
              variant="outline"
              size="xs"
              onPress={() => startSearch(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="mt-8">
          {loading ? (
            <Card className="p-5 sm:p-6" aria-busy="true">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  aria-live="polite"
                  className="flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase"
                >
                  <span className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
                  <TextScramble value={loadingLabels[phase]} duration={0.4} />
                </span>
                <Badge variant="outline">Searching</Badge>
              </div>
              <div className="mt-5 grid gap-2.5" aria-hidden="true">
                <Skeleton className="h-3 w-11/12" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <div
                className="mt-5 grid gap-2 sm:grid-cols-3"
                aria-hidden="true"
              >
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="grid min-w-0 gap-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Answer
                      </p>
                      <CardTitle as="h2" className="text-base">
                        {result.title}
                      </CardTitle>
                      <CardDescription>{result.updated}</CardDescription>
                    </div>
                    <Badge variant="accent" className="gap-1">
                      <SparkleIcon size={12} weight="fill" aria-hidden="true" />
                      AI answer
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Response status="complete">
                    <ResponseContent className="grid gap-3">
                      {result.blocks.map((block) => {
                        const key =
                          block.type === "paragraph"
                            ? block.text
                            : block.items.join("|");
                        return block.type === "paragraph" ? (
                          <p key={key}>{block.text}</p>
                        ) : (
                          <ul
                            key={key}
                            className="grid list-disc gap-1.5 ps-5 marker:text-muted-foreground"
                          >
                            {block.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        );
                      })}
                      {result.code && (
                        <div className="min-w-0 overflow-hidden rounded-lg border border-border/70 bg-muted/60">
                          <div className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-1.5">
                            <span className="text-xs font-medium text-muted-foreground">
                              Shell
                            </span>
                            <CopyButton
                              value={result.code}
                              iconOnly
                              variant="ghost"
                              size="xs"
                              aria-label="Copy code"
                            />
                          </div>
                          <pre className="overflow-x-auto p-3 font-mono text-xs leading-5 whitespace-pre">
                            {result.code}
                          </pre>
                        </div>
                      )}
                    </ResponseContent>
                    <ResponseActions>
                      <CopyButton
                        value={answerText(result)}
                        variant="ghost"
                        size="sm"
                      />
                      <Button variant="ghost" size="sm" onPress={focusSearch}>
                        <MagnifyingGlassIcon size={16} aria-hidden="true" />
                        New search
                      </Button>
                    </ResponseActions>
                    <ResponseFooter className="grid gap-2 pt-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        {result.sources.length} sources
                      </p>
                      {result.sources.map((source, index) => (
                        <SourceLink
                          key={source.href}
                          href={source.href}
                          label={source.label}
                          source={source.source}
                          description={source.description}
                          index={index + 1}
                          className="gap-2.5 p-2.5"
                        />
                      ))}
                    </ResponseFooter>
                  </Response>
                </CardContent>
              </Card>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Related</span>
                {result.related.map((item) => (
                  <Button
                    key={item}
                    variant="outline"
                    size="xs"
                    onPress={() => startSearch(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
