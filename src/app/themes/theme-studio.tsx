"use client";

import { ArrowDownIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from "react-aria-components";
import { flushSync } from "react-dom";
import { CopyButton } from "@/components/docs/copy-button";
import { buttonLinkStyles } from "@/components/ui/button-styles";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { easeInOut } from "@/lib/motion";
import { updateSiteTheme } from "@/lib/update-site-theme";
import { cn } from "@/lib/utils";
import {
  findTheme,
  type OfficialTheme,
  officialThemes,
  themeCss,
} from "./official-themes";
import { ThemeTokens } from "./theme-tokens";

type Mode = "light" | "dark";
type Point = { x: number; y: number };

const modeStorageKey = "vip-ui-theme";

const display =
  "font-[family-name:var(--theme-display-family)] [font-weight:var(--theme-display-weight)] tracking-[var(--theme-display-tracking)]";

const panelClass =
  "docs-tab-panel mt-8 min-w-0 rounded-none bg-transparent p-0 shadow-none ring-0";

function subscribeToMode(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function currentMode(): Mode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

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

function ThemeOption({ theme }: { theme: OfficialTheme }) {
  return (
    <AriaRadio
      value={theme.slug}
      className="inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-md border border-transparent px-3 text-sm font-medium text-muted-foreground outline-none hover:bg-card/70 hover:text-foreground selected:border-border selected:bg-card selected:text-foreground selected:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:min-h-9"
    >
      <span data-specimen={theme.slug} className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="size-3.5 rounded-full ring-1 ring-foreground/15"
          style={{
            background:
              "linear-gradient(135deg, var(--primary) 50%, var(--accent) 50%)",
          }}
        />
        {theme.name}
      </span>
    </AriaRadio>
  );
}

function ModeSwitch({
  mode,
  onChange,
  className,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
  className?: string;
}) {
  return (
    <ToggleButtonGroup
      aria-label="Appearance"
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[mode]}
      onSelectionChange={(keys) => {
        const [next] = keys;
        if (next === "light" || next === "dark") onChange(next);
      }}
      className={className}
    >
      <ToggleButton id="light" variant="segmented" aria-label="Light">
        <SunIcon size={16} aria-hidden="true" />
      </ToggleButton>
      <ToggleButton id="dark" variant="segmented" aria-label="Dark">
        <MoonIcon size={16} aria-hidden="true" />
      </ToggleButton>
    </ToggleButtonGroup>
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
  const mode = useSyncExternalStore(
    subscribeToMode,
    currentMode,
    (): Mode => "light",
  );
  const pickerRef = useRef<HTMLDivElement>(null);
  const origin = useOrigin();
  const theme = findTheme(slug) ?? officialThemes[0];

  function selectTheme(next: string) {
    if (next === slug || !findTheme(next)) return;
    reveal(origin.read(), () => setSlug(next));
  }

  function selectMode(next: Mode) {
    if (next === currentMode()) return;
    reveal(origin.read(), () => {
      document.documentElement.classList.toggle("dark", next === "dark");
    });
    try {
      window.localStorage.setItem(modeStorageKey, next);
    } catch {}
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

      <header className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div className="grid min-w-0 max-w-2xl gap-3">
          <h1 className={cn("text-5xl leading-none sm:text-6xl", display)}>
            Themes
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            Six themes for vip/ui and any shadcn/ui project. Pick one and the
            whole page restyles live, on unmodified components.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
        </div>
      </header>

      <div
        className="sticky top-0 z-30 -mx-5 border-y border-border/70 bg-background/85 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8"
        onPointerDownCapture={origin.onPointerDown}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <AriaRadioGroup
            ref={pickerRef}
            aria-label="Theme"
            orientation="horizontal"
            value={slug}
            onChange={selectTheme}
            className="flex min-w-0 gap-1 overflow-x-auto rounded-lg border border-border bg-secondary p-1 [scrollbar-width:none]"
          >
            {officialThemes.map((option) => (
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

      <Tabs defaultValue="preview" className="mx-auto w-full min-w-0 max-w-7xl">
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
        className="mx-auto mt-8 grid w-full max-w-7xl scroll-mt-24 gap-10 border-t border-border/70 pt-12"
      >
        <div className="grid max-w-2xl gap-3">
          <h2
            id="install-title"
            className={cn("text-4xl leading-tight sm:text-5xl", display)}
          >
            Use {theme.name} in your app
          </h2>
          <p className="text-base leading-7 text-muted-foreground">
            Works with vip/ui and any shadcn/ui project on Tailwind CSS v4.
          </p>
        </div>
        {install[theme.slug]}
      </section>
    </div>
  );
}
