"use client";

import { useState } from "react";
import {
  Tag,
  TagGroup,
  TagGroupLabel,
  TagListView,
} from "@/components/ui/tag-group";

const initialTags = ["Design", "Engineering", "Research"];

export function TagGroupDemo() {
  const [tags, setTags] = useState(initialTags);
  return (
    <TagGroup
      onRemove={(keys) =>
        setTags((current) => current.filter((tag) => !keys.has(tag)))
      }
    >
      <TagGroupLabel>Topics</TagGroupLabel>
      <TagListView
        items={tags.map((name) => ({ id: name, name }))}
        renderEmptyState={() => (
          <span className="text-sm text-muted-foreground">No topics left.</span>
        )}
      >
        {(item) => <Tag id={item.id}>{item.name}</Tag>}
      </TagListView>
    </TagGroup>
  );
}
