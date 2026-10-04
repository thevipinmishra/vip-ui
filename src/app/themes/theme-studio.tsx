"use client";

import Link from "next/link";
import { type ReactNode, useRef, useState } from "react";
import { UNSAFE_PortalProvider } from "react-aria/PortalProvider";
import { Check } from "reicon-react";
import { CodeFrame } from "@/components/docs/code-frame";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { ToastViewport } from "@/components/ui/toast";
import { officialThemes, previewStyle, themeCss } from "./official-themes";

export function ThemeStudio({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState(officialThemes[0].slug);
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  const portalContainer = useRef<HTMLDivElement>(null);
  const theme =
    officialThemes.find((item) => item.slug === slug) ?? officialThemes[0];
  const css = themeCss(theme);

  return (
    <div className="grid min-w-0 gap-10">
      <div className="grid gap-8">
        <RadioGroup
          aria-label="Official theme"
          value={slug}
          onValueChange={(value) => {
            if (officialThemes.some((item) => item.slug === value))
              setSlug(value);
          }}
          className="flex flex-wrap gap-2"
        >
          {officialThemes.map((option) => (
            <Radio
              key={option.slug}
              value={option.slug}
              variant="card"
              className="gap-2.5"
            >
              <span
                aria-hidden="true"
                className="grid size-4 shrink-0 place-items-center rounded-full ring-1 ring-foreground/15"
                style={{
                  backgroundColor: option.light["--primary"],
                  color: option.light["--primary-foreground"],
                }}
              >
                {slug === option.slug && <Check size={12} />}
              </span>
              <span className="text-sm font-medium">{option.name}</span>
            </Radio>
          ))}
        </RadioGroup>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {theme.description} Switch themes to compare the same components.
            Changes stay on this page.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <RadioGroup
              aria-label="Preview appearance"
              value={appearance}
              onValueChange={(value) => {
                if (value === "light" || value === "dark") setAppearance(value);
              }}
              className="flex gap-2"
            >
              <Radio value="light" variant="card" label="Light" />
              <Radio value="dark" variant="card" label="Dark" />
            </RadioGroup>
          </div>
        </div>
      </div>

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
          , then copy this CSS after the existing :root and .dark rules in your
          global stylesheet. Components use its colors and radius. Use{" "}
          <code className="font-mono text-foreground">--theme-space</code> for
          gaps and{" "}
          <code className="font-mono text-foreground">--theme-inset</code> for
          padding. Spacing is opt-in.
        </p>
        <CodeFrame
          code={css}
          filename={`${theme.slug}.css`}
          language="css"
          copyText="Copy CSS"
          previewCode
        >
          <pre className="min-w-max p-5 font-mono text-xs leading-6">{css}</pre>
        </CodeFrame>
      </section>
    </div>
  );
}
