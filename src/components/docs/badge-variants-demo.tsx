import { Badge } from "@/components/ui/badge";

export function BadgeVariantsDemo() {
  return (
    <div className="flex max-w-md flex-wrap items-center justify-center gap-3">
      <Badge>Draft</Badge>
      <Badge variant="accent">In progress</Badge>
      <Badge variant="success">Published</Badge>
      <Badge variant="warning">Needs review</Badge>
      <Badge variant="error">Sync failed</Badge>
      <Badge variant="outline">Internal</Badge>
    </div>
  );
}
