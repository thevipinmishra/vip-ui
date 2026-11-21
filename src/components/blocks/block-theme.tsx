"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { findTheme, pageThemeCss } from "@/app/themes/themes";
import { fontFamilies } from "@/app/typography/font-loaders";
import { findBlock } from "@/lib/blocks";

export function BlockThemeStyle() {
  const theme = findBlock(useSelectedLayoutSegment())?.theme;
  const colors = findTheme(theme?.color);
  if (!theme || !colors) return null;
  const font = theme.font === "geist" ? undefined : fontFamilies[theme.font];
  const tweaks = `--radius:${theme.radius};${font ? `--font-geist-sans:${font};` : ""}`;

  return (
    <style
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Built from the static theme tokens and font options.
      dangerouslySetInnerHTML={{
        __html: `${pageThemeCss(colors)}:root{${tweaks}}`,
      }}
    />
  );
}
