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
  { id: "astro", name: "Astro", description: "Content driven websites" },
  { id: "remix", name: "Remix", description: "Full stack web framework" },
  {
    id: "svelte",
    name: "SvelteKit",
    description: "Svelte application framework",
  },
  { id: "vue", name: "Nuxt", description: "Vue application framework" },
];

export function ComboBoxDemo() {
  return (
    <div className="grid w-full max-w-[340px] gap-4">
      <ComboBox>
        <ComboBoxLabel>Framework</ComboBoxLabel>
        <div className="relative flex items-center">
          <ComboBoxInput placeholder="Search options" />
          <ComboBoxTrigger />
        </div>
        <ComboBoxDescription>
          Type to narrow the list, then choose one.
        </ComboBoxDescription>
        <ComboBoxError />
        <ComboBoxContent>
          {frameworks.map((framework) => (
            <ComboBoxItem
              key={framework.id}
              id={framework.id}
              textValue={framework.name}
            >
              <span>
                <span className="block font-medium">{framework.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {framework.description}
                </span>
              </span>
            </ComboBoxItem>
          ))}
        </ComboBoxContent>
      </ComboBox>
      <ComboBox
        label="Archived framework"
        description="An archived value stays visible but cannot change."
        defaultValue="next"
        isDisabled
        options={[{ id: "next", name: "Next.js" }]}
      />
    </div>
  );
}
