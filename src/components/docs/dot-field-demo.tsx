import { DotField } from "@/components/ui/dot-field";

const features = [
  {
    title: "Plan",
    detail: "Keep the brief, the scope, and the open questions together.",
  },
  {
    title: "Build",
    detail: "Move from a rough idea to a working surface without a reset.",
  },
  {
    title: "Review",
    detail: "Leave notes where the work happens, not in another thread.",
  },
];

export function DotFieldDemo() {
  return (
    <DotField
      gap={20}
      className="w-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
    >
      <div className="mb-5 max-w-sm">
        <p className="text-sm font-medium">One surface, three moves</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Move the pointer across the panel. The dots brighten under the cursor.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-border/70 bg-card/75 p-4 backdrop-blur-sm"
          >
            <p className="text-sm font-medium">{feature.title}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {feature.detail}
            </p>
          </div>
        ))}
      </div>
    </DotField>
  );
}
