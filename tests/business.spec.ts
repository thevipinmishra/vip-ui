import { expect, test } from "@playwright/test";

test("business filters keep the shared field controls and GET query", async ({
  page,
}) => {
  await page.goto("/examples/business/customers");
  await expect(
    page.getByRole("heading", { name: "Customer directory", level: 2 }),
  ).toBeVisible();
  await page.getByRole("searchbox", { name: "Search" }).fill("Northstar");
  await page.getByRole("button", { name: /All statuses/ }).click();
  await page.getByRole("option", { name: "Active" }).click();
  await page.getByRole("button", { name: "Apply filters" }).click();

  await expect(page).toHaveURL(/q=Northstar&status=active/);
  await expect(page.getByRole("searchbox", { name: "Search" })).toHaveValue(
    "Northstar",
  );
  await expect(page.getByRole("button", { name: /Active/ })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Northstar Studio" }),
  ).toBeVisible();
});
