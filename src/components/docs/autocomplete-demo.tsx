"use client";

import { Autocomplete } from "@/components/ui/autocomplete";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";
import { SearchField } from "@/components/ui/search-field";

export function AutocompleteDemo() {
  return (
    <Autocomplete>
      <div className="grid w-full max-w-xs gap-2">
        <SearchField label="Filter topics" placeholder="Search topics" />
        <ListBox
          aria-label="Topics"
          className="max-h-52"
          renderEmptyState={() => (
            <p className="px-3 py-2 text-sm text-muted-foreground">
              No topics found.
            </p>
          )}
        >
          <ListBoxItem id="design">Design</ListBoxItem>
          <ListBoxItem id="engineering">Engineering</ListBoxItem>
          <ListBoxItem id="research">Research</ListBoxItem>
          <ListBoxItem id="writing">Writing</ListBoxItem>
        </ListBox>
      </div>
    </Autocomplete>
  );
}
