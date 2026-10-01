import { FileText } from "reicon-react";
import { Badge } from "@/components/ui/badge";

const releases = [
  {
    name: "Mobile navigation",
    version: "v2.6.0",
    date: "Oct 8",
    status: "Published",
    variant: "success",
  },
  {
    name: "Billing exports",
    version: "v2.6.1",
    date: "Oct 10",
    status: "In progress",
    variant: "accent",
  },
  {
    name: "Team invitations",
    version: "v2.7.0",
    date: "Oct 12",
    status: "Needs review",
    variant: "warning",
  },
  {
    name: "Audit log",
    version: "v2.7.1",
    date: "Not scheduled",
    status: "Draft",
    variant: "neutral",
  },
] as const;

export function BadgeQueueDemo() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
      <div className="border-b border-border px-5 py-4">
        <h4 className="text-sm font-semibold">Release queue</h4>
        <p className="mt-1 text-xs text-muted-foreground">
          Upcoming product changes
        </p>
      </div>
      <ul className="divide-y divide-border">
        {releases.map((release) => (
          <li
            key={release.version}
            className="flex flex-wrap items-center gap-3 px-5 py-3.5"
          >
            <FileText
              size={17}
              aria-hidden="true"
              className="shrink-0 text-muted-foreground"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{release.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {release.version} · {release.date}
              </p>
            </div>
            <Badge variant={release.variant} dot>
              {release.status}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
