import Link from "next/link";
import { CatalogBrowser } from "@/components/docs/catalog-browser";
import { textLinkClass } from "@/components/docs/guide";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/docs/page-header";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Components",
  description:
    "Browse the vip/ui catalog of accessible React components, with live examples, installation steps, source code, and an API reference for each.",
  path: "/components",
  image: "file",
});

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
