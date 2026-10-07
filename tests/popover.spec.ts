import { expect, test } from "@playwright/test";

test("popover retains its accessible dialog during exit and restores focus", async ({
  page,
}) => {
  await page.goto("/components/popover");
  await page.waitForLoadState("networkidle");
  const trigger = page.getByRole("button", { name: "Share project" });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Share Studio North" });
  await expect(dialog).toBeVisible();
  const access = dialog.getByRole("button", { name: "Access" });
  await expect(access).toContainText("Can edit");
  const value = access.locator("[data-slot=select-value]");
  const icon = access.locator("[data-slot=select-chevron] svg");
  const [valueBox, iconBox, triggerBox] = await Promise.all([
    value.boundingBox(),
    icon.boundingBox(),
    access.boundingBox(),
  ]);
  expect(valueBox && iconBox && triggerBox).toBeTruthy();
  if (valueBox && iconBox && triggerBox) {
    const triggerMid = triggerBox.y + triggerBox.height / 2;
    expect(
      Math.abs(valueBox.y + valueBox.height / 2 - triggerMid),
    ).toBeLessThan(2);
    expect(Math.abs(iconBox.y + iconBox.height / 2 - triggerMid)).toBeLessThan(
      2,
    );
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
