"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from "react-aria-components";
import { CopyButton } from "@/components/docs/copy-button";
import { withItemHighlight } from "@/components/ui/item-highlight";
import { cn } from "@/lib/utils";
import { contrast, contrastGrade, toHex } from "./color";
import {
  type Palette,
  type PaletteStep,
  paletteCss,
  paletteSteps,
  palettes,
  paletteVar,
} from "./palettes";
import { Section } from "./theme-tokens";

type Mode = "light" | "dark";

const swatch =
  "shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--foreground)_8%,transparent)]";

const rowGrid =
  "grid grid-cols-12 gap-1 sm:grid-cols-[5rem_repeat(12,minmax(0,1fr))] sm:items-center";

function ScaleOption({ palette, mode }: { palette: Palette; mode: Mode }) {
  return (
    <AriaRadio
      value={palette.slug}
      className="cursor-pointer rounded-lg border border-transparent p-2 text-muted-foreground outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint hover:text-foreground selected:border-border selected:bg-card selected:text-foreground selected:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
    >
      <span className={rowGrid}>
        <span className="col-span-12 mb-1 truncate text-sm font-medium sm:col-span-1 sm:mb-0">
          {palette.name}
        </span>
        {palette[mode].map((value, index) => (
          <span
            key={paletteVar(palette.slug, index + 1)}
            aria-hidden="true"
            className={cn("h-7 rounded-[5px] sm:h-8", swatch)}
            style={{ backgroundColor: value }}
          />
        ))}
      </span>
    </AriaRadio>
  );
}

function ScaleDetail({ palette, mode }: { palette: Palette; mode: Mode }) {
  const ramp = palette[mode];
  const color = (step: PaletteStep) => ramp[step - 1];
  const pairs: { label: string; surface: PaletteStep; text: PaletteStep }[] = [
    { label: "Solid", surface: 9, text: palette.solidText[mode] },
    { label: "Text", surface: 2, text: 11 },
    { label: "Strong text", surface: 1, text: 12 },
  ];

  return (
    <Section title={palette.name} description={palette.description}>
      <div className="grid gap-6">
        <ul className="grid gap-3 sm:grid-cols-3">
          {pairs.map((pair) => {
            const ratio = contrast(color(pair.text), color(pair.surface));
            return (
              <li
                key={pair.label}
                className="overflow-hidden rounded-xl bg-card ring-1 ring-border/70"
              >
                <div
                  className="flex h-24 items-end justify-between gap-2 p-3"
                  style={{
                    backgroundColor: color(pair.surface),
                    color: color(pair.text),
                  }}
                >
                  <span className="text-3xl leading-none font-semibold tracking-[-0.03em]">
                    Aa
                  </span>
                  <span className="rounded-full bg-[color-mix(in_oklab,currentColor_12%,transparent)] px-2 py-0.5 font-mono text-[11px] font-medium">
                    {ratio.toFixed(1)} · {contrastGrade(ratio)}
                  </span>
                </div>
                <div className="grid gap-0.5 px-3 py-2.5">
                  <p className="text-sm font-medium">{pair.label}</p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {pair.text} on {pair.surface}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
          {paletteSteps.map(({ step, name }) => {
            const variable = paletteVar(palette.slug, step);
            return (
              <li key={step} className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn("size-9 shrink-0 rounded-md", swatch)}
                  style={{ backgroundColor: color(step) }}
                />
                <div className="min-w-0 flex-1">
                  <p className="flex min-w-0 items-baseline gap-2">
                    <span className="truncate text-sm font-medium">{name}</span>
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                      {variable}
                    </span>
                  </p>
                  <p
                    className="truncate font-mono text-[11px] text-muted-foreground"
                    title={toHex(color(step))}
                  >
                    {color(step)}
                  </p>
                </div>
                <CopyButton
                  code={color(step)}
                  label={`Copy ${variable}`}
                  iconOnly
                  variant="ghost"
                  className="size-8 shrink-0"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

export function ThemePalettes({ mode }: { mode: Mode }) {
  const [slug, setSlug] = useState(palettes[0].slug);
  const palette =
    palettes.find((option) => option.slug === slug) ?? palettes[0];

  return (
    <div className="grid gap-10">
      <Section
        title="Color scales"
        description={
          <div className="grid gap-4">
            <p>
              Ten scales with 12 steps each, in {mode} mode. A step has the same
              lightness in every scale.{" "}
              <Link
                href="/components/styling#color-scales"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Use the scales
              </Link>
            </p>
            <div className="flex flex-wrap gap-2">
              <CopyButton
                code={paletteCss([palette])}
                label={`Copy ${palette.name} CSS`}
                text={`Copy ${palette.name}`}
              />
              <CopyButton
                code={paletteCss()}
                label="Copy CSS for all scales"
                text="Copy all"
                variant="ghost"
              />
            </div>
          </div>
        }
      >
        <div className="grid gap-1">
          <div
            aria-hidden="true"
            className={cn(
              rowGrid,
              "px-[calc(0.5rem+1px)] font-mono text-[11px] text-muted-foreground",
            )}
          >
            <span className="hidden sm:block" />
            {paletteSteps.map(({ step }) => (
              <span key={step} className="text-center">
                {step}
              </span>
            ))}
          </div>
          <AriaRadioGroup
            aria-label="Color scale"
            value={slug}
            onChange={setSlug}
            render={withItemHighlight(undefined, {
              placement: "under",
              items: "label",
              className: "bg-card/70",
            })}
            className="grid gap-0.5"
          >
            {palettes.map((option) => (
              <ScaleOption key={option.slug} palette={option} mode={mode} />
            ))}
          </AriaRadioGroup>
        </div>
      </Section>
      <ScaleDetail palette={palette} mode={mode} />
    </div>
  );
}
