import { expect, test } from "@playwright/test";

test("spinner patterns animate and the assistant status changes", async ({
  page,
}) => {
  await page.goto("/components/spinner");

  const preview = page.locator("#preview");
  await expect(preview.locator('[data-slot="spinner"]')).toHaveCount(9);
  const orbit = preview
    .locator('[data-variant="orbit"]')
    .first()
    .locator("g")
    .first();
  await expect
    .poll(() =>
      orbit.evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe("none");
  const dot = orbit.locator("circle").last();
  const before = await dot.boundingBox();
  await page.waitForTimeout(280);
  const after = await dot.boundingBox();
  expect(
    before && after && Math.hypot(after.x - before.x, after.y - before.y),
  ).toBeGreaterThan(5);

  await page.setViewportSize({ width: 375, height: 800 });
  await expect
    .poll(() =>
      preview.evaluate((element) => element.scrollWidth <= element.clientWidth),
    )
    .toBe(true);

  await page.getByRole("button", { name: "Finish response" }).click();
  await expect(preview.getByText("Response ready")).toBeVisible();
  await expect(preview.locator('[data-variant="spark"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(preview.locator('[data-variant="spark"]')).toHaveCount(1);
});

test("gallery indicators and pulse rings share their centers", async ({
  page,
}) => {
  await page.goto("/components/spinner");
  const preview = page.locator("#preview");

  for (const width of [1280, 375]) {
    await page.setViewportSize({ width, height: 800 });
    for (const stage of await preview
      .locator('[data-slot="spinner-stage"]')
      .all()) {
      const offset = await stage.evaluate((element) => {
        const stageBox = element.getBoundingClientRect();
        const iconBox = element
          .querySelector('[data-slot="spinner"]')
          ?.getBoundingClientRect();
        if (!iconBox) throw new Error("Missing spinner in stage");
        return [
          iconBox.x + iconBox.width / 2 - stageBox.x - stageBox.width / 2,
          iconBox.y + iconBox.height / 2 - stageBox.y - stageBox.height / 2,
        ];
      });
      expect(Math.abs(offset[0])).toBeLessThan(0.5);
      expect(Math.abs(offset[1])).toBeLessThan(0.5);
    }
  }

  const pulse = preview.locator('[data-variant="pulse"]').first();
  for (let frame = 0; frame < 3; frame++) {
    const offsets = await pulse.evaluate((element) => {
      const circles = [...element.querySelectorAll("circle")];
      const center = circles[circles.length - 1].getBoundingClientRect();
      return circles.slice(0, -1).map((circle) => {
        const ring = circle.getBoundingClientRect();
        return [
          ring.x + ring.width / 2 - center.x - center.width / 2,
          ring.y + ring.height / 2 - center.y - center.height / 2,
        ];
      });
    });
    for (const [x, y] of offsets) {
      expect(Math.abs(x)).toBeLessThan(0.5);
      expect(Math.abs(y)).toBeLessThan(0.5);
    }
    await page.waitForTimeout(240);
  }
});

test("reduced motion keeps all variants visible and still", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/components/spinner");

  const preview = page.locator("#preview");
  for (const variant of [
    "ring",
    "segments",
    "dots",
    "bars",
    "orbit",
    "pulse",
    "spark",
  ]) {
    await expect(
      preview.locator(`[data-variant="${variant}"]`).first(),
    ).toBeVisible();
  }
  const orbit = preview
    .locator('[data-variant="orbit"]')
    .first()
    .locator("g")
    .first();
  await expect(orbit).toHaveCSS("transform", "none");
  await page.waitForTimeout(280);
  await expect(orbit).toHaveCSS("transform", "none");
  await expect(preview.getByRole("status", { name: "Loading" })).toHaveCount(0);
  await context.close();
});
