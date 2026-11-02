import { colorTokens, themes } from "@/app/themes/themes";
import { ThemeLab, type ThemeOption } from "./theme-lab";

function declarations(tokens: Record<string, string>) {
  return colorTokens.map((token) => `--${token}:${tokens[token]};`).join("");
}

const css = themes
  .map((theme) => {
    const selector = `[data-home-theme="${theme.slug}"]`;
    return `${selector}{${declarations(theme.light)}}.dark ${selector}{${declarations(theme.dark)}}`;
  })
  .join("");

const options: ThemeOption[] = themes.map((theme) => ({
  slug: theme.slug,
  name: theme.name,
  light: theme.light,
  dark: theme.dark,
}));

export function ThemeSection() {
  return (
    <>
      <style>{css}</style>
      <ThemeLab options={options} />
    </>
  );
}
