import { Marquee } from "@/components/ui/marquee";

const clients = ["Atlas", "Beacon", "Cascade", "Drift", "Ember"];

export function MarqueeDemo() {
  return (
    <Marquee className="w-full">
      {clients.map((client) => (
        <span
          key={client}
          className="whitespace-nowrap text-lg font-semibold uppercase tracking-[0.18em] text-muted-foreground"
        >
          {client}
        </span>
      ))}
    </Marquee>
  );
}
