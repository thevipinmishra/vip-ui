import { Spinner } from "@/components/ui/spinner";

export function SpinnerColorDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="grid size-16 place-items-center rounded-xl bg-card text-foreground shadow-(--shadow-card) ring-1 ring-border/70">
        <Spinner aria-label="Loading" />
      </span>
      <span className="grid size-16 place-items-center rounded-xl bg-card text-muted-foreground shadow-(--shadow-card) ring-1 ring-border/70">
        <Spinner variant="segments" aria-label="Loading" />
      </span>
      <span className="grid size-16 place-items-center rounded-xl bg-primary text-primary-foreground shadow-(--shadow-card)">
        <Spinner aria-label="Loading" />
      </span>
      <span className="grid size-16 place-items-center rounded-xl bg-success/10 text-success ring-1 ring-success/25">
        <Spinner variant="dots" aria-label="Loading" />
      </span>
    </div>
  );
}
