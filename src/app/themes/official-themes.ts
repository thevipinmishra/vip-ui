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

export const shadowTokens = [
  "shadow-card",
  "shadow-float",
  "shadow-inset",
] as const;

export type ColorToken = (typeof colorTokens)[number];
export type ShadowToken = (typeof shadowTokens)[number];
export type ModeTokens = Record<ColorToken | ShadowToken, string>;
export type FontRole = "sans" | "serif" | "mono";

export interface OfficialTheme {
  slug: string;
  name: string;
  description: string;
  fonts: { sans: string; serif?: string; mono: string };
  display: { role: "sans" | "serif"; weight: number; tracking: string };
  radius: string;
  spacing: string;
  traits: { depth: string; density: string };
  light: ModeTokens;
  dark: ModeTokens;
}

export const defaultSpacing = "0.25rem";

export const officialThemes: OfficialTheme[] = [
  {
    slug: "atelier",
    name: "Atelier",
    description:
      "Ivory paper, espresso ink, and a terracotta accent, set in Instrument Sans with a serif for display.",
    fonts: {
      sans: "Instrument Sans",
      serif: "Instrument Serif",
      mono: "Geist Mono",
    },
    display: { role: "serif", weight: 400, tracking: "-0.015em" },
    radius: "0.5rem",
    spacing: "0.25rem",
    traits: {
      depth: "Soft, warm shadows",
      density: "Comfortable",
    },
    light: {
      background: "oklch(0.972 0.012 75)",
      foreground: "oklch(0.22 0.02 50)",
      card: "oklch(0.992 0.006 80)",
      "card-foreground": "oklch(0.22 0.02 50)",
      popover: "oklch(0.995 0.005 80)",
      "popover-foreground": "oklch(0.22 0.02 50)",
      primary: "oklch(0.53 0.145 38)",
      "primary-foreground": "oklch(0.985 0.01 75)",
      secondary: "oklch(0.935 0.016 72)",
      "secondary-foreground": "oklch(0.27 0.025 50)",
      muted: "oklch(0.945 0.014 72)",
      "muted-foreground": "oklch(0.49 0.025 55)",
      accent: "oklch(0.928 0.035 48)",
      "accent-foreground": "oklch(0.43 0.12 38)",
      destructive: "oklch(0.52 0.19 27)",
      "destructive-foreground": "oklch(0.985 0.01 75)",
      border: "oklch(0.875 0.018 70)",
      input: "oklch(0.82 0.022 70)",
      ring: "oklch(0.6 0.13 38)",
      success: "oklch(0.5 0.11 150)",
      "success-subtle": "oklch(0.94 0.035 150)",
      "success-foreground": "oklch(0.37 0.09 150)",
      warning: "oklch(0.62 0.13 72)",
      "warning-subtle": "oklch(0.95 0.05 85)",
      "warning-foreground": "oklch(0.42 0.1 62)",
      "chart-1": "oklch(0.6 0.14 38)",
      "chart-2": "oklch(0.58 0.08 150)",
      "chart-3": "oklch(0.64 0.12 75)",
      "chart-4": "oklch(0.55 0.07 240)",
      "chart-5": "oklch(0.5 0.09 340)",
      "chart-6": "oklch(0.6 0.04 60)",
      "shadow-card":
        "0 1px 2px oklch(0.3 0.04 50 / 0.06), 0 2px 6px -2px oklch(0.3 0.04 50 / 0.08)",
      "shadow-float":
        "0 2px 6px -2px oklch(0.3 0.04 50 / 0.08), 0 14px 32px -12px oklch(0.3 0.05 50 / 0.24)",
      "shadow-inset": "inset 0 1px 2px oklch(0.3 0.04 50 / 0.06)",
    },
    dark: {
      background: "oklch(0.175 0.012 55)",
      foreground: "oklch(0.94 0.012 75)",
      card: "oklch(0.212 0.014 55)",
      "card-foreground": "oklch(0.94 0.012 75)",
      popover: "oklch(0.238 0.016 55)",
      "popover-foreground": "oklch(0.94 0.012 75)",
      primary: "oklch(0.72 0.13 42)",
      "primary-foreground": "oklch(0.2 0.03 45)",
      secondary: "oklch(0.27 0.016 55)",
      "secondary-foreground": "oklch(0.92 0.012 75)",
      muted: "oklch(0.255 0.014 55)",
      "muted-foreground": "oklch(0.73 0.02 65)",
      accent: "oklch(0.3 0.045 42)",
      "accent-foreground": "oklch(0.87 0.075 50)",
      destructive: "oklch(0.69 0.17 27)",
      "destructive-foreground": "oklch(0.175 0.012 55)",
      border: "oklch(0.9 0.03 70 / 0.12)",
      input: "oklch(0.9 0.03 70 / 0.2)",
      ring: "oklch(0.72 0.12 42)",
      success: "oklch(0.75 0.12 150)",
      "success-subtle": "oklch(0.27 0.04 150)",
      "success-foreground": "oklch(0.86 0.09 150)",
      warning: "oklch(0.8 0.12 78)",
      "warning-subtle": "oklch(0.29 0.045 75)",
      "warning-foreground": "oklch(0.89 0.08 80)",
      "chart-1": "oklch(0.72 0.13 42)",
      "chart-2": "oklch(0.74 0.09 150)",
      "chart-3": "oklch(0.82 0.12 82)",
      "chart-4": "oklch(0.72 0.08 240)",
      "chart-5": "oklch(0.7 0.1 340)",
      "chart-6": "oklch(0.62 0.04 65)",
      "shadow-card":
        "0 1px 2px oklch(0 0 0 / 0.3), 0 2px 6px -2px oklch(0 0 0 / 0.3)",
      "shadow-float":
        "0 2px 6px -2px oklch(0 0 0 / 0.35), 0 14px 32px -12px oklch(0 0 0 / 0.6)",
      "shadow-inset": "inset 0 1px 2px oklch(0 0 0 / 0.2)",
    },
  },
  {
    slug: "signal",
    name: "Signal",
    description:
      "Cool slate, an electric cobalt, and IBM Plex, tuned for dense dashboards and developer tools.",
    fonts: { sans: "IBM Plex Sans", mono: "IBM Plex Mono" },
    display: { role: "sans", weight: 600, tracking: "-0.03em" },
    radius: "0.25rem",
    spacing: "0.23rem",
    traits: {
      depth: "Flat, hairline edges",
      density: "Compact",
    },
    light: {
      background: "oklch(0.975 0.004 255)",
      foreground: "oklch(0.2 0.02 262)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.2 0.02 262)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.2 0.02 262)",
      primary: "oklch(0.52 0.23 264)",
      "primary-foreground": "oklch(0.99 0.004 255)",
      secondary: "oklch(0.948 0.007 255)",
      "secondary-foreground": "oklch(0.25 0.02 262)",
      muted: "oklch(0.955 0.006 255)",
      "muted-foreground": "oklch(0.5 0.02 260)",
      accent: "oklch(0.948 0.022 264)",
      "accent-foreground": "oklch(0.45 0.2 264)",
      destructive: "oklch(0.55 0.21 25)",
      "destructive-foreground": "oklch(0.99 0.004 255)",
      border: "oklch(0.9 0.008 255)",
      input: "oklch(0.84 0.012 255)",
      ring: "oklch(0.6 0.2 264)",
      success: "oklch(0.56 0.12 162)",
      "success-subtle": "oklch(0.955 0.03 162)",
      "success-foreground": "oklch(0.4 0.09 162)",
      warning: "oklch(0.66 0.15 62)",
      "warning-subtle": "oklch(0.962 0.035 80)",
      "warning-foreground": "oklch(0.45 0.11 58)",
      "chart-1": "oklch(0.55 0.22 264)",
      "chart-2": "oklch(0.6 0.105 215)",
      "chart-3": "oklch(0.6 0.19 300)",
      "chart-4": "oklch(0.6 0.11 172)",
      "chart-5": "oklch(0.66 0.15 62)",
      "chart-6": "oklch(0.58 0.03 260)",
      "shadow-card": "0 1px 0 oklch(0.2 0.02 262 / 0.05)",
      "shadow-float":
        "0 0 0 1px oklch(0.2 0.02 262 / 0.04), 0 6px 16px -6px oklch(0.2 0.03 262 / 0.18)",
      "shadow-inset": "inset 0 1px 1px oklch(0.2 0.02 262 / 0.05)",
    },
    dark: {
      background: "oklch(0.155 0.012 262)",
      foreground: "oklch(0.95 0.006 255)",
      card: "oklch(0.19 0.014 262)",
      "card-foreground": "oklch(0.95 0.006 255)",
      popover: "oklch(0.215 0.016 262)",
      "popover-foreground": "oklch(0.95 0.006 255)",
      primary: "oklch(0.68 0.16 264)",
      "primary-foreground": "oklch(0.15 0.02 262)",
      secondary: "oklch(0.25 0.014 262)",
      "secondary-foreground": "oklch(0.94 0.006 255)",
      muted: "oklch(0.24 0.014 262)",
      "muted-foreground": "oklch(0.72 0.018 258)",
      accent: "oklch(0.28 0.06 264)",
      "accent-foreground": "oklch(0.86 0.06 264)",
      destructive: "oklch(0.69 0.19 25)",
      "destructive-foreground": "oklch(0.155 0.012 262)",
      border: "oklch(0.8 0.03 260 / 0.13)",
      input: "oklch(0.8 0.03 260 / 0.21)",
      ring: "oklch(0.7 0.15 264)",
      success: "oklch(0.74 0.14 162)",
      "success-subtle": "oklch(0.25 0.045 162)",
      "success-foreground": "oklch(0.85 0.1 162)",
      warning: "oklch(0.8 0.14 70)",
      "warning-subtle": "oklch(0.27 0.05 70)",
      "warning-foreground": "oklch(0.88 0.09 75)",
      "chart-1": "oklch(0.68 0.16 264)",
      "chart-2": "oklch(0.78 0.11 205)",
      "chart-3": "oklch(0.72 0.16 300)",
      "chart-4": "oklch(0.76 0.12 170)",
      "chart-5": "oklch(0.82 0.13 72)",
      "chart-6": "oklch(0.62 0.03 260)",
      "shadow-card": "0 1px 0 oklch(0 0 0 / 0.25)",
      "shadow-float":
        "0 0 0 1px oklch(0.8 0.03 260 / 0.06), 0 8px 20px -8px oklch(0 0 0 / 0.6)",
      "shadow-inset": "inset 0 1px 1px oklch(0 0 0 / 0.25)",
    },
  },
  {
    slug: "canopy",
    name: "Canopy",
    description:
      "Sage paper, forest ink, and friendly Figtree, with rounded shapes and room to breathe.",
    fonts: { sans: "Figtree", mono: "Geist Mono" },
    display: { role: "sans", weight: 700, tracking: "-0.035em" },
    radius: "1rem",
    spacing: "0.27rem",
    traits: {
      depth: "Diffuse shadows",
      density: "Relaxed",
    },
    light: {
      background: "oklch(0.968 0.014 130)",
      foreground: "oklch(0.23 0.03 152)",
      card: "oklch(0.992 0.006 120)",
      "card-foreground": "oklch(0.23 0.03 152)",
      popover: "oklch(0.995 0.005 120)",
      "popover-foreground": "oklch(0.23 0.03 152)",
      primary: "oklch(0.47 0.1 158)",
      "primary-foreground": "oklch(0.99 0.006 120)",
      secondary: "oklch(0.935 0.02 130)",
      "secondary-foreground": "oklch(0.27 0.035 152)",
      muted: "oklch(0.943 0.017 130)",
      "muted-foreground": "oklch(0.48 0.03 148)",
      accent: "oklch(0.93 0.042 142)",
      "accent-foreground": "oklch(0.39 0.09 156)",
      destructive: "oklch(0.54 0.18 30)",
      "destructive-foreground": "oklch(0.99 0.006 120)",
      border: "oklch(0.885 0.02 135)",
      input: "oklch(0.825 0.028 135)",
      ring: "oklch(0.58 0.11 158)",
      success: "oklch(0.52 0.12 152)",
      "success-subtle": "oklch(0.93 0.045 150)",
      "success-foreground": "oklch(0.37 0.09 152)",
      warning: "oklch(0.64 0.13 72)",
      "warning-subtle": "oklch(0.95 0.05 88)",
      "warning-foreground": "oklch(0.43 0.1 62)",
      "chart-1": "oklch(0.52 0.11 158)",
      "chart-2": "oklch(0.6 0.13 125)",
      "chart-3": "oklch(0.66 0.11 52)",
      "chart-4": "oklch(0.64 0.08 222)",
      "chart-5": "oklch(0.66 0.12 88)",
      "chart-6": "oklch(0.5 0.05 62)",
      "shadow-card":
        "0 1px 2px oklch(0.3 0.04 150 / 0.05), 0 8px 22px -12px oklch(0.3 0.05 150 / 0.2)",
      "shadow-float":
        "0 2px 6px -2px oklch(0.3 0.04 150 / 0.08), 0 22px 44px -18px oklch(0.3 0.05 150 / 0.3)",
      "shadow-inset": "inset 0 1px 3px oklch(0.3 0.04 150 / 0.07)",
    },
    dark: {
      background: "oklch(0.17 0.018 155)",
      foreground: "oklch(0.95 0.014 125)",
      card: "oklch(0.208 0.02 155)",
      "card-foreground": "oklch(0.95 0.014 125)",
      popover: "oklch(0.235 0.022 155)",
      "popover-foreground": "oklch(0.95 0.014 125)",
      primary: "oklch(0.79 0.12 150)",
      "primary-foreground": "oklch(0.19 0.03 155)",
      secondary: "oklch(0.265 0.022 155)",
      "secondary-foreground": "oklch(0.94 0.014 125)",
      muted: "oklch(0.252 0.02 155)",
      "muted-foreground": "oklch(0.74 0.028 135)",
      accent: "oklch(0.3 0.05 152)",
      "accent-foreground": "oklch(0.88 0.08 145)",
      destructive: "oklch(0.7 0.16 30)",
      "destructive-foreground": "oklch(0.17 0.018 155)",
      border: "oklch(0.9 0.04 140 / 0.12)",
      input: "oklch(0.9 0.04 140 / 0.2)",
      ring: "oklch(0.78 0.12 150)",
      success: "oklch(0.78 0.13 152)",
      "success-subtle": "oklch(0.27 0.05 152)",
      "success-foreground": "oklch(0.88 0.09 152)",
      warning: "oklch(0.81 0.12 80)",
      "warning-subtle": "oklch(0.29 0.045 78)",
      "warning-foreground": "oklch(0.9 0.08 82)",
      "chart-1": "oklch(0.79 0.12 150)",
      "chart-2": "oklch(0.84 0.13 118)",
      "chart-3": "oklch(0.75 0.11 52)",
      "chart-4": "oklch(0.74 0.08 222)",
      "chart-5": "oklch(0.86 0.11 92)",
      "chart-6": "oklch(0.64 0.04 62)",
      "shadow-card":
        "0 1px 2px oklch(0 0 0 / 0.25), 0 8px 22px -12px oklch(0 0 0 / 0.5)",
      "shadow-float":
        "0 2px 6px -2px oklch(0 0 0 / 0.3), 0 22px 44px -18px oklch(0 0 0 / 0.65)",
      "shadow-inset": "inset 0 1px 3px oklch(0 0 0 / 0.22)",
    },
  },
  {
    slug: "vesper",
    name: "Vesper",
    description:
      "Lavender light and a deep violet night, with Manrope for interfaces and Fraunces for display.",
    fonts: { sans: "Manrope", serif: "Fraunces", mono: "Geist Mono" },
    display: { role: "serif", weight: 500, tracking: "-0.03em" },
    radius: "0.75rem",
    spacing: "0.25rem",
    traits: {
      depth: "Tinted glow",
      density: "Comfortable",
    },
    light: {
      background: "oklch(0.975 0.01 300)",
      foreground: "oklch(0.22 0.04 295)",
      card: "oklch(0.993 0.003 300)",
      "card-foreground": "oklch(0.22 0.04 295)",
      popover: "oklch(0.996 0.002 300)",
      "popover-foreground": "oklch(0.22 0.04 295)",
      primary: "oklch(0.5 0.2 295)",
      "primary-foreground": "oklch(0.99 0.004 300)",
      secondary: "oklch(0.942 0.016 300)",
      "secondary-foreground": "oklch(0.27 0.045 295)",
      muted: "oklch(0.95 0.013 300)",
      "muted-foreground": "oklch(0.5 0.035 295)",
      accent: "oklch(0.94 0.03 302)",
      "accent-foreground": "oklch(0.45 0.18 295)",
      destructive: "oklch(0.55 0.2 15)",
      "destructive-foreground": "oklch(0.99 0.004 300)",
      border: "oklch(0.895 0.018 300)",
      input: "oklch(0.84 0.026 300)",
      ring: "oklch(0.6 0.19 295)",
      success: "oklch(0.55 0.11 165)",
      "success-subtle": "oklch(0.95 0.03 165)",
      "success-foreground": "oklch(0.4 0.08 165)",
      warning: "oklch(0.66 0.14 62)",
      "warning-subtle": "oklch(0.958 0.035 78)",
      "warning-foreground": "oklch(0.45 0.11 55)",
      "chart-1": "oklch(0.56 0.2 295)",
      "chart-2": "oklch(0.66 0.17 355)",
      "chart-3": "oklch(0.66 0.13 50)",
      "chart-4": "oklch(0.52 0.15 268)",
      "chart-5": "oklch(0.6 0.1 195)",
      "chart-6": "oklch(0.66 0.12 85)",
      "shadow-card":
        "0 1px 2px oklch(0.3 0.08 295 / 0.06), 0 4px 14px -6px oklch(0.35 0.12 295 / 0.14)",
      "shadow-float":
        "0 2px 6px -2px oklch(0.3 0.08 295 / 0.1), 0 20px 44px -18px oklch(0.35 0.15 295 / 0.36)",
      "shadow-inset": "inset 0 1px 2px oklch(0.3 0.08 295 / 0.07)",
    },
    dark: {
      background: "oklch(0.155 0.03 290)",
      foreground: "oklch(0.95 0.015 300)",
      card: "oklch(0.195 0.036 290)",
      "card-foreground": "oklch(0.95 0.015 300)",
      popover: "oklch(0.222 0.04 290)",
      "popover-foreground": "oklch(0.95 0.015 300)",
      primary: "oklch(0.77 0.14 302)",
      "primary-foreground": "oklch(0.18 0.04 290)",
      secondary: "oklch(0.25 0.04 290)",
      "secondary-foreground": "oklch(0.94 0.015 300)",
      muted: "oklch(0.24 0.036 290)",
      "muted-foreground": "oklch(0.74 0.04 298)",
      accent: "oklch(0.29 0.08 295)",
      "accent-foreground": "oklch(0.88 0.07 302)",
      destructive: "oklch(0.7 0.17 12)",
      "destructive-foreground": "oklch(0.155 0.03 290)",
      border: "oklch(0.85 0.07 300 / 0.14)",
      input: "oklch(0.85 0.07 300 / 0.22)",
      ring: "oklch(0.76 0.13 302)",
      success: "oklch(0.76 0.12 165)",
      "success-subtle": "oklch(0.25 0.045 165)",
      "success-foreground": "oklch(0.86 0.09 165)",
      warning: "oklch(0.8 0.12 72)",
      "warning-subtle": "oklch(0.27 0.045 70)",
      "warning-foreground": "oklch(0.89 0.08 78)",
      "chart-1": "oklch(0.75 0.15 302)",
      "chart-2": "oklch(0.74 0.15 355)",
      "chart-3": "oklch(0.82 0.11 58)",
      "chart-4": "oklch(0.68 0.14 268)",
      "chart-5": "oklch(0.78 0.1 190)",
      "chart-6": "oklch(0.86 0.1 90)",
      "shadow-card":
        "0 0 0 1px oklch(0.85 0.07 300 / 0.03), 0 4px 14px -6px oklch(0.05 0.03 290 / 0.6)",
      "shadow-float":
        "0 0 0 1px oklch(0.85 0.07 300 / 0.06), 0 20px 50px -18px oklch(0.55 0.2 300 / 0.35)",
      "shadow-inset": "inset 0 1px 2px oklch(0.05 0.03 290 / 0.4)",
    },
  },
  {
    slug: "marigold",
    name: "Marigold",
    description:
      "Cream paper, ink outlines, and a bright marigold primary, with hard offset shadows and Bricolage Grotesque.",
    fonts: { sans: "Bricolage Grotesque", mono: "Space Mono" },
    display: { role: "sans", weight: 800, tracking: "-0.045em" },
    radius: "0.625rem",
    spacing: "0.25rem",
    traits: {
      depth: "Hard offset shadows",
      density: "Comfortable",
    },
    light: {
      background: "oklch(0.97 0.026 90)",
      foreground: "oklch(0.2 0.02 70)",
      card: "oklch(0.995 0.009 95)",
      "card-foreground": "oklch(0.2 0.02 70)",
      popover: "oklch(0.995 0.009 95)",
      "popover-foreground": "oklch(0.2 0.02 70)",
      primary: "oklch(0.2 0.02 70)",
      "primary-foreground": "oklch(0.88 0.14 90)",
      secondary: "oklch(0.93 0.04 92)",
      "secondary-foreground": "oklch(0.2 0.02 70)",
      muted: "oklch(0.94 0.032 92)",
      "muted-foreground": "oklch(0.46 0.04 72)",
      accent: "oklch(0.88 0.14 90)",
      "accent-foreground": "oklch(0.2 0.02 70)",
      destructive: "oklch(0.56 0.21 28)",
      "destructive-foreground": "oklch(0.99 0.01 95)",
      border: "oklch(0.3 0.025 70)",
      input: "oklch(0.3 0.025 70)",
      ring: "oklch(0.6 0.19 35)",
      success: "oklch(0.56 0.14 150)",
      "success-subtle": "oklch(0.93 0.06 145)",
      "success-foreground": "oklch(0.36 0.1 150)",
      warning: "oklch(0.66 0.16 50)",
      "warning-subtle": "oklch(0.93 0.045 65)",
      "warning-foreground": "oklch(0.44 0.13 45)",
      "chart-1": "oklch(0.66 0.15 62)",
      "chart-2": "oklch(0.66 0.18 35)",
      "chart-3": "oklch(0.32 0.025 70)",
      "chart-4": "oklch(0.6 0.1 195)",
      "chart-5": "oklch(0.56 0.16 320)",
      "chart-6": "oklch(0.6 0.15 140)",
      "shadow-card": "2px 2px 0 0 oklch(0.2 0.02 70)",
      "shadow-float": "4px 4px 0 0 oklch(0.2 0.02 70)",
      "shadow-inset": "inset 0 2px 0 oklch(0.2 0.02 70 / 0.07)",
    },
    dark: {
      background: "oklch(0.19 0.014 70)",
      foreground: "oklch(0.95 0.025 92)",
      card: "oklch(0.23 0.016 70)",
      "card-foreground": "oklch(0.95 0.025 92)",
      popover: "oklch(0.25 0.018 70)",
      "popover-foreground": "oklch(0.95 0.025 92)",
      primary: "oklch(0.85 0.165 85)",
      "primary-foreground": "oklch(0.2 0.02 70)",
      secondary: "oklch(0.29 0.02 72)",
      "secondary-foreground": "oklch(0.95 0.025 92)",
      muted: "oklch(0.275 0.018 72)",
      "muted-foreground": "oklch(0.76 0.035 85)",
      accent: "oklch(0.33 0.05 82)",
      "accent-foreground": "oklch(0.9 0.1 88)",
      destructive: "oklch(0.7 0.18 30)",
      "destructive-foreground": "oklch(0.19 0.014 70)",
      border: "oklch(0.92 0.04 90 / 0.7)",
      input: "oklch(0.92 0.04 90 / 0.7)",
      ring: "oklch(0.72 0.17 38)",
      success: "oklch(0.77 0.14 150)",
      "success-subtle": "oklch(0.29 0.05 150)",
      "success-foreground": "oklch(0.87 0.1 150)",
      warning: "oklch(0.78 0.14 55)",
      "warning-subtle": "oklch(0.31 0.06 55)",
      "warning-foreground": "oklch(0.88 0.08 65)",
      "chart-1": "oklch(0.85 0.165 85)",
      "chart-2": "oklch(0.72 0.17 35)",
      "chart-3": "oklch(0.93 0.03 90)",
      "chart-4": "oklch(0.74 0.1 195)",
      "chart-5": "oklch(0.7 0.15 320)",
      "chart-6": "oklch(0.78 0.15 140)",
      "shadow-card": "2px 2px 0 0 oklch(0.06 0.01 70)",
      "shadow-float": "4px 4px 0 0 oklch(0.06 0.01 70)",
      "shadow-inset": "inset 0 2px 0 oklch(0 0 0 / 0.25)",
    },
  },
  {
    slug: "graphite",
    name: "Graphite",
    description:
      "Pure grayscale, square corners, and Inter Tight. Structure comes from type and hairlines, not color.",
    fonts: { sans: "Inter Tight", mono: "JetBrains Mono" },
    display: { role: "sans", weight: 600, tracking: "-0.05em" },
    radius: "0rem",
    spacing: "0.25rem",
    traits: {
      depth: "No shadows, hairlines",
      density: "Comfortable",
    },
    light: {
      background: "oklch(0.982 0 0)",
      foreground: "oklch(0.15 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.15 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.15 0 0)",
      primary: "oklch(0.2 0 0)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.95 0 0)",
      "secondary-foreground": "oklch(0.2 0 0)",
      muted: "oklch(0.958 0 0)",
      "muted-foreground": "oklch(0.49 0 0)",
      accent: "oklch(0.935 0 0)",
      "accent-foreground": "oklch(0.18 0 0)",
      destructive: "oklch(0.55 0.22 27)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.89 0 0)",
      input: "oklch(0.8 0 0)",
      ring: "oklch(0.35 0 0)",
      success: "oklch(0.52 0.13 150)",
      "success-subtle": "oklch(0.955 0.025 150)",
      "success-foreground": "oklch(0.37 0.1 150)",
      warning: "oklch(0.66 0.14 65)",
      "warning-subtle": "oklch(0.965 0.03 80)",
      "warning-foreground": "oklch(0.44 0.1 58)",
      "chart-1": "oklch(0.2 0 0)",
      "chart-2": "oklch(0.62 0 0)",
      "chart-3": "oklch(0.4 0 0)",
      "chart-4": "oklch(0.55 0.22 27)",
      "chart-5": "oklch(0.52 0 0)",
      "chart-6": "oklch(0.3 0 0)",
      "shadow-card": "0 0 #0000",
      "shadow-float":
        "0 0 0 1px oklch(0.15 0 0 / 0.08), 0 10px 28px -14px oklch(0 0 0 / 0.2)",
      "shadow-inset": "0 0 #0000",
    },
    dark: {
      background: "oklch(0.13 0 0)",
      foreground: "oklch(0.97 0 0)",
      card: "oklch(0.165 0 0)",
      "card-foreground": "oklch(0.97 0 0)",
      popover: "oklch(0.19 0 0)",
      "popover-foreground": "oklch(0.97 0 0)",
      primary: "oklch(0.97 0 0)",
      "primary-foreground": "oklch(0.15 0 0)",
      secondary: "oklch(0.235 0 0)",
      "secondary-foreground": "oklch(0.97 0 0)",
      muted: "oklch(0.22 0 0)",
      "muted-foreground": "oklch(0.7 0 0)",
      accent: "oklch(0.26 0 0)",
      "accent-foreground": "oklch(0.97 0 0)",
      destructive: "oklch(0.68 0.2 25)",
      "destructive-foreground": "oklch(0.13 0 0)",
      border: "oklch(1 0 0 / 0.12)",
      input: "oklch(1 0 0 / 0.2)",
      ring: "oklch(0.8 0 0)",
      success: "oklch(0.75 0.13 150)",
      "success-subtle": "oklch(0.25 0.04 150)",
      "success-foreground": "oklch(0.86 0.09 150)",
      warning: "oklch(0.8 0.13 72)",
      "warning-subtle": "oklch(0.27 0.045 72)",
      "warning-foreground": "oklch(0.89 0.08 78)",
      "chart-1": "oklch(0.97 0 0)",
      "chart-2": "oklch(0.6 0 0)",
      "chart-3": "oklch(0.82 0 0)",
      "chart-4": "oklch(0.68 0.2 25)",
      "chart-5": "oklch(0.7 0 0)",
      "chart-6": "oklch(0.52 0 0)",
      "shadow-card": "0 0 #0000",
      "shadow-float":
        "0 0 0 1px oklch(1 0 0 / 0.1), 0 10px 28px -14px oklch(0 0 0 / 0.7)",
      "shadow-inset": "0 0 #0000",
    },
  },
];

export function findTheme(slug: string | undefined) {
  return officialThemes.find((theme) => theme.slug === slug);
}

export const fontSources: Record<
  string,
  { loader: string; weights: string; options?: string }
> = {
  "Instrument Sans": { loader: "Instrument_Sans", weights: "400;500;600;700" },
  "Instrument Serif": {
    loader: "Instrument_Serif",
    weights: "400",
    options: 'weight: "400"',
  },
  "IBM Plex Sans": { loader: "IBM_Plex_Sans", weights: "400;500;600;700" },
  "IBM Plex Mono": {
    loader: "IBM_Plex_Mono",
    weights: "400;500;600",
    options: 'weight: ["400", "500", "600"]',
  },
  Figtree: { loader: "Figtree", weights: "400;500;600;700" },
  Manrope: { loader: "Manrope", weights: "400;500;600;700" },
  Fraunces: { loader: "Fraunces", weights: "400;500;600" },
  "Bricolage Grotesque": {
    loader: "Bricolage_Grotesque",
    weights: "400;500;600;700;800",
  },
  "Space Mono": {
    loader: "Space_Mono",
    weights: "400;700",
    options: 'weight: ["400", "700"]',
  },
  "Inter Tight": { loader: "Inter_Tight", weights: "400;500;600;700" },
  "JetBrains Mono": { loader: "JetBrains_Mono", weights: "400;500;600" },
  "Geist Mono": { loader: "Geist_Mono", weights: "400;500;600" },
};

const fallbacks: Record<FontRole, string> = {
  sans: "ui-sans-serif, system-ui, sans-serif",
  serif: "ui-serif, Georgia, serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
};

export function fontVariable(family: string) {
  return `--font-${family.toLowerCase().replaceAll(" ", "-")}`;
}

export function fontStack(family: string, role: FontRole) {
  return `var(${fontVariable(family)}, "${family}"), ${fallbacks[role]}`;
}

export function themeFamilies(theme: OfficialTheme) {
  return [theme.fonts.sans, theme.fonts.serif, theme.fonts.mono].filter(
    (family): family is string => Boolean(family),
  );
}

export function googleFontsUrl(theme: OfficialTheme) {
  const families = themeFamilies(theme).map(
    (family) =>
      `family=${family.replaceAll(" ", "+")}:wght@${fontSources[family].weights}`,
  );
  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}

export function nextFontLayout(theme: OfficialTheme) {
  const families = themeFamilies(theme);
  const name = (family: string) =>
    family
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word[0].toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join("");
  const loaders = families.map((family) => {
    const source = fontSources[family];
    const options = [
      'subsets: ["latin"]',
      source.options,
      `variable: "${fontVariable(family)}"`,
    ]
      .filter(Boolean)
      .join(", ");
    return `const ${name(family)} = ${source.loader}({ ${options} });`;
  });
  return `import { ${families
    .map((family) => fontSources[family].loader)
    .sort()
    .join(", ")} } from "next/font/google";
import "./globals.css";

${loaders.join("\n")}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The variables go on <html> so the theme's :root rule can read them.
    <html
      lang="en"
      className={\`${families.map((family) => `\${${name(family)}.variable}`).join(" ")}\`}
    >
      <body>{children}</body>
    </html>
  );
}
`;
}

function sidebarTokens(tokens: ModeTokens, mode: "light" | "dark") {
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

export function rootVariables(
  theme: OfficialTheme,
  family: (name: string, role: FontRole) => string = fontStack,
) {
  return {
    radius: theme.radius,
    ...(theme.spacing === defaultSpacing ? {} : { spacing: theme.spacing }),
    "font-sans": family(theme.fonts.sans, "sans"),
    ...(theme.fonts.serif
      ? { "font-serif": family(theme.fonts.serif, "serif") }
      : {}),
    "font-mono": family(theme.fonts.mono, "mono"),
  };
}

export function modeVariables(theme: OfficialTheme, mode: "light" | "dark") {
  const tokens = theme[mode];
  return { ...tokens, ...sidebarTokens(tokens, mode) };
}

function block(selector: string, variables: Record<string, string>) {
  return `${selector} {\n${Object.entries(variables)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join("\n")}\n}`;
}

export function themeCss(theme: OfficialTheme) {
  const fontRoles = (["sans", "serif", "mono"] as const).filter(
    (role) => role !== "serif" || theme.fonts.serif,
  );
  return `/* ${theme.name} for vip/ui and shadcn/ui. Paste after your existing :root and .dark rules. */
${block(":root", {
  ...rootVariables(theme),
  ...modeVariables(theme, "light"),
})}

${block(".dark", modeVariables(theme, "dark"))}

@theme inline {
${fontRoles.map((role) => `  --font-${role}: var(--font-${role});`).join("\n")}
}
`;
}

export function themeRegistryItem(theme: OfficialTheme, registryUrl: string) {
  const { radius, spacing, ...fonts } = rootVariables(theme);
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `vip-theme-${theme.slug}`,
    type: "registry:theme",
    title: `${theme.name} theme`,
    description: theme.description,
    docs: `Load ${themeFamilies(theme).join(", ")} with next/font, putting each variable (${themeFamilies(
      theme,
    )
      .map(fontVariable)
      .join(
        ", ",
      )}) on <html>, or with a Google Fonts stylesheet. Font setup: ${registryUrl}/themes?theme=${theme.slug}#install`,
    cssVars: {
      theme: fonts,
      light: {
        radius,
        ...(spacing ? { spacing } : {}),
        ...modeVariables(theme, "light"),
      },
      dark: modeVariables(theme, "dark"),
    },
  };
}
