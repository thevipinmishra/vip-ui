"use client";

import { SourceLink } from "@/components/ui/source-link";

const sources = [
  {
    href: "/components/disclosure",
    label: "Disclosure",
    source: "vip/ui docs",
  },
  {
    href: "https://react-aria.adobe.com/Disclosure",
    label: "Disclosure",
    source: "React Aria documentation",
  },
  {
    href: "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
    label: "Disclosure (Show/Hide) Pattern",
    source: "WAI-ARIA Authoring Practices Guide",
  },
];

export function SourceLinkListDemo() {
  return (
    <ol aria-label="Sources" className="grid w-full max-w-sm gap-2">
      {sources.map((item, index) => (
        <li key={item.href} className="min-w-0">
          <SourceLink {...item} index={index + 1} />
        </li>
      ))}
    </ol>
  );
}
