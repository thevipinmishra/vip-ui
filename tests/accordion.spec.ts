import { expect, type Locator, test } from "@playwright/test";

async function observePanelHeight(panel: Locator, action: () => Promise<void>) {
  await panel.evaluate((element) => {
    const target = element as HTMLElement & {
      heightSamples?: number[];
      heightObserver?: MutationObserver;
    };
    target.heightSamples = [];
    target.heightObserver = new MutationObserver(() => {
      target.heightSamples?.push(target.getBoundingClientRect().height);
    });
    target.heightObserver.observe(target, {
      attributes: true,
      attributeFilter: ["style"],
    });
  });
  await action();
  return panel.evaluate((element) => {
    const target = element as HTMLElement & {
      heightSamples?: number[];
      heightObserver?: MutationObserver;
    };
    target.heightObserver?.disconnect();
    return {
      samples: target.heightSamples ?? [],
      fullHeight: target.scrollHeight,
    };
  });
}

test("accordion panel expands and collapses in place", async ({ page }) => {
  await page.goto("/components/accordion");
  const trigger = page.getByRole("button", {
    name: "How do I invite teammates?",
  });
  const panel = page.getByRole("group", { name: "How do I invite teammates?" });
  const item = trigger.locator("xpath=../..");

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  const panelId = await item.locator("[role=group]").getAttribute("id");
  expect(panelId).not.toBeNull();
  expect(await trigger.getAttribute("aria-controls")).toBe(panelId);
  await expect(item.locator("[role=group]")).toHaveAttribute("inert", "");
  const opening = await observePanelHeight(item.locator("[role=group]"), () =>
    trigger.click(),
  );
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(
    opening.samples.some((height) => height > 0 && height < opening.fullHeight),
  ).toBe(true);
  await expect(panel).toHaveCSS("transition-property", "all");
  await expect(item).toHaveCSS("transform", "none");
  await expect(trigger.locator("span[aria-hidden=true]")).toHaveCSS(
    "transform",
    "matrix(-1, 0, 0, -1, 0, 0)",
  );

  await trigger.focus();
  const closing = await observePanelHeight(item.locator("[role=group]"), () =>
    page.keyboard.press("Enter"),
  );
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(item.locator("[role=group]")).toHaveAttribute("inert", "");
  expect(
    closing.samples.some((height) => height > 0 && height < closing.fullHeight),
  ).toBe(true);
  await expect(panel).toBeHidden();
});

test("rapid toggles reverse the panel without leaving it stuck", async ({
  page,
}) => {
  await page.goto("/components/accordion");
  const trigger = page.getByRole("button", {
    name: "How do I invite teammates?",
  });
  const panel = trigger.locator("xpath=../..").locator("[role=group]");

  await trigger.click();
  await page.waitForTimeout(45);
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toHaveCSS("height", "0px");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toBeVisible();
  expect(
    await panel.evaluate((element) => element.getBoundingClientRect().height),
  ).toBeGreaterThan(0);
});

test("accordion respects reduced motion and still shows its state", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/components/accordion");
  const trigger = page.getByRole("button", {
    name: "How do I invite teammates?",
  });
  const panel = page.getByRole("group", { name: "How do I invite teammates?" });

  await trigger.click();
  await expect(panel).toBeVisible();
  await expect(panel).toHaveCSS("transition-property", "all");
  await expect(trigger.locator("span[aria-hidden=true]")).toHaveCSS(
    "transform",
    "matrix(-1, 0, 0, -1, 0, 0)",
  );
});

test("release notes use the accordion panel animation", async ({ page }) => {
  await page.goto("/examples/repository/releases");
  const trigger = page.locator("button[aria-expanded]").first();
  // GitHub is an external data source; still test the preview if it is unavailable.
  test.skip((await trigger.count()) === 0, "GitHub releases are unavailable");
  const panel = page.locator("[role=group]").first();

  const opening = await observePanelHeight(panel, () => trigger.click());
  await expect(panel).toHaveCSS("transition-property", "all");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(
    opening.samples.some((height) => height > 0 && height < opening.fullHeight),
  ).toBe(true);
  await expect(trigger.locator("span[aria-hidden=true]")).toHaveCSS(
    "transform",
    "matrix(-1, 0, 0, -1, 0, 0)",
  );
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toBeHidden();
});
