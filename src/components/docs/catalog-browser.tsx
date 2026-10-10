"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { SearchField } from "@/components/ui/search-field";
import { catalogGroups } from "@/lib/catalog";
import { CatalogCard } from "./catalog-card";

export function CatalogBrowser() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

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
      <div className="mt-8 max-w-sm">
        <SearchField
          label="Filter components"
          placeholder="Filter by name or use"
          value={query}
          onChange={setQuery}
        />
      </div>

      {normalized && (
        <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
          {matchCount === 1
            ? "1 component matches"
            : `${matchCount} components match`}{" "}
          “{query.trim()}”.
        </p>
      )}

      {visibleGroups.length > 0 ? (
        <div className="mt-12 grid gap-12">
          {visibleGroups.map((group) => {
            const headingId = `group-${group.title.replaceAll(" ", "-")}`;

            return (
              <section
                key={group.title}
                id={headingId}
                aria-labelledby={`${headingId}-title`}
              >
                <h2
                  id={`${headingId}-title`}
                  className="text-xl font-semibold tracking-[-0.04em]"
                >
                  {group.title}
                </h2>
                <p className="mt-2 mb-5 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {group.description}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {group.components.map((component) => (
                    <CatalogCard key={component.slug}>
                      <Link
                        href={`/components/${component.slug}`}
                        className="flex h-full min-h-16 flex-col rounded-xl bg-card px-5 py-4 text-card-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 hover:bg-accent hover:shadow-[var(--shadow-float)] focus-visible:bg-accent focus-visible:shadow-[var(--shadow-float)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <span className="text-base font-medium tracking-[-0.025em]">
                          {component.name}
                        </span>
                        <span className="mt-0.5 text-[13px] leading-5 text-muted-foreground">
                          {component.useFor}
                        </span>
                      </Link>
                    </CatalogCard>
                  ))}
                </div>
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
              Nothing matches “{query.trim()}”. Try a shorter term, or clear the
              filter to browse every group.
            </EmptyStateDescription>
          </EmptyState>
        </div>
      )}
    </>
  );
}
