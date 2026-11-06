import { BorderBeam } from "@/components/ui/border-beam";

export function BorderBeamColorDemo() {
  return (
    <div className="grid w-full max-w-md gap-4 sm:grid-cols-2">
      <div className="relative rounded-xl border border-border bg-card p-4">
        <p className="text-sm font-medium">Sync is on</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Changes upload as you work.
        </p>
        <BorderBeam className="[--border-beam-color:var(--chart-2)]" />
      </div>
      <div className="relative rounded-xl border-2 border-border bg-card p-4">
        <p className="text-sm font-medium">New in 2.4</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Comments sync in real time.
        </p>
        <BorderBeam className="[--border-beam-color:var(--chart-3)] [--border-beam-width:2px]" />
      </div>
    </div>
  );
}
