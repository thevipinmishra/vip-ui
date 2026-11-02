import { Spinner } from "@/components/ui/spinner";

const variants = [
  { variant: "ring", name: "Ring" },
  { variant: "segments", name: "Segments" },
  { variant: "dots", name: "Dots" },
] as const;

export function SpinnerDemo() {
  return (
    <ul className="grid w-full max-w-lg grid-cols-3 divide-x divide-border/70 rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
      {variants.map(({ variant, name }) => (
        <li
          key={variant}
          className="flex flex-col items-center gap-4 px-3 pt-8 pb-5"
        >
          <Spinner variant={variant} size="lg" aria-label={`${name} spinner`} />
          <span className="text-xs font-medium text-muted-foreground">
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
}
