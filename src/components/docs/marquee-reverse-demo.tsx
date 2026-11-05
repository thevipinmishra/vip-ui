import { Marquee } from "@/components/ui/marquee";

const updates = [
  "Faster exports are live",
  "New usage dashboard",
  "Team roles shipped",
  "Search now covers comments",
];

export function MarqueeReverseDemo() {
  return (
    <Marquee reverse speed={40} className="w-full">
      {updates.map((update) => (
        <span
          key={update}
          className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground"
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-primary"
          />
          {update}
        </span>
      ))}
    </Marquee>
  );
}
