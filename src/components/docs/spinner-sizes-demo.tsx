import { Spinner } from "@/components/ui/spinner";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function SpinnerSizesDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {sizes.map((size) => (
        <div key={size} className="grid justify-items-center gap-3">
          <Spinner size={size} aria-label={`Loading, ${size} size`} />
          <span className="font-mono text-xs text-muted-foreground">
            {size}
          </span>
        </div>
      ))}
    </div>
  );
}
