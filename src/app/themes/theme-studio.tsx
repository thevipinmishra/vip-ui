"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { UNSAFE_PortalProvider } from "react-aria/PortalProvider";
import { CodeFrame } from "@/components/docs/code-frame";
import { CopyButton } from "@/components/docs/copy-button";
import { Radio, RadioGroup, RadioIndicator } from "@/components/ui/radio-group";
import { ToastViewport } from "@/components/ui/toast";
import { officialThemes, previewStyle, themeCss } from "./official-themes";

export function ThemeStudio({
  initialTheme,
  children,
}: {
  initialTheme?: string;
  children: ReactNode;
}) {
  const [slug, setSlug] = useState(initialTheme ?? officialThemes[0].slug);
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  const portalContainer = useRef<HTMLDivElement>(null);
  const themeLabelId = useId();
  const theme =
    officialThemes.find((item) => item.slug === slug) ?? officialThemes[0];
  const css = themeCss(theme);

  // The preview follows the site theme, so the nav switcher controls it.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      setAppearance(root.classList.contains("dark") ? "dark" : "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // `/themes#atelier` selects Atelier on arrival. Runs before the URL sync
  // below so the hash is still available to read.
  useEffect(() => {
    const fromHash = window.location.hash.replace(/^#/, "");
    if (officialThemes.some((item) => item.slug === fromHash)) {
      setSlug(fromHash);
    }
  }, []);

  // Keep the selected theme in the URL so a choice is shareable.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("theme", slug);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`,
    );
  }, [slug]);

  return (
    <div className="grid min-w-0 gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start lg:gap-14">
      <aside className="grid min-w-0 content-start gap-7 lg:sticky lg:top-6">
        <div className="grid gap-3">
          <p
            id={themeLabelId}
            className="text-sm font-semibold text-foreground"
          >
            Theme
          </p>
          <RadioGroup
            aria-labelledby={themeLabelId}
            value={slug}
            onValueChange={(value) => {
              if (officialThemes.some((item) => item.slug === value)) {
                setSlug(value);
              }
            }}
            className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1"
          >
            {officialThemes.map((option) => (
              <Radio
                key={option.slug}
                id={option.slug}
                value={option.slug}
                className="scroll-mt-28 gap-3 rounded-lg px-3 selected:bg-accent selected:hover:bg-accent"
              >
                <RadioIndicator />
                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                  {option.name}
                </span>
                <span
                  aria-hidden="true"
                  className="size-4 shrink-0 rounded-full ring-1 ring-border"
                  style={{
                    backgroundColor:
                      appearance === "dark"
                        ? option.dark["--primary"]
                        : option.light["--primary"],
                  }}
                />
              </Radio>
            ))}
          </RadioGroup>
          <p className="text-xs leading-5 text-muted-foreground">
            {theme.description}
          </p>
        </div>

        <div className="grid">
          <CopyButton
            code={css}
            label={`Copy ${theme.name} CSS`}
            text="Copy CSS"
          />
        </div>
      </aside>

      <div className="mx-auto grid w-full min-w-0 max-w-5xl gap-10">
        <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold tracking-[-0.06em]">
          Themes
        </h1>

        <section
          data-slot="theme-preview"
          aria-label={`${theme.name} component preview`}
          style={previewStyle(theme, appearance)}
          className="min-w-0 text-foreground"
        >
          <UNSAFE_PortalProvider getContainer={() => portalContainer.current}>
            {children}
            <ToastViewport />
          </UNSAFE_PortalProvider>
          <div ref={portalContainer} />
        </section>

        <section
          id="install"
          className="grid scroll-mt-28 gap-6 border-t border-border pt-10"
        >
          <h2 className="text-2xl font-semibold tracking-[-0.045em]">
            Install {theme.name}
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Start with{" "}
            <Link
              href="/components/installation"
              className="text-primary underline underline-offset-4"
            >
              vip/ui setup
            </Link>
            , then copy this CSS after the existing :root and .dark rules in
            your global stylesheet. Components use its colors and radius. Use{" "}
            <code className="font-mono text-foreground">--theme-space</code> for
            gaps and{" "}
            <code className="font-mono text-foreground">--theme-inset</code> for
            padding. Spacing is opt-in.
          </p>
          <CodeFrame
            code={css}
            filename={`${theme.slug}.css`}
            copyText="Copy CSS"
            previewCode
          >
            <pre className="min-w-max p-5 font-mono text-xs leading-6">
              {css}
            </pre>
          </CodeFrame>
        </section>
      </div>
    </div>
  );
}
