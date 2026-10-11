import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardBasicDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Website refresh</CardTitle>
        <CardDescription>Due October 18</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6">
          Three of five tasks are complete. Review the homepage draft next.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Open project</Button>
      </CardFooter>
    </Card>
  );
}
