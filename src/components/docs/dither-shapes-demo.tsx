import { Dither, type DitherShape } from "@/components/ui/dither";

const shapes: { shape: DitherShape; label: string; color: string }[] = [
  { shape: "halo", label: "Halo", color: "var(--chart-2)" },
  { shape: "wave", label: "Wave", color: "var(--chart-3)" },
  { shape: "ripple", label: "Ripple", color: "var(--chart-5)" },
  { shape: "swirl", label: "Swirl", color: "var(--chart-6)" },
];

export function DitherShapesDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {shapes.map((item) => (
        <Dither
          key={item.shape}
          shape={item.shape}
          color={item.color}
          size={2.5}
          intensity={0.8}
          speed={0.2}
          className="h-40 rounded-xl border border-border bg-card p-3"
        >
          <span className="inline-flex rounded-md bg-card/80 px-2 py-1 text-xs font-medium shadow-[var(--shadow-card)] backdrop-blur-sm">
            {item.label}
          </span>
        </Dither>
      ))}
    </div>
  );
}
