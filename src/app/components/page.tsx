import type { Metadata } from "next";
import Link from "next/link";
import { CatalogBrowser } from "@/components/docs/catalog-browser";
import { textLinkClass } from "@/components/docs/guide";
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
          Before you add a component,{" "}
          <Link href="/components/installation" className={textLinkClass}>
            set up your project
          </Link>
          .
        </PageHeaderDescription>
      </PageHeader>

      <CatalogBrowser />
    </article>
  );
}
