"use client";

import { useState } from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from "react-aria-components";
import { CopyButton } from "@/components/docs/copy-button";
import { ModeSwitch } from "@/components/docs/mode-switch";
import { withItemHighlight } from "@/components/ui/item-highlight";
import { contrast, contrastGrade, toHex } from "@/lib/color";
import {
  findPalette,
  type Palette,
  type PaletteMode,
  type PaletteStep,
  paletteColor,
  paletteCss,
  paletteGroups,
  paletteSteps,
  palettes,
  paletteVar,
} from "@/lib/palettes";
import { applySiteMode, currentSiteMode, useSiteMode } from "@/lib/site-mode";
import { updateSiteTheme } from "@/lib/update-site-theme";
import { cn } from "@/lib/utils";

const swatch =
  "shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--foreground)_8%,transparent)]";

const rowGrid =
  "grid grid-cols-12 gap-1 sm:grid-cols-[4.5rem_repeat(12,minmax(0,1fr))] sm:items-center sm:gap-1.5";

const stepNames = new Map(paletteSteps.map(({ step, name }) => [step, name]));

function ScaleOption({
  palette,
  mode,
}: {
  palette: Palette;
  mode: PaletteMode;
}) {
  return (
    <AriaRadio
      value={palette.slug}
      className="cursor-pointer rounded-lg border border-transparent px-2 py-2 text-muted-foreground outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint hover:text-foreground selected:border-border selected:bg-card selected:text-foreground selected:shadow-(--shadow-card) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 sm:py-1.5"
    >
      <span className={rowGrid}>
        <span className="col-span-12 mb-1.5 truncate text-sm font-medium sm:col-span-1 sm:mb-0">
          {palette.name}
        </span>
        {palette[mode].map((value, index) => (
          <span
            key={paletteVar(palette.slug, index + 1)}
            aria-hidden="true"
            className={cn("h-8 rounded-[5px] sm:h-9", swatch)}
            style={{ backgroundColor: value }}
          />
        ))}
      </span>
    </AriaRadio>
  );
}

function ContrastPairs({
  palette,
  mode,
}: {
  palette: Palette;
  mode: PaletteMode;
}) {
  const pairs: { label: string; surface: PaletteStep; text: PaletteStep }[] = [
    { label: "Solid", surface: 9, text: palette.solidText[mode] },
    { label: "Text", surface: 2, text: 11 },
    { label: "Strong text", surface: 1, text: 12 },
  ];
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,11rem),1fr))] gap-3">
      {pairs.map((pair) => {
        const surface = paletteColor(palette, mode, pair.surface);
        const text = paletteColor(palette, mode, pair.text);
        const ratio = contrast(text, surface);
        return (
          <li
            key={pair.label}
            className="overflow-hidden rounded-xl bg-card ring-1 ring-border/70"
          >
            <div
              className="flex h-20 items-end justify-between gap-2 p-3"
              style={{ backgroundColor: surface, color: text }}
            >
              <span className="text-2xl leading-none font-semibold tracking-[-0.03em]">
                Aa
              </span>
              <span className="rounded-full bg-[color-mix(in_oklab,currentColor_12%,transparent)] px-2 py-0.5 font-mono text-[11px] font-medium whitespace-nowrap">
                {ratio.toFixed(1)} · {contrastGrade(ratio)}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2 px-3 py-2.5">
              <p className="truncate text-sm font-medium">{pair.label}</p>
              <p className="shrink-0 font-mono text-[11px] text-muted-foreground">
                {pair.text} on {pair.surface}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function StepItem({
  palette,
  mode,
  step,
}: {
  palette: Palette;
  mode: PaletteMode;
  step: PaletteStep;
}) {
  const value = paletteColor(palette, mode, step);
  const variable = paletteVar(palette.slug, step);
  return (
    <li className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden="true"
        className={cn("size-10 shrink-0 rounded-lg", swatch)}
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          <span className="me-1.5 font-mono text-xs text-muted-foreground tabular-nums">
            {step}
          </span>
          {stepNames.get(step)}
        </p>
        <p
          className="truncate font-mono text-[11px] text-muted-foreground"
          title={`${value} ${toHex(value)}`}
        >
          {variable}
        </p>
      </div>
      <CopyButton
        code={value}
        label={`Copy ${variable}`}
        iconOnly
        variant="ghost"
        className="size-8 shrink-0"
      />
    </li>
  );
}

export function ColorScales() {
  const mode = useSiteMode();
  const [slug, setSlug] = useState("blue");
  const palette = findPalette(slug);

  function selectMode(next: PaletteMode) {
    if (next === currentSiteMode()) return;
    updateSiteTheme(() => applySiteMode(next));
  }

  return (
    <div className="grid gap-14">
      <section aria-labelledby="scales-title" className="grid gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="grid gap-1">
            <h2
              id="scales-title"
              className="text-2xl font-semibold tracking-[-0.045em]"
            >
              Scales
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Select a scale to see its steps. The steps show in {mode} mode.
            </p>
          </div>
          <ModeSwitch mode={mode} onChange={selectMode} />
        </div>
        <div className="grid gap-1 rounded-2xl bg-secondary/60 p-1.5 ring-1 ring-border/70 sm:p-2">
          <div
            aria-hidden="true"
            className={cn(
              rowGrid,
              "px-[calc(0.5rem+1px)] pt-1 font-mono text-[11px] text-muted-foreground tabular-nums",
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
      </section>

      <section aria-labelledby="scale-title" className="grid gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="grid gap-1">
            <h2
              id="scale-title"
              className="text-2xl font-semibold tracking-[-0.045em]"
            >
              {palette.name}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {palette.description}
            </p>
          </div>
          <CopyButton
            code={paletteCss([palette])}
            label={`Copy ${palette.name} CSS`}
            text={`Copy ${palette.name}`}
          />
        </div>
        <ContrastPairs palette={palette} mode={mode} />
        <div className="grid overflow-hidden rounded-2xl bg-card ring-1 ring-border/70">
          {paletteGroups.map((group) => (
            <div
              key={group.name}
              className="grid gap-4 border-t border-border/70 p-4 first:border-t-0 sm:p-5 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8"
            >
              <div className="grid content-start gap-1">
                <h3 className="text-sm font-semibold">
                  {group.name}
                  <span className="ms-2 font-mono text-xs font-normal text-muted-foreground">
                    {group.steps[0]}–{group.steps[group.steps.length - 1]}
                  </span>
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {group.use}
                </p>
              </div>
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,13rem),1fr))] gap-x-6 gap-y-3">
                {group.steps.map((step) => (
                  <StepItem
                    key={step}
                    palette={palette}
                    mode={mode}
                    step={step}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
