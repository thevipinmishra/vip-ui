import assert from "node:assert/strict";
import test from "node:test";
import { loadSiteModule } from "./generate-registry.mjs";

const {
  themes,
  themeChecks,
  checkRatio,
  themeCss,
  defaultRadius,
  ringStyles,
  withRing,
} = await loadSiteModule("src/app/themes/themes.ts");
const { palettes } = await loadSiteModule("src/lib/palettes.ts");

test("every theme passes the contrast checks with each focus ring", () => {
  const variants = themes.flatMap((theme) =>
    ringStyles.map((ring) => ({ ...withRing(theme, ring), ring })),
  );
  const failures = variants.flatMap((theme) =>
    ["light", "dark"].flatMap((mode) =>
      themeChecks
        .map((check) => ({ check, ratio: checkRatio(theme, mode, check) }))
        .filter(({ check, ratio }) => ratio < check.minimum)
        .map(
          ({ check, ratio }) =>
            `${theme.slug} ${theme.ring} ring ${mode}: --${check.foreground} on --${check.background} is ${ratio.toFixed(2)}, needs ${check.minimum}`,
        ),
    ),
  );
  assert.deepEqual(failures, []);
});

test("every theme token is a step of a color scale", () => {
  for (const theme of themes)
    for (const mode of ["light", "dark"])
      for (const [token, source] of Object.entries(theme.sources[mode]))
        assert.equal(
          theme[mode][token],
          source.palette[mode][source.step - 1],
          `${theme.slug} ${mode} --${token}`,
        );
});

test("themes pair each accent with its neutral", () => {
  for (const theme of themes) {
    assert.equal(theme.neutral.kind, "neutral", theme.slug);
    assert.equal(theme.neutral.slug, theme.palette.neutral, theme.slug);
    assert.equal(theme.sources.light.background.palette, theme.neutral);
  }
  assert.ok(
    palettes.every(
      (palette) =>
        palette.kind === "neutral" ||
        palettes.some(
          (other) => other.slug === palette.neutral && other.kind === "neutral",
        ),
    ),
    "an accent scale names a neutral that does not exist",
  );
});

test("chart series do not repeat the primary hue", () => {
  for (const theme of themes) {
    const series = [1, 2, 3, 4, 5, 6].map(
      (index) => theme.sources.light[`chart-${index}`].palette.slug,
    );
    assert.equal(new Set(series).size, 6, `${theme.slug}: ${series}`);
  }
});

test("the theme CSS sets the radius only when it changes", () => {
  const [theme] = themes;
  assert.doesNotMatch(themeCss(theme), /--radius/);
  assert.doesNotMatch(themeCss(theme, defaultRadius), /--radius/);
  assert.match(themeCss(theme, "0.5rem"), /^:root \{[^}]*--radius: 0\.5rem;/);
  assert.doesNotMatch(themeCss(theme, "0.5rem").split(".dark")[1], /--radius/);
});

test("the neutral focus ring uses step 11 of the paired neutral", () => {
  for (const theme of themes) {
    const neutral = withRing(theme, "neutral");
    for (const mode of ["light", "dark"]) {
      assert.equal(neutral[mode].ring, theme.neutral[mode][10], theme.slug);
      assert.equal(neutral.sources[mode].ring.palette, theme.neutral);
    }
    assert.equal(withRing(theme, "accent"), theme);
    assert.ok(
      themeCss(neutral).includes(
        `--sidebar-ring: ${theme.neutral.dark[10]};
}`,
      ),
      `${theme.slug} CSS misses the neutral dark ring`,
    );
  }
});
