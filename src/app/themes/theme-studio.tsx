"use client";

import { ArrowDownIcon } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from "react-aria-components";
import { flushSync } from "react-dom";
import { CopyButton } from "@/components/docs/copy-button";
import { ModeSwitch } from "@/components/docs/mode-switch";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/docs/page-header";
import { buttonLinkStyles } from "@/components/ui/button-styles";
import { withItemHighlight } from "@/components/ui/item-highlight";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { easeInOut } from "@/lib/motion";
import {
  applySiteMode,
  currentSiteMode,
  type SiteMode,
  useSiteMode,
} from "@/lib/site-mode";
import { updateSiteTheme } from "@/lib/update-site-theme";
import { ThemeTokens } from "./theme-tokens";
import { findTheme, type Theme, themeCss, themes } from "./themes";

type Point = { x: number; y: number };

const panelClass =
  "docs-tab-panel mt-8 min-w-0 rounded-none bg-transparent p-0 shadow-none ring-0";

function reveal(origin: Point | null, update: () => void) {
  const root = document.documentElement;
  const apply = () => updateSiteTheme(() => flushSync(update));
  if (
    !origin ||
    typeof document.startViewTransition !== "function" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    apply();
    return;
  }
  root.dataset.themeReveal = "";
  const transition = document.startViewTransition(apply);
  transition.ready
    .then(() => {
      const radius = Math.hypot(
        Math.max(origin.x, window.innerWidth - origin.x),
        Math.max(origin.y, window.innerHeight - origin.y),
      );
      root.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        {
          duration: 640,
          easing: `cubic-bezier(${easeInOut.join(",")})`,
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {});
  transition.finished.finally(() => {
    delete root.dataset.themeReveal;
  });
}

const revealCss = `html[data-theme-reveal]::view-transition-old(root),html[data-theme-reveal]::view-transition-new(root){animation:none;mix-blend-mode:normal}`;

function useOrigin() {
  const press = useRef<{ point: Point; time: number } | null>(null);
  return {
    onPointerDown: (event: React.PointerEvent) => {
      press.current = {
        point: { x: event.clientX, y: event.clientY },
        time: performance.now(),
      };
    },
    read(): Point | null {
      if (press.current && performance.now() - press.current.time < 1000) {
        return press.current.point;
      }
      const focused = document.activeElement?.closest("label, button");
      if (!focused) return null;
      const rect = focused.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    },
  };
}

function ThemeOption({ theme }: { theme: Theme }) {
  return (
    <AriaRadio
      value={theme.slug}
      className="inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-md border border-transparent px-3 text-sm font-medium text-muted-foreground outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint hover:text-foreground selected:border-border selected:bg-card selected:text-foreground selected:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 sm:min-h-9"
    >
      <span data-specimen={theme.slug} className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="size-3.5 rounded-full bg-[var(--primary)] ring-1 ring-foreground/15"
        />
        {theme.name}
      </span>
    </AriaRadio>
  );
}

export function ThemeStudio({
  initialSlug,
  pageCss,
  specimenCss,
  showcase,
  gallery,
  install,
}: {
  initialSlug: string;
  pageCss: Record<string, string>;
  specimenCss: string;
  showcase: ReactNode;
  gallery: ReactNode;
  install: Record<string, ReactNode>;
}) {
  const [slug, setSlug] = useState(initialSlug);
  const mode = useSiteMode();
  const pickerRef = useRef<HTMLDivElement>(null);
  const origin = useOrigin();
  const theme = findTheme(slug) ?? themes[0];

  function selectTheme(next: string) {
    if (next === slug || !findTheme(next)) return;
    reveal(origin.read(), () => setSlug(next));
  }

  function selectMode(next: SiteMode) {
    if (next === currentSiteMode()) return;
    reveal(origin.read(), () => applySiteMode(next));
  }

  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (findTheme(fromHash)) setSlug(fromHash);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("theme", slug);
    if (findTheme(url.hash.slice(1))) url.hash = "";
    window.history.replaceState(null, "", url);
  }, [slug]);

  useEffect(() => {
    pickerRef.current
      ?.querySelector(`[data-specimen="${slug}"]`)
      ?.closest("label")
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [slug]);

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Generated from the static theme tokens. */}
      <style dangerouslySetInnerHTML={{ __html: pageCss[theme.slug] }} />
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Generated from the static theme tokens.
        dangerouslySetInnerHTML={{ __html: specimenCss + revealCss }}
      />

      <PageHeader className="site-container">
        <PageHeaderHeading>Themes</PageHeaderHeading>
        <PageHeaderDescription>
          Ten themes for vip/ui and shadcn/ui. Select one to preview it.
        </PageHeaderDescription>
        <PageActions>
          <a href="#install" className={buttonLinkStyles()}>
            Install {theme.name}
            <ArrowDownIcon size={16} aria-hidden="true" />
          </a>
          <CopyButton
            code={themeCss(theme)}
            label={`Copy ${theme.name} CSS`}
            text="Copy CSS"
            className="h-11 px-4"
          />
        </PageActions>
      </PageHeader>

      <div
        className="sticky top-0 z-30 border-y border-border/70 bg-background/85 py-3 backdrop-blur-md"
        onPointerDownCapture={origin.onPointerDown}
      >
        <div className="site-container flex items-center gap-3">
          <AriaRadioGroup
            ref={pickerRef}
            aria-label="Theme"
            orientation="horizontal"
            value={slug}
            onChange={selectTheme}
            render={withItemHighlight(undefined, {
              placement: "under",
              items: "label",
              className: "bg-card/70",
            })}
            className="flex min-w-0 gap-1 overflow-x-auto rounded-lg border border-border bg-secondary p-1 [scrollbar-width:none]"
          >
            {themes.map((option) => (
              <ThemeOption key={option.slug} theme={option} />
            ))}
          </AriaRadioGroup>
          <ModeSwitch
            mode={mode}
            onChange={selectMode}
            className="ml-auto shrink-0"
          />
        </div>
      </div>

      <Tabs defaultValue="preview" className="site-container min-w-0">
        <TabList aria-label="Theme view">
          <Tab id="preview">Preview</Tab>
          <Tab id="components">All components</Tab>
          <Tab id="tokens">Tokens</Tab>
        </TabList>
        <TabPanel id="preview" className={panelClass}>
          {showcase}
        </TabPanel>
        <TabPanel id="components" className={panelClass}>
          {gallery}
        </TabPanel>
        <TabPanel id="tokens" className={panelClass}>
          <ThemeTokens theme={theme} mode={mode} />
        </TabPanel>
      </Tabs>

      <section
        id="install"
        aria-labelledby="install-title"
        className="site-container mt-8 scroll-mt-24"
      >
        <div className="grid gap-10 border-t border-border/70 pt-12">
          <div className="grid max-w-2xl gap-3">
            <h2
              id="install-title"
              className="text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl"
            >
              Use {theme.name} in your app
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Works with vip/ui and any shadcn/ui project on Tailwind CSS v4.
            </p>
          </div>
          {install[theme.slug]}
        </div>
      </section>
    </div>
  );
}
