import Link from "next/link";
import { ArrowRight } from "reicon-react";
import { AreaVisits } from "@/components/charts/area-charts";
import { AccordionDemo } from "@/components/docs/accordion-demo";
import { CheckboxBasicDemo } from "@/components/docs/checkbox-basic-demo";
import { DialogDemo } from "@/components/docs/dialog-demo";
import { HomeButtonDemo } from "@/components/docs/home-button-demo";
import { HomeReveal } from "@/components/docs/home-page-motion";
import { HomeProjectScene } from "@/components/docs/home-project-scene";
import { HomeWorkspaceScene } from "@/components/docs/home-workspace-scene";
import { MenuDemo } from "@/components/docs/menu-demo";
import { PopoverDemo } from "@/components/docs/popover-demo";
import { ProgressBarBasicDemo } from "@/components/docs/progress-bar-basic-demo";
import { SelectDemo } from "@/components/docs/select-demo";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { SliderDemo } from "@/components/docs/slider-demo";
import { SwitchBasicDemo } from "@/components/docs/switch-basic-demo";
import { TabsDemo } from "@/components/docs/tabs-demo";
import { ToastDemo } from "@/components/docs/toast-demo";
import { TooltipDemo } from "@/components/docs/tooltip-demo";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

function Preview({
  title,
  href,
  children,
  className,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HomeReveal className={cn("min-w-0", className)}>
      <div className="flex min-w-0 flex-col items-center gap-5">
        <div className="flex w-full min-w-0 items-center justify-center [&>*]:min-w-0 [&>*]:max-w-full">
          {children}
        </div>
        <Link
          href={href}
          className="rounded-sm text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {title}
        </Link>
      </div>
    </HomeReveal>
  );
}

function Task({
  title,
  detail,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  children,
}: {
  title: string;
  detail: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  children: React.ReactNode;
}) {
  return (
    <HomeReveal className="min-w-0">
      <div className="flex h-full min-w-0 flex-col">
        <h2 className="text-lg font-semibold tracking-[-0.03em]">{title}</h2>
        <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
          {detail}
        </p>
        <div className="mt-6 flex min-w-0 flex-1 items-center [&>*]:min-w-0 [&>*]:max-w-full">
          {children}
        </div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          <Link
            href={primaryHref}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {primaryLabel}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex min-h-10 items-center rounded-sm text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
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
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 text-center sm:px-8 sm:pb-20 sm:pt-24">
          <h1 className="mx-auto max-w-4xl text-[clamp(3.25rem,7vw,6rem)] font-semibold leading-[1.02] tracking-[-0.075em] [text-wrap:balance]">
            Accessible components <span className="text-primary">you own.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            React Aria components in working examples: change a state, see the
            result, copy the source, and install it in your app.
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
        </section>

        <section
          aria-label="Task examples"
          className="mx-auto max-w-7xl px-5 pb-8 sm:px-8"
        >
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Task
              title="Select a workspace"
              detail="The field starts invalid. Choose a workspace and the error clears."
              primaryHref="/components/select#example-invalid-selection"
              primaryLabel="Select docs"
              secondaryHref="/examples/business"
              secondaryLabel="Billing operations"
            >
              <HomeWorkspaceScene />
            </Task>
            <Task
              title="Change a project status"
              detail="Publish, save a revision, or archive. The status updates with each action."
              primaryHref="/components/button#example-project-actions"
              primaryLabel="Button docs"
              secondaryHref="/examples/repository"
              secondaryLabel="Repository desk"
            >
              <HomeProjectScene />
            </Task>
          </div>
        </section>

        <section
          id="components"
          aria-label="Component previews"
          className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-24 pt-8 sm:px-8 sm:pb-32"
        >
          <div className="mb-12 flex items-end justify-between gap-4 border-t border-border/70 pt-12">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">
              Components
            </h2>
            <Link
              href="/components"
              className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              View all <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            <Preview title="Button" href="/components/button">
              <HomeButtonDemo />
            </Preview>
            <Preview title="Select" href="/components/select">
              <SelectDemo />
            </Preview>
            <Preview title="Badge" href="/components/badge">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge>Draft</Badge>
                <Badge variant="accent" dot>
                  In progress
                </Badge>
                <Badge variant="success" dot>
                  Published
                </Badge>
              </div>
            </Preview>
            <Preview title="Checkbox" href="/components/checkbox">
              <CheckboxBasicDemo />
            </Preview>
            <Preview
              title="Accordion"
              href="/components/accordion"
              className="sm:col-span-2"
            >
              <AccordionDemo />
            </Preview>
            <Preview
              title="Tabs"
              href="/components/tabs"
              className="sm:col-span-2"
            >
              <TabsDemo />
            </Preview>
            <Preview title="Tooltip" href="/components/tooltip">
              <TooltipDemo />
            </Preview>
            <Preview title="Menu" href="/components/menu">
              <MenuDemo />
            </Preview>
            <Preview title="Slider" href="/components/slider">
              <SliderDemo />
            </Preview>
            <Preview title="Progress bar" href="/components/progress-bar">
              <ProgressBarBasicDemo />
            </Preview>
            <Preview title="Switch" href="/components/switch">
              <SwitchBasicDemo />
            </Preview>
            <Preview title="Dialog" href="/components/dialog">
              <DialogDemo />
            </Preview>
            <Preview title="Toast" href="/components/toast">
              <ToastDemo />
            </Preview>
            <Preview title="Popover" href="/components/popover">
              <PopoverDemo />
            </Preview>
            <Preview
              title="Charts"
              href="/charts"
              className="sm:col-span-2 lg:col-span-3"
            >
              <div className="w-full overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
                <AreaVisits />
              </div>
            </Preview>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
