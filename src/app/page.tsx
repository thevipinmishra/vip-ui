import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { HomeShowcase } from "@/components/home/home-showcase";
import { MotionStrip } from "@/components/home/motion-strip";
import { ButtonLink } from "@/components/ui/button-link";

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
          <h1 className="mx-auto max-w-5xl text-[clamp(3.25rem,7vw,6rem)] font-semibold leading-[1.02] tracking-[-0.075em] [text-wrap:balance]">
            Accessible components{" "}
            <span className="text-muted-foreground">that move.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Copy them into your shadcn project. React Aria gives keyboard and
            screen reader support. Motion shows each change of state and follows
            the reduced motion setting.
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
          <MotionStrip className="mx-auto mt-12 max-w-4xl text-start sm:mt-16" />
        </section>

        <section
          id="components"
          className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-24 sm:px-8 sm:pb-32"
        >
          <HomeShowcase />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
