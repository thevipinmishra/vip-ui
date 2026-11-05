import { Orb } from "@/components/ui/orb";

const palettes = [
  {
    label: "Lagoon",
    colors: ["var(--chart-2)", "var(--chart-6)"],
  },
  {
    label: "Ember",
    colors: ["var(--chart-5)", "var(--chart-3)"],
  },
  {
    label: "Iris",
    colors: ["var(--chart-6)", "var(--chart-2)"],
  },
  {
    label: "Mono",
    colors: ["var(--muted-foreground)", "var(--foreground)"],
  },
];

export function OrbPaletteDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {palettes.map((palette) => (
        <div
          key={palette.label}
          className="grid justify-items-center gap-4 rounded-xl border border-border bg-card p-6"
        >
          <Orb size={112} colors={palette.colors} label={palette.label} />
          <p className="text-xs font-medium text-muted-foreground">
            {palette.label}
          </p>
        </div>
      ))}
    </div>
  );
}
