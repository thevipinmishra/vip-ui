import { DotField } from "@/components/ui/dot-field";

export function DotFieldSpacingDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <DotField
        gap={14}
        size={1.25}
        className="h-36 rounded-xl border border-border bg-card p-4"
      >
        <p className="text-sm font-medium">Fine dots</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Quiet texture for dense panels.
        </p>
      </DotField>
      <DotField
        variant="grid"
        gap={30}
        size={1}
        interactive={false}
        className="h-36 rounded-xl border border-border bg-card p-4"
      >
        <p className="text-sm font-medium">Loose grid</p>
        <p className="mt-1 text-xs text-muted-foreground">
          A structural line for empty areas.
        </p>
      </DotField>
    </div>
  );
}
