import { expect, test } from "@playwright/test";

test("the homepage leads to real components, examples, and source", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /It's your interface/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Shape your space." }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "View examples" }),
  ).toHaveAttribute("href", "/examples");

  await page.getByRole("button", { name: "Workspace" }).click();
  await page.getByRole("option", { name: "Team" }).click();
  await expect(page.getByRole("button", { name: "Workspace" })).toContainText(
    "Team",
  );

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

  await expect(
    page.getByRole("link", { name: "Open repository demo" }),
  ).toHaveAttribute("href", "/examples/repository");
  await expect(
    page.getByRole("link", { name: "Open business demo" }),
  ).toHaveAttribute("href", "/examples/business");

  await page.getByRole("tab", { name: "Code" }).click();
  await expect(page.getByText("button-demo.tsx")).toBeVisible();
  await page.getByRole("link", { name: "MIT license" }).click();
  await expect(
    page.getByRole("heading", { name: "MIT license" }),
  ).toBeVisible();
  await expect(page.getByText(/Permission is hereby granted/)).toBeVisible();
});

test("the homepage fits a narrow screen and honors reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.getByRole("link", { name: "Explore components" }),
  ).toBeVisible();
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(320);
  await expect(page.locator(".home-enter").first()).toHaveCSS(
    "animation-name",
    "none",
  );
});
