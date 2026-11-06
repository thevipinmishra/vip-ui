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

function Citation({ index }: { index: number }) {
  return (
    <sup className="ms-0.5 rounded-sm bg-muted px-1 font-mono text-[0.6875rem] text-muted-foreground">
      {index}
    </sup>
  );
}

export function SourceLinkListDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <p className="text-sm leading-6">
        A disclosure shows and hides a section of content.
        <Citation index={1} /> Its button sets aria-expanded, so screen readers
        hear the state.
        <Citation index={2} /> Enter and Space toggle it.
        <Citation index={3} />
      </p>
      <ol aria-label="Sources" className="grid gap-2">
        {sources.map((item, index) => (
          <li key={item.href} className="min-w-0">
            <SourceLink {...item} index={index + 1} />
          </li>
        ))}
      </ol>
    </div>
  );
}
