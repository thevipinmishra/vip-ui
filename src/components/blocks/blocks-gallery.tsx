import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { ButtonLink } from "@/components/ui/button-link";
import { blockCategories, blocks, blocksIn } from "@/lib/blocks";
import { cn } from "@/lib/utils";
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
      <SiteHeader wide />
      <main
        id="main"
        className="mx-auto w-full max-w-[90rem] flex-1 px-5 pb-24 sm:px-8"
      >
        <header className="flex flex-col items-start gap-5 pb-10 pt-14 sm:pt-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-primary/15">
            <span className="size-1.5 rounded-full bg-current" />
            {blocks.length} blocks · Next.js App Router
          </p>
          <h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.065em]">
            Blocks
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Complete page sections that use only vip/ui components. Install a
            block with one command, then change it to suit your app.
          </p>
          <ButtonLink as={Link} href="/components/installation">
            Set up your project
            <ArrowRightIcon size={16} aria-hidden="true" />
          </ButtonLink>
        </header>
        <nav
          aria-label="Block categories"
          className="sticky top-0 z-30 -mx-5 border-b border-border/70 bg-background/90 px-5 backdrop-blur sm:-mx-8 sm:px-8"
        >
          <ul className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <li key={tab.href} className="shrink-0">
                <Link
                  href={tab.href}
                  scroll={false}
                  aria-current={tab.href === active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-12 items-center gap-2 border-b-2 px-3 text-sm font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                    tab.href === active
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  {tab.label}
                  <span className="rounded-full bg-muted px-1.5 text-[11px] tabular-nums text-muted-foreground">
                    {tab.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 grid gap-20">
          {shown.map((block) => (
            <BlockDisplay key={block.name} block={block} />
          ))}
        </div>
      </main>
      <SiteFooter wide />
    </div>
  );
}
