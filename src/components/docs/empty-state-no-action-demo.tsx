import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
} from "@/components/ui/empty-state";

export function EmptyStateNoActionDemo() {
  return (
    <EmptyState className="w-full max-w-md">
      <EmptyStateTitle>No saved items</EmptyStateTitle>
      <EmptyStateDescription>
        Items you save appear here.
      </EmptyStateDescription>
    </EmptyState>
  );
}
