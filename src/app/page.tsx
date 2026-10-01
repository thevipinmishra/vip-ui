import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ArrowRight } from "reicon-react";
import { AreaVisits } from "@/components/charts/area-charts";
import { BarOrders } from "@/components/charts/bar-charts";
import { PieDonut } from "@/components/charts/pie-charts";
import { ButtonDemo } from "@/components/docs/button-demo";
import { DialogDemo } from "@/components/docs/dialog-demo";
import { HomeMotionPreview } from "@/components/docs/home-motion-preview";
import {
  HomeExampleFrame,
  HomeReveal,
  HomeScrollProgress,
} from "@/components/docs/home-page-motion";
import { PalettePicker } from "@/components/docs/palette-picker";
import { PreviewPanel } from "@/components/docs/preview-panel";
import { SelectDemo } from "@/components/docs/select-demo";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import { ToastDemo } from "@/components/docs/toast-demo";
import { ButtonLink } from "@/components/ui/button-link";

const componentLinks = [
  { label: "Buttons", href: "/components/button" },
  { label: "Date picker", href: "/components/date-picker" },
  { label: "Tabs", href: "/components/tabs" },
  { label: "Combo box", href: "/components/combo-box" },
  { label: "Drawers", href: "/components/drawer" },
];

function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-primary"
    >
      {children}
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      />
    </Link>
  );
}

export default async function Home() {
  const buttonExample = await readFile(
    path.join(process.cwd(), "src/components/docs/button-demo.tsx"),
    "utf8",
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <HomeScrollProgress />
      <a
        href="#main"
        className="sr-only fixed start-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>

      <header className="relative z-10 px-4 pt-4 sm:px-8 sm:pt-6">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 rounded-full bg-card px-4 py-3 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:px-7"
        >
          <Link
            href="/"
            className="inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-md text-xl font-semibold tracking-[-0.065em]"
          >
            <span
              className="grid size-8 grid-cols-2 gap-[3px] rounded-[9px] bg-primary p-[7px]"
              aria-hidden="true"
            >
              <span className="rounded-[2px] bg-primary-foreground" />
              <span className="rounded-[2px] bg-primary-foreground/50" />
              <span className="rounded-[2px] bg-primary-foreground/50" />
              <span className="rounded-[2px] bg-primary-foreground" />
            </span>
            vip<span className="-ms-2 text-primary">/</span>ui
          </Link>
          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <Link
              href="/charts"
              className="hidden min-h-10 items-center text-[13px] font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              Charts
            </Link>
            <Link
              href="/components/installation"
              className="inline-flex min-h-10 items-center text-[13px] font-semibold text-foreground hover:text-primary"
            >
              Get started
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="ms-1.5 hidden sm:block"
              />
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main">
        <section
          className="px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:pt-32"
          aria-labelledby="hero-title"
        >
          <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <div className="text-center lg:text-start">
              <h1
                id="hero-title"
                className="home-enter text-[clamp(3.5rem,5.8vw,6.6rem)] font-semibold leading-[0.99] tracking-[-0.077em] [text-wrap:balance]"
              >
                Accessible components{" "}
                <span className="text-primary">you own.</span>
              </h1>
              <p className="home-enter home-enter-2 mx-auto mt-7 max-w-[580px] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:mx-0">
                vip/ui gives you interactive React components, chart examples,
                and complete app examples. Try them here, then install the
                source into your project and adapt it to your design.
              </p>
              <div className="home-enter home-enter-3 mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <ButtonLink as={Link} href="/components" size="lg">
                  Browse components <ArrowRight size={16} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  as={Link}
                  href="/examples"
                  variant="outline"
                  size="lg"
                >
                  View app examples
                </ButtonLink>
              </div>
            </div>
            <div className="home-enter home-enter-2 min-w-0 w-full max-w-[680px] justify-self-center">
              <HomeMotionPreview />
            </div>
          </div>
          <div className="home-enter home-enter-3 mx-auto mt-20 flex max-w-xl flex-col items-center gap-4 text-center">
            <p className="text-sm font-medium">Try a color theme</p>
            <PalettePicker />
            <p className="max-w-md text-xs leading-5 text-muted-foreground">
              Blue is the default. Each palette changes standard shadcn color
              roles in light and dark mode.
            </p>
          </div>
        </section>

        <section
          id="why"
          aria-labelledby="why-title"
          className="scroll-mt-8 border-t border-border/70 bg-card/40 px-5 py-24 sm:px-8 lg:py-36"
        >
          <div className="mx-auto max-w-[1320px]">
            <HomeReveal className="flex flex-wrap items-end justify-between gap-6">
              <h2
                id="why-title"
                className="max-w-[800px] text-[clamp(2.75rem,5vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.07em] [text-wrap:balance]"
              >
                Start with working components. Keep control of the code.
              </h2>
              <p className="max-w-sm text-base leading-7 text-muted-foreground">
                For React teams that need accessible interactions and control
                over their component code and theme.
              </p>
            </HomeReveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] bg-border/70 ring-1 ring-border/70 md:grid-cols-2">
              <HomeReveal className="h-full">
                <article className="h-full bg-card p-7 sm:p-10">
                  <h3 className="text-xl font-semibold tracking-[-0.035em]">
                    Accessible interactions
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                    React Aria provides keyboard and focus behavior for controls
                    such as selects, dialogs, and menus.
                  </p>
                </article>
              </HomeReveal>
              <HomeReveal className="h-full" delay={0.07}>
                <article className="h-full bg-card p-7 sm:p-10">
                  <h3 className="text-xl font-semibold tracking-[-0.035em]">
                    Source in your project
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                    Install with the shadcn CLI or copy the files manually. The
                    components live in your app, so you can change them.
                  </p>
                </article>
              </HomeReveal>
              <HomeReveal className="h-full">
                <article className="h-full bg-card p-7 sm:p-10">
                  <h3 className="text-xl font-semibold tracking-[-0.035em]">
                    Works with your theme
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                    Try five palettes above. Installed components use the shadcn
                    colors in your app; add only the extra roles once.
                  </p>
                </article>
              </HomeReveal>
              <HomeReveal className="h-full" delay={0.07}>
                <article className="h-full bg-card p-7 sm:p-10">
                  <h3 className="text-xl font-semibold tracking-[-0.035em]">
                    Examples beyond single controls
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                    Explore charts and complete app routes to see how the same
                    components work together before you install them.
                  </p>
                </article>
              </HomeReveal>
            </div>
          </div>
        </section>

        <section
          id="components"
          aria-labelledby="components-title"
          className="scroll-mt-8 px-5 py-24 sm:px-8 lg:py-36"
        >
          <div className="mx-auto max-w-[1320px]">
            <HomeReveal className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <h2
                  id="components-title"
                  className="max-w-[700px] text-[clamp(2.75rem,5vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.07em] [text-wrap:balance]"
                >
                  Try the components
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                  Use the controls below. Each component page includes a live
                  demo, usage guidance, installation steps, and source code.
                </p>
              </div>
              <TextLink href="/components">Browse all components</TextLink>
            </HomeReveal>
            <div className="mt-12 grid gap-5 lg:grid-cols-12">
              <HomeReveal className="lg:col-span-7">
                <article className="flex h-full min-w-0 flex-col rounded-[26px] bg-card p-1.5 shadow-[var(--shadow-card)] ring-1 ring-border/70">
                  <div className="flex min-h-[350px] flex-1 flex-col rounded-[21px] bg-accent/60 p-6 sm:p-8">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.05em]">
                        Select
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Choose one option from a list.
                      </p>
                    </div>
                    <div className="flex flex-1 items-center justify-center py-9">
                      <SelectDemo />
                    </div>
                    <TextLink href="/components/select">
                      Explore Select
                    </TextLink>
                  </div>
                </article>
              </HomeReveal>
              <HomeReveal className="lg:col-span-5" delay={0.07}>
                <article className="flex h-full min-w-0 flex-col rounded-[26px] bg-card p-1.5 shadow-[var(--shadow-card)] ring-1 ring-border/70">
                  <div className="flex min-h-[350px] flex-1 flex-col rounded-[21px] bg-muted/70 p-6 sm:p-8">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.05em]">
                        Dialog
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Open a focused task above the page.
                      </p>
                    </div>
                    <div className="flex flex-1 items-center justify-center py-9">
                      <DialogDemo />
                    </div>
                    <TextLink href="/components/dialog">
                      Explore Dialog
                    </TextLink>
                  </div>
                </article>
              </HomeReveal>
              <HomeReveal className="lg:col-span-5">
                <article className="flex h-full min-w-0 flex-col rounded-[26px] bg-card p-1.5 shadow-[var(--shadow-card)] ring-1 ring-border/70">
                  <div className="flex min-h-[290px] flex-1 flex-col rounded-[21px] bg-muted/70 p-6 sm:p-8">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.05em]">
                        Toast
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Give feedback after an action.
                      </p>
                    </div>
                    <div className="flex flex-1 items-center justify-center py-8">
                      <ToastDemo />
                    </div>
                    <TextLink href="/components/toast">Explore Toast</TextLink>
                  </div>
                </article>
              </HomeReveal>
              <HomeReveal className="lg:col-span-7" delay={0.07}>
                <div className="flex h-full min-w-0 flex-col justify-between rounded-[26px] bg-foreground p-8 text-background sm:p-10">
                  <div>
                    <h3 className="text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1.14] tracking-[-0.05em]">
                      More components for forms, navigation, and feedback
                    </h3>
                    <p className="mt-4 max-w-[490px] text-sm leading-6 text-background/70">
                      Choose only the controls your app needs. Open any
                      component page to see when to use it and how to install
                      it.
                    </p>
                  </div>
                  <div className="mt-10 flex flex-wrap gap-2">
                    {componentLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="inline-flex min-h-10 items-center rounded-full bg-background/10 px-4 text-xs font-medium transition-colors duration-200 hover:bg-background/20 focus-visible:outline-background"
                      >
                        {item.label}{" "}
                        <ArrowRight
                          size={13}
                          className="ms-2"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </HomeReveal>
            </div>
          </div>
        </section>

        <section
          id="charts"
          aria-labelledby="charts-title"
          className="scroll-mt-8 bg-card px-5 py-24 ring-1 ring-border/50 sm:px-8 lg:py-36"
        >
          <div className="mx-auto max-w-[1320px]">
            <HomeReveal className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <h2
                  id="charts-title"
                  className="max-w-[760px] text-[clamp(2.75rem,5vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.07em] [text-wrap:balance]"
                >
                  Chart examples with source code
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                  Explore area, bar, and donut charts built with TanStack
                  Charts. Each preview has a label and a table of exact values
                  for assistive technology. Open the gallery to view the source.
                </p>
              </div>
              <TextLink href="/charts">Browse chart gallery</TextLink>
            </HomeReveal>
            <div className="mt-12 grid gap-5 lg:grid-cols-12">
              <HomeReveal className="lg:col-span-7">
                <article className="h-full min-w-0 rounded-[24px] bg-background p-6 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-8">
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-[-0.04em]">
                      Workspace visits by month
                    </h3>
                  </div>
                  <AreaVisits />
                  <div className="mt-4">
                    <TextLink href="/charts?chart=area">
                      Explore area charts
                    </TextLink>
                  </div>
                </article>
              </HomeReveal>
              <HomeReveal className="lg:col-span-5" delay={0.07}>
                <article className="h-full min-w-0 rounded-[24px] bg-background p-6 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-8">
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-[-0.04em]">
                      Monthly orders
                    </h3>
                  </div>
                  <BarOrders />
                  <div className="mt-4">
                    <TextLink href="/charts?chart=bar">
                      Explore bar charts
                    </TextLink>
                  </div>
                </article>
              </HomeReveal>
              <HomeReveal className="lg:col-span-5">
                <article className="h-full min-w-0 rounded-[24px] bg-background p-6 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-8">
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-[-0.04em]">
                      Subscriptions by plan
                    </h3>
                  </div>
                  <PieDonut />
                  <div className="mt-4">
                    <TextLink href="/charts?chart=pie">
                      Explore pie charts
                    </TextLink>
                  </div>
                </article>
              </HomeReveal>
              <HomeReveal className="lg:col-span-7" delay={0.07}>
                <div className="flex h-full flex-col justify-between rounded-[24px] bg-accent p-8 sm:p-10">
                  <p className="mb-8 max-w-[490px] text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1.14] tracking-[-0.05em]">
                    See how each chart is built and copy its source.
                  </p>
                  <TextLink href="/charts">Open chart gallery</TextLink>
                </div>
              </HomeReveal>
            </div>
          </div>
        </section>

        <section
          id="examples"
          aria-labelledby="examples-title"
          className="scroll-mt-8 px-5 py-24 sm:px-8 lg:py-36"
        >
          <div className="mx-auto max-w-[1320px]">
            <HomeReveal className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <h2
                  id="examples-title"
                  className="max-w-[770px] text-[clamp(2.75rem,5vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.07em] [text-wrap:balance]"
                >
                  See components in real workflows
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                  Follow public GitHub activity in a repository desk, or trace
                  customer billing across accounts and invoices. Install either
                  workspace into your Next.js app.
                </p>
              </div>
              <TextLink href="/examples">All examples</TextLink>
            </HomeReveal>
            <div className="mt-12 grid gap-5 lg:grid-cols-12">
              <HomeReveal className="lg:col-span-7">
                <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
                  <div
                    className="flex min-h-[275px] items-end overflow-hidden bg-accent/70 px-5 pt-10 sm:px-10"
                    aria-hidden="true"
                  >
                    <HomeExampleFrame className="w-full rounded-t-2xl bg-card p-5 shadow-[var(--shadow-float)] ring-1 ring-border/70 sm:p-7">
                      <div className="flex items-center justify-between border-b border-border/70 pb-4 text-xs font-semibold">
                        <span>Repository / Overview</span>
                        <span className="rounded-full bg-success-subtle px-2.5 py-1 text-success-foreground">
                          Live data
                        </span>
                      </div>
                      <div className="mt-5 grid grid-cols-3 gap-3">
                        <div className="rounded-xl bg-background p-3">
                          <span className="block text-[10px] text-muted-foreground">
                            Issues
                          </span>
                          <span className="mt-2 block text-xl font-semibold">
                            Open
                          </span>
                        </div>
                        <div className="rounded-xl bg-background p-3">
                          <span className="block text-[10px] text-muted-foreground">
                            Pull requests
                          </span>
                          <span className="mt-2 block text-xl font-semibold">
                            Review
                          </span>
                        </div>
                        <div className="rounded-xl bg-background p-3">
                          <span className="block text-[10px] text-muted-foreground">
                            Releases
                          </span>
                          <span className="mt-2 block text-xl font-semibold">
                            Latest
                          </span>
                        </div>
                      </div>
                    </HomeExampleFrame>
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <h3 className="text-2xl font-semibold tracking-[-0.05em]">
                      Repository operations
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                      Follow issues, pull requests, commits, and releases using
                      public shadcn-ui/ui data. This dashboard is read-only.
                    </p>
                    <div className="mt-auto pt-5">
                      <TextLink href="/examples/repository">
                        Open repository desk
                      </TextLink>
                    </div>
                  </div>
                </article>
              </HomeReveal>
              <HomeReveal className="lg:col-span-5" delay={0.07}>
                <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
                  <div
                    className="flex min-h-[275px] items-end overflow-hidden bg-muted px-5 pt-10 sm:px-8"
                    aria-hidden="true"
                  >
                    <HomeExampleFrame className="w-full rounded-t-2xl bg-card p-5 shadow-[var(--shadow-float)] ring-1 ring-border/70">
                      <div className="border-b border-border/70 pb-4 text-xs font-semibold">
                        Acme Cloud / Overview
                      </div>
                      <div className="mt-5 text-xs text-muted-foreground">
                        Monthly recurring revenue
                      </div>
                      <div className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">
                        $853.00
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-accent px-3 py-1.5 text-[10px] text-accent-foreground">
                          Subscriptions
                        </span>
                        <span className="rounded-full bg-muted px-3 py-1.5 text-[10px] text-muted-foreground">
                          Invoices
                        </span>
                        <span className="rounded-full bg-muted px-3 py-1.5 text-[10px] text-muted-foreground">
                          Customers
                        </span>
                      </div>
                    </HomeExampleFrame>
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <h3 className="text-2xl font-semibold tracking-[-0.05em]">
                      Billing operations
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                      Filter customers, subscriptions, invoices, and payments in
                      one connected billing workspace with included records.
                    </p>
                    <div className="mt-auto pt-5">
                      <TextLink href="/examples/business">
                        Open billing workspace
                      </TextLink>
                    </div>
                  </div>
                </article>
              </HomeReveal>
            </div>
          </div>
        </section>

        <section
          id="source"
          aria-labelledby="source-title"
          className="scroll-mt-8 bg-card px-5 py-24 ring-1 ring-border/50 sm:px-8 lg:py-36"
        >
          <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16">
            <HomeReveal x={-16}>
              <div>
                <h2
                  id="source-title"
                  className="text-[clamp(2.75rem,5vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.07em] [text-wrap:balance]"
                >
                  Install and customize
                </h2>
                <p className="mt-6 max-w-[450px] text-base leading-7 text-muted-foreground">
                  Use vip/ui in a React app with shadcn CSS variables,
                  TypeScript, and Tailwind CSS v4. Complete the one-time CSS
                  setup, then add the components you need.
                </p>
                <ol className="mt-8 max-w-[450px] space-y-4 text-sm leading-6">
                  <li className="flex gap-4">
                    <span className="font-mono text-primary">01</span>
                    <span>
                      Follow the{" "}
                      <Link
                        href="/components/installation"
                        className="font-medium text-primary underline underline-offset-4"
                      >
                        installation guide
                      </Link>{" "}
                      to add the extra theme roles.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono text-primary">02</span>
                    <span>
                      Open a component page for its install command,
                      dependencies, and full implementation.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono text-primary">03</span>
                    <span>
                      Edit the installed files in your app to fit your product.
                    </span>
                  </li>
                </ol>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink
                    as={Link}
                    href="/components/installation"
                    size="lg"
                  >
                    Read installation guide{" "}
                    <ArrowRight size={16} aria-hidden="true" />
                  </ButtonLink>
                  <ButtonLink
                    as={Link}
                    href="/components/button"
                    variant="outline"
                    size="lg"
                  >
                    View Button docs
                  </ButtonLink>
                </div>
              </div>
            </HomeReveal>
            <HomeReveal x={16} delay={0.07}>
              <div className="min-w-0 rounded-[26px] bg-background p-2 shadow-[var(--shadow-float)] ring-1 ring-border/70 sm:p-3">
                <PreviewPanel
                  code={buttonExample}
                  filename="src/components/docs/button-demo.tsx"
                >
                  <ButtonDemo />
                </PreviewPanel>
                <p className="px-3 pb-2 pt-4 text-xs leading-5 text-muted-foreground">
                  Preview and Code show the Button demo. The Button docs include
                  the installable component source.
                </p>
              </div>
            </HomeReveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 bg-background px-5 py-10 sm:px-8">
        <HomeReveal className="mx-auto flex max-w-[1320px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-[-0.06em]">
              vip<span className="text-primary">/</span>ui
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">
              Copyable React components for shadcn-themed apps.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            <Link
              href="/components"
              className="min-h-9 content-center hover:text-foreground"
            >
              Components
            </Link>
            <Link
              href="/charts"
              className="min-h-9 content-center hover:text-foreground"
            >
              Charts
            </Link>
            <Link
              href="/examples"
              className="min-h-9 content-center hover:text-foreground"
            >
              Examples
            </Link>
            <Link
              href="/components/installation"
              className="min-h-9 content-center hover:text-foreground"
            >
              Installation
            </Link>
            <Link
              href="/license"
              className="min-h-9 content-center hover:text-foreground"
            >
              MIT license
            </Link>
          </nav>
        </HomeReveal>
      </footer>
    </div>
  );
}
