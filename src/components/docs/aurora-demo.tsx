import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Aurora } from "@/components/ui/aurora";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AuroraDemo() {
  return (
    <Aurora
      tone="mist"
      className="w-full rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-[var(--shadow-card)] sm:px-10"
    >
      <div className="mx-auto grid max-w-xl justify-items-center gap-5">
        <Badge variant="outline">Introducing Atlas</Badge>
        <h3 className="text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          A calmer way to ship.
        </h3>
        <p className="max-w-md text-pretty text-sm leading-6 text-muted-foreground">
          Plan, build, and review in one place. The atmosphere stays quiet so
          the work stays clear.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button>Start building</Button>
          <Button variant="secondary">
            Read the docs
            <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Aurora>
  );
}
