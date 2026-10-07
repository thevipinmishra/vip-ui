import { expect, type Locator, test } from "@playwright/test";

async function expectTriggerCentered(trigger: Locator) {
  const value = trigger.locator("[data-slot=select-value]");
  const icon = trigger.locator("[data-slot=select-chevron] svg");
  const [valueBox, iconBox, triggerBox] = await Promise.all([
    value.boundingBox(),
    icon.boundingBox(),
    trigger.boundingBox(),
  ]);
  expect(valueBox).toBeTruthy();
  expect(iconBox).toBeTruthy();
  expect(triggerBox).toBeTruthy();
  if (!valueBox || !iconBox || !triggerBox) return;
  const triggerMid = triggerBox.y + triggerBox.height / 2;
  expect(Math.abs(valueBox.y + valueBox.height / 2 - triggerMid)).toBeLessThan(
    2,
  );
  expect(Math.abs(iconBox.y + iconBox.height / 2 - triggerMid)).toBeLessThan(2);
  expect(iconBox.x).toBeGreaterThan(valueBox.x);
}

test("the homepage leads to real components and working examples", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /Accessible components/ }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Get started" })).toHaveAttribute(
    "href",
    "/components/installation",
  );
  await expect(
    page.getByRole("link", { name: "Browse components" }),
  ).toHaveAttribute("href", "/components");

  const workspace = page.getByRole("button", { name: "Workspace" }).first();
  await expectTriggerCentered(workspace);
  await workspace.click();
  await page.getByRole("option", { name: "Billing operations" }).click();
  await expect(workspace).toContainText("Billing operations");
  await expectTriggerCentered(workspace);

  await page.getByRole("button", { name: "View project details" }).click();
  await expect(
    page.getByRole("dialog", { name: "Project details" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Project details" }),
  ).toHaveCount(0);

  await page.getByRole("button", { name: "Save draft" }).click();
  await expect(page.getByText("Draft saved")).toBeVisible();

  await page.getByRole("link", { name: "Select", exact: true }).click();
  await expect(page).toHaveURL(/\/components\/select/);
});

test("the homepage fits a narrow screen and honors reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.getByRole("link", { name: "Browse components" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Components", exact: true }),
  ).toBeVisible();
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(320);
});
