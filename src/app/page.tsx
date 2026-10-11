import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { HomeBlocks, HomeShowcase } from "@/components/home/home-showcase";
import { ButtonLink } from "@/components/ui/button-link";

function SectionHeading({
  id,
  title,
  description,
  link,
}: {
  id: string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <div className="max-w-xl">
        <h2
          id={id}
          className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {link.label} <ArrowRightIcon size={15} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

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
        <section className="mx-auto max-w-7xl px-5 pb-14 pt-16 text-center sm:px-8 sm:pb-20 sm:pt-24">
          <h1 className="mx-auto max-w-4xl text-[clamp(3.25rem,7vw,6rem)] font-semibold leading-[1.02] tracking-[-0.075em] [text-wrap:balance]">
            Accessible components <span className="text-primary">you own.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Copy accessible components into your shadcn project. They use React
            Aria, Tailwind CSS, and Motion.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink as={Link} href="/components/installation" size="lg">
              Get started <ArrowRightIcon size={16} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              as={Link}
              href="/components"
              variant="outline"
              size="lg"
            >
              Browse components
            </ButtonLink>
          </div>
        </section>

        <section
          id="components"
          aria-labelledby="components-heading"
          className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-20 sm:px-8 sm:pb-28"
        >
          <SectionHeading
            id="components-heading"
            title="Built with vip/ui"
            description="Each screen uses only components from this library."
            link={{ href: "/components", label: "All components" }}
          />
          <HomeShowcase />
        </section>

        <section
          aria-labelledby="blocks-heading"
          className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32"
        >
          <SectionHeading
            id="blocks-heading"
            title="Blocks for common tasks"
            link={{ href: "/blocks", label: "All blocks" }}
          />
          <HomeBlocks />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
