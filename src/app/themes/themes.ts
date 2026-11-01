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

function themeSources(
  accent: Palette,
  mode: PaletteMode,
): Record<ColorToken, TokenSource> {
  const gray = findPalette("gray");
  const red = findPalette("red");
  const green = findPalette("green");
  const orange = findPalette("orange");
  const neutral = accent.slug === "gray";
  const light = mode === "light";
  const from = (palette: Palette, step: PaletteStep) => ({ palette, step });
  const [chart2, chart3, chart4, chart5, chart6] = chartOrder
    .filter((slug) => slug !== accent.slug)
    .map((slug) => from(findPalette(slug), 9));

  return {
    background: from(gray, light ? 2 : 1),
    foreground: from(gray, 12),
    card: from(gray, light ? 1 : 2),
    "card-foreground": from(gray, 12),
    popover: from(gray, light ? 1 : 3),
    "popover-foreground": from(gray, 12),
    primary: from(accent, neutral ? 12 : 9),
    "primary-foreground": from(accent, neutral ? 1 : accent.solidText[mode]),
    secondary: from(gray, light ? 3 : 4),
    "secondary-foreground": from(gray, 12),
    muted: from(gray, light ? 3 : 4),
    "muted-foreground": from(gray, 11),
    accent: from(gray, light ? 4 : 5),
    "accent-foreground": from(gray, 12),
    destructive: from(red, 9),
    "destructive-foreground": from(red, red.solidText[mode]),
    border: from(gray, 6),
    input: from(gray, 7),
    ring: from(accent, 9),
    success: from(green, 9),
    "success-subtle": from(green, 3),
    "success-foreground": from(green, 11),
    warning: from(orange, 9),
    "warning-subtle": from(orange, 3),
    "warning-foreground": from(orange, 11),
    "chart-1": from(accent, neutral ? 11 : 9),
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
  const sources = {
    light: themeSources(palette, "light"),
    dark: themeSources(palette, "dark"),
  };
  return {
    slug: palette.slug,
    name: palette.name,
    description:
      palette.slug === "gray"
        ? "Gray only, with a high-contrast primary."
        : `${palette.name} primary on Gray neutrals.`,
    palette,
    sources,
    light: resolve(sources.light, "light"),
    dark: resolve(sources.dark, "dark"),
  };
}

export const themes: readonly Theme[] = palettes.map(createTheme);

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

export function themeCss(theme: Theme) {
  return `${block(":root", modeVariables(theme, "light"))}

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
