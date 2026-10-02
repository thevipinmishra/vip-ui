import type { Metadata } from "next";
import { ThemeGallery } from "./theme-gallery";
import { ThemeStudio } from "./theme-studio";

export const metadata: Metadata = {
  title: "Themes | vip/ui",
  description:
    "Compare six vip/ui themes on live components. Switch the light or dark preview and copy the CSS for your app.",
};

export default function ThemesPage() {
  return (
    <article className="grid min-w-0 gap-10">
      <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.07em]">
        Themes
      </h1>
      <ThemeStudio>
        <ThemeGallery />
      </ThemeStudio>
    </article>
  );
}
