import { expect, test } from "@playwright/test";

test("the blocks gallery previews, sizes, and shows the source of a block", async ({
  page,
}) => {
  await page.goto("/blocks/authentication");
  await expect(
    page.getByRole("heading", { level: 1, name: "Blocks" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Authentication/ }),
  ).toHaveAttribute("aria-current", "page");

  const block = page.locator("section#login-01");
  await expect(block.locator("iframe")).toHaveAttribute(
    "src",
    "/blocks/login-01",
  );

  await block.getByRole("radio", { name: "Tablet width" }).click();
  const splitter = block.getByRole("separator", { name: "Resize preview" });
  await expect(splitter).toHaveAttribute("aria-valuenow", "768");
  await splitter.press("ArrowLeft");
  await expect(splitter).toHaveAttribute("aria-valuenow", "736");

  await block.getByRole("tab", { name: "Code" }).click();
  await block.getByRole("radio", { name: "login-form.tsx" }).click();
  await expect(
    block.getByRole("region", {
      name: "Code for src/app/blocks/login-01/login-form.tsx",
    }),
  ).toContainText("export function LoginForm");
});

test("a block route works on its own", async ({ page }) => {
  await page.goto("/blocks/login-01");
  await page.getByRole("textbox", { name: "Email" }).fill("ada@company.com");
  await page.getByLabel("Password", { exact: true }).fill("analytical-1843");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByText("You are signed in")).toBeVisible();
});

test("an unknown block category is not found", async ({ page }) => {
  const response = await page.goto("/blocks/unknown");
  expect(response?.status()).toBe(404);
});
