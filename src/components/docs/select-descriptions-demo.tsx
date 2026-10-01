"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectDescription,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

const frameworks = [
  { id: "next", name: "Next.js", description: "React framework" },
  { id: "remix", name: "Remix", description: "Full-stack web framework" },
  { id: "astro", name: "Astro", description: "Content-driven websites" },
];

export function SelectDescriptionsDemo() {
  const [selected, setSelected] = useState("next");
  return (
    <div className="w-full max-w-[340px] space-y-4">
      <Select value={selected} onValueChange={setSelected}>
        <SelectLabel>Framework</SelectLabel>
        <SelectTrigger />
        <SelectDescription>
          Choose the framework for this project.
        </SelectDescription>
        <SelectContent>
          {frameworks.map((framework) => (
            <SelectItem
              key={framework.id}
              id={framework.id}
              textValue={framework.name}
            >
              <span className="min-w-0">
                <span className="block font-medium">{framework.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {framework.description}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <output className="block rounded-[9px] border border-border bg-background px-3 py-2.5 text-xs text-muted-foreground">
        Selected{" "}
        <span className="font-medium text-foreground">
          {frameworks.find((item) => item.id === selected)?.name}
        </span>
      </output>
    </div>
  );
}
