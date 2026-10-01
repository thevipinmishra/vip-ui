import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Studio North</CardTitle>
        <CardDescription>A shared space for the design team.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6">8 members · Updated today</p>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-muted-foreground">
          Workspace overview
        </span>
      </CardFooter>
    </Card>
  );
}
