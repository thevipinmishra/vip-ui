import { contrast } from "@/lib/color";
import {
  findPalette,
  type Palette,
  type PaletteMode,
  type PaletteStep,
  paletteColor,
  palettes,
} from "@/lib/palettes";

export const colorTokens = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "success",
  "success-subtle",
  "success-foreground",
  "warning",
  "warning-subtle",
  "warning-foreground",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "chart-6",
] as const;

export type ColorToken = (typeof colorTokens)[number];
export type TokenSource = { palette: Palette; step: PaletteStep };
export type ModeTokens = Record<ColorToken, string>;

export interface Theme {
  slug: string;
  name: string;
  description: string;
  palette: Palette;
  neutral: Palette;
  sources: Record<PaletteMode, Record<ColorToken, TokenSource>>;
  light: ModeTokens;
  dark: ModeTokens;
}

const chartOrder = [
  "blue",
  "teal",
  "orange",
  "pink",
  "violet",
  "green",
  "cyan",
  "red",
];

function hue(palette: Palette) {
  return Number(palette.light[8].match(/([\d.]+)\)$/)?.[1] ?? 0);
}

function hueDistance(a: Palette, b: Palette) {
  const distance = Math.abs(hue(a) - hue(b)) % 360;
  return Math.min(distance, 360 - distance);
}

function themeSources(
  accent: Palette,
  mode: PaletteMode,
): Record<ColorToken, TokenSource> {
  const base = findPalette(accent.neutral);
  const red = findPalette("red");
  const green = findPalette("green");
  const orange = findPalette("orange");
  const mono = accent.kind === "neutral";
  const light = mode === "light";
  const from = (palette: Palette, step: PaletteStep) => ({ palette, step });
  const [chart2, chart3, chart4, chart5, chart6] = chartOrder
    .map(findPalette)
    .filter(
      (palette) =>
        palette.slug !== accent.slug &&
        (mono || hueDistance(palette, accent) >= 30),
    )
    .map((palette) => from(palette, 9));

  return {
    background: from(base, light ? 2 : 1),
    foreground: from(base, 12),
    card: from(base, light ? 1 : 2),
    "card-foreground": from(base, 12),
    popover: from(base, light ? 1 : 3),
    "popover-foreground": from(base, 12),
    primary: from(accent, mono ? 12 : 9),
    "primary-foreground": from(accent, mono ? 1 : accent.solidText[mode]),
    secondary: from(base, light ? 3 : 4),
    "secondary-foreground": from(base, 12),
    muted: from(base, light ? 3 : 4),
    "muted-foreground": from(base, 11),
    accent: from(base, light ? 4 : 5),
    "accent-foreground": from(base, 12),
    destructive: from(red, 9),
    "destructive-foreground": from(red, red.solidText[mode]),
    border: from(base, 6),
    input: from(base, 7),
    ring: from(accent, 9),
    success: from(green, 9),
    "success-subtle": from(green, 3),
    "success-foreground": from(green, 11),
    warning: from(orange, 9),
    "warning-subtle": from(orange, 3),
    "warning-foreground": from(orange, 11),
    "chart-1": from(accent, mono ? 11 : 9),
    "chart-2": chart2,
    "chart-3": chart3,
    "chart-4": chart4,
    "chart-5": chart5,
    "chart-6": chart6,
  };
}

function resolve(
  sources: Record<ColorToken, TokenSource>,
  mode: PaletteMode,
): ModeTokens {
  return Object.fromEntries(
    colorTokens.map((token) => [
      token,
      paletteColor(sources[token].palette, mode, sources[token].step),
    ]),
  ) as ModeTokens;
}

function createTheme(palette: Palette): Theme {
  const neutral = findPalette(palette.neutral);
  const sources = {
    light: themeSources(palette, "light"),
    dark: themeSources(palette, "dark"),
  };
  return {
    slug: palette.slug,
    name: palette.name,
    description:
      palette.kind === "neutral"
        ? `${palette.name} only, with a high-contrast primary.`
        : `${palette.name} primary on ${neutral.name} neutrals.`,
    palette,
    neutral,
    sources,
    light: resolve(sources.light, "light"),
    dark: resolve(sources.dark, "dark"),
  };
}

export const themes: readonly Theme[] = palettes
  .filter((palette) =>
    palette.kind === "neutral"
      ? palette.slug === "gray"
      : palette.solidText.light === 1,
  )
  .map(createTheme);

export const ringStyles = ["accent", "neutral"] as const;
export type RingStyle = (typeof ringStyles)[number];

export function findRingStyle(value: string | undefined) {
  return ringStyles.find((style) => style === value);
}

export function withRing(theme: Theme, ring: RingStyle): Theme {
  if (ring === "accent") return theme;
  const source = { palette: theme.neutral, step: 11 } as const;
  const mode = (name: PaletteMode) => ({
    sources: { ...theme.sources[name], ring: source },
    tokens: { ...theme[name], ring: paletteColor(theme.neutral, name, 11) },
  });
  const light = mode("light");
  const dark = mode("dark");
  return {
    ...theme,
    sources: { light: light.sources, dark: dark.sources },
    light: light.tokens,
    dark: dark.tokens,
  };
}

export type CheckKind = "text" | "ui";

export interface ThemeCheck {
  kind: CheckKind;
  label: string;
  foreground: ColorToken;
  background: ColorToken;
  minimum: number;
}

const surfaces: ColorToken[] = ["background", "card", "popover"];
const fills: ColorToken[] = ["muted", "accent"];

const on = (
  kind: CheckKind,
  label: string,
  foreground: ColorToken,
  backgrounds: ColorToken[],
): ThemeCheck[] =>
  backgrounds.map((background) => ({
    kind,
    label,
    foreground,
    background,
    minimum: kind === "text" ? 4.5 : 3,
  }));

export const themeChecks: readonly ThemeCheck[] = [
  ...on("text", "Text", "foreground", [...surfaces, ...fills, "secondary"]),
  ...on("text", "Secondary text", "muted-foreground", [...surfaces, ...fills]),
  ...on("text", "Primary button", "primary-foreground", ["primary"]),
  ...on("text", "Destructive button", "destructive-foreground", [
    "destructive",
  ]),
  ...on("text", "Destructive button", "background", ["destructive"]),
  ...on("text", "Primary text", "primary", ["background", "card"]),
  ...on("text", "Error text", "destructive", surfaces),
  ...on("text", "Success text", "success-foreground", [
    "success-subtle",
    "background",
    "card",
  ]),
  ...on("text", "Warning text", "warning-foreground", [
    "warning-subtle",
    "background",
    "card",
  ]),
  ...on("ui", "Focus ring", "ring", [...surfaces, ...fills]),
  ...on("ui", "Selected control", "primary", [...surfaces, "muted"]),
  ...on("ui", "Status icon", "success", ["background", "card"]),
  ...on("ui", "Status icon", "warning", ["background", "card"]),
  ...on("ui", "Status icon", "destructive", ["background", "card"]),
  ...(
    ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "chart-6"] as const
  ).flatMap((token) => on("ui", "Chart series", token, ["card"])),
];

export function checkRatio(theme: Theme, mode: PaletteMode, check: ThemeCheck) {
  return contrast(theme[mode][check.foreground], theme[mode][check.background]);
}

export function findTheme(slug: string | undefined) {
  return themes.find((theme) => theme.slug === slug);
}

function sidebarTokens(tokens: ModeTokens, mode: PaletteMode) {
  return {
    sidebar: mode === "light" ? tokens.background : tokens.card,
    "sidebar-foreground": tokens.foreground,
    "sidebar-primary": tokens.primary,
    "sidebar-primary-foreground": tokens["primary-foreground"],
    "sidebar-accent": tokens.accent,
    "sidebar-accent-foreground": tokens["accent-foreground"],
    "sidebar-border": tokens.border,
    "sidebar-ring": tokens.ring,
  };
}

function modeVariables(theme: Theme, mode: PaletteMode) {
  const tokens = theme[mode];
  return { ...tokens, ...sidebarTokens(tokens, mode) };
}

function block(
  selector: string,
  variables: Record<string, string>,
  separator = "\n",
) {
  const indent = separator === "\n" ? "  " : "";
  return `${selector} {${separator}${Object.entries(variables)
    .map(([name, value]) => `${indent}--${name}: ${value};`)
    .join(separator)}${separator}}`;
}

export const defaultRadius = "0.625rem";

export const radiusOptions = [
  "0rem",
  "0.25rem",
  "0.5rem",
  defaultRadius,
  "0.75rem",
  "1rem",
] as const;

export function findRadius(value: string | undefined) {
  return radiusOptions.find((option) => option === `${value}rem`);
}

export function themeCss(theme: Theme, radius = defaultRadius) {
  const light = modeVariables(theme, "light");
  return `${block(":root", radius === defaultRadius ? light : { ...light, radius })}

${block(".dark", modeVariables(theme, "dark"))}
`;
}

export function pageThemeCss(theme: Theme) {
  const code = {
    code: "color-mix(in oklab, var(--muted) 70%, var(--card))",
    "code-foreground": "var(--foreground)",
  };
  return [
    block(":root", { ...modeVariables(theme, "light"), ...code }, ""),
    block(".dark", modeVariables(theme, "dark"), ""),
  ].join("");
}

export const specimenCss = themes
  .map((theme) => {
    const selector = `[data-specimen="${theme.slug}"]`;
    return `${selector}{--primary:${theme.light.primary};}.dark ${selector}{--primary:${theme.dark.primary};}`;
  })
  .join("");
