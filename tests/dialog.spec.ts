import { expect, test } from "@playwright/test";

test("a controlled dialog follows external open and close changes", async ({
  page,
}) => {
  await page.goto("/components/dialog");
  await page.getByRole("button", { name: "Open from app state" }).click();

  const dialog = page.getByRole("dialog", { name: "Controlled dialog" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("xpath=../..")).toHaveCSS("opacity", "1");

  await page.getByRole("button", { name: "Close from app state" }).click();
  await expect(dialog).toHaveCount(0);

  await page.getByRole("button", { name: "Open from trigger" }).click();
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("xpath=../..")).toHaveCSS("opacity", "1");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("an uncontrolled dialog still opens and closes", async ({ page }) => {
  await page.goto("/components/dialog");
  await page.getByRole("button", { name: "View project details" }).click();
  const dialog = page.getByRole("dialog", { name: "Project details" });
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "Close dialog" }).click();
  await expect(dialog).toHaveCount(0);
});
