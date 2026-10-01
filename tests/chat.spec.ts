import { expect, test } from "@playwright/test";

test("chat flow keeps conversations locally", async ({ page }) => {
  await page.goto("/examples/chat");
  await expect(
    page.getByRole("heading", { name: "Planning a focused morning" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "New chat" }).click();
  await expect(
    page.getByRole("heading", { name: "What would you like to work on?" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Plan a focused day" }).click();
  await expect(
    page.getByText("Pick the one outcome", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Message" })
    .fill("A follow-up question");
  await page.getByRole("textbox", { name: "Message" }).press("Enter");
  await expect(page.getByText("A follow-up question")).toBeVisible();
  await expect(
    page.getByText("I can't respond to that request here", { exact: false }),
  ).toBeVisible();

  await page.reload();
  await expect(page.getByText("A follow-up question")).toBeVisible();
  await page
    .getByRole("searchbox", { name: "Search conversations" })
    .fill("focused morning");
  await expect(
    page.getByRole("button", { name: "Planning a focused morning" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Planning a focused morning" })
    .click();
  await expect(
    page.getByText("Give it a 75-minute block", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Delete conversation" }).click();
  await expect(
    page.getByRole("heading", { name: "What would you like to work on?" }),
  ).toBeVisible();
});

test("chat history moves focus into and out of its mobile panel", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/examples/chat");
  const toggle = page.getByRole("button", { name: "Open chat history" });
  await toggle.focus();
  await toggle.press("Enter");
  await expect(
    page.getByRole("searchbox", { name: "Search conversations" }),
  ).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Close chat history" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Planning a focused morning" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("textbox", { name: "Message" })).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Open chat history" }),
  ).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("searchbox", { name: "Search conversations" })
    .press("Escape");
  await expect(toggle).toBeFocused();
});

test("chat navigation works at narrow widths", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/examples/chat");
  await page.getByRole("button", { name: "Open chat history" }).click();
  await expect(
    page.getByRole("navigation", { name: "Conversations" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "New chat" }).click();
  await expect(
    page.getByRole("navigation", { name: "Conversations" }),
  ).toBeHidden();
  await expect(page.getByRole("textbox", { name: "Message" })).toBeFocused();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
});
