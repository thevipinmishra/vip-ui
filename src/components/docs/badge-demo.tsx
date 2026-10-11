import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
  return (
    <div className="flex max-w-md flex-wrap items-center justify-center gap-3">
      <Badge variant="accent" dot>
        In progress
      </Badge>
      <Badge variant="success" dot>
        Published
      </Badge>
      <Badge variant="warning" dot>
        Needs review
      </Badge>
      <Badge variant="error" dot>
        Sync failed
      </Badge>
    </div>
  );
}
