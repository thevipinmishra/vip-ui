import type { Metadata } from "next";
import { officialThemes } from "./official-themes";
import { ThemeGallery } from "./theme-gallery";
import { ThemeStudio } from "./theme-studio";

export const metadata: Metadata = {
  title: "Themes | vip/ui",
  description:
    "Preview six vip/ui themes on live components and copy the CSS. Light and dark follow the site theme switcher.",
};

export default async function ThemesPage({
  searchParams,
}: PageProps<"/themes">) {
  const { theme } = await searchParams;
  const initialTheme =
    typeof theme === "string" &&
    officialThemes.some((item) => item.slug === theme)
      ? theme
      : undefined;

  return (
    <article className="min-w-0">
      <ThemeStudio initialTheme={initialTheme}>
        <ThemeGallery />
      </ThemeStudio>
    </article>
  );
}
