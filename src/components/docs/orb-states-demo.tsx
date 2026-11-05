import { Orb } from "@/components/ui/orb";

export function OrbStatesDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { state: "idle" as const, label: "Idle" },
          { state: "thinking" as const, label: "Thinking" },
        ].map((item) => (
          <div
            key={item.state}
            className="grid justify-items-center gap-3 rounded-xl border border-border bg-card p-5"
          >
            <Orb size={96} state={item.state} label={item.label} />
            <p className="text-xs font-medium text-muted-foreground">
              {item.label}
            </p>
          </div>
        ))}
        {[48, 64].map((size) => (
          <div
            key={size}
            className="grid place-content-center justify-items-center gap-3 rounded-xl border border-border bg-card p-5"
          >
            <Orb size={size} label={`${size} pixels`} />
            <p className="text-xs text-muted-foreground">{size}px</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-end justify-center gap-8 rounded-xl border border-border bg-card p-6">
        {[96, 128, 160].map((size) => (
          <div key={size} className="grid justify-items-center gap-2">
            <Orb size={size} state="thinking" label={`${size} pixels`} />
            <p className="text-xs text-muted-foreground">{size}px</p>
          </div>
        ))}
      </div>
    </div>
  );
}
