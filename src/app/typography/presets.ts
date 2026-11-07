import { findFont, fontOptions } from "./fonts";

export type SampleId = "docs" | "chat" | "article";

export interface TypographySettings {
  name: string;
  body: string;
  heading: string;
  mono: string;
  size: number;
  leading: number;
  flow: number;
  measure: number | null;
}

export const presets = [
  {
    id: "docs",
    sample: "docs",
    name: "Docs",
    settings: {
      name: "docs",
      body: "geist",
      heading: "geist",
      mono: "geist-mono",
      size: 15,
      leading: 1.75,
      flow: 1.25,
      measure: 72,
    },
  },
  {
    id: "chat",
    sample: "chat",
    name: "Chat",
    settings: {
      name: "chat",
      body: "geist",
      heading: "geist",
      mono: "geist-mono",
      size: 14,
      leading: 1.6,
      flow: 1,
      measure: null,
    },
  },
  {
    id: "reading",
    sample: "article",
    name: "Reading",
    settings: {
      name: "reading",
      body: "newsreader",
      heading: "newsreader",
      mono: "jetbrains-mono",
      size: 19,
      leading: 1.6,
      flow: 1.25,
      measure: 65,
    },
  },
  {
    id: "compact",
    sample: "docs",
    name: "Compact",
    settings: {
      name: "compact",
      body: "inter",
      heading: "inter",
      mono: "jetbrains-mono",
      size: 14,
      leading: 1.5,
      flow: 0.875,
      measure: null,
    },
  },
] as const satisfies readonly {
  id: string;
  sample: SampleId;
  name: string;
  settings: TypographySettings;
}[];

export type PresetId = (typeof presets)[number]["id"];

export function findPreset(id: string) {
  return presets.find((preset) => preset.id === id);
}

export interface ScaleStep {
  value: number;
  name: string;
  detail?: string;
}

export const scales = {
  size: [13, 14, 15, 16, 17, 18, 19, 20].map((value) => ({
    value,
    name: `${value}px`,
  })),
  leading: [
    { value: 1.5, name: "Tight", detail: "1.5" },
    { value: 1.6, name: "Snug", detail: "1.6" },
    { value: 1.75, name: "Regular", detail: "1.75" },
    { value: 1.9, name: "Loose", detail: "1.9" },
  ],
  flow: [
    { value: 0.875, name: "Tight", detail: "0.875em" },
    { value: 1, name: "Snug", detail: "1em" },
    { value: 1.25, name: "Regular", detail: "1.25em" },
    { value: 1.5, name: "Loose", detail: "1.5em" },
  ],
  measure: [60, 65, 72, 80].map((value) => ({ value, name: `${value}ch` })),
} satisfies Record<string, ScaleStep[]>;

export function nearestStep(key: keyof typeof scales, value: number) {
  return scales[key].reduce((best, step) =>
    Math.abs(step.value - value) < Math.abs(best.value - value) ? step : best,
  );
}

export function sanitizeName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+/, "");
}

export function matchesPreset(
  settings: TypographySettings,
  preset: { settings: TypographySettings },
) {
  return (Object.keys(preset.settings) as (keyof TypographySettings)[]).every(
    (key) => settings[key] === preset.settings[key],
  );
}

const fontKeys = ["body", "heading", "mono"] as const;
const numberKeys = ["size", "leading", "flow"] as const;
const searchKeys = ["preset", "name", ...fontKeys, ...numberKeys, "measure"];

function parseNumber(value: string | null, key: keyof typeof scales) {
  if (value === null || value.trim() === "") return undefined;
  const number = Number(value);
  if (!Number.isFinite(number)) return undefined;
  return nearestStep(key, number).value;
}

function parseFont(value: string | null, key: (typeof fontKeys)[number]) {
  const font = fontOptions.find((option) => option.id === value);
  if (!font) return undefined;
  return (font.kind === "mono") === (key === "mono") ? font.id : undefined;
}

export function settingsFromSearch(params: URLSearchParams) {
  if (!searchKeys.some((key) => params.has(key))) return null;
  const preset = findPreset(params.get("preset") ?? "");
  const settings: TypographySettings = {
    ...(preset ?? presets[0]).settings,
  };
  for (const key of fontKeys) {
    settings[key] = parseFont(params.get(key), key) ?? settings[key];
  }
  for (const key of numberKeys) {
    settings[key] = parseNumber(params.get(key), key) ?? settings[key];
  }
  const measure = params.get("measure");
  if (measure === "none") settings.measure = null;
  else settings.measure = parseNumber(measure, "measure") ?? settings.measure;
  const name = params.get("name");
  if (name !== null) settings.name = sanitizeName(name);
  return { presetId: preset?.id ?? null, settings };
}

export function writeSearch(
  url: URL,
  presetId: PresetId | null,
  settings: TypographySettings,
) {
  for (const key of searchKeys) url.searchParams.delete(key);
  const preset = presetId ? findPreset(presetId) : undefined;
  if (preset?.id === presets[0].id && matchesPreset(settings, preset)) return;
  if (preset) url.searchParams.set("preset", preset.id);
  if (preset && matchesPreset(settings, preset)) return;
  url.searchParams.set("name", settings.name);
  for (const key of fontKeys) url.searchParams.set(key, settings[key]);
  for (const key of numberKeys) url.searchParams.set(key, round(settings[key]));
  url.searchParams.set(
    "measure",
    settings.measure === null ? "none" : String(settings.measure),
  );
}

export function className(settings: TypographySettings) {
  return `typography-${settings.name || "custom"}`;
}

function round(value: number) {
  return Number(value.toFixed(3)).toString();
}

export function presetCss(settings: TypographySettings, selector?: string) {
  const declarations = [
    `--typography-font-body: var(${findFont(settings.body).variable});`,
    ...(settings.heading === settings.body
      ? []
      : [
          `--typography-font-heading: var(${findFont(settings.heading).variable});`,
        ]),
    `--typography-font-mono: var(${findFont(settings.mono).variable});`,
    `--typography-size: ${round(settings.size)}px;`,
    `--typography-leading: ${round(settings.leading)};`,
    `--typography-flow: ${round(settings.flow)}em;`,
    ...(settings.measure === null ? [] : [`max-width: ${settings.measure}ch;`]),
  ];
  return `${selector ?? `.${className(settings)}`} {\n${declarations
    .map((line) => `  ${line}`)
    .join("\n")}\n}`;
}

export function presetMarkup(settings: TypographySettings) {
  return `<article className="typography ${className(settings)}">
  {content}
</article>`;
}

function camel(value: string) {
  return value.replace(/-([a-z])/g, (_, letter: string) =>
    letter.toUpperCase(),
  );
}

export function fontSetup(settings: TypographySettings) {
  const used = [
    ...new Set([settings.body, settings.heading, settings.mono]),
  ].map(findFont);
  const google = used.filter((font) => font.source === "google");
  const imports = [
    ...(used.some((font) => font.source === "geist-mono")
      ? ['import { GeistMono } from "geist/font/mono";']
      : []),
    ...(used.some((font) => font.source === "geist-sans")
      ? ['import { GeistSans } from "geist/font/sans";']
      : []),
    ...(google.length
      ? [
          `import { ${google
            .map((font) => font.loader)
            .sort()
            .join(", ")} } from "next/font/google";`,
        ]
      : []),
  ];
  const loaders = google.map(
    (font) =>
      `const ${camel(font.id)} = ${font.loader}({\n  subsets: ["latin"],\n  variable: "${font.variable}",${
        font.loader.startsWith("IBM_Plex")
          ? `\n  weight: ${font.kind === "mono" ? '["400", "500"]' : '["400", "500", "600"]'},`
          : ""
      }\n});`,
  );
  const variables = used.map((font) =>
    font.source === "google"
      ? `\${${camel(font.id)}.variable}`
      : `\${${font.loader}.variable}`,
  );
  return `${imports.join("\n")}
${loaders.length ? `\n${loaders.join("\n\n")}\n` : ""}
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={\`${variables.join(" ")}\`}>
      <body>{children}</body>
    </html>
  );
}`;
}
