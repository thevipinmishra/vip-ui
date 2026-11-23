import Link from "next/link";
import { SiteAnnouncement } from "@/components/docs/site-announcement";
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
      <SiteHeader transparentAtTop />

      <main id="main">
        <section
          aria-labelledby="hero-title"
          className="relative isolate pt-16 pb-12 sm:pt-24 sm:pb-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-80 opacity-90 dark:opacity-100"
            style={{
              background:
                "radial-gradient(50% 100% at 50% 0%, color-mix(in oklab, var(--chart-2) 16%, transparent) 0%, transparent 75%)",
            }}
          />
          <div className="site-container">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <SiteAnnouncement />
              <h1
                id="hero-title"
                className="mt-6 text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance sm:tracking-[-0.045em]"
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
