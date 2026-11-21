"use client";

import { CheckIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { contrast, contrastGrade, toHex } from "@/lib/color";
import type { PaletteMode } from "@/lib/palettes";
import {
  type ColorToken,
  checkRatio,
  type Theme,
  type ThemeCheck,
  themeChecks,
} from "./themes";

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

const swatch =
  "shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--foreground)_8%,transparent)]";

const checkGroups = Object.values(
  Object.groupBy(themeChecks, (check) => check.label),
) as ThemeCheck[][];

function tokenList(tokens: ColorToken[]) {
  const unique = [...new Set(tokens)];
  return unique.length > 2 &&
    unique.every((token) => token.startsWith("chart-"))
    ? `${unique[0]} to ${unique[unique.length - 1]}`
    : unique.join(", ");
}

function ContrastChecks({ theme, mode }: { theme: Theme; mode: PaletteMode }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-card ring-1 ring-border/70">
      <table className="w-full min-w-[34rem] text-start text-sm">
        <thead className="text-xs text-muted-foreground">
          <tr className="border-b border-border/70">
            <th scope="col" className="px-4 py-2.5 text-start font-medium">
              Check
            </th>
            <th scope="col" className="px-4 py-2.5 text-start font-medium">
              Tokens
            </th>
            <th scope="col" className="px-4 py-2.5 text-end font-medium">
              Minimum
            </th>
            <th scope="col" className="px-4 py-2.5 text-end font-medium">
              Lowest
            </th>
          </tr>
        </thead>
        <tbody>
          {checkGroups.map((group) => {
            const lowest = Math.min(
              ...group.map((check) => checkRatio(theme, mode, check)),
            );
            const pass = lowest >= group[0].minimum;
            return (
              <tr
                key={group[0].label}
                className="border-b border-border/70 last:border-b-0"
              >
                <th scope="row" className="px-4 py-2.5 text-start font-medium">
                  {group[0].label}
                </th>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                  {tokenList(group.map((check) => check.foreground))} on{" "}
                  {tokenList(group.map((check) => check.background))}
                </td>
                <td className="px-4 py-2.5 text-end tabular-nums text-muted-foreground">
                  {group[0].minimum}:1
                </td>
                <td className="px-4 py-2.5 text-end">
                  <span
                    className={`inline-flex items-center gap-1.5 font-medium tabular-nums ${pass ? "text-success-foreground" : "text-destructive"}`}
                  >
                    {pass ? (
                      <CheckIcon size={14} weight="bold" aria-hidden="true" />
                    ) : (
                      <XIcon size={14} weight="bold" aria-hidden="true" />
                    )}
                    {lowest.toFixed(2)}:1
                    <span className="sr-only">
                      {pass ? ", pass" : ", fail"}
                    </span>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: ReactNode;
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

function TokenValue({
  theme,
  mode,
  token,
}: {
  theme: Theme;
  mode: PaletteMode;
  token: ColorToken;
}) {
  const value = theme[mode][token];
  const source = theme.sources[mode][token];
  return (
    <div className="flex min-w-0 items-center gap-1">
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-xs text-foreground">--{token}</p>
        <p
          className="truncate font-mono text-[11px] text-muted-foreground"
          title={`${value} ${toHex(value)}`}
        >
          {source.palette.slug}-{source.step}
        </p>
      </div>
      <CopyButton
        value={value}
        variant="ghost"
        iconOnly
        aria-label={`Copy --${token}`}
        className="size-8 shrink-0"
      />
    </div>
  );
}

export function ThemeTokens({
  theme,
  mode,
}: {
  theme: Theme;
  mode: PaletteMode;
}) {
  const tokens = theme[mode];

  return (
    <div className="grid gap-10">
      <Section
        title="Color pairs"
        description={`Each surface with the text on it, in ${mode} mode. Body text needs 4.5:1 for AA.`}
      >
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,10.5rem),1fr))] gap-3">
          {pairs.map((pair) => {
            const ratio = contrast(tokens[pair.text], tokens[pair.surface]);
            return (
              <li
                key={pair.surface}
                className="overflow-hidden rounded-xl bg-card ring-1 ring-border/70"
              >
                <div
                  className="flex h-20 items-end justify-between gap-2 p-3"
                  style={{
                    backgroundColor: `var(--${pair.surface})`,
                    color: `var(--${pair.text})`,
                  }}
                >
                  <span className="text-2xl leading-none font-semibold tracking-[-0.03em]">
                    Aa
                  </span>
                  <span className="rounded-full bg-[color-mix(in_oklab,currentColor_12%,transparent)] px-2 py-0.5 font-mono text-[11px] font-medium whitespace-nowrap">
                    {ratio.toFixed(1)} · {contrastGrade(ratio)}
                  </span>
                </div>
                <div className="grid gap-0.5 px-3 py-2.5">
                  <p className="text-sm font-medium">{pair.label}</p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {theme.sources[mode][pair.text].palette.slug}-
                    {theme.sources[mode][pair.text].step} on{" "}
                    {theme.sources[mode][pair.surface].palette.slug}-
                    {theme.sources[mode][pair.surface].step}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,13rem),1fr))] gap-x-6 gap-y-4">
          {singles.map((token) => (
            <div key={token} className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className={`size-9 shrink-0 rounded-md ${swatch}`}
                style={{ backgroundColor: `var(--${token})` }}
              />
              <TokenValue theme={theme} mode={mode} token={token} />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Contrast checks"
        description={`The lowest ratio for each check, in ${mode} mode. Text needs 4.5:1. Rings, controls, icons, and chart series need 3:1.`}
      >
        <ContrastChecks theme={theme} mode={mode} />
      </Section>

      <Section
        title="Charts"
        description="Six series colors. Each series uses step 9 of a different scale."
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,8.5rem),1fr))] gap-3">
          {charts.map((token) => (
            <div key={token} className="grid min-w-0 gap-2">
              <span
                aria-hidden="true"
                className="h-14 rounded-lg"
                style={{ backgroundColor: `var(--${token})` }}
              />
              <TokenValue theme={theme} mode={mode} token={token} />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="All tokens"
        description={
          <>
            Each token is a step of a color scale. To see all steps, go to{" "}
            <Link
              href="/colors"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Colors
            </Link>
            .
          </>
        }
      >
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,13rem),1fr))] gap-x-6 gap-y-3">
          {(Object.keys(tokens) as ColorToken[])
            .filter(
              (token) => !charts.includes(token) && !singles.includes(token),
            )
            .map((token) => (
              <li key={token} className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`size-9 shrink-0 rounded-md ${swatch}`}
                  style={{ backgroundColor: `var(--${token})` }}
                />
                <TokenValue theme={theme} mode={mode} token={token} />
              </li>
            ))}
        </ul>
      </Section>
    </div>
  );
}
