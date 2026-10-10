import { GeistMono } from "geist/font/mono";
import {
  Bricolage_Grotesque,
  Figtree,
  Fraunces,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Instrument_Sans,
  Instrument_Serif,
  Inter_Tight,
  JetBrains_Mono,
  Manrope,
  Space_Mono,
} from "next/font/google";
import {
  type FontRole,
  modeVariables,
  type OfficialTheme,
  officialThemes,
  rootVariables,
} from "./official-themes";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  preload: false,
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  preload: false,
});
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], preload: false });
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  preload: false,
});
const figtree = Figtree({ subsets: ["latin"], preload: false });
const manrope = Manrope({ subsets: ["latin"], preload: false });
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  preload: false,
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  preload: false,
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
});
const interTight = Inter_Tight({ subsets: ["latin"], preload: false });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], preload: false });

const loadedFamilies: Record<string, string> = {
  "Instrument Sans": instrumentSans.style.fontFamily,
  "Instrument Serif": instrumentSerif.style.fontFamily,
  "IBM Plex Sans": ibmPlexSans.style.fontFamily,
  "IBM Plex Mono": ibmPlexMono.style.fontFamily,
  Figtree: figtree.style.fontFamily,
  Manrope: manrope.style.fontFamily,
  Fraunces: fraunces.style.fontFamily,
  "Bricolage Grotesque": bricolage.style.fontFamily,
  "Space Mono": spaceMono.style.fontFamily,
  "Inter Tight": interTight.style.fontFamily,
  "JetBrains Mono": jetBrainsMono.style.fontFamily,
  "Geist Mono": GeistMono.style.fontFamily,
};

const fallbacks: Record<FontRole, string> = {
  sans: "ui-sans-serif, system-ui, sans-serif",
  serif: "ui-serif, Georgia, serif",
  mono: "ui-monospace, monospace",
};

export function loadedFamily(name: string, role: FontRole) {
  const family = loadedFamilies[name];
  if (!family) throw new Error(`Load ${name} in theme-fonts.ts`);
  return `${family}, ${fallbacks[role]}`;
}

function declarations(variables: Record<string, string | number>) {
  return Object.entries(variables)
    .map(([name, value]) => `--${name}: ${value};`)
    .join("");
}

function pageVariables(theme: OfficialTheme) {
  return {
    "theme-display-family":
      theme.display.role === "serif" ? "var(--font-serif)" : "var(--font-sans)",
    "theme-display-weight": theme.display.weight,
    "theme-display-tracking": theme.display.tracking,
    code: "color-mix(in oklab, var(--muted) 70%, var(--card))",
    "code-foreground": "var(--foreground)",
    "font-geist-sans": "var(--font-sans)",
    "font-geist-mono": "var(--font-mono)",
  };
}

export function pageThemeCss(theme: OfficialTheme) {
  return `:root{${declarations({
    ...rootVariables(theme, loadedFamily),
    ...modeVariables(theme, "light"),
    ...pageVariables(theme),
  })}}.dark{${declarations(modeVariables(theme, "dark"))}}`;
}

export const specimenCss = officialThemes
  .map((theme) => {
    const selector = `[data-specimen="${theme.slug}"]`;
    const sans = loadedFamily(theme.fonts.sans, "sans");
    return `${selector}{${declarations(theme.light)}font-family:${sans};}.dark ${selector}{${declarations(theme.dark)}}`;
  })
  .join("");
