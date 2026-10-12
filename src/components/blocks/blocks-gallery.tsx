import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
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
import { blockCategories, blocksIn } from "@/lib/blocks";
import { BlockDisplay } from "./block-display";

const tabs = [
  { href: "/blocks", label: "Featured", count: blocksIn(null).length },
  ...blockCategories.map((category) => ({
    href: `/blocks/${category.slug}`,
    label: category.label,
    count: blocksIn(category.slug).length,
  })),
];

export function BlocksGallery({ category }: { category: string | null }) {
  const active = category ? `/blocks/${category}` : "/blocks";
  const shown = blocksIn(category);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main"
        className="sr-only fixed start-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 pb-24">
        <PageHeader className="site-container pb-10 pt-10 sm:pt-14">
          <PageHeaderHeading>Blocks</PageHeaderHeading>
          <PageHeaderDescription>
            Complete page sections, built with vip/ui. Add a block to your app.
            Change it to suit your product.
          </PageHeaderDescription>
          <PageActions>
            <ButtonLink as={Link} href="/components/installation">
              Set up your project
              <ArrowRightIcon size={16} aria-hidden="true" />
            </ButtonLink>
          </PageActions>
        </PageHeader>
        <CategoryTabs label="Block categories" tabs={tabs} active={active} />
        <div className="site-container mt-10 grid gap-20">
          {shown.map((block) => (
            <BlockDisplay key={block.name} block={block} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
