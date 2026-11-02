"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import {
  Tag,
  TagGroup,
  TagGroupDescription,
  TagGroupLabel,
  TagListView,
} from "@/components/ui/tag-group";

const amenities = [
  { id: "wifi", name: "Wi-Fi" },
  { id: "parking", name: "Parking" },
  { id: "pool", name: "Pool" },
  { id: "gym", name: "Gym" },
  { id: "pets", name: "Pets allowed" },
  { id: "breakfast", name: "Breakfast" },
];

export function TagGroupSelectionDemo() {
  const [selected, setSelected] = useState<Selection>(
    new Set(["wifi", "breakfast"]),
  );
  const count = selected === "all" ? amenities.length : selected.size;

  return (
    <TagGroup
      selectionMode="multiple"
      selectedKeys={selected}
      onSelectionChange={setSelected}
      disabledKeys={["pool"]}
      className="max-w-sm"
    >
      <TagGroupLabel>Amenities</TagGroupLabel>
      <TagListView items={amenities}>
        {(item) => <Tag id={item.id}>{item.name}</Tag>}
      </TagListView>
      <TagGroupDescription>
        {count === 0 ? "Showing all stays." : `${count} filters on.`}
      </TagGroupDescription>
    </TagGroup>
  );
}
