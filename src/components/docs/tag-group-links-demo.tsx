"use client";

import {
  Tag,
  TagGroup,
  TagGroupLabel,
  TagListView,
} from "@/components/ui/tag-group";

const topics = [
  { id: "forms", name: "Forms", href: "/components/text-field" },
  { id: "overlays", name: "Overlays", href: "/components/dialog" },
  { id: "collections", name: "Collections", href: "/components/table" },
  { id: "motion", name: "Motion", href: "/components/motion" },
];

export function TagGroupLinksDemo() {
  return (
    <TagGroup>
      <TagGroupLabel>Related topics</TagGroupLabel>
      <TagListView items={topics}>
        {(topic) => (
          <Tag id={topic.id} href={topic.href}>
            {topic.name}
          </Tag>
        )}
      </TagListView>
    </TagGroup>
  );
}
