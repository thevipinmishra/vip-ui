import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function SpotlightCardDemo() {
  return (
    <SpotlightCard className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Shared inbox</CardTitle>
        <CardDescription>
          Assign, snooze, and reply to customer mail as a team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">38 open conversations</p>
      </CardContent>
    </SpotlightCard>
  );
}
