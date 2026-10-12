"use client";

import { ArrowRightIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Kbd } from "@/components/ui/kbd-code";
import {
  SearchField,
  SearchFieldClear,
  SearchFieldInput,
} from "@/components/ui/search-field";
import { catalogComponents, catalogGroups } from "@/lib/catalog";

export function CatalogBrowser() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const normalized = query.trim().toLowerCase();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey)
        return;
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.closest("input, textarea, select, [role='dialog']")
      )
        return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const visibleGroups = catalogGroups
    .map((group) => ({
      ...group,
      components: normalized
        ? group.components.filter(
            (component) =>
              component.name.toLowerCase().includes(normalized) ||
              component.useFor.toLowerCase().includes(normalized),
          )
        : group.components,
    }))
    .filter((group) => group.components.length > 0);
  const matchCount = visibleGroups.reduce(
    (total, group) => total + group.components.length,
    0,
  );

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <SearchField
          aria-label="Filter components"
          value={query}
          onChange={setQuery}
          className="w-full sm:max-w-sm"
        >
          {({ isEmpty }) => (
            <div className="relative flex items-center">
              <MagnifyingGlassIcon
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute start-3.5 text-muted-foreground"
              />
              <SearchFieldInput
                ref={inputRef}
                aria-keyshortcuts="/"
                placeholder="Filter by name or use"
              />
              {isEmpty ? (
                <Kbd
                  aria-hidden="true"
                  className="pointer-events-none absolute end-3.5 group-focus-within:hidden pointer-coarse:hidden"
                >
                  /
                </Kbd>
              ) : (
                <SearchFieldClear />
              )}
            </div>
          )}
        </SearchField>
        <p
          aria-live="polite"
          className="text-sm tabular-nums text-muted-foreground"
        >
          {normalized
            ? `${matchCount} of ${catalogComponents.length} components`
            : `${catalogComponents.length} components`}
        </p>
      </div>

      {visibleGroups.length > 0 ? (
        <div className="mt-12 grid gap-14">
          {visibleGroups.map((group) => {
            const headingId = group.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");

            return (
              <section
                key={group.title}
                id={headingId}
                aria-labelledby={`${headingId}-title`}
                className="scroll-mt-6"
              >
                <div className="flex items-baseline gap-2.5">
                  <h2
                    id={`${headingId}-title`}
                    className="text-xl font-semibold tracking-[-0.04em]"
                  >
                    {group.title}
                  </h2>
                  <span className="text-sm tabular-nums text-muted-foreground">
                    {group.components.length}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {group.description}
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {group.components.map((component) => (
                    <li key={component.slug} className="flex">
                      <Link
                        href={`/components/${component.slug}`}
                        className="group/card flex w-full flex-col rounded-xl bg-card px-4 py-3.5 text-card-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 transition-[box-shadow,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[var(--shadow-float)] hover:ring-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-safe:active:scale-[0.985] forced-colors:border"
                      >
                        <span className="flex items-center gap-2">
                          <span className="min-w-0 text-[15px] font-medium tracking-[-0.02em]">
                            {component.name}
                          </span>
                          <ArrowRightIcon
                            size={14}
                            aria-hidden="true"
                            className="ms-auto shrink-0 text-muted-foreground opacity-0 transition-[opacity,translate] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:opacity-100 group-focus-visible/card:opacity-100 motion-safe:-translate-x-1 motion-safe:group-hover/card:translate-x-0 motion-safe:group-focus-visible/card:translate-x-0 rtl:-scale-x-100"
                          />
                        </span>
                        <span className="mt-1 text-[13px] leading-5 text-muted-foreground">
                          {component.useFor}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="mt-12">
          <EmptyState>
            <EmptyStateIcon>
              <MagnifyingGlassIcon size={19} aria-hidden="true" />
            </EmptyStateIcon>
            <EmptyStateTitle>No matching components</EmptyStateTitle>
            <EmptyStateDescription>
              No component matches “{query.trim()}”. Try a different word.
            </EmptyStateDescription>
            <EmptyStateActions>
              <Button
                variant="outline"
                size="sm"
                onPress={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
              >
                Clear filter
              </Button>
            </EmptyStateActions>
          </EmptyState>
        </div>
      )}
    </>
  );
}
