import { Aurora, type AuroraTone } from "@/components/ui/aurora";

const tones: { tone: AuroraTone; label: string; detail: string }[] = [
  { tone: "mist", label: "Mist", detail: "Cool and neutral" },
  { tone: "sage", label: "Sage", detail: "Quiet and green" },
  { tone: "sunset", label: "Sunset", detail: "Warm and low" },
  { tone: "mono", label: "Mono", detail: "Ink and paper" },
];

export function AuroraPaletteDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      {tones.map((item) => (
        <Aurora
          key={item.tone}
          tone={item.tone}
          speed={0.5}
          className="h-40 rounded-xl border border-border bg-card p-4"
        >
          <p className="text-sm font-medium">{item.label}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
        </Aurora>
      ))}
    </div>
  );
}
