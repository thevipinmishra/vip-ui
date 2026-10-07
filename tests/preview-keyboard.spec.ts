import { expect, test } from "@playwright/test";

test("interactive previews skip the panel and keep focus on the actual controls", async ({
  page,
}) => {
  await page.goto("/components/button");
  const previewTab = page.getByRole("tab", { name: "Preview" }).first();
  const previewPanel = page.getByRole("tabpanel", { name: "Preview" }).first();

  await previewTab.click();
  await previewTab.focus();
  await page.keyboard.press("Tab");
  await expect(previewPanel).not.toBeFocused();
  await expect(previewPanel.getByRole("button").first()).toBeFocused();
  await expect
    .poll(() =>
      previewPanel.evaluate((node) => getComputedStyle(node).outlineStyle),
    )
    .toBe("none");

  await previewTab.focus();
  await page.keyboard.press("ArrowRight");
  const codeTab = page.getByRole("tab", { name: "Code", exact: true }).first();
  await expect(codeTab).toBeFocused();
  await expect(codeTab).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: /Copy/ }).first(),
  ).toBeFocused();
});

test("static previews expose a focused panel without outlining the whole demo", async ({
  page,
}) => {
  await page.goto("/components/badge");
  const previewTab = page.getByRole("tab", { name: "Preview" }).first();
  const previewPanel = page.getByRole("tabpanel", { name: "Preview" }).first();

  await previewTab.click();
  const idleShadow = await previewPanel.evaluate(
    (node) => getComputedStyle(node).boxShadow,
  );
  await previewTab.focus();
  await page.keyboard.press("Tab");
  await expect(previewPanel).toBeFocused();
  await expect
    .poll(() =>
      previewPanel.evaluate((node) => getComputedStyle(node).outlineStyle),
    )
    .toBe("none");
  await expect
    .poll(() =>
      previewPanel.evaluate((node) => getComputedStyle(node).boxShadow),
    )
    .not.toBe(idleShadow);
  await page.emulateMedia({ forcedColors: "active" });
  await expect
    .poll(() =>
      previewPanel.evaluate((node) => getComputedStyle(node).outlineStyle),
    )
    .toBe("solid");
});

test("installation tabs and package manager tabs preserve arrow-key navigation", async ({
  page,
}) => {
  await page.goto("/components/button");
  const install = page.getByRole("tablist", { name: "Installation method" });
  const cli = install.getByRole("tab", { name: "CLI" });
  await cli.click();
  await cli.focus();
  await page.keyboard.press("ArrowRight");
  const manual = install.getByRole("tab", { name: "Manual" });
  await expect(manual).toBeFocused();
  await expect(manual).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Tab");
  const manualPanel = page.getByRole("tabpanel", { name: "Manual" });
  await expect(manualPanel.getByRole("link").first()).toBeFocused();
  await manual.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(cli).toBeFocused();
  const manager = page
    .getByRole("tablist", { name: "Package manager" })
    .first();
  const npm = manager.getByRole("tab", { name: "npm", exact: true });
  await npm.click();
  await npm.focus();
  await page.keyboard.press("ArrowRight");
  await expect(manager.getByRole("tab", { name: "yarn" })).toBeFocused();
});

test("code overflow gets a local focus cue and remains keyboard-scrollable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/components/button");
  const codeTab = page.getByRole("tab", { name: "Code", exact: true }).first();
  await expect(async () => {
    await codeTab.click();
    await expect(codeTab).toHaveAttribute("aria-selected", "true", {
      timeout: 500,
    });
  }).toPass({ timeout: 10000 });
  await codeTab.focus();
  await page.keyboard.press("Tab");
  const codePanel = page
    .getByRole("tabpanel", { name: "Code", exact: true })
    .first();
  await expect(codePanel.getByRole("button", { name: /Copy/ })).toBeFocused();
  const viewport = codePanel.locator(".code-scroll-viewport");
  await expect(viewport).toHaveAttribute("tabindex", "0");
  await page.keyboard.press("Tab");
  await expect(viewport).toBeFocused();
  await expect
    .poll(() =>
      viewport.evaluate((node) => getComputedStyle(node).outlineStyle),
    )
    .toBe("none");
  await expect
    .poll(() => viewport.evaluate((node) => getComputedStyle(node).boxShadow))
    .not.toBe("none");
  const before = await viewport.evaluate((node) => node.scrollLeft);
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => viewport.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(before);
});

test("plain React Aria tab panels have a focus cue when they contain no controls", async ({
  page,
}) => {
  await page.goto("/components/tabs");
  const tab = page.getByRole("tab", { name: "Overview" }).last();
  await tab.click();
  const panel = page.getByRole("tabpanel", { name: "Overview" }).last();
  const idleShadow = await panel.evaluate(
    (node) => getComputedStyle(node).boxShadow,
  );
  await tab.focus();
  await page.keyboard.press("Tab");
  await expect(panel).toBeFocused();
  await expect
    .poll(() => panel.evaluate((node) => getComputedStyle(node).outlineStyle))
    .toBe("none");
  await expect
    .poll(() => panel.evaluate((node) => getComputedStyle(node).boxShadow))
    .not.toBe(idleShadow);
  await page.emulateMedia({ forcedColors: "active" });
  await expect
    .poll(() => panel.evaluate((node) => getComputedStyle(node).outlineStyle))
    .toBe("solid");
});
