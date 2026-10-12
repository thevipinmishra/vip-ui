import type { Metadata } from "next";
import Link from "next/link";
import { CatalogBrowser } from "@/components/docs/catalog-browser";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/docs/page-header";

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
          app. Change it to suit your product.{" "}
          <Link
            href="/components/installation"
            className="rounded-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Set up your project
          </Link>{" "}
          before you add the first component.
        </PageHeaderDescription>
      </PageHeader>

      <CatalogBrowser />
    </article>
  );
}
