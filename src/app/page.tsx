import Link from "next/link";
import { ArrowRight } from "reicon-react";
import { AreaVisits } from "@/components/charts/area-charts";
import { AccordionDemo } from "@/components/docs/accordion-demo";
import { CheckboxBasicDemo } from "@/components/docs/checkbox-basic-demo";
import { DialogDemo } from "@/components/docs/dialog-demo";
import { DocsArrowLink } from "@/components/docs/docs-arrow-link";
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
import {
  Card,
  CardContent,
  CardDescription,
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
        <CardHeader className="flex-row items-center justify-between gap-3 px-3 pt-2 sm:px-4 sm:pt-3">
          <CardTitle as="h2" className="min-w-0 text-base tracking-[-0.025em]">
            {title}
          </CardTitle>
          <DocsArrowLink href={href}>
            View docs<span className="sr-only"> for {title}</span>
          </DocsArrowLink>
        </CardHeader>
        <CardContent className="flex min-w-0 flex-1 items-stretch px-2 pb-2 pt-1 sm:px-3 sm:pb-3">
          <div
            className={cn(
              "flex w-full min-w-0 flex-1 items-center justify-center rounded-xl bg-muted/50 p-3",
              featured ? "min-h-44" : "min-h-28",
            )}
          >
            {children}
          </div>
        </CardContent>
      </Card>
    </HomeReveal>
  );
}

function HomeScene({
  title,
  description,
  docHref,
  docLabel,
  workspaceHref,
  workspaceLabel,
  children,
}: {
  title: string;
  description: string;
  docHref: string;
  docLabel: string;
  workspaceHref: string;
  workspaceLabel: string;
  children: React.ReactNode;
}) {
  return (
    <HomeReveal className="min-w-0">
      <Card className="flex h-full min-w-0 flex-col rounded-2xl p-1">
        <CardHeader className="gap-2 px-3 pt-3 sm:px-4 sm:pt-4">
          <CardTitle as="h2" className="text-lg tracking-[-0.03em]">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex min-w-0 flex-1 flex-col px-2 pb-2 pt-3 sm:px-3">
          <div className="flex w-full flex-1 items-center justify-center rounded-xl bg-muted/50 p-4 sm:p-5">
            {children}
          </div>
        </CardContent>
        <CardFooter className="flex-wrap gap-2 px-3 pb-3 sm:px-4">
          <ButtonLink as={Link} href={docHref} variant="outline" size="sm">
            {docLabel}
            <ArrowRight size={15} aria-hidden="true" />
          </ButtonLink>
          <ButtonLink as={Link} href={workspaceHref} variant="ghost" size="sm">
            {workspaceLabel}
            <ArrowRight size={15} aria-hidden="true" />
          </ButtonLink>
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
        <section className="mx-auto max-w-7xl px-5 pb-14 pt-16 text-center sm:px-8 sm:pb-16 sm:pt-24">
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
          className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20"
        >
          <div className="grid gap-3 lg:grid-cols-2">
            <HomeScene
              title="Select a workspace"
              description="The field starts invalid. Pick a workspace and the error clears while the choice is confirmed."
              docHref="/components/select#example-invalid-selection"
              docLabel="Open the Select example"
              workspaceHref="/examples/business"
              workspaceLabel="Open Billing operations"
            >
              <HomeWorkspaceScene />
            </HomeScene>
            <HomeScene
              title="Change a project status"
              description="Publish, save a revision, or archive. The status badge and saved revision update with each action."
              docHref="/components/button#example-project-actions"
              docLabel="Open the Button example"
              workspaceHref="/examples/repository"
              workspaceLabel="Open Repository desk"
            >
              <HomeProjectScene />
            </HomeScene>
          </div>
        </section>

        <section
          id="components"
          aria-label="Component previews"
          className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-24 pt-12 sm:px-8 sm:pb-32"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Showcase title="Button" href="/components/button">
              <HomeButtonDemo />
            </Showcase>
            <Showcase title="Select" href="/components/select">
              <SelectDemo />
            </Showcase>
            <Showcase title="Badge" href="/components/badge">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge>Draft</Badge>
                <Badge variant="accent" dot>
                  In progress
                </Badge>
                <Badge variant="success" dot>
                  Published
                </Badge>
              </div>
            </Showcase>
            <Showcase title="Checkbox" href="/components/checkbox">
              <CheckboxBasicDemo />
            </Showcase>
            <Showcase
              title="Accordion"
              href="/components/accordion"
              className="sm:col-span-2"
            >
              <AccordionDemo />
            </Showcase>
            <Showcase
              title="Tabs"
              href="/components/tabs"
              className="sm:col-span-2"
              featured
            >
              <TabsDemo />
            </Showcase>
            <Showcase title="Tooltip" href="/components/tooltip">
              <TooltipDemo />
            </Showcase>
            <Showcase title="Menu" href="/components/menu">
              <MenuDemo />
            </Showcase>
            <Showcase
              title="Charts"
              href="/charts"
              className="sm:col-span-2 xl:row-span-2"
              featured
            >
              <div className="w-full max-w-2xl rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-6">
                <AreaVisits />
              </div>
            </Showcase>
            <Showcase title="Slider" href="/components/slider">
              <SliderDemo />
            </Showcase>
            <Showcase title="Progress bar" href="/components/progress-bar">
              <ProgressBarBasicDemo />
            </Showcase>
            <Showcase title="Switch" href="/components/switch">
              <SwitchBasicDemo />
            </Showcase>
            <Showcase title="Dialog" href="/components/dialog">
              <DialogDemo />
            </Showcase>
            <Showcase title="Toast" href="/components/toast">
              <ToastDemo />
            </Showcase>
            <Showcase title="Popover" href="/components/popover">
              <PopoverDemo />
            </Showcase>
          </div>
          <div className="mt-8 flex justify-end">
            <Link
              href="/components"
              className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-primary hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              View all components <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
