import Link from "next/link";
import { SiteAnnouncement } from "@/components/docs/site-announcement";
import { SiteHeader } from "@/components/docs/site-header";
import { HomeShowcase } from "@/components/home/home-showcase";
import { ButtonLink } from "@/components/ui/button-link";
import { blocks } from "@/lib/blocks";
import { catalogComponents } from "@/lib/catalog";
import { pageMetadata, site } from "@/lib/seo";
import { cn } from "@/lib/utils";

const stats = [
  { value: `${catalogComponents.length}`, label: "Components" },
  { value: `${blocks.length}`, label: "Blocks" },
  { value: "React Aria", label: "Accessible" },
  { value: "MIT", label: "License" },
];

export const metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  absoluteTitle: true,
  image: "file",
});

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader transparentAtTop />

      <main id="main">
        <section
          aria-labelledby="hero-title"
          className="relative isolate pt-16 pb-12 sm:pt-24 sm:pb-16"
        >
          <div
            aria-hidden="true"
            className="docs-grid pointer-events-none absolute inset-x-0 -top-(--header-height) -z-20 h-[44rem]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[30rem] max-w-4xl"
            style={{
              background:
                "radial-gradient(50% 55% at 50% 30%, var(--docs-glow) 0%, transparent 70%)",
            }}
          />
          <div className="site-container">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <SiteAnnouncement />
              <h1
                id="hero-title"
                className="text-gradient mt-7 pb-1 text-[clamp(2.5rem,1.4rem+4vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:tracking-[-0.05em]"
              >
                Accessible React components you own.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                Built on React Aria, with fluid motion, charts, and themes. Add
                them with the shadcn CLI and edit the source.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink
                  as={Link}
                  href="/components/installation#agent"
                  size="md"
                >
                  Set up with an agent
                </ButtonLink>
                <ButtonLink
                  as={Link}
                  href="/components"
                  variant="ghost"
                  size="md"
                >
                  Browse components
                </ButtonLink>
              </div>
              <dl className="mono-label mt-14 grid w-full max-w-2xl grid-cols-2 border-y border-docs-line text-muted-foreground sm:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "relative flex flex-col items-center gap-1 py-4",
                      index > 0 && "sm:border-s sm:border-docs-line",
                      index % 2 === 1 && "border-s border-docs-line",
                      index > 1 && "border-t border-docs-line sm:border-t-0",
                    )}
                  >
                    <dt className="order-2 text-[10px]">{stat.label}</dt>
                    <dd className="order-1 font-sans text-lg font-semibold tracking-[-0.02em] normal-case text-foreground tabular-nums">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section
          id="components"
          aria-labelledby="components-title"
          className="mx-auto w-full max-w-[90rem] px-5 pb-24 sm:px-8"
        >
          <h2 id="components-title" className="sr-only">
            Component examples
          </h2>
          <HomeShowcase />
        </section>
      </main>
    </div>
  );
}
