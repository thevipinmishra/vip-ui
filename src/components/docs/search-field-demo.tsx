"use client";

import { useState } from "react";
import {
  SearchField,
  SearchFieldClear,
  SearchFieldInput,
  SearchFieldLabel,
} from "@/components/ui/search-field";

const topics = ["Accessibility", "Animation", "Forms", "Layout", "Theming"];

export function SearchFieldDemo() {
  const [query, setQuery] = useState("");
  const matches = topics.filter((topic) =>
    topic.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="grid w-full max-w-sm gap-4">
      <SearchField name="topicSearch" value={query} onChange={setQuery}>
        <SearchFieldLabel>Search topics</SearchFieldLabel>
        <SearchFieldInput placeholder="Topic" />
        <SearchFieldClear />
      </SearchField>
      {query ? (
        <ul className="divide-y divide-border text-sm">
          {matches.map((topic) => (
            <li key={topic} className="py-2">
              {topic}
            </li>
          ))}
          {matches.length === 0 ? (
            <li className="py-2 text-muted-foreground">
              No topics match "{query}".
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
