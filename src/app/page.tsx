import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { GitHubMark, repositoryUrl } from "@/components/docs/github-mark";
import { HomeReveal } from "@/components/docs/home-page-motion";
import { MotionScaleDemo } from "@/components/docs/motion-scale-demo";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { CatalogOverview } from "@/components/home/catalog-overview";
import { HomeShowcase } from "@/components/home/home-showcase";
import { KeyboardLab } from "@/components/home/keyboard-lab";
import { MotionStrip } from "@/components/home/motion-strip";
import {
  FactList,
  HomeSection,
  SectionHeading,
} from "@/components/home/section";
import { ThemeSection } from "@/components/home/theme-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { catalogComponents } from "@/lib/catalog";
import { registryUrl } from "@/lib/registry-docs";
import { pageMetadata, site } from "@/lib/seo";

export const metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  absoluteTitle: true,
  image: "file",
});

const componentCount = catalogComponents.length;
const installArgs = `shadcn@latest add ${registryUrl("button") ?? "@vip-ui/button"}`;

const usage = `import { Button } from "@/components/vip-ui/button";

export function SaveButton() {
  return <Button>Save</Button>;
}`;

const cliFacts = [
  {
    term: "Source files",
    detail: (
      <>
        Files go to{" "}
        <code className="font-mono text-foreground">components/vip-ui</code>.
        Your shadcn components stay as they are.
      </>
    ),
  },
  {
    term: "Dependencies",
    detail: "The CLI installs the packages and theme variables.",
  },
  {
    term: "Any React app",
    detail: "No Next.js imports. Works with Vite.",
  },
  {
    term: "Manual install",
    detail: "Copy the files from each component page.",
  },
];

const accessibilityFacts = [
  {
    term: "Keyboard",
    detail: "Standard key bindings for each control.",
  },
  {
    term: "Screen readers",
    detail: "Correct roles, names, and states.",
  },
  {
    term: "Visible focus",
    detail: "Focus rings show for the keyboard only.",
  },
  {
    term: "High contrast",
    detail: "Works in forced colors mode.",
  },
  {
    term: "Pointer and touch",
    detail: "Mouse, touch, and pen input.",
  },
  {
    term: "Languages",
    detail: "Locale-aware dates and numbers. RTL layouts.",
  },
];

const motionFacts = [
  {
    term: "Shared tokens",
    detail: "Four durations, three curves, three springs.",
  },
  {
    term: "Reduced motion",
    detail: "Respects the reduced motion setting.",
  },
];

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
          className="mx-auto max-w-7xl px-5 pt-16 pb-14 text-center sm:px-8 sm:pt-24 sm:pb-20"
        >
          <Link
            href="/colors"
            className="group/new inline-flex h-9 max-w-full items-center gap-2.5 rounded-full bg-card p-1 text-sm text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 outline-offset-4 outline-transparent transition-[color,box-shadow,scale,outline-color,outline-offset] duration-200 ease-out-quint hover:text-foreground hover:shadow-[var(--shadow-float)] focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-safe:active:scale-[0.98] motion-reduce:outline-offset-2 forced-colors:border"
          >
            <span className="inline-flex h-7 shrink-0 items-center rounded-full bg-primary px-2.5 text-xs font-medium text-primary-foreground">
              New
            </span>
            <span className="min-w-0 truncate">Color scales and themes</span>
            <span
              aria-hidden="true"
              className="relative grid size-7 shrink-0 place-items-center overflow-clip rounded-full bg-muted text-foreground transition-[background-color,color] duration-200 ease-out-quint group-hover/new:bg-primary group-hover/new:text-primary-foreground group-focus-visible/new:bg-primary group-focus-visible/new:text-primary-foreground rtl:-scale-x-100"
            >
              <ArrowRightIcon
                size={13}
                className="transition-[translate] duration-300 ease-out-quint motion-safe:group-hover/new:translate-x-[180%] motion-safe:group-focus-visible/new:translate-x-[180%]"
              />
              <ArrowRightIcon
                size={13}
                className="absolute -translate-x-[180%] transition-[translate] duration-300 ease-out-quint group-hover/new:translate-x-0 group-focus-visible/new:translate-x-0 motion-reduce:hidden"
              />
            </span>
          </Link>
          <h1
            id="hero-title"
            className="mx-auto mt-8 max-w-4xl text-[clamp(2.375rem,1.25rem+5vw,5rem)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance sm:tracking-[-0.06em]"
          >
            React Aria, set in motion
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
            Tailwind CSS v4 components, animated with Motion springs and shared
            easing tokens. Install the source with the shadcn CLI.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink as={Link} href="/components/installation" size="lg">
              Get started
              <ArrowRightIcon
                size={16}
                aria-hidden="true"
                className="rtl:-scale-x-100"
              />
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
          id="examples"
          aria-label="Examples"
          className="mx-auto max-w-7xl scroll-mt-20 px-5 pb-20 sm:px-8 sm:pb-28"
        >
          <HomeShowcase />
        </section>

        <div className="border-t border-border/70">
          <HomeSection id="accessibility">
            <div className="grid content-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:grid-rows-[auto_1fr] lg:gap-x-16">
              <SectionHeading id="accessibility" title="Accessibility">
                React Aria handles focus, keyboard, and screen readers.
              </SectionHeading>
              <HomeReveal className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <KeyboardLab />
              </HomeReveal>
              <FactList facts={accessibilityFacts} />
            </div>
          </HomeSection>
        </div>

        <div className="border-t border-border/70 bg-card/40">
          <HomeSection id="motion">
            <SectionHeading
              id="motion"
              title="Motion"
              action={
                <ButtonLink
                  as={Link}
                  href="/components/motion"
                  variant="outline"
                >
                  Motion guide
                </ButtonLink>
              }
            >
              Animations show state changes. All components share one set of
              tokens.
            </SectionHeading>
            <HomeReveal className="mt-12 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)]">
              <Card className="grid min-w-0 content-start gap-6 p-5 sm:p-6">
                <h3 className="text-sm font-semibold">Durations and springs</h3>
                <MotionScaleDemo />
              </Card>
              <div className="grid min-w-0 content-start gap-4">
                <MotionStrip className="grid-cols-2 lg:grid-cols-2" />
                <FactList facts={motionFacts} className="mt-2" />
              </div>
            </HomeReveal>
          </HomeSection>
        </div>

        <div className="border-t border-border/70">
          <HomeSection id="theming">
            <SectionHeading
              id="theming"
              title="Theming"
              action={
                <ButtonLink as={Link} href="/themes" variant="outline">
                  Themes
                </ButtonLink>
              }
            >
              Components use your shadcn CSS variables.
            </SectionHeading>
            <HomeReveal className="mt-12 min-w-0">
              <ThemeSection />
            </HomeReveal>
          </HomeSection>
        </div>

        <div className="border-t border-border/70 bg-card/40">
          <HomeSection id="install">
            <div className="grid content-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16">
              <SectionHeading id="install" title="Installation">
                The shadcn CLI copies each component into your project.
              </SectionHeading>
              <HomeReveal className="grid min-w-0 content-start gap-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <ol className="grid gap-8">
                  <li className="grid min-w-0 gap-3">
                    <h3 className="flex items-center gap-3 text-sm font-semibold">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary font-mono text-xs text-primary-foreground">
                        1
                      </span>
                      Set up
                    </h3>
                    <p className="ps-9 text-sm leading-6 text-muted-foreground">
                      React 19, TypeScript, Tailwind CSS v4, and a shadcn theme.{" "}
                      <Link
                        href="/components/installation#setup"
                        className="font-medium text-foreground underline decoration-border underline-offset-4 transition-[text-decoration-color] duration-150 ease-out-quint hover:decoration-foreground"
                      >
                        Setup steps
                      </Link>
                      .
                    </p>
                  </li>
                  <li className="grid min-w-0 gap-3">
                    <h3 className="flex items-center gap-3 text-sm font-semibold">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary font-mono text-xs text-primary-foreground">
                        2
                      </span>
                      Add a component
                    </h3>
                    <div className="min-w-0">
                      <PackageManagerCommand action="run" args={installArgs} />
                    </div>
                  </li>
                  <li className="grid min-w-0 gap-3">
                    <h3 className="flex items-center gap-3 text-sm font-semibold">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary font-mono text-xs text-primary-foreground">
                        3
                      </span>
                      Use it
                    </h3>
                    <div className="min-w-0">
                      <CodeBlock code={usage} filename="save-button.tsx" />
                    </div>
                  </li>
                </ol>
              </HomeReveal>
              <FactList facts={cliFacts} />
            </div>
          </HomeSection>
        </div>

        <div className="border-t border-border/70">
          <HomeSection id="catalog">
            <SectionHeading
              id="catalog"
              title={`${componentCount} components`}
              action={
                <ButtonLink as={Link} href="/components" variant="outline">
                  Browse components
                </ButtonLink>
              }
            >
              Each page has examples, source, and an API reference.
            </SectionHeading>
            <HomeReveal className="mt-12 min-w-0">
              <CatalogOverview />
            </HomeReveal>
          </HomeSection>
        </div>

        <div className="border-t border-border/70 bg-card/40">
          <section
            aria-labelledby="start-title"
            className="mx-auto grid max-w-7xl justify-items-center gap-6 px-5 pt-20 pb-6 text-center sm:px-8 sm:pt-28 sm:pb-10"
          >
            <h2
              id="start-title"
              className="max-w-2xl text-[clamp(1.875rem,1.4rem+2vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.04em] text-balance sm:tracking-[-0.05em]"
            >
              Free and open source
            </h2>
            <p className="max-w-lg text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              MIT licensed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ButtonLink as={Link} href="/components/installation" size="lg">
                Get started
                <ArrowRightIcon
                  size={16}
                  aria-hidden="true"
                  className="rtl:-scale-x-100"
                />
              </ButtonLink>
              <ButtonLink
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
              >
                <GitHubMark className="size-4" />
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter className="bg-card/40" />
    </div>
  );
}
