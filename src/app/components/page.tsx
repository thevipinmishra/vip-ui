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
    "Accessible React components with live examples, installation steps, and API reference.",
};

export default function ComponentsPage() {
  return (
    <article>
      <PageHeader>
        <PageHeaderHeading>Components</PageHeaderHeading>
        <PageHeaderDescription>
          Accessible React components. Interactive components use React Aria.
          Add a component to your app, then change it as necessary.{" "}
          <Link
            href="/components/installation"
            className="rounded-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Set up your project
          </Link>{" "}
          first.
        </PageHeaderDescription>
      </PageHeader>

      <CatalogBrowser />
    </article>
  );
}
