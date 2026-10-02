import Link from "next/link";
import { ArrowRight } from "reicon-react";
import { AreaVisits } from "@/components/charts/area-charts";
import { AccordionDemo } from "@/components/docs/accordion-demo";
import { BadgeDemo } from "@/components/docs/badge-demo";
import { ButtonDemo } from "@/components/docs/button-demo";
import { CheckboxBasicDemo } from "@/components/docs/checkbox-basic-demo";
import { DialogDemo } from "@/components/docs/dialog-demo";
import { HomeReveal } from "@/components/docs/home-page-motion";
import { MenuDemo } from "@/components/docs/menu-demo";
import { PopoverDemo } from "@/components/docs/popover-demo";
import { ProgressBarDemo } from "@/components/docs/progress-bar-demo";
import { SelectDemo } from "@/components/docs/select-demo";
import { SiteHeader } from "@/components/docs/site-header";
import { SliderDemo } from "@/components/docs/slider-demo";
import { SwitchDemo } from "@/components/docs/switch-demo";
import { TabsDemo } from "@/components/docs/tabs-demo";
import { ToastDemo } from "@/components/docs/toast-demo";
import { TooltipDemo } from "@/components/docs/tooltip-demo";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

function Showcase({
  title,
  href,
  children,
  className = "",
  featured = false,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <HomeReveal className={cn("min-w-0", className)}>
      <Card className="relative z-0 flex h-full min-w-0 flex-col rounded-2xl p-1 hover:z-10 focus-within:z-10">
        <CardHeader className="px-4 pt-4 sm:px-5 sm:pt-5">
          <CardTitle as="h3" className="text-base tracking-[-0.025em]">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex min-w-0 flex-1 items-stretch px-3 py-3 sm:px-4">
          <div
            className={cn(
              "flex w-full min-w-0 flex-1 items-center justify-center rounded-xl bg-muted/50 p-4",
              featured ? "min-h-52" : "min-h-32",
            )}
          >
            {children}
          </div>
        </CardContent>
        <CardFooter className="px-4 pb-4 sm:px-5 sm:pb-5">
          <Link
            href={href}
            className="group inline-flex min-h-10 items-center gap-2 rounded-md text-sm font-medium text-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            View {title.toLowerCase()}
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </CardFooter>
      </Card>
    </HomeReveal>
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
        <section className="mx-auto max-w-7xl px-5 pb-10 pt-12 text-center sm:px-8 sm:pb-12 sm:pt-14">
          <h1 className="mx-auto max-w-4xl text-[clamp(3.25rem,7vw,6rem)] font-semibold leading-[1.02] tracking-[-0.075em] [text-wrap:balance]">
            Accessible components <span className="text-primary">you own.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Copy React components into your project. Try the controls below,
            then change the source and the theme to fit your app.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink as={Link} href="/components/installation" size="lg">
              Get started <ArrowRight size={16} aria-hidden="true" />
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
          <div className="mt-6">
            <Link
              href="/themes"
              className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-primary hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Explore official themes <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section
          id="components"
          aria-labelledby="components-title"
          className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-24 sm:px-8 sm:pb-32"
        >
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border/70 pt-8">
            <h2
              id="components-title"
              className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.055em]"
            >
              Explore the components
            </h2>
            <Link
              href="/components"
              className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-primary hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              View all components <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
            <Showcase
              title="Button"
              href="/components/button"
              className="sm:col-span-2 lg:col-span-8"
              featured
            >
              <ButtonDemo />
            </Showcase>
            <Showcase
              title="Select"
              href="/components/select"
              className="sm:col-span-2 lg:col-span-4"
            >
              <SelectDemo />
            </Showcase>
            <Showcase
              title="Tabs"
              href="/components/tabs"
              className="sm:col-span-2 lg:col-span-8"
              featured
            >
              <TabsDemo />
            </Showcase>
            <Showcase
              title="Accordion"
              href="/components/accordion"
              className="sm:col-span-2 lg:col-span-4"
            >
              <AccordionDemo />
            </Showcase>
            <Showcase
              title="Badge"
              href="/components/badge"
              className="lg:col-span-4"
            >
              <BadgeDemo />
            </Showcase>
            <Showcase
              title="Checkbox"
              href="/components/checkbox"
              className="lg:col-span-4"
            >
              <CheckboxBasicDemo />
            </Showcase>
            <Showcase
              title="Tooltip"
              href="/components/tooltip"
              className="sm:col-span-2 lg:col-span-4"
            >
              <TooltipDemo />
            </Showcase>
            <Showcase
              title="Menu"
              href="/components/menu"
              className="lg:col-span-4"
            >
              <MenuDemo />
            </Showcase>
            <Showcase
              title="Slider"
              href="/components/slider"
              className="lg:col-span-4"
            >
              <SliderDemo />
            </Showcase>
            <Showcase
              title="Progress bar"
              href="/components/progress-bar"
              className="sm:col-span-2 lg:col-span-4"
            >
              <ProgressBarDemo />
            </Showcase>
            <Showcase
              title="Charts"
              href="/charts"
              className="sm:col-span-2 lg:col-span-8"
              featured
            >
              <div className="w-full max-w-2xl rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-6">
                <AreaVisits />
              </div>
            </Showcase>
            <Showcase
              title="Switch"
              href="/components/switch"
              className="lg:col-span-4"
            >
              <SwitchDemo />
            </Showcase>
            <Showcase
              title="Dialog"
              href="/components/dialog"
              className="lg:col-span-4"
            >
              <DialogDemo />
            </Showcase>
            <Showcase
              title="Toast"
              href="/components/toast"
              className="lg:col-span-4"
            >
              <ToastDemo />
            </Showcase>
            <Showcase
              title="Popover"
              href="/components/popover"
              className="lg:col-span-4"
            >
              <PopoverDemo />
            </Showcase>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            vip<span className="text-primary">/</span>ui
          </span>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            <Link
              href="/components/installation"
              className="hover:text-foreground"
            >
              Installation
            </Link>
            <Link href="/themes" className="hover:text-foreground">
              Themes
            </Link>
            <Link href="/charts" className="hover:text-foreground">
              Charts
            </Link>
            <Link href="/examples" className="hover:text-foreground">
              Examples
            </Link>
            <Link href="/license" className="hover:text-foreground">
              MIT license
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
