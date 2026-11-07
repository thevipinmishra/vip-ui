import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Inter,
  JetBrains_Mono,
  Lora,
  Newsreader,
  Source_Serif_4,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: false,
});
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  preload: false,
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  preload: false,
});
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  preload: false,
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  preload: false,
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  preload: false,
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  preload: false,
});

export const fontVariables = [
  inter,
  ibmPlexSans,
  sourceSerif,
  newsreader,
  lora,
  jetbrainsMono,
  ibmPlexMono,
]
  .map((font) => font.variable)
  .join(" ");

export const fontFamilies: Record<string, string> = {
  geist: GeistSans.style.fontFamily,
  inter: inter.style.fontFamily,
  "ibm-plex-sans": ibmPlexSans.style.fontFamily,
  "source-serif": sourceSerif.style.fontFamily,
  newsreader: newsreader.style.fontFamily,
  lora: lora.style.fontFamily,
  "geist-mono": GeistMono.style.fontFamily,
  "jetbrains-mono": jetbrainsMono.style.fontFamily,
  "ibm-plex-mono": ibmPlexMono.style.fontFamily,
};
