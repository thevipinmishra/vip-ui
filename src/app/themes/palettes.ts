import { paletteData } from "./palette-data";

export type PaletteStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type PaletteRamp = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export interface Palette {
  slug: string;
  name: string;
  description: string;
  solidText: { light: PaletteStep; dark: PaletteStep };
  light: PaletteRamp;
  dark: PaletteRamp;
}

export const palettes: readonly Palette[] = paletteData;

export const paletteSteps: readonly {
  step: PaletteStep;
  name: string;
}[] = [
  { step: 1, name: "Background" },
  { step: 2, name: "Subtle background" },
  { step: 3, name: "Fill" },
  { step: 4, name: "Hover fill" },
  { step: 5, name: "Active fill" },
  { step: 6, name: "Subtle border" },
  { step: 7, name: "Border" },
  { step: 8, name: "Strong border" },
  { step: 9, name: "Solid" },
  { step: 10, name: "Solid hover" },
  { step: 11, name: "Text" },
  { step: 12, name: "Strong text" },
];

export function paletteVar(slug: string, step: number) {
  return `--${slug}-${step}`;
}

function declarations(selection: readonly Palette[], mode: "light" | "dark") {
  return selection
    .flatMap((palette) =>
      palette[mode].map(
        (value, index) => `  ${paletteVar(palette.slug, index + 1)}: ${value};`,
      ),
    )
    .join("\n");
}

export function paletteCss(selection: readonly Palette[] = palettes) {
  return `:root {\n${declarations(selection, "light")}\n}\n\n.dark {\n${declarations(selection, "dark")}\n}`;
}
