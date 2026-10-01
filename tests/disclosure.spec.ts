import { expect, test } from "@playwright/test";

test("disclosure opens and closes without scaling its header", async ({
  page,
}) => {
  await page.goto("/components/disclosure");
  const trigger = page.getByRole("button", { name: "What is included?" });
  const panel = page.getByRole("group", { name: "What is included?" });

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toBeVisible();
  await expect(panel).toHaveCSS("transition-property", "all");
  await expect(trigger.locator("span[aria-hidden=true]")).toHaveCSS(
    "transform",
    "matrix(-1, 0, 0, -1, 0, 0)",
  );

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toBeHidden();
});

test("reduced motion keeps the open-state cue without a transition", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/components/disclosure");
  const trigger = page.getByRole("button", { name: "What is included?" });
  const panel = page.getByRole("group", { name: "What is included?" });

  await trigger.click();
  await expect(panel).toBeVisible();
  await expect(panel).toHaveCSS("transition-property", "all");
  await expect(trigger.locator("span[aria-hidden=true]")).toHaveCSS(
    "transform",
    "matrix(-1, 0, 0, -1, 0, 0)",
  );
});
