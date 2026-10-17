"use client";

import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/search-field";
import { Select } from "@/components/ui/select";

export function SearchFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-lg gap-6">
      <SearchField
        size="xl"
        aria-label="Search the help center"
        placeholder="Search the help center"
      />
      <div className="flex flex-wrap items-end gap-2">
        <SearchField
          size="sm"
          aria-label="Search orders"
          placeholder="Search orders"
          className="min-w-40 flex-1"
        />
        <Select
          size="sm"
          aria-label="Status"
          defaultValue="open"
          options={[
            { id: "open", name: "Open" },
            { id: "paid", name: "Paid" },
          ]}
          className="w-32"
        />
        <Button size="sm" variant="outline">
          Export
        </Button>
      </div>
    </div>
  );
}
