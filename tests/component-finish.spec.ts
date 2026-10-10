import { expect, test } from "@playwright/test";

test("docs headings have no descriptive subtitles", async ({ page }) => {
  await page.goto("/components/slider");
  await expect(
    page.getByRole("heading", { name: "Slider", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Choose a value in a bounded range.", { exact: false }),
  ).toHaveCount(0);
  const examples = page.getByRole("heading", { name: "Examples" });
  await expect(examples).toBeVisible();
  expect(await examples.locator("xpath=following-sibling::p").count()).toBe(0);
});

test("generated API links preserve React Aria component casing", async ({
  page,
}) => {
  for (const [slug, docsName] of [
    ["progress-bar", "ProgressBar"],
    ["toggle-button-group", "ToggleButtonGroup"],
    ["date-picker", "DatePicker"],
  ]) {
    await page.goto(`/components/${slug}`);
    await expect(
      page.getByRole("link", { name: /API in React Aria/ }),
    ).toHaveAttribute("href", `https://react-aria.adobe.com/${docsName}`);
  }
});

test("skeleton styles work in both themes and respect reduced motion", async ({
  page,
}) => {
  await page.goto("/components/skeleton");
  const skeleton = page.locator("#preview [data-slot=skeleton]").first();
  const shimmer = skeleton.locator("> div");
  for (const theme of ["light", "dark"]) {
    if (theme === "dark") {
      await page.getByRole("button", { name: "Switch to dark theme" }).click();
      const lightness = await skeleton.evaluate((element) => {
        const context = document.createElement("canvas").getContext("2d");
        const read = (color: string) => {
          if (!context) return 0;
          context.fillStyle = color;
          context.fillRect(0, 0, 1, 1);
          const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
          return r + g + b;
        };
        const via = getComputedStyle(element.firstElementChild as Element)
          .getPropertyValue("--tw-gradient-via")
          .replace(/\s*\/\s*[\d.]+\s*\)/, ")");
        return {
          base: read(getComputedStyle(element).backgroundColor),
          highlight: read(via),
        };
      });
      expect(lightness.highlight).toBeGreaterThan(lightness.base);
    }
    const before = await shimmer.evaluate(
      (element) => element.getBoundingClientRect().x,
    );
    await expect
      .poll(() =>
        shimmer.evaluate((element) => element.getBoundingClientRect().x),
      )
      .not.toBe(before);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(skeleton).toBeVisible();
  await expect(shimmer).toHaveCount(0);
});

test("switch and slider keep keyboard state and visible feedback", async ({
  page,
}) => {
  await page.goto("/components/switch");
  const toggle = page.getByRole("switch", { name: /Public profile/ }).first();
  const thumb = toggle
    .locator("xpath=../..")
    .locator("[aria-hidden=true] > span")
    .last();
  const before = await thumb.evaluate(
    (node) => getComputedStyle(node).transform,
  );
  await toggle.press("Space");
  await expect(toggle).not.toBeChecked();
  await expect
    .poll(() => thumb.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe(before);
  await toggle.press("Space");
  await expect(toggle).toBeChecked();

  await page.goto("/components/slider");
  const slider = page.getByRole("slider", { name: "Volume", exact: true });
  await slider.focus();
  await slider.press("ArrowRight");
  await expect(slider).toHaveValue("41");
  await expect(
    page.getByText("Volume set to 41%", { exact: true }),
  ).toBeVisible();
});

test("number field, tabs and tags keep their states and focus", async ({
  page,
}) => {
  await page.goto("/components/number-field");
  const field = page.getByRole("textbox", { name: "Seats" });
  await page.getByRole("button", { name: "Increase" }).first().click();
  await expect(field).toHaveValue("3");

  await page.goto("/components/tabs");
  const activity = page.getByRole("tab", { name: "Activity" }).first();
  await expect(async () => {
    await activity.click();
    await expect(activity).toHaveAttribute("aria-selected", "true", {
      timeout: 500,
    });
  }).toPass({ timeout: 10000 });
  await expect(
    page.getByText("Recent changes and updates appear here."),
  ).toBeVisible();

  await page.goto("/components/tag-group");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.getByRole("button", { name: "Remove Design" }).click();
  await expect(page.getByText("Design", { exact: true })).toHaveCount(0);
});

test("select, combo box and menu leave space between highlighted rows", async ({
  page,
}) => {
  for (const route of ["select", "combo-box", "menu"]) {
    await page.goto(`/components/${route}`);
    if (route === "select") {
      await page
        .getByRole("button", { name: /Choose a workspace/ })
        .first()
        .click();
    } else if (route === "combo-box") {
      await page.getByRole("button", { name: "Show options" }).first().click();
    } else {
      await page
        .getByRole("button", { name: "Project actions" })
        .first()
        .click();
    }
    const items = page.locator('[role="option"], [role="menuitem"]');
    const first = await items.nth(0).boundingBox();
    const second = await items.nth(1).boundingBox();
    expect(
      first && second && second.y - (first.y + first.height),
    ).toBeGreaterThan(0);
  }
});
