import Link from "next/link";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { HomeShowcase } from "@/components/home/home-showcase";
import { ButtonLink } from "@/components/ui/button-link";
import { pageMetadata, site } from "@/lib/seo";

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
      <a
        href="#main"
        className="sr-only fixed start-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section
          aria-labelledby="hero-title"
          className="relative isolate pt-16 pb-10 sm:pt-24 sm:pb-14"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-64 opacity-90 sm:h-80 dark:opacity-100"
            style={{
              background:
                "radial-gradient(70% 130% at 18% 8%, color-mix(in oklab, var(--chart-2) 18%, transparent) 0%, transparent 72%), radial-gradient(58% 120% at 82% 16%, color-mix(in oklab, var(--chart-3) 8%, transparent) 0%, transparent 70%)",
            }}
          />
          <div className="site-container">
            <div className="max-w-4xl">
              <h1
                id="hero-title"
                className="text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:tracking-[-0.045em]"
              >
                A better foundation for beautiful interfaces.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                A thoughtfully engineered React component collection featuring
                accessible interactions from React Aria, fluid animations with
                Motion, and a flexible design system.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink as={Link} href="/components/installation" size="md">
                  Get Started
                </ButtonLink>
                <ButtonLink
                  as={Link}
                  href="/components"
                  variant="outline"
                  size="md"
                >
                  View Components
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section
          id="components"
          aria-labelledby="components-title"
          className="w-full scroll-mt-20 px-5 pb-10 pt-2 sm:px-8 sm:pb-14 sm:pt-4"
        >
          <h2 id="components-title" className="sr-only">
            Component examples
          </h2>
          <HomeShowcase />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
