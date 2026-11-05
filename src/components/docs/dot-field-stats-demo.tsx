import { DotField } from "@/components/ui/dot-field";

const metrics = [
  { label: "Requests", value: "1.24M", detail: "+18% this week" },
  { label: "p95 latency", value: "184ms", detail: "-22ms this week" },
  { label: "Error rate", value: "0.04%", detail: "12 events today" },
];

export function DotFieldStatsDemo() {
  return (
    <DotField
      gap={18}
      spotlight={260}
      className="w-full rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Production</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Live metrics from the last 24 hours.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-subtle px-2.5 py-1 text-xs font-medium text-success-foreground ring-1 ring-success/15 ring-inset">
          <span className="size-1.5 rounded-full bg-current" />
          Healthy
        </span>
      </div>
      <dl className="mt-8 grid gap-3 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-border/70 bg-card/75 p-4 backdrop-blur-sm"
          >
            <dt className="text-xs text-muted-foreground">{metric.label}</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-[-0.04em] tabular-nums">
              {metric.value}
            </dd>
            <dd className="mt-1 text-xs text-muted-foreground">
              {metric.detail}
            </dd>
          </div>
        ))}
      </dl>
    </DotField>
  );
}
