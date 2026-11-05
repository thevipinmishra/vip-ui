import { PauseIcon } from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Orb } from "@/components/ui/orb";

export function OrbDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-5 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:flex-row sm:items-center">
      <Orb
        size={120}
        state="thinking"
        label="Research assistant is thinking"
        className="mx-auto sm:mx-0"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium">Research assistant</p>
          <Badge variant="accent" dot>
            Thinking
          </Badge>
        </div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Reading three sources and checking the details before it answers.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" variant="secondary">
            <PauseIcon data-icon="inline-start" aria-hidden="true" />
            Pause
          </Button>
          <Button size="sm" variant="ghost">
            View activity
          </Button>
        </div>
      </div>
    </div>
  );
}
