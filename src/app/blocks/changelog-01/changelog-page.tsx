"use client";

import {
  ArrowRightIcon,
  CalendarBlankIcon,
  CaretDownIcon,
  EnvelopeSimpleIcon,
  GitCommitIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { SearchField } from "@/components/ui/search-field";
import { Tag, TagGroup, TagListView } from "@/components/ui/tag-group";
import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";
import {
  formatDate,
  type ReleaseType,
  releases,
  releaseTypes,
  typeCount,
  typeMeta,
} from "./data";
import { SiteFooter, SiteHeader } from "./site-chrome";

const pageSize = 4;

export function ChangelogPage() {
  const [filter, setFilter] = useState<ReleaseType | "all">("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(pageSize);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const terms = query.trim().toLowerCase();
  const filtered = releases.filter((release) => {
    if (filter !== "all" && release.type !== filter) return false;
    if (!terms) return true;
    return [
      release.title,
      release.summary,
      release.version,
      release.type,
      ...release.changes,
    ]
      .join(" ")
      .toLowerCase()
      .includes(terms);
  });
  const shown = filtered.slice(0, visible);

  function changeFilter(next: ReleaseType | "all") {
    setFilter(next);
    setVisible(pageSize);
  }

  function clearFilters() {
    setFilter("all");
    setQuery("");
    setVisible(pageSize);
    window.requestAnimationFrame(() => toolbarRef.current?.focus());
  }

  return (
    <div className="min-h-svh bg-background">
      <SiteHeader active="changelog" />
      <main>
        <section className="relative isolate overflow-hidden border-b border-border/70">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div
              className="absolute left-1/2 top-[-24rem] h-[36rem] w-[56rem] -translate-x-1/2 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 12%, transparent), transparent)",
              }}
            />
            <div className="absolute inset-0 opacity-[0.3] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
          </div>
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <h1 className="max-w-2xl text-balance text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-[3.5rem]">
              What changed in Trellis.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              New features, fixes, and small improvements each week.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarBlankIcon size={16} aria-hidden="true" />
                Last release {formatDate(releases[0].date)}
              </span>
              <span className="inline-flex items-center gap-2">
                <GitCommitIcon size={16} aria-hidden="true" />
                {releases.length} releases since Sep 1, 2026
              </span>
            </div>
          </div>
        </section>

        <section aria-labelledby="releases-title" className="py-10 sm:py-14">
          <h2 id="releases-title" className="sr-only">
            Releases
          </h2>
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:px-8">
            <div className="min-w-0">
              <div
                ref={toolbarRef}
                tabIndex={-1}
                className="rounded-xl bg-card p-4 shadow-[var(--shadow-card)] ring-1 ring-border/70 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                  <SearchField
                    label="Search releases"
                    placeholder="Version, feature, or fix"
                    size="sm"
                    value={query}
                    onChange={(value) => {
                      setQuery(value);
                      setVisible(pageSize);
                    }}
                    className="w-full xl:max-w-xs"
                  />
                  <TagGroup
                    aria-label="Filter releases by type"
                    selectionMode="single"
                    disallowEmptySelection
                    selectedKeys={[filter]}
                    size="xs"
                    onSelectionChange={(keys) => {
                      if (keys === "all") return;
                      const [next] = keys;
                      if (
                        next === "new" ||
                        next === "improved" ||
                        next === "fixed"
                      ) {
                        changeFilter(next);
                      }
                    }}
                    className="min-w-0 xl:shrink-0"
                  >
                    <TagListView>
                      {releaseTypes.map((type) => {
                        const count = typeCount(type.id);
                        return (
                          <Tag
                            key={type.id}
                            id={type.id}
                            textValue={`${type.label} ${count}`}
                          >
                            {type.label}
                            <span className="ms-1.5 rounded bg-muted px-1.5 py-0.5 text-[11px] tabular-nums text-muted-foreground">
                              {count}
                            </span>
                          </Tag>
                        );
                      })}
                    </TagListView>
                  </TagGroup>
                </div>
              </div>

              <p
                aria-live="polite"
                className="mt-4 text-xs text-muted-foreground"
              >
                Showing {shown.length} of {filtered.length}{" "}
                {filtered.length === 1 ? "release" : "releases"}
              </p>

              {filtered.length === 0 ? (
                <Card className="mt-4 p-4 sm:p-6">
                  <EmptyState className="border-0">
                    <EmptyStateIcon>
                      <MagnifyingGlassIcon />
                    </EmptyStateIcon>
                    <EmptyStateTitle>
                      No releases match these filters
                    </EmptyStateTitle>
                    <EmptyStateDescription>
                      Clear the search or pick another type to see more
                      releases.
                    </EmptyStateDescription>
                    <EmptyStateActions>
                      <Button variant="outline" onPress={clearFilters}>
                        Clear filters
                      </Button>
                    </EmptyStateActions>
                  </EmptyState>
                </Card>
              ) : (
                <>
                  <Timeline className="mt-6">
                    {shown.map((release, index) => {
                      const meta = typeMeta[release.type];
                      return (
                        <TimelineItem
                          key={release.id}
                          status={index === 0 ? "latest" : "complete"}
                          className="pb-5"
                        >
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <Badge variant={meta.variant} dot>
                              {meta.label}
                            </Badge>
                            <span className="font-mono text-xs text-muted-foreground">
                              v{release.version}
                            </span>
                            <span
                              aria-hidden="true"
                              className="text-muted-foreground/40"
                            >
                              ·
                            </span>
                            <TimelineTime
                              dateTime={release.date}
                              className="mt-0"
                            >
                              {formatDate(release.date)}
                            </TimelineTime>
                          </div>
                          <TimelineTitle
                            as="h2"
                            className="mt-1.5 text-base font-semibold tracking-[-0.025em]"
                          >
                            {release.title}
                          </TimelineTitle>
                          <TimelineDescription className="text-[13px] leading-5">
                            {release.summary}
                          </TimelineDescription>
                          <ul className="mt-2.5 grid gap-1.5 text-[13px] leading-5 text-muted-foreground">
                            {release.changes.map((change) => (
                              <li key={change} className="flex gap-2.5">
                                <span
                                  aria-hidden="true"
                                  className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-muted-foreground/50"
                                />
                                <span>{change}</span>
                              </li>
                            ))}
                          </ul>
                        </TimelineItem>
                      );
                    })}
                  </Timeline>

                  {visible < filtered.length ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-6"
                      onPress={() =>
                        setVisible((current) => current + pageSize)
                      }
                    >
                      Show older releases
                      <CaretDownIcon size={16} aria-hidden="true" />
                    </Button>
                  ) : null}
                </>
              )}
            </div>

            <aside className="grid gap-4 lg:sticky lg:top-24">
              <Card className="p-5">
                <span className="grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <EnvelopeSimpleIcon size={18} aria-hidden="true" />
                </span>
                <h2 className="mt-3 text-base font-semibold tracking-[-0.02em]">
                  Get the notes by email
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  One message each month, with the same notes.
                </p>
                <ButtonLink
                  href="/blocks/landing-01#newsletter"
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                >
                  Subscribe
                  <ArrowRightIcon size={16} aria-hidden="true" />
                </ButtonLink>
              </Card>

              <Card className="p-5">
                <h2 className="text-base font-semibold tracking-[-0.02em]">
                  Try Journeys 2.0
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Map the path after signup. Split it by channel and plan.
                </p>
                <ButtonLink
                  href="/blocks/signup-01"
                  size="sm"
                  className="mt-4 w-full"
                >
                  Start free
                  <ArrowRightIcon size={16} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href="/blocks/landing-01#features"
                  variant="minimal"
                  size="sm"
                  className="mt-1.5 -ms-2"
                >
                  See how it works
                </ButtonLink>
              </Card>

              <div className="rounded-xl border border-dashed border-border px-4 py-3.5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  How we ship
                </p>
                <ul className="mt-2.5 grid gap-2 text-sm text-muted-foreground">
                  <li>Small fixes each week.</li>
                  <li>One main feature each month.</li>
                  <li>A note for every change.</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
