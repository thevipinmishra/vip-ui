import { Dither } from "@/components/ui/dither";

export function DitherDemo() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
      <div className="grid items-center gap-8 sm:grid-cols-[1fr_16rem]">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Events this week</p>
          <p className="mt-1 text-5xl font-semibold tracking-[-0.05em] tabular-nums">
            12,480
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-md bg-success-subtle px-1.5 py-0.5 font-medium text-success-foreground ring-1 ring-success/15 ring-inset">
              +18%
            </span>
            from the week before
          </p>
          <div className="mt-6 flex justify-between text-[10px] text-muted-foreground">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
        <div className="relative h-40 overflow-hidden rounded-xl border border-border/60 bg-background/50">
          <Dither
            shape="wave"
            size={2.5}
            color="var(--chart-2)"
            intensity={0.9}
            fade="none"
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-3 text-[10px] tabular-nums text-muted-foreground">
            <span>2,400</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
