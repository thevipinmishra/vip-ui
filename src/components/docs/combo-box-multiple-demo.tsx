"use client";

import { useState } from "react";
import { ComboBox } from "@/components/ui/combo-box";

const teams = [
  { id: "design", name: "Design" },
  { id: "engineering", name: "Engineering" },
  { id: "research", name: "Research" },
  { id: "support", name: "Support" },
];

export function ComboBoxMultipleDemo() {
  const [selected, setSelected] = useState<(string | number)[]>([
    "design",
    "research",
  ]);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <ComboBox
        selectionMode="multiple"
        label="Project teams"
        placeholder="Find a team"
        description="Choose teams or remove them using the selected tags."
        options={teams}
        value={selected}
        onChange={setSelected}
      />
      <output className="block rounded-md border border-border bg-background px-3 py-2.5 text-xs text-muted-foreground">
        {selected.length
          ? `Selected: ${selected.map((key) => teams.find((team) => team.id === key)?.name).join(", ")}`
          : "No teams selected."}
      </output>
    </div>
  );
}
