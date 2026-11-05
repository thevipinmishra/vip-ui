import { Dither } from "@/components/ui/dither";

export function DitherInteractiveDemo() {
  return (
    <Dither
      shape="halo"
      size={3}
      scale={0.9}
      intensity={0.7}
      color="var(--chart-2)"
      interactive
      className="h-56 w-full rounded-2xl border border-border bg-card"
    >
      <div className="grid h-full place-content-center px-6">
        <div className="grid justify-items-center gap-1 rounded-lg bg-card/85 px-4 py-3 text-center shadow-[var(--shadow-card)] backdrop-blur-sm">
          <p className="text-sm font-medium">Move the pointer</p>
          <p className="text-xs text-muted-foreground">
            The dither follows the cursor.
          </p>
        </div>
      </div>
    </Dither>
  );
}
