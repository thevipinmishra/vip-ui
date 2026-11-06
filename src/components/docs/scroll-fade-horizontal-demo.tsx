"use client";

import { ScrollFade } from "@/components/ui/scroll-fade";
import { Tag, TagGroup, TagListView } from "@/components/ui/tag-group";

const topics = [
  "All",
  "Design systems",
  "Typography",
  "Motion",
  "Accessibility",
  "Color",
  "Research",
  "Prototyping",
  "Writing",
];

export function ScrollFadeHorizontalDemo() {
  return (
    <ScrollFade orientation="horizontal" className="w-full max-w-sm py-1">
      <TagGroup
        aria-label="Topics"
        selectionMode="single"
        defaultSelectedKeys={["All"]}
      >
        <TagListView className="w-max flex-nowrap">
          {topics.map((topic) => (
            <Tag key={topic} id={topic}>
              {topic}
            </Tag>
          ))}
        </TagListView>
      </TagGroup>
    </ScrollFade>
  );
}
