import { paletteData } from "./palette-data";

export type PaletteStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type PaletteMode = "light" | "dark";

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
  solidText: Record<PaletteMode, PaletteStep>;
  light: PaletteRamp;
  dark: PaletteRamp;
}

export const palettes: readonly Palette[] = paletteData;

export function findPalette(slug: string) {
  const palette = palettes.find((option) => option.slug === slug);
  if (!palette) throw new Error(`Unknown color scale ${slug}`);
  return palette;
}

export const paletteSteps: readonly { step: PaletteStep; name: string }[] = [
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

export const paletteGroups: readonly {
  name: string;
  use: string;
  steps: readonly PaletteStep[];
}[] = [
  { name: "Backgrounds", use: "Page and card backgrounds.", steps: [1, 2] },
  {
    name: "Fills",
    use: "Component fills for the normal, hover, and pressed state.",
    steps: [3, 4, 5],
  },
  {
    name: "Borders",
    use: "Lines between sections, component borders, and hover borders.",
    steps: [6, 7, 8],
  },
  {
    name: "Solids",
    use: "Buttons, badges, and focus rings. Step 10 is the hover state.",
    steps: [9, 10],
  },
  {
    name: "Text",
    use: "Secondary text and high-contrast text.",
    steps: [11, 12],
  },
];

export function paletteColor(
  palette: Palette,
  mode: PaletteMode,
  step: PaletteStep,
) {
  return palette[mode][step - 1];
}

export function paletteVar(slug: string, step: number) {
  return `--${slug}-${step}`;
}

function declarations(selection: readonly Palette[], mode: PaletteMode) {
  return selection
    .flatMap((palette) =>
      palette[mode].map(
        (value, index) => `  ${paletteVar(palette.slug, index + 1)}: ${value};`,
      ),
    )
    .join("\n");
}

export function paletteCss(selection: readonly Palette[] = palettes) {
  return `:root {\n${declarations(selection, "light")}\n}\n\n.dark {\n${declarations(selection, "dark")}\n}\n`;
}

export function paletteTailwindCss(selection: readonly Palette[] = palettes) {
  const lines = selection.flatMap((palette) =>
    paletteSteps.map(
      ({ step }) =>
        `  --color-${palette.slug}-${step}: var(${paletteVar(palette.slug, step)});`,
    ),
  );
  return `@theme inline {\n${lines.join("\n")}\n}\n`;
}
