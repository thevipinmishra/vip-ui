"use client";

import { useId, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";

const topics = [
  { id: "product", label: "Product updates" },
  { id: "digest", label: "Weekly digest" },
  { id: "events", label: "Events" },
];

export function CheckboxDemo() {
  const topicsId = useId();
  const [selected, setSelected] = useState(["product"]);
  const allSelected = selected.length === topics.length;

  return (
    <div className="grid w-full max-w-sm">
      <Checkbox
        aria-controls={topicsId}
        isSelected={allSelected}
        isIndeterminate={selected.length > 0 && !allSelected}
        onChange={(isSelected) =>
          setSelected(isSelected ? topics.map((topic) => topic.id) : [])
        }
      >
        All email
      </Checkbox>
      <CheckboxGroup
        id={topicsId}
        aria-label="Email topics"
        value={selected}
        onChange={setSelected}
        className="ps-8"
      >
        {topics.map((topic) => (
          <Checkbox key={topic.id} value={topic.id}>
            {topic.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}
