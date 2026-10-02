import { Badge, BadgeDot } from "@/components/ui/badge";

export function BadgeDemo() {
  return (
    <div className="flex max-w-md flex-wrap items-center justify-center gap-3">
      <Badge>Draft</Badge>
      <Badge variant="accent">
        <BadgeDot /> In progress
      </Badge>
      <Badge variant="success">
        <BadgeDot /> Published
      </Badge>
      <Badge variant="warning">
        <BadgeDot /> Needs review
      </Badge>
      <Badge variant="error">
        <BadgeDot /> Sync failed
      </Badge>
      <Badge variant="outline">Internal</Badge>
    </div>
  );
}
