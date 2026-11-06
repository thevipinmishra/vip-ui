import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function SpotlightCardColorDemo() {
  return (
    <div className="grid w-full max-w-lg gap-3 sm:grid-cols-2">
      <SpotlightCard className="[--spotlight-color:var(--chart-2)]">
        <CardHeader>
          <CardTitle>Uptime</CardTitle>
          <CardDescription>All systems work as expected.</CardDescription>
        </CardHeader>
      </SpotlightCard>
      <SpotlightCard className="[--spotlight-color:var(--chart-4)] [--spotlight-size:12rem]">
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>You used 72% of this month's plan.</CardDescription>
        </CardHeader>
      </SpotlightCard>
    </div>
  );
}
