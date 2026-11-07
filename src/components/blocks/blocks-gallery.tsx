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
import {
  type Block,
  type BlockCategory,
  blockCategories,
  blocksIn,
} from "@/lib/blocks";
import { BlockCard } from "./block-card";
import { BlockPreviewProvider } from "./block-preview";

const tabs = [
  { href: "/blocks", label: "All" },
  ...blockCategories.map((category) => ({
    href: `/blocks?category=${category.slug}`,
    label: category.label,
  })),
];

const tiles = [
  "row-span-2 bg-[var(--chart-3)]",
  "col-span-2 bg-[var(--chart-2)]",
  "bg-[var(--chart-4)]",
  "bg-[var(--chart-5)]",
];

export function BlocksGallery({ category }: { category: string | null }) {
  const current = blockCategories.find((item) => item.slug === category);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="flex-1">
        <PageHeader className="site-container relative isolate items-center pb-10 pt-12 text-center sm:pb-14 sm:pt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-28 -z-10 mx-auto h-96 max-w-5xl rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--chart-3) 18%, transparent) 0%, transparent 70%)",
            }}
          />
          <span
            aria-hidden="true"
            className="grid h-7 w-11 grid-cols-[0.625rem_1fr_1fr] grid-rows-[0.5rem_1fr] gap-1 opacity-90"
          >
            {tiles.map((tile) => (
              <span key={tile} className={`rounded-[3px] ${tile}`} />
            ))}
          </span>
          <PageHeaderHeading size="lg">
            From components to complete experiences.
          </PageHeaderHeading>
          <PageHeaderDescription>
            Carefully composed React UI blocks for dashboards, AI interfaces,
            authentication, onboarding, commerce, and more.
          </PageHeaderDescription>
          <PageActions className="mt-2 justify-center">
            <ButtonLink href="#gallery">Browse blocks</ButtonLink>
          </PageActions>
        </PageHeader>

        <div className="relative mb-16">
          <CategoryTabs
            label="Block categories"
            tabs={tabs}
            active={current ? `/blocks?category=${current.slug}` : "/blocks"}
          />
          <div className="site-container">
            <BlockPreviewProvider>
              {current ? <CategoryBlocks category={current} /> : <AllBlocks />}
            </BlockPreviewProvider>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function AllBlocks() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="scroll-mt-32 pt-10"
    >
      <h2
        id="gallery-title"
        className="text-center text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-tight font-semibold tracking-[-0.035em] text-balance sm:tracking-[-0.045em]"
      >
        All blocks
      </h2>
      <div className="mt-8 grid gap-14">
        {blockCategories.map((category) => {
          const blocks = blocksIn(category.slug);
          if (blocks.length === 0) return null;
          const headingId = `${category.slug}-title`;
          return (
            <section key={category.slug} aria-labelledby={headingId}>
              <h3
                id={headingId}
                className="mb-4 text-base font-semibold tracking-[-0.03em]"
              >
                {category.label}
              </h3>
              <BlockGrid blocks={blocks} />
            </section>
          );
        })}
      </div>
    </section>
  );
}

function CategoryBlocks({ category }: { category: BlockCategory }) {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="scroll-mt-32 pt-10"
    >
      <h2
        id="gallery-title"
        className="text-center text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-tight font-semibold tracking-[-0.035em] text-balance sm:tracking-[-0.045em]"
      >
        {category.label} blocks
      </h2>
      <div className="mt-10">
        <BlockGrid blocks={blocksIn(category.slug)} />
      </div>
    </section>
  );
}

function BlockGrid({ blocks }: { blocks: Block[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-3">
      {blocks.map((block) => (
        <li key={block.name} className="flex min-w-0">
          <BlockCard block={block} />
        </li>
      ))}
    </ul>
  );
}
