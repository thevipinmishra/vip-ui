import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
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
import { catalogComponents, catalogGroups } from "@/lib/catalog";
import { registryUrl } from "@/lib/registry-docs";

export const metadata: Metadata = {
  title: "vip/ui | Accessible React components with motion",
  description:
    "Accessible React components with motion in every state. Built on React Aria, Tailwind CSS v4, and Motion. Add them to your project as source files with the shadcn CLI.",
};

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
        The CLI writes each file to{" "}
        <code className="font-mono text-foreground">components/vip-ui</code>.
        Your shadcn components do not change.
      </>
    ),
  },
  {
    term: "Dependencies",
    detail:
      "The CLI installs the packages that the component uses. It also adds the Tailwind plugin and the theme variables.",
  },
  {
    term: "Any React app",
    detail:
      "Components do not import from Next.js. You can use them in a Vite app.",
  },
  {
    term: "Manual install",
    detail:
      "Each component page lists the files and packages. You can copy them without the CLI.",
  },
];

const accessibilityFacts = [
  {
    term: "Keyboard",
    detail:
      "Each control uses the keyboard pattern that people expect. Focus moves in a logical order.",
  },
  {
    term: "Screen readers",
    detail:
      "Components set the correct roles, names, and states. Live regions announce status changes.",
  },
  {
    term: "Visible focus",
    detail:
      "A ring shows keyboard focus. A mouse click does not show the ring.",
  },
  {
    term: "High contrast",
    detail:
      "Focus and selection stay visible when Windows high contrast mode is on.",
  },
  {
    term: "Pointer and touch",
    detail: "Press events work the same with a mouse, a finger, or a pen.",
  },
  {
    term: "Languages",
    detail:
      "Dates and numbers use the format of each locale. Layouts work from right to left.",
  },
];

const motionFacts = [
  {
    term: "Shared tokens",
    detail:
      "Four durations, three curves, and three springs. The motion guide lists each component with a tuned timing.",
  },
  {
    term: "Reduced motion",
    detail:
      "Components obey the reduced motion setting of the operating system.",
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
            className="mx-auto mt-8 max-w-5xl text-[clamp(2.75rem,6.6vw,5.75rem)] leading-[1.02] font-semibold tracking-[-0.07em] text-balance"
          >
            Accessible React components,{" "}
            <span className="text-muted-foreground">
              with motion in every state.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
            Add the components to your project as source files. React Aria
            controls keyboard, focus, and screen reader behavior. Motion shows
            each change of state.
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
              <SectionHeading
                id="accessibility"
                title="Accessible behavior from React Aria"
              >
                React Aria controls the behavior of each interactive component.
                You get keyboard, focus, and screen reader support without extra
                code.
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
              title="One motion system for all components"
              action={
                <ButtonLink
                  as={Link}
                  href="/components/motion"
                  variant="outline"
                >
                  Read the motion guide
                </ButtonLink>
              }
            >
              Motion shows what changed and where it went. All components use
              the same durations, curves, and springs.
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
              title="Your theme controls every component"
              action={
                <ButtonLink as={Link} href="/themes" variant="outline">
                  Open the themes
                </ButtonLink>
              }
            >
              Components read the CSS variables of your shadcn theme. Change a
              variable, and every component changes with it. Select a theme to
              see the result.
            </SectionHeading>
            <HomeReveal className="mt-12 min-w-0">
              <ThemeSection />
            </HomeReveal>
          </HomeSection>
        </div>

        <div className="border-t border-border/70 bg-card/40">
          <HomeSection id="install">
            <div className="grid content-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16">
              <SectionHeading
                id="install"
                title="Install the source, not a package"
              >
                The shadcn CLI copies each component into your project. You own
                the code, and you can change every line.
              </SectionHeading>
              <HomeReveal className="grid min-w-0 content-start gap-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <ol className="grid gap-8">
                  <li className="grid min-w-0 gap-3">
                    <h3 className="flex items-center gap-3 text-sm font-semibold">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary font-mono text-xs text-primary-foreground">
                        1
                      </span>
                      Set up your project
                    </h3>
                    <p className="ps-9 text-sm leading-6 text-muted-foreground">
                      Use React 19, TypeScript, Tailwind CSS v4, and a shadcn
                      theme with CSS variables.{" "}
                      <Link
                        href="/components/installation#setup"
                        className="font-medium text-foreground underline decoration-border underline-offset-4 transition-[text-decoration-color] duration-150 ease-out-quint hover:decoration-foreground"
                      >
                        Read the setup steps
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
                      Import it
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
              title={`${componentCount} components in ${catalogGroups.length} groups`}
              action={
                <ButtonLink as={Link} href="/components" variant="outline">
                  Browse components
                </ButtonLink>
              }
            >
              Each component page has live examples, the source code, install
              steps, and an API reference.
            </SectionHeading>
            <HomeReveal className="mt-12 min-w-0">
              <CatalogOverview />
            </HomeReveal>
          </HomeSection>
        </div>

        <div className="border-t border-border/70 bg-card/40">
          <section
            aria-labelledby="start-title"
            className="mx-auto grid max-w-7xl justify-items-center gap-6 px-5 py-20 text-center sm:px-8 sm:py-28"
          >
            <h2
              id="start-title"
              className="max-w-2xl text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.05em] text-balance"
            >
              Start with one component.
            </h2>
            <p className="max-w-lg text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              Add more components when you need them. vip/ui is open source
              under the MIT license.
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

      <SiteFooter />
    </div>
  );
}
