import type { Metadata } from "next";
import { findTheme, officialThemes } from "./official-themes";
import { pageThemeCss, specimenCss } from "./theme-fonts";
import { ThemeGallery } from "./theme-gallery";
import { ThemeInstall } from "./theme-install";
import { ThemeShowcase } from "./theme-showcase";
import { ThemeStudio } from "./theme-studio";

export const metadata: Metadata = {
  title: "Themes | vip/ui",
  description:
    "Six themes for vip/ui and shadcn/ui with a live preview on real product screens. Install with the shadcn CLI or copy the CSS.",
};

const pageCss = Object.fromEntries(
  officialThemes.map((theme) => [theme.slug, pageThemeCss(theme)]),
);

export default async function ThemesPage({
  searchParams,
}: PageProps<"/themes">) {
  const { theme } = await searchParams;
  const initial =
    (typeof theme === "string" && findTheme(theme)) || officialThemes[0];

  return (
    <ThemeStudio
      initialSlug={initial.slug}
      pageCss={pageCss}
      specimenCss={specimenCss}
      showcase={<ThemeShowcase />}
      gallery={<ThemeGallery />}
      install={Object.fromEntries(
        officialThemes.map((option) => [
          option.slug,
          <ThemeInstall key={option.slug} theme={option} />,
        ]),
      )}
    />
  );
}
