import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SpinnerUsageDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
      <div className="flex min-h-40 flex-col items-start justify-between rounded-2xl bg-card p-5 ring-1 ring-border/70">
        <p className="text-xs font-medium text-muted-foreground">
          Small in a button
        </p>
        <Button isDisabled>
          <Spinner variant="ring" size="sm" decorative />
          Saving
        </Button>
      </div>
      <div className="flex min-h-40 flex-col justify-between rounded-2xl bg-card p-5 ring-1 ring-border/70">
        <p className="text-xs font-medium text-muted-foreground">
          Medium with a status
        </p>
        <output className="flex items-center gap-3 text-sm font-medium">
          <Spinner
            variant="orbit"
            size="md"
            decorative
            className="text-primary"
          />
          Loading
        </output>
      </div>
    </div>
  );
}
