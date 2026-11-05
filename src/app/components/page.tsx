import Link from "next/link";
import { CatalogBrowser } from "@/components/docs/catalog-browser";
import { CategoryTabs } from "@/components/docs/category-tabs";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/docs/page-header";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { ButtonLink } from "@/components/ui/button-link";
import { catalogGroups } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Components",
  description:
    "Accessible, customizable React components with examples, source, and API references.",
  path: "/components",
  image: "file",
});

const groupSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const tabs = [
  { href: "/components", label: "All" },
  ...catalogGroups.map((group) => ({
    href: `/components?category=${groupSlug(group.title)}`,
    label: group.title,
  })),
];

export default async function ComponentsPage({
  searchParams,
}: PageProps<"/components">) {
  const { category } = await searchParams;
  const current = catalogGroups.find(
    (group) => groupSlug(group.title) === category,
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main"
        className="sr-only fixed start-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <PageHeader className="site-container relative isolate items-center pb-10 pt-12 text-center sm:pb-14 sm:pt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-28 -z-10 mx-auto h-96 max-w-5xl rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--chart-4) 18%, transparent) 0%, transparent 70%)",
            }}
          />
          <span
            aria-hidden="true"
            className="flex h-7 items-center gap-1.5 opacity-90"
          >
            <span className="flex h-4 w-7 items-center rounded-full bg-[var(--chart-2)] p-0.5">
              <span className="ms-auto size-3 rounded-full bg-background" />
            </span>
            <span className="size-4 rounded-[5px] bg-[var(--chart-3)]" />
            <span className="h-4 w-6 rounded-full bg-[var(--chart-5)]" />
          </span>
          <PageHeaderHeading size="lg">
            Components, crafted with intention.
          </PageHeaderHeading>
          <PageHeaderDescription>
            A thoughtfully designed collection of customizable React components,
            combining accessible interactions powered by React Aria with
            purposeful motion. Explore examples, implementation details, and
            APIs built for modern interfaces.
          </PageHeaderDescription>
          <PageActions className="mt-2 justify-center">
            <ButtonLink as={Link} href="/components/installation">
              Get started
            </ButtonLink>
          </PageActions>
        </PageHeader>

        <div className="relative mb-16">
          <CategoryTabs
            label="Component categories"
            tabs={tabs}
            active={
              current
                ? `/components?category=${groupSlug(current.title)}`
                : "/components"
            }
          />
          <div className="site-container">
            <CatalogBrowser category={current?.title} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
