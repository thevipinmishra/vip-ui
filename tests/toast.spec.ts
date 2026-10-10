import { expect, test } from "@playwright/test";

test("notifications animate on the toast surface and remain dismissible", async ({
  page,
}) => {
  await page.goto("/components/toast");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Save draft" }).click();

  const notification = page.getByRole("alertdialog", { name: "Draft saved" });
  await expect(notification).toBeVisible();
  await expect(notification).toHaveCSS("opacity", "1");
  await notification
    .getByRole("button", { name: "Dismiss notification" })
    .click();
  await expect(notification).toHaveCount(0);
});
