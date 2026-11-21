"use client";

import { SlidersHorizontalIcon } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from "react-aria-components";
import { flushSync } from "react-dom";
import type { FontKind } from "@/app/typography/fonts";
import { CopyCodeButton } from "@/components/docs/copy-code-button";
import { ModeSwitch } from "@/components/docs/mode-switch";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/docs/page-header";
import { Button } from "@/components/ui/button";
import { buttonLinkStyles } from "@/components/ui/button-styles";
import { withItemHighlight } from "@/components/ui/item-highlight";
import {
  Popover,
  PopoverDialog,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollFade } from "@/components/ui/scroll-fade";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSection,
  SelectTrigger,
} from "@/components/ui/select";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { easeInOut } from "@/lib/motion";
import {
  applySiteMode,
  currentSiteMode,
  type SiteMode,
  useSiteMode,
} from "@/lib/site-mode";
import { updateSiteTheme } from "@/lib/update-site-theme";
import { cn } from "@/lib/utils";
import { TweaksContext } from "./theme-css";
import { ThemeTokens } from "./theme-tokens";
import {
  defaultRadius,
  findTheme,
  type RingStyle,
  radiusOptions,
  ringStyles,
  type Theme,
  themeCss,
  themes,
  withRing,
} from "./themes";

export interface FontChoice {
  id: string;
  name: string;
  kind: FontKind;
  family: string;
}

const swatches = [
  "var(--primary)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type Point = { x: number; y: number };

const panelClass =
  "docs-tab-panel mt-8 min-w-0 rounded-none bg-transparent p-0 shadow-none ring-0";

const pillClass =
  "rounded-full bg-card/60 shadow-(--shadow-card) ring-1 ring-border/60 backdrop-blur-xl";

const ringNames: Record<RingStyle, string> = {
  accent: "Accent",
  neutral: "Neutral",
};

const fontGroups: { title: string; kind: FontKind }[] = [
  { title: "Sans serif", kind: "sans" },
  { title: "Serif", kind: "serif" },
];

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
      className={({ isSelected }) =>
        cn(
          "relative inline-flex min-h-9 shrink-0 cursor-pointer items-center rounded-full ps-1.5 pe-2.5 text-[13px] font-medium whitespace-nowrap text-muted-foreground transition-[color,background-color,box-shadow] duration-200 ease-out-quint outline-transparent hover:text-foreground selected:bg-background selected:text-foreground selected:shadow-[0_1px_2px_oklch(0_0_0/0.06)] selected:ring-1 selected:ring-border/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring max-[84rem]:px-2.5",
          isSelected && "max-[84rem]:pe-3",
        )
      }
    >
      {({ isSelected }) => (
        <span data-specimen={theme.slug} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-4 rounded-full bg-(--primary) shadow-[inset_0_0_0_1px_oklch(0_0_0/0.12),inset_0_1px_1px_oklch(1_0_0/0.25)]"
          />
          <span className={cn(!isSelected && "max-[84rem]:sr-only")}>
            {theme.name}
          </span>
        </span>
      )}
    </AriaRadio>
  );
}

function Customize({
  radius,
  ring,
  font,
  fonts,
  onRadiusChange,
  onRingChange,
  onFontChange,
}: {
  radius: string;
  ring: RingStyle;
  font: string;
  fonts: FontChoice[];
  onRadiusChange: (radius: string) => void;
  onRingChange: (ring: RingStyle) => void;
  onFontChange: (font: string) => void;
}) {
  const radiusLabel = useId();
  const ringLabel = useId();
  const changed =
    radius !== defaultRadius || ring !== "accent" || font !== fonts[0].id;

  return (
    <PopoverTrigger>
      <Button
        variant="ghost"
        className={cn(pillClass, "max-lg:w-10 max-lg:px-0")}
      >
        <SlidersHorizontalIcon size={16} aria-hidden="true" />
        <span className="max-lg:sr-only">Customize</span>
      </Button>
      <Popover placement="bottom end" className="w-76">
        <PopoverDialog aria-label="Customize" className="grid gap-5">
          <div className="grid gap-2">
            <span id={radiusLabel} className="text-sm font-medium">
              Radius
            </span>
            <ToggleButtonGroup
              aria-labelledby={radiusLabel}
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={[radius]}
              onSelectionChange={(keys) => {
                const [next] = keys;
                if (typeof next === "string") onRadiusChange(next);
              }}
              size="sm"
              className="w-full flex-nowrap"
            >
              {radiusOptions.map((option) => (
                <ToggleButton
                  key={option}
                  id={option}
                  variant="segmented"
                  aria-label={option}
                  className="min-w-0 flex-1 px-0 tabular-nums"
                >
                  {option.replace("rem", "")}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <div className="grid gap-2">
            <span id={ringLabel} className="text-sm font-medium">
              Focus ring
            </span>
            <ToggleButtonGroup
              aria-labelledby={ringLabel}
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={[ring]}
              onSelectionChange={(keys) => {
                const next = ringStyles.find((style) => keys.has(style));
                if (next) onRingChange(next);
              }}
              size="sm"
              className="w-full flex-nowrap"
            >
              {ringStyles.map((style) => (
                <ToggleButton
                  key={style}
                  id={style}
                  variant="segmented"
                  className="min-w-0 flex-1"
                >
                  {ringNames[style]}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <Select
            selectedKey={font}
            onSelectionChange={(key) => {
              if (key !== null) onFontChange(String(key));
            }}
          >
            <SelectLabel>Font</SelectLabel>
            <SelectTrigger />
            <SelectContent>
              {fontGroups.map((group) => (
                <SelectSection key={group.kind} title={group.title}>
                  {fonts
                    .filter((option) => option.kind === group.kind)
                    .map((option) => (
                      <SelectItem
                        key={option.id}
                        id={option.id}
                        textValue={option.name}
                      >
                        <span
                          className="min-w-0 truncate"
                          style={{ fontFamily: option.family }}
                        >
                          {option.name}
                        </span>
                      </SelectItem>
                    ))}
                </SelectSection>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            isDisabled={!changed}
            onPress={() => {
              onRadiusChange(defaultRadius);
              onRingChange("accent");
              onFontChange(fonts[0].id);
            }}
          >
            Reset
          </Button>
        </PopoverDialog>
      </Popover>
    </PopoverTrigger>
  );
}

export function ThemeStudio({
  initialSlug,
  initialRadius,
  initialRing,
  initialFont,
  fonts,
  pageCss,
  specimenCss,
  showcase,
  gallery,
  install,
}: {
  initialSlug: string;
  initialRadius: string;
  initialRing: RingStyle;
  initialFont: string;
  fonts: FontChoice[];
  pageCss: Record<string, string>;
  specimenCss: string;
  showcase: ReactNode;
  gallery: ReactNode;
  install: Record<string, ReactNode>;
}) {
  const [slug, setSlug] = useState(initialSlug);
  const [radius, setRadius] = useState(initialRadius);
  const [ring, setRing] = useState(initialRing);
  const [font, setFont] = useState(initialFont);
  const mode = useSiteMode();
  const pickerRef = useRef<HTMLDivElement>(null);
  const origin = useOrigin();
  const theme = withRing(findTheme(slug) ?? themes[0], ring);
  const fontFamily = fonts.find((option) => option.id === font)?.family;
  const tweaks = [
    radius !== defaultRadius && `--radius:${radius};`,
    font !== fonts[0].id && fontFamily && `--font-geist-sans:${fontFamily};`,
  ]
    .filter(Boolean)
    .join("");
  const ringCss =
    ring === "accent"
      ? ""
      : `:root{--ring:${theme.light.ring};--sidebar-ring:${theme.light.ring};}.dark{--ring:${theme.dark.ring};--sidebar-ring:${theme.dark.ring};}`;

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
    if (radius === defaultRadius) url.searchParams.delete("radius");
    else url.searchParams.set("radius", radius.replace("rem", ""));
    if (ring === "accent") url.searchParams.delete("ring");
    else url.searchParams.set("ring", ring);
    if (font === fonts[0].id) url.searchParams.delete("font");
    else url.searchParams.set("font", font);
    if (findTheme(url.hash.slice(1))) url.hash = "";
    window.history.replaceState(null, "", url);
  }, [slug, radius, ring, font, fonts]);

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
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Built from the fixed radius and font options.
        dangerouslySetInnerHTML={{
          __html: (tweaks ? `:root{${tweaks}}` : "") + ringCss,
        }}
      />

      <PageHeader className="site-container relative isolate items-center pb-2 pt-12 text-center sm:pb-6 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-28 -z-10 mx-auto h-96 max-w-5xl rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--primary) 18%, transparent) 0%, transparent 70%)",
          }}
        />
        <span aria-hidden="true" className="flex h-7 items-center opacity-90">
          {swatches.map((swatch) => (
            <span
              key={swatch}
              className="-ms-1.5 size-5 rounded-full ring-2 ring-background first:ms-0"
              style={{ background: swatch }}
            />
          ))}
        </span>
        <PageHeaderHeading size="lg">
          A visual language of your own.
        </PageHeaderHeading>
        <PageHeaderDescription>
          Explore thoughtfully curated themes for vip/ui and shadcn/ui. Preview
          complete interfaces, find your visual direction, and bring a cohesive
          design language to your application with a single installation.
        </PageHeaderDescription>
        <PageActions className="mt-2 justify-center">
          <a href="#install" className={buttonLinkStyles()}>
            Install {theme.name}
          </a>
          <CopyCodeButton
            code={themeCss(theme, radius)}
            label={`Copy CSS for ${theme.name}`}
            text="Copy CSS"
            className="h-10 px-4"
          />
        </PageActions>
      </PageHeader>

      <div
        className="sticky top-(--header-height) z-30 bg-linear-to-b from-background from-70% to-transparent pt-3 pb-4"
        onPointerDownCapture={origin.onPointerDown}
      >
        <div className="site-container flex items-center justify-center gap-2">
          <div className={cn(pillClass, "flex min-w-0")}>
            <ScrollFade
              orientation="horizontal"
              className="scroll-px-6 rounded-full p-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
            >
              <AriaRadioGroup
                ref={pickerRef}
                aria-label="Theme"
                orientation="horizontal"
                value={slug}
                onChange={selectTheme}
                render={withItemHighlight(undefined, {
                  placement: "under",
                  items: "label",
                  className: "rounded-full bg-muted/70",
                })}
                className="flex w-max items-center gap-0.5 max-[84rem]:gap-0"
              >
                {themes.map((option) => (
                  <ThemeOption key={option.slug} theme={option} />
                ))}
              </AriaRadioGroup>
            </ScrollFade>
          </div>
          <ModeSwitch
            mode={mode}
            onChange={selectMode}
            pill
            className="shrink-0"
          />
          <Customize
            radius={radius}
            font={font}
            fonts={fonts}
            ring={ring}
            onRadiusChange={setRadius}
            onRingChange={setRing}
            onFontChange={setFont}
          />
        </div>
      </div>

      <Tabs defaultSelectedKey="preview" className="site-container min-w-0">
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
              className="text-3xl font-semibold leading-tight tracking-tighter sm:text-4xl"
            >
              Use {theme.name} in your app
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Works with vip/ui and any shadcn/ui project on Tailwind CSS v4.
            </p>
          </div>
          <TweaksContext value={{ radius, ring }}>
            {install[theme.slug]}
          </TweaksContext>
        </div>
      </section>
    </div>
  );
}
