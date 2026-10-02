import { Spinner } from "@/components/ui/spinner";

const patterns = [
  { variant: "ring", use: "Quick actions" },
  { variant: "segments", use: "Dense interfaces" },
  { variant: "dots", use: "Inline messages" },
  { variant: "bars", use: "Voice and streaming" },
  { variant: "orbit", use: "Waiting screens" },
  { variant: "pulse", use: "Background work" },
  { variant: "spark", use: "Assistant activity" },
] as const;

export function SpinnerDemo() {
  return (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {patterns.map(({ variant, use }) => (
          <div
            key={variant}
            className="flex min-h-44 flex-col rounded-2xl bg-card p-5 ring-1 ring-border/70"
          >
            <div
              data-slot="spinner-stage"
              className="grid h-20 shrink-0 place-items-center"
            >
              <Spinner
                variant={variant}
                size="lg"
                decorative
                className="text-primary"
              />
            </div>
            <div className="mt-auto pt-3 text-center">
              <p className="text-sm font-medium capitalize">{variant}</p>
              <p className="mt-1 text-xs text-muted-foreground">{use}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
