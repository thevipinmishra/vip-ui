import { Spinner } from "@/components/ui/spinner";

const sizes = [
  { size: "xs", px: 14 },
  { size: "sm", px: 16 },
  { size: "md", px: 24 },
  { size: "lg", px: 40 },
  { size: "xl", px: 56 },
] as const;

export function SpinnerSizesDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-x-8 gap-y-6">
      {sizes.map(({ size, px }) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <Spinner size={size} aria-label={`Loading, ${size}`} />
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {size} · {px}px
          </span>
        </div>
      ))}
    </div>
  );
}
