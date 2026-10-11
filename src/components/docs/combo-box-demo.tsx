"use client";

import {
  ComboBox,
  ComboBoxContent,
  ComboBoxDescription,
  ComboBoxError,
  ComboBoxInput,
  ComboBoxItem,
  ComboBoxLabel,
  ComboBoxTrigger,
} from "@/components/ui/combo-box";

const frameworks = [
  { id: "next", name: "Next.js", description: "React framework" },
  { id: "astro", name: "Astro", description: "Content-driven websites" },
  { id: "remix", name: "Remix", description: "Full-stack web framework" },
  {
    id: "svelte",
    name: "SvelteKit",
    description: "Svelte application framework",
  },
  { id: "vue", name: "Nuxt", description: "Vue application framework" },
];

export function ComboBoxDemo() {
  return (
    <ComboBox className="w-full max-w-[340px]">
      <ComboBoxLabel>Framework</ComboBoxLabel>
      <div className="relative flex items-center">
        <ComboBoxInput placeholder="Search frameworks" />
        <ComboBoxTrigger />
      </div>
      <ComboBoxDescription>
        Type to filter the list, then select one.
      </ComboBoxDescription>
      <ComboBoxError />
      <ComboBoxContent>
        {frameworks.map((framework) => (
          <ComboBoxItem
            key={framework.id}
            id={framework.id}
            textValue={framework.name}
          >
            <span className="min-w-0">
              <span className="block font-medium">{framework.name}</span>
              <span className="block text-xs text-muted-foreground group-selected/item:text-accent-foreground">
                {framework.description}
              </span>
            </span>
          </ComboBoxItem>
        ))}
      </ComboBoxContent>
    </ComboBox>
  );
}
