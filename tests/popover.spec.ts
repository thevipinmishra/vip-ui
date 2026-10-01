import { expect, test } from "@playwright/test";

test("popover retains its accessible dialog during exit and restores focus", async ({
  page,
}) => {
  await page.goto("/components/popover");
  const trigger = page.getByRole("button", { name: "Project details" });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Studio North" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
