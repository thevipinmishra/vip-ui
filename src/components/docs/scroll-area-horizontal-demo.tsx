import { ScrollArea } from "@/components/ui/scroll-area";

const projects = [
  { name: "Design system", owner: "Maya Chen", progress: "82%", due: "Nov 24" },
  { name: "Billing portal", owner: "Leo Park", progress: "64%", due: "Dec 2" },
  { name: "Mobile app", owner: "Ana Ruiz", progress: "48%", due: "Dec 9" },
  { name: "Docs rewrite", owner: "Sam Ito", progress: "36%", due: "Dec 16" },
  { name: "Analytics", owner: "Jo Kim", progress: "21%", due: "Jan 6" },
];

export function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea
      orientation="horizontal"
      className="w-full max-w-md rounded-xl border border-border bg-card shadow-(--shadow-card)"
      aria-label="Projects"
    >
      <div className="flex w-max gap-3 p-3">
        {projects.map((project) => (
          <div
            key={project.name}
            className="w-48 rounded-lg border border-border bg-background p-3"
          >
            <p className="text-sm font-medium">{project.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {project.owner}
            </p>
            <div className="mt-4 flex items-baseline justify-between gap-2">
              <span className="text-lg font-semibold tabular-nums">
                {project.progress}
              </span>
              <span className="text-xs text-muted-foreground">
                {project.due}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
