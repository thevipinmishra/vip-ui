"use client";

import { useState } from "react";
import { FileText, Search } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import {
  SearchField,
  SearchFieldClear,
  SearchFieldInput,
  SearchFieldLabel,
} from "@/components/ui/search-field";

const projects = [
  { name: "Studio North", owner: "Maya Chen", status: "In progress" },
  { name: "Atlas redesign", owner: "Sam Rivera", status: "Review" },
  { name: "Quarterly report", owner: "Jo Park", status: "Published" },
  { name: "Field Notes", owner: "Alex Kim", status: "In progress" },
  { name: "Client portal", owner: "Maya Chen", status: "Review" },
  { name: "Brand refresh", owner: "Sam Rivera", status: "Published" },
  { name: "Mobile checkout", owner: "Jo Park", status: "In progress" },
  { name: "Team handbook", owner: "Alex Kim", status: "Published" },
] as const;

const statusVariants = {
  "In progress": "accent",
  Review: "warning",
  Published: "success",
} as const;

export function SearchFieldDemo() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const matches = projects.filter((project) =>
    `${project.name} ${project.owner}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <div className="w-full max-w-lg space-y-4 rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-6">
      <SearchField
        name="projectSearch"
        value={query}
        onChange={setQuery}
        onSubmit={setSubmitted}
      >
        <SearchFieldLabel>Search projects</SearchFieldLabel>
        <div className="relative flex items-center">
          <Search
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute start-3.5 text-muted-foreground"
          />
          <SearchFieldInput placeholder="Project or owner" />
          <SearchFieldClear />
        </div>
      </SearchField>
      <div className="rounded-lg bg-background p-3 ring-1 ring-border/70">
        <output className="block text-xs font-semibold text-muted-foreground">
          {matches.length} of {projects.length} projects
        </output>
        {matches.length > 0 ? (
          <ul className="mt-2 max-h-64 divide-y divide-border overflow-y-auto">
            {matches.map((project) => (
              <li key={project.name} className="flex items-center gap-3 py-2.5">
                <FileText
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-muted-foreground"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{project.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {project.owner}
                  </p>
                </div>
                <Badge variant={statusVariants[project.status]} dot>
                  {project.status}
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-[13px] text-muted-foreground">
            No projects match "{query}". Try a different project or owner.
          </p>
        )}
      </div>
      {submitted && (
        <output className="block text-xs text-muted-foreground">
          Submitted search: {submitted}
        </output>
      )}
    </div>
  );
}
