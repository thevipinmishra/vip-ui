import { Marquee } from "@/components/ui/marquee";

const topics = [
  "Accessibility",
  "Design systems",
  "Motion",
  "Typography",
  "Research",
];

export function MarqueeStaticDemo() {
  return (
    <Marquee speed={0} className="w-full [--marquee-gap:0.75rem]">
      {topics.map((topic) => (
        <span
          key={topic}
          className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium"
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-primary"
          />
          {topic}
        </span>
      ))}
    </Marquee>
  );
}
