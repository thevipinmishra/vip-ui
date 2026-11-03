import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { notFoundMetadata } from "@/lib/seo";

export const metadata: Metadata = notFoundMetadata({
  title: "Component not found",
  description:
    "This address does not match a component in the vip/ui catalog. Browse the catalog to find the right component.",
});

export default function ComponentNotFound() {
  return (
    <EmptyState>
      <EmptyStateTitle as="h1">Component not found</EmptyStateTitle>
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
