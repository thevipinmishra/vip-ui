"use client";

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
  return (
    <div className="w-full max-w-[340px]">
      <Select defaultValue="next">
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
    </div>
  );
}
