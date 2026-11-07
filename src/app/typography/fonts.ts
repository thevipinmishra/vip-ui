export type FontKind = "sans" | "serif" | "mono";

export interface FontOption {
  id: string;
  name: string;
  kind: FontKind;
  variable: string;
  loader: string;
  source: "geist-sans" | "geist-mono" | "google";
}

export const fontOptions: FontOption[] = [
  {
    id: "geist",
    name: "Geist",
    kind: "sans",
    variable: "--font-geist-sans",
    loader: "GeistSans",
    source: "geist-sans",
  },
  {
    id: "inter",
    name: "Inter",
    kind: "sans",
    variable: "--font-inter",
    loader: "Inter",
    source: "google",
  },
  {
    id: "ibm-plex-sans",
    name: "IBM Plex Sans",
    kind: "sans",
    variable: "--font-ibm-plex-sans",
    loader: "IBM_Plex_Sans",
    source: "google",
  },
  {
    id: "source-serif",
    name: "Source Serif 4",
    kind: "serif",
    variable: "--font-source-serif",
    loader: "Source_Serif_4",
    source: "google",
  },
  {
    id: "newsreader",
    name: "Newsreader",
    kind: "serif",
    variable: "--font-newsreader",
    loader: "Newsreader",
    source: "google",
  },
  {
    id: "lora",
    name: "Lora",
    kind: "serif",
    variable: "--font-lora",
    loader: "Lora",
    source: "google",
  },
  {
    id: "geist-mono",
    name: "Geist Mono",
    kind: "mono",
    variable: "--font-geist-mono",
    loader: "GeistMono",
    source: "geist-mono",
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    kind: "mono",
    variable: "--font-jetbrains-mono",
    loader: "JetBrains_Mono",
    source: "google",
  },
  {
    id: "ibm-plex-mono",
    name: "IBM Plex Mono",
    kind: "mono",
    variable: "--font-ibm-plex-mono",
    loader: "IBM_Plex_Mono",
    source: "google",
  },
];

export const textFonts = fontOptions.filter((font) => font.kind !== "mono");
export const monoFonts = fontOptions.filter((font) => font.kind === "mono");

export function findFont(id: string) {
  return fontOptions.find((font) => font.id === id) ?? fontOptions[0];
}
