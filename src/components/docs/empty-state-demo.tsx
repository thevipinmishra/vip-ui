import { Search } from "reicon-react";
import { ButtonLink } from "@/components/ui/button-link";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";

export function EmptyStateDemo() {
  return (
    <EmptyState className="w-full max-w-md">
      <EmptyStateIcon>
        <Search size={20} aria-hidden="true" />
      </EmptyStateIcon>
      <EmptyStateTitle>No saved components</EmptyStateTitle>
      <EmptyStateDescription>
        Browse the catalog to find a component to use in your app.
      </EmptyStateDescription>
      <EmptyStateActions>
        <ButtonLink href="/components">Browse components</ButtonLink>
      </EmptyStateActions>
    </EmptyState>
  );
}
