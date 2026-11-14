"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { SearchField } from "@/components/ui/search-field";

const projects = ["Atlas", "Beacon", "Cascade", "Drift", "Ember"];

export function EmptyStateSearchDemo() {
  const [query, setQuery] = useState("Zephyr");
  const fieldRef = useRef<HTMLDivElement>(null);
  const matches = projects.filter((project) =>
    project.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="grid w-full max-w-md gap-3">
      <SearchField
        ref={fieldRef}
        label="Search projects"
        value={query}
        onChange={setQuery}
      />
      {matches.length > 0 ? (
        <ul className="grid min-h-56 content-start divide-y divide-border/70 rounded-xl border border-border bg-card px-4 text-sm shadow-(--shadow-card)">
          {matches.map((project) => (
            <li key={project} className="py-2.5">
              {project}
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState className="min-h-56 justify-center transition-[opacity,translate] duration-300 ease-out-quint starting:opacity-0 motion-safe:starting:translate-y-1">
          <EmptyStateIcon>
            <MagnifyingGlassIcon aria-hidden="true" />
          </EmptyStateIcon>
          <EmptyStateTitle>No projects found</EmptyStateTitle>
          <EmptyStateDescription>
            No project name contains “{query.trim()}”.
          </EmptyStateDescription>
          <EmptyStateActions>
            <Button
              variant="outline"
              size="sm"
              onPress={() => {
                setQuery("");
                fieldRef.current?.querySelector("input")?.focus();
              }}
            >
              Clear search
            </Button>
          </EmptyStateActions>
        </EmptyState>
      )}
    </div>
  );
}
