import type { Metadata } from "next";
import { ThemeGallery } from "./theme-gallery";
import { ThemeInstall } from "./theme-install";
import { ThemeShowcase } from "./theme-showcase";
import { ThemeStudio } from "./theme-studio";
import { findTheme, pageThemeCss, specimenCss, themes } from "./themes";

export const metadata: Metadata = {
  title: "Themes | vip/ui",
  description:
    "Ten themes made from the vip/ui color scales, with a live preview on real product screens. Copy the CSS into any shadcn/ui project.",
};

const pageCss = Object.fromEntries(
  themes.map((theme) => [theme.slug, pageThemeCss(theme)]),
);

export default async function ThemesPage({
  searchParams,
}: PageProps<"/themes">) {
  const { theme } = await searchParams;
  const initial = (typeof theme === "string" && findTheme(theme)) || themes[0];

  return (
    <ThemeStudio
      initialSlug={initial.slug}
      pageCss={pageCss}
      specimenCss={specimenCss}
      showcase={<ThemeShowcase />}
      gallery={<ThemeGallery />}
      install={Object.fromEntries(
        themes.map((option) => [
          option.slug,
          <ThemeInstall key={option.slug} theme={option} />,
        ]),
      )}
    />
  );
}
