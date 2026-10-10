import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateTitle,
} from "@/components/ui/empty-state";

export default function ComponentNotFound() {
  return (
    <EmptyState>
      <EmptyStateTitle>Component not found</EmptyStateTitle>
      <EmptyStateDescription>
        This address does not match a component in the catalog. It may have been
        renamed or removed.
      </EmptyStateDescription>
      <EmptyStateActions>
        <ButtonLink as={Link} href="/components" variant="outline">
          Browse components <ArrowRightIcon size={16} aria-hidden="true" />
        </ButtonLink>
      </EmptyStateActions>
    </EmptyState>
  );
}
