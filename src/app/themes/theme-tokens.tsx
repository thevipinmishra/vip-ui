"use client";

import type { CSSProperties, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { TextField } from "@/components/ui/text-field";
import { cn } from "@/lib/utils";
import { contrast, contrastGrade, toHex } from "./color";
import type { ColorToken, OfficialTheme } from "./official-themes";

type Mode = "light" | "dark";

const pairs: { surface: ColorToken; text: ColorToken; label: string }[] = [
  { surface: "background", text: "foreground", label: "Page" },
  { surface: "card", text: "card-foreground", label: "Card" },
  { surface: "popover", text: "popover-foreground", label: "Popover" },
  { surface: "primary", text: "primary-foreground", label: "Primary" },
  { surface: "secondary", text: "secondary-foreground", label: "Secondary" },
  { surface: "muted", text: "muted-foreground", label: "Muted" },
  { surface: "accent", text: "accent-foreground", label: "Accent" },
  {
    surface: "destructive",
    text: "destructive-foreground",
    label: "Destructive",
  },
  { surface: "success-subtle", text: "success-foreground", label: "Success" },
  { surface: "warning-subtle", text: "warning-foreground", label: "Warning" },
];

const singles: ColorToken[] = [
  "border",
  "input",
  "ring",
  "success",
  "warning",
  "destructive",
];

const charts: ColorToken[] = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "chart-6",
];

const radii = [
  { name: "sm", factor: 0.6 },
  { name: "md", factor: 0.8 },
  { name: "lg", factor: 1 },
  { name: "xl", factor: 1.4 },
  { name: "2xl", factor: 1.8 },
];

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-5 border-t border-border/70 pt-8 first:border-t-0 first:pt-0 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
      <div className="grid content-start gap-1.5">
        <h3 className="text-base font-semibold tracking-[-0.02em]">{title}</h3>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function TokenValue({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-1">
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-xs text-foreground">--{name}</p>
        <p
          className="truncate font-mono text-[11px] text-muted-foreground"
          title={value}
        >
          {value}
        </p>
      </div>
      <CopyButton
        value={value}
        variant="ghost"
        size="icon"
        aria-label={`Copy --${name}`}
        className="size-8 shrink-0"
      />
    </div>
  );
}

export function ThemeTokens({
  theme,
  mode,
}: {
  theme: OfficialTheme;
  mode: Mode;
}) {
  const tokens = theme[mode];
  const families = [
    { role: "Sans", name: theme.fonts.sans, variable: "--font-sans" },
    ...(theme.fonts.serif
      ? [{ role: "Serif", name: theme.fonts.serif, variable: "--font-serif" }]
      : []),
    { role: "Mono", name: theme.fonts.mono, variable: "--font-mono" },
  ];

  return (
    <div className="grid gap-10">
      <Section
        title="Color pairs"
        description={`Every surface with the text that sits on it, measured in ${mode} mode. AA needs 4.5:1 for body text.`}
      >
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {pairs.map((pair) => {
            const ratio = contrast(
              tokens[pair.text],
              tokens[pair.surface],
              tokens.background,
            );
            return (
              <li
                key={pair.surface}
                className="overflow-hidden rounded-xl bg-card ring-1 ring-border/70"
              >
                <div
                  className="flex h-24 items-end justify-between gap-2 p-3"
                  style={{
                    backgroundColor: `var(--${pair.surface})`,
                    color: `var(--${pair.text})`,
                  }}
                >
                  <span
                    className="text-3xl leading-none"
                    style={{
                      fontFamily: "var(--theme-display-family)",
                      fontWeight: "var(--theme-display-weight)",
                      letterSpacing: "var(--theme-display-tracking)",
                    }}
                  >
                    Aa
                  </span>
                  <span className="rounded-full bg-[color-mix(in_oklab,currentColor_12%,transparent)] px-2 py-0.5 font-mono text-[11px] font-medium">
                    {ratio.toFixed(1)} · {contrastGrade(ratio)}
                  </span>
                </div>
                <div className="grid gap-0.5 px-3 py-2.5">
                  <p className="text-sm font-medium">{pair.label}</p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {toHex(tokens[pair.surface])} / {toHex(tokens[pair.text])}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
          {singles.map((name) => (
            <div key={name} className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="size-9 shrink-0 rounded-md ring-1 ring-border/70"
                style={{ backgroundColor: `var(--${name})` }}
              />
              <TokenValue name={name} value={tokens[name]} />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Charts"
        description="Six series colors, each at least 3:1 against the card so marks stay visible."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {charts.map((name) => (
            <div key={name} className="grid min-w-0 gap-2">
              <span
                aria-hidden="true"
                className="h-14 rounded-lg"
                style={{ backgroundColor: `var(--${name})` }}
              />
              <TokenValue name={name} value={tokens[name]} />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Typography"
        description="Load these families with next/font or Google Fonts. Components inherit the sans."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {families.map((family) => (
            <div
              key={family.role}
              className="grid min-w-0 gap-4 rounded-xl bg-card p-5 ring-1 ring-border/70"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {family.role}
                </span>
                <code className="font-mono text-[11px] text-muted-foreground">
                  {family.variable}
                </code>
              </div>
              <p
                className="text-5xl leading-none"
                style={{ fontFamily: `var(${family.variable})` }}
              >
                Ag
              </p>
              <div className="grid gap-1">
                <p className="truncate text-lg font-semibold tracking-[-0.02em]">
                  {family.name}
                </p>
                <p
                  className="text-sm leading-6 text-muted-foreground"
                  style={{ fontFamily: `var(${family.variable})` }}
                >
                  {family.role === "Mono"
                    ? "const total = 4_210.00;"
                    : "The quick brown fox jumps over the lazy dog."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Shape"
        description={`--radius is ${theme.radius}. The scale multiplies it, matching shadcn/ui.`}
      >
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-5">
          {radii.map((radius) => (
            <div key={radius.name} className="grid gap-2">
              <span
                aria-hidden="true"
                className="h-20 border border-primary/40 bg-accent"
                style={{
                  borderRadius: `calc(var(--radius) * ${radius.factor})`,
                }}
              />
              <p className="font-mono text-xs">
                rounded-{radius.name}
                <span className="block text-muted-foreground">
                  ×{radius.factor}
                </span>
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Depth"
        description={`${theme.traits.depth}. Cards and controls use --shadow-card; menus and dialogs use --shadow-float.`}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {(["shadow-card", "shadow-float", "shadow-inset"] as const).map(
            (name) => (
              <div key={name} className="grid min-w-0 gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-24 rounded-xl",
                    name === "shadow-inset" ? "bg-muted" : "bg-card",
                  )}
                  style={{ boxShadow: `var(--${name})` }}
                />
                <TokenValue name={name} value={tokens[name]} />
              </div>
            ),
          )}
        </div>
      </Section>

      <Section
        title="Density"
        description={`${theme.traits.density}: --spacing is ${theme.spacing}. Every Tailwind gap, padding, and control height scales with it.`}
      >
        <div className="flex flex-wrap items-end gap-3 rounded-xl bg-card p-5 ring-1 ring-border/70">
          <TextField
            label="Workspace"
            placeholder="northwind"
            className="w-56"
          />
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
          <div className="ml-auto flex items-end gap-1" aria-hidden="true">
            {[2, 4, 6, 8, 12].map((step) => (
              <span
                key={step}
                className="grid justify-items-center gap-1 font-mono text-[10px] text-muted-foreground"
              >
                <span
                  className="block w-3 rounded-sm bg-primary/70"
                  style={
                    {
                      height: `calc(var(--spacing) * ${step})`,
                    } as CSSProperties
                  }
                />
                {step}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
