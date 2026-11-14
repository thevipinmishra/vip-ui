"use client";

import { CaretUpDownIcon } from "@phosphor-icons/react";
import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import { CodeFrame } from "@/components/docs/code-frame";
import { CodeSnippet } from "@/components/docs/code-snippet";
import { sectionTitleClass } from "@/components/docs/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSection,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";
import { fontFamilies } from "./font-loaders";
import { type FontOption, findFont, monoFonts, textFonts } from "./fonts";
import {
  findPreset,
  fontSetup,
  matchesPreset,
  nearestStep,
  type PresetId,
  presetCss,
  presetMarkup,
  presets,
  type SampleId,
  type ScaleStep,
  sanitizeName,
  scales,
  settingsFromSearch,
  type TypographySettings,
  writeSearch,
} from "./presets";

const panelClass =
  "docs-tab-panel mt-4 min-w-0 rounded-none bg-transparent p-0 shadow-none ring-0";
const surfaceClass =
  "rounded-2xl bg-card shadow-(--shadow-card) ring-1 ring-border/60";
const controlsSticky =
  "lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:max-h-[calc(100dvh-var(--header-height)-2rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain";
const codeSticky =
  "min-[87.5rem]:sticky min-[87.5rem]:top-[calc(var(--header-height)+1rem)] min-[87.5rem]:max-h-[calc(100dvh-var(--header-height)-2rem)] min-[87.5rem]:self-start min-[87.5rem]:overflow-y-auto min-[87.5rem]:overscroll-contain";
const detailClass =
  "text-muted-foreground tabular-nums group-selected/item:text-accent-foreground";
const sampleIds = ["docs", "chat", "article"] as const;
const textGroups = [
  { title: "Sans serif", fonts: textFonts.filter((f) => f.kind === "sans") },
  { title: "Serif", fonts: textFonts.filter((f) => f.kind === "serif") },
];

function fontFace(id: string): CSSProperties {
  return { fontFamily: fontFamilies[id] };
}

function presetSummary(settings: TypographySettings) {
  return [
    findFont(settings.body).name,
    `${settings.size}px`,
    settings.measure === null ? "Full width" : `${settings.measure}ch`,
  ].join(" · ");
}

function Picker({
  label,
  selectedKey,
  onChange,
  value,
  className,
  children,
}: {
  label: string;
  selectedKey: string | null;
  onChange: (key: string) => void;
  value: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Select
      selectedKey={selectedKey}
      onSelectionChange={(key) => key !== null && onChange(String(key))}
      className={className}
    >
      <SelectLabel className="sr-only">{label}</SelectLabel>
      <SelectTrigger className="min-h-14 gap-3 py-2 pe-3">
        <span className="grid min-w-0 flex-1 text-start">
          <span
            aria-hidden="true"
            className="truncate text-xs leading-4 text-muted-foreground"
          >
            {label}
          </span>
          <SelectValue className="text-sm leading-5 font-medium data-[placeholder]:text-foreground">
            {value}
          </SelectValue>
        </span>
        <CaretUpDownIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground"
        />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}

function StepItem({ step }: { step: ScaleStep }) {
  return (
    <SelectItem id={String(step.value)} textValue={step.name}>
      <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
        <span className="truncate">{step.name}</span>
        {step.detail && (
          <span className={`text-xs ${detailClass}`}>{step.detail}</span>
        )}
      </span>
    </SelectItem>
  );
}

function stepValue(step: ScaleStep) {
  return (
    <>
      {step.name}
      {step.detail && (
        <span className="font-normal text-muted-foreground">
          {" "}
          {step.detail}
        </span>
      )}
    </>
  );
}

function FontItem({ font }: { font: FontOption }) {
  return (
    <SelectItem id={font.id} textValue={font.name}>
      <span className="min-w-0 truncate" style={fontFace(font.id)}>
        {font.name}
      </span>
    </SelectItem>
  );
}

function FontPicker({
  label,
  value,
  onChange,
  mono,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  mono?: boolean;
  className?: string;
}) {
  return (
    <Picker
      label={label}
      className={className}
      selectedKey={value}
      onChange={onChange}
      value={<span style={fontFace(value)}>{findFont(value).name}</span>}
    >
      {mono
        ? monoFonts.map((font) => <FontItem key={font.id} font={font} />)
        : textGroups.map((group) => (
            <SelectSection key={group.title} title={group.title}>
              {group.fonts.map((font) => (
                <FontItem key={font.id} font={font} />
              ))}
            </SelectSection>
          ))}
    </Picker>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="grid min-w-0 gap-3">
      <h3 className="flex items-center gap-2.5 text-sm font-medium">
        <span
          aria-hidden="true"
          className="grid size-5 shrink-0 place-items-center rounded-full bg-muted text-xs text-muted-foreground tabular-nums"
        >
          {number}
        </span>
        {title}
      </h3>
      {children}
    </li>
  );
}

export function TypographyStudio({
  samples,
  install,
  guide,
}: {
  samples: Record<SampleId, ReactNode>;
  install: ReactNode;
  guide: ReactNode;
}) {
  const [presetId, setPresetId] = useState<PresetId | null>("docs");
  const [settings, setSettings] = useState<TypographySettings>({
    ...presets[0].settings,
  });
  const [sample, setSample] = useState<SampleId>("docs");
  const [restored, setRestored] = useState(false);
  const css = presetCss(settings);
  const markup = presetMarkup(settings);
  const fonts = fontSetup(settings);
  const preset = presetId ? findPreset(presetId) : undefined;
  const modified = preset ? !matchesPreset(settings, preset) : true;
  const leading = nearestStep("leading", settings.leading);
  const flow = nearestStep("flow", settings.flow);

  useEffect(() => {
    const state = settingsFromSearch(
      new URLSearchParams(window.location.search),
    );
    if (state) {
      setPresetId(state.presetId);
      setSettings(state.settings);
      const match = state.presetId ? findPreset(state.presetId) : undefined;
      if (match) setSample(match.sample);
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    const timeout = window.setTimeout(() => {
      const url = new URL(window.location.href);
      writeSearch(url, presetId, settings);
      if (url.href !== window.location.href)
        window.history.replaceState(window.history.state, "", url);
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [restored, presetId, settings]);

  function update(next: Partial<TypographySettings>) {
    setSettings((current) => ({ ...current, ...next }));
  }

  function applyPreset(id: string) {
    const next = findPreset(id);
    if (!next) return;
    setPresetId(next.id);
    setSettings({ ...next.settings });
    setSample(next.sample);
  }

  return (
    <div className="site-container grid min-w-0 grid-cols-[minmax(0,1fr)] gap-6 pt-6 lg:grid-cols-[16rem_minmax(0,1fr)] min-[87.5rem]:grid-cols-[16rem_minmax(0,1fr)_22rem]">
      <style>{presetCss(settings, ".typography-studio")}</style>

      <header className="grid min-w-0 gap-1 lg:col-start-2 lg:row-start-1">
        <h1 className={sectionTitleClass}>Typography</h1>
        <p className="text-sm leading-6 text-pretty text-muted-foreground">
          Style HTML and rendered markdown with one CSS file. Pick a preset,
          change what you need, and copy the code.
        </p>
      </header>

      <aside
        aria-label="Typography settings"
        className={`${surfaceClass} grid min-w-0 grid-cols-2 gap-2 p-3 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:grid-cols-1 ${controlsSticky}`}
      >
        <Picker
          label="Preset"
          className="col-span-full"
          selectedKey={modified ? null : (presetId ?? null)}
          onChange={applyPreset}
          value={
            preset ? (
              <>
                {preset.name}
                {modified && (
                  <span className="font-normal text-muted-foreground">
                    , edited
                  </span>
                )}
              </>
            ) : (
              "Custom"
            )
          }
        >
          {presets.map((item) => (
            <SelectItem key={item.id} id={item.id} textValue={item.name}>
              <span className="grid min-w-0 flex-1">
                <span className="truncate">{item.name}</span>
                <span className={`truncate text-xs ${detailClass}`}>
                  {presetSummary(item.settings)}
                </span>
              </span>
            </SelectItem>
          ))}
        </Picker>

        <div
          aria-hidden="true"
          className="col-span-full my-1 h-px bg-border/60"
        />

        <FontPicker
          label="Headings"
          value={settings.heading}
          onChange={(heading) => update({ heading })}
        />
        <FontPicker
          label="Body"
          value={settings.body}
          onChange={(body) => update({ body })}
        />
        <FontPicker
          label="Code"
          mono
          className="max-lg:col-span-full"
          value={settings.mono}
          onChange={(mono) => update({ mono })}
        />

        <div
          aria-hidden="true"
          className="col-span-full my-1 h-px bg-border/60"
        />

        <Picker
          label="Size"
          selectedKey={String(settings.size)}
          onChange={(key) => update({ size: Number(key) })}
          value={`${settings.size}px`}
        >
          {scales.size.map((step) => (
            <StepItem key={step.value} step={step} />
          ))}
        </Picker>
        <Picker
          label="Line height"
          selectedKey={String(leading.value)}
          onChange={(key) => update({ leading: Number(key) })}
          value={stepValue(leading)}
        >
          {scales.leading.map((step) => (
            <StepItem key={step.value} step={step} />
          ))}
        </Picker>
        <Picker
          label="Spacing"
          selectedKey={String(flow.value)}
          onChange={(key) => update({ flow: Number(key) })}
          value={stepValue(flow)}
        >
          {scales.flow.map((step) => (
            <StepItem key={step.value} step={step} />
          ))}
        </Picker>
        <Picker
          label="Line length"
          selectedKey={
            settings.measure === null ? "none" : String(settings.measure)
          }
          onChange={(key) =>
            update({ measure: key === "none" ? null : Number(key) })
          }
          value={
            settings.measure === null ? "Full width" : `${settings.measure}ch`
          }
        >
          {scales.measure.map((step) => (
            <StepItem key={step.value} step={step} />
          ))}
          <SelectItem id="none" textValue="Full width">
            Full width
          </SelectItem>
        </Picker>
      </aside>

      <Tabs
        value={sample}
        onValueChange={(value) => setSample(value as SampleId)}
        className="min-w-0 lg:col-start-2 lg:row-start-2"
      >
        <TabList aria-label="Preview content">
          <Tab id="docs">Docs</Tab>
          <Tab id="chat">Chat</Tab>
          <Tab id="article">Article</Tab>
        </TabList>
        {sampleIds.map((id) => (
          <TabPanel key={id} id={id} className={panelClass}>
            <div
              className={`${surfaceClass} min-w-0 px-5 py-8 sm:px-8 sm:py-10`}
            >
              <div
                className={
                  id === "chat"
                    ? "mx-auto w-full max-w-2xl min-w-0"
                    : "mx-auto w-fit max-w-full min-w-0"
                }
              >
                {samples[id]}
              </div>
            </div>
          </TabPanel>
        ))}
      </Tabs>

      <aside
        id="install"
        aria-labelledby="install-title"
        className={`${surfaceClass} grid min-w-0 scroll-mt-[calc(var(--header-height)+1rem)] content-start gap-6 p-5 lg:col-start-2 lg:row-start-3 min-[87.5rem]:col-start-3 min-[87.5rem]:row-span-3 min-[87.5rem]:row-start-1 ${codeSticky}`}
      >
        <h2 id="install-title" className="text-base font-semibold">
          Install
        </h2>
        <ol className="grid min-w-0 gap-7">
          <Step number={1} title="Add the styles">
            {install}
          </Step>
          <Step number={2} title="Load the fonts">
            <CodeFrame code={fonts} filename="app/layout.tsx" previewCode>
              <CodeSnippet code={fonts} language="tsx" />
            </CodeFrame>
          </Step>
          <Step number={3} title="Add the preset">
            <TextField
              size="sm"
              value={settings.name}
              onChange={(name) => update({ name: sanitizeName(name) })}
              className="flex-row items-center gap-3"
            >
              <TextFieldLabel className="shrink-0">Class name</TextFieldLabel>
              <TextFieldInput className="min-w-0 flex-1" />
            </TextField>
            <CodeFrame code={css} filename="globals.css">
              <CodeSnippet code={css} language="css" />
            </CodeFrame>
          </Step>
          <Step number={4} title="Wrap the content">
            <CodeFrame code={markup} filename="article.tsx">
              <CodeSnippet code={markup} language="tsx" />
            </CodeFrame>
          </Step>
        </ol>
        {guide}
      </aside>
    </div>
  );
}
