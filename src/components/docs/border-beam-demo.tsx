import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = ["Unlimited projects", "Version history", "Priority support"];

export function BorderBeamDemo() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Pro</CardTitle>
        <CardDescription>For teams that ship every week.</CardDescription>
        <CardAction>
          <Badge>Popular</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-3xl font-semibold tracking-tight">
          $24
          <span className="text-sm font-normal text-muted-foreground">
            {" "}
            per month
          </span>
        </p>
        <ul className="grid gap-2 text-sm text-muted-foreground">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Start free trial</Button>
      </CardFooter>
      <BorderBeam />
    </Card>
  );
}
