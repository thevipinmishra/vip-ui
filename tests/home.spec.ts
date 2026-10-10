import { expect, test } from "@playwright/test";

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

  const overview = page.getByRole("tabpanel", { name: "Overview" });
  await overview.getByRole("radio", { name: "7 days" }).click();
  await expect(
    overview.getByText("Last 7 days", { exact: true }),
  ).toBeVisible();
  await expect(
    overview.getByText(
      "Revenue by plan for the last 7 days, in thousands of dollars: exact values",
    ),
  ).toBeAttached();

  await page.getByRole("tab", { name: "Settings" }).click();
  const settings = page.getByRole("tabpanel", { name: "Settings" });
  await expect(
    settings.getByRole("heading", { name: "Appearance" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Overview" }).click();
  await expect(
    overview.getByText("Last 7 days", { exact: true }),
  ).toBeVisible();

  const tableLink = page.getByRole("link", { name: "Table component" });
  await expect(tableLink).toHaveCount(0);
  const inspect = page.getByRole("switch", { name: "Show components" });
  await page.getByText("Show components", { exact: true }).click();
  await expect(inspect).toBeChecked();
  await expect(tableLink).toBeVisible();
  await tableLink.click();
  await expect(page).toHaveURL(/\/components\/table/);
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
    page.getByRole("heading", { name: "Built with vip/ui" }),
  ).toBeVisible();
  await expect(page.getByRole("tab", { name: "Settings" })).toBeAttached();
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(320);
});
