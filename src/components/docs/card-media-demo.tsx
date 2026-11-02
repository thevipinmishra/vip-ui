import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from "@/components/ui/card";

const bars = [38, 52, 46, 64, 58, 72, 68, 84, 76, 92];

export function CardMediaDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardMedia className="aspect-[16/9] bg-[radial-gradient(120%_90%_at_100%_0%,var(--accent),transparent_60%),linear-gradient(var(--muted),var(--card))]">
        <div
          aria-hidden="true"
          className="absolute inset-x-6 bottom-0 flex h-3/4 items-end gap-1.5"
        >
          {bars.map((height) => (
            <span
              key={height}
              className="flex-1 rounded-t-sm bg-primary/80 even:bg-primary/40"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </CardMedia>
      <CardHeader>
        <CardTitle>Quarterly growth report</CardTitle>
        <CardDescription>
          Revenue grew in nine of the last ten weeks.
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-4">
        <Badge variant="success" dot>
          Published
        </Badge>
        <span className="text-xs text-muted-foreground">
          Updated 2 days ago
        </span>
      </CardFooter>
    </Card>
  );
}
