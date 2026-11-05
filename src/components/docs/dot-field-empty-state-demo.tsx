import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { DotField } from "@/components/ui/dot-field";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";

export function DotFieldEmptyStateDemo() {
  return (
    <DotField
      gap={16}
      spotlight={200}
      className="w-full rounded-2xl border border-border bg-card p-6"
    >
      <EmptyState className="mx-auto w-full max-w-md border-border/70 bg-card/70 backdrop-blur-sm">
        <EmptyStateIcon>
          <MagnifyingGlassIcon aria-hidden="true" />
        </EmptyStateIcon>
        <EmptyStateTitle>No saved searches</EmptyStateTitle>
        <EmptyStateDescription>
          Save a search to return to it later.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button size="sm" variant="secondary">
            Create a search
          </Button>
        </EmptyStateActions>
      </EmptyState>
    </DotField>
  );
}
