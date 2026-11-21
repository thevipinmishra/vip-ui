import { fontFamilies } from "@/app/typography/font-loaders";
import { textFonts } from "@/app/typography/fonts";
import { pageMetadata } from "@/lib/seo";
import { ThemeGallery } from "./theme-gallery";
import { ThemeInstall } from "./theme-install";
import { ThemeShowcase } from "./theme-showcase";
import { type FontChoice, ThemeStudio } from "./theme-studio";
import {
  defaultRadius,
  findRadius,
  findRingStyle,
  findTheme,
  pageThemeCss,
  specimenCss,
  themes,
} from "./themes";

export const metadata = pageMetadata({
  title: "Themes",
  description:
    "Curated themes for vip/ui and shadcn/ui. Preview complete interfaces and copy the CSS into your project.",
  path: "/themes",
  image: "file",
});

const pageCss = Object.fromEntries(
  themes.map((theme) => [theme.slug, pageThemeCss(theme)]),
);

const fonts: FontChoice[] = textFonts.map((font) => ({
  id: font.id,
  name: font.name,
  kind: font.kind,
  family: fontFamilies[font.id],
}));

function param(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function ThemesPage({
  searchParams,
}: PageProps<"/themes">) {
  const query = await searchParams;
  const initial = findTheme(param(query.theme)) ?? themes[0];
  const font = fonts.find((option) => option.id === param(query.font));

  return (
    <ThemeStudio
      initialSlug={initial.slug}
      initialRadius={findRadius(param(query.radius)) ?? defaultRadius}
      initialRing={findRingStyle(param(query.ring)) ?? "accent"}
      initialFont={font?.id ?? fonts[0].id}
      fonts={fonts}
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
