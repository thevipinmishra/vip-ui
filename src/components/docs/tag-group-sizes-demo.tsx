"use client";

import { useState } from "react";
import type { Size } from "@/components/ui/size";
import {
  Tag,
  TagGroup,
  TagGroupLabel,
  TagListView,
} from "@/components/ui/tag-group";

const initialFilters = ["Open", "Assigned to me", "High priority"];

export function TagGroupSizesDemo() {
  return (
    <div className="grid w-full max-w-md gap-5">
      <FilterTags size="xs" />
      <FilterTags size="sm" />
      <FilterTags />
    </div>
  );
}

function FilterTags({ size }: { size?: Extract<Size, "xs" | "sm" | "md"> }) {
  const [filters, setFilters] = useState(initialFilters);
  return (
    <TagGroup
      size={size}
      onRemove={(keys) =>
        setFilters((current) => current.filter((name) => !keys.has(name)))
      }
    >
      <TagGroupLabel>Filters</TagGroupLabel>
      <TagListView
        items={filters.map((name) => ({ id: name, name }))}
        renderEmptyState={() => (
          <span className="text-sm text-muted-foreground">No filters.</span>
        )}
      >
        {(item) => <Tag id={item.id}>{item.name}</Tag>}
      </TagListView>
    </TagGroup>
  );
}
