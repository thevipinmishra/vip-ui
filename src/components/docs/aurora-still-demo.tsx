import { Aurora } from "@/components/ui/aurora";

export function AuroraStillDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <Aurora
        speed={0}
        className="h-44 rounded-xl border border-border bg-card p-5"
      >
        <p className="text-sm font-medium">Still gradient</p>
        <p className="mt-1 max-w-40 text-xs leading-5 text-muted-foreground">
          Use a still frame in dense layouts and print.
        </p>
      </Aurora>
      <Aurora
        tone="sunset"
        speed={1.6}
        grain={0.16}
        className="h-44 rounded-xl border border-border bg-card p-5"
      >
        <p className="text-sm font-medium">Faster drift</p>
        <p className="mt-1 max-w-40 text-xs leading-5 text-muted-foreground">
          Raise `speed` for a launch banner or a short-lived panel.
        </p>
      </Aurora>
    </div>
  );
}
