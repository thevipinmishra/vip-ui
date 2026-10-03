import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
} from "@/components/ui/empty-state";

export function EmptyStateNoActionDemo() {
  return (
    <EmptyState className="w-full max-w-md">
      <EmptyStateTitle>No matching projects</EmptyStateTitle>
      <EmptyStateDescription>
        Try another name or clear the search to see every project.
      </EmptyStateDescription>
    </EmptyState>
  );
}
