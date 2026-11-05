import { StaggerGroup, StaggerItem } from "@/components/ui/stagger-group";

const days = Array.from({ length: 21 }, (_, index) => index + 1);

export function StaggerGroupTimingDemo() {
  return (
    <StaggerGroup
      as="ol"
      aria-label="Activity for the last 21 days"
      className="grid w-full max-w-sm grid-cols-7 gap-1.5"
    >
      {days.map((day) => (
        <StaggerItem
          as="li"
          key={day}
          className="grid aspect-square place-items-center rounded-lg border border-border bg-card font-mono text-xs text-muted-foreground"
        >
          {day}
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
