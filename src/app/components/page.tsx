import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { CatalogBrowser } from "@/components/docs/catalog-browser";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/docs/page-header";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Components | vip/ui",
  description:
    "Browse copyable React components, try live examples, and read installation and API guidance for each component.",
};

export default function ComponentsPage() {
  return (
    <article>
      <PageHeader>
        <PageHeaderHeading>Components</PageHeaderHeading>
        <PageHeaderDescription>
          Accessible components, built with React Aria. Add a component to your
          app. Change it to suit your product.
        </PageHeaderDescription>
        <PageActions>
          <ButtonLink as={Link} href="/components/installation">
            Set up your project
            <ArrowRightIcon size={16} aria-hidden="true" />
          </ButtonLink>
        </PageActions>
      </PageHeader>

      <CatalogBrowser />
    </article>
  );
}
