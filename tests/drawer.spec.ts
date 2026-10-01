import { expect, test } from "@playwright/test";

test("drawers open from every edge and return focus on close", async ({
  page,
}) => {
  await page.goto("/components/drawer");
  for (const [trigger, title] of [
    ["Review order", "Order summary"],
    ["Filter results", "Filter projects"],
    ["Browse workspace", "Workspace"],
    ["Compose", "Quick announcement"],
  ]) {
    const button = page.getByRole("button", { name: trigger, exact: true });
    await button.click();
    const dialog = page.getByRole("dialog", { name: title });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Close drawer" }).click();
    await expect(dialog).toHaveCount(0);
    await expect(button).toBeFocused();
  }
});

test("side drawer filters use labeled shared checkboxes", async ({ page }) => {
  await page.goto("/components/drawer");
  await page.getByRole("button", { name: "Filter results" }).click();
  const dialog = page.getByRole("dialog", { name: "Filter projects" });
  await expect(dialog.getByRole("group", { name: "Status" })).toBeVisible();
  await dialog.getByText("Completed", { exact: true }).click();
  await expect(
    dialog.getByRole("checkbox", { name: "Completed" }),
  ).toBeChecked();
  await dialog.getByRole("button", { name: "Show results" }).click();
  await expect(page.getByText("Completed projects")).toBeVisible();
});

test("top drawer posts a note", async ({ page }) => {
  await page.goto("/components/drawer");
  await page.getByRole("button", { name: "Compose" }).click();
  await page
    .getByRole("textbox", { name: "Message" })
    .fill("Team meeting Friday");
  await page.getByRole("button", { name: "Post announcement" }).click();
  await expect(
    page.locator("p", { hasText: "Team meeting Friday" }),
  ).toBeVisible();
});
