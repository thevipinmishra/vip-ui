import { expect, type Page, test } from "@playwright/test";

async function openSheetPage(page: Page) {
  await page.goto("/components/sheet");
  // Clicks before hydration don't open the sheet.
  await page.waitForLoadState("networkidle");
}

async function openSheet(page: Page, trigger: string, title: string) {
  await page.getByRole("button", { name: trigger, exact: true }).click();
  const dialog = page.getByRole("dialog", { name: title });
  await expect(dialog).toBeVisible();
  // Interacting mid-slide would interrupt React Aria's enter scroll.
  let previous = "";
  await expect
    .poll(
      async () => {
        const box = await dialog.boundingBox();
        const viewport = page.viewportSize();
        const key = JSON.stringify(box);
        // It rests at the exit position briefly before sliding in.
        const settled =
          key === previous &&
          !!box &&
          !!viewport &&
          box.x >= -1 &&
          box.y >= -1 &&
          box.x + box.width <= viewport.width + 1 &&
          box.y + box.height <= viewport.height + 1;
        previous = key;
        return settled;
      },
      { intervals: [100] },
    )
    .toBe(true);
  return dialog;
}

// Records a value every frame until stopped, to catch single-frame glitches.
async function recordFrames(page: Page, read: () => unknown) {
  await page.evaluate((source) => {
    const read = new Function(`return (${source})()`);
    const frames: unknown[] = [];
    let id = 0;
    const tick = () => {
      frames.push(read());
      id = requestAnimationFrame(tick);
    };
    tick();
    Object.assign(window, {
      stopRecording: () => {
        cancelAnimationFrame(id);
        return frames;
      },
    });
  }, read.toString());
  return () =>
    page.evaluate(() =>
      (window as unknown as { stopRecording: () => unknown[] }).stopRecording(),
    );
}

test("sheets open from every edge and return focus on close", async ({
  page,
}) => {
  await openSheetPage(page);
  for (const [trigger, title] of [
    ["Resize order", "Order summary"],
    ["Shortcuts", "Keyboard shortcuts"],
    ["Collections", "Collections"],
    ["Filter projects", "Filter projects"],
  ]) {
    const button = page.getByRole("button", { name: trigger, exact: true });
    const dialog = await openSheet(page, trigger, title);
    await dialog.getByRole("button", { name: "Close sheet" }).click();
    await expect(dialog).toHaveCount(0);
    await expect(button).toBeFocused();
  }
});

test("Escape and outside clicks dismiss a sheet", async ({ page }) => {
  await openSheetPage(page);
  const shortcuts = await openSheet(page, "Shortcuts", "Keyboard shortcuts");
  await page.keyboard.press("Escape");
  await expect(shortcuts).toHaveCount(0);

  const collections = await openSheet(page, "Collections", "Collections");
  const viewport = page.viewportSize();
  if (!viewport) throw new Error("Missing viewport");
  await page.mouse.click(viewport.width - 24, viewport.height / 2);
  await expect(collections).toHaveCount(0);
});

test("the handle moves between snap points from the keyboard", async ({
  page,
}) => {
  await openSheetPage(page);
  const dialog = await openSheet(page, "Resize order", "Order summary");
  const height = dialog.locator("output");
  await expect(height).toHaveText("Sheet height 60 percent");
  const handle = dialog.getByRole("button", { name: /^Resize sheet/ });
  await handle.focus();
  await page.keyboard.press("ArrowDown");
  await expect(height).toHaveText("Sheet height 40 percent");
  await page.keyboard.press("Home");
  await expect(height).toHaveText("Sheet height 60 percent");
  await page.keyboard.press("End");
  await expect(dialog).toHaveCount(0);
});

test("dragging the handle with a mouse settles or dismisses", async ({
  page,
}) => {
  await openSheetPage(page);
  const dialog = await openSheet(page, "Collections", "Collections");
  const handle = dialog.getByRole("button", { name: /^Dismiss left sheet/ });
  const box = await handle.boundingBox();
  if (!box) throw new Error("Missing handle");
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x - 40, y, { steps: 8 });
  await page.waitForTimeout(150);
  await page.mouse.up();
  await expect(dialog).toBeVisible();
  await expect
    .poll(async () => Math.abs((await dialog.boundingBox())?.x ?? 99))
    .toBeLessThan(1);

  // The sheet is 26rem wide; dragging past 35% of that dismisses it.

  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x - 180, y, { steps: 12 });
  await page.waitForTimeout(150);
  const stop = await recordFrames(
    page,
    () => document.querySelector('[role="dialog"]')?.getBoundingClientRect().x,
  );
  await page.mouse.up();
  await expect(dialog).toHaveCount(0);
  // It keeps sliding out from where it was released, never back open first.
  const positions = (await stop()).filter((x) => typeof x === "number");
  for (let i = 1; i < positions.length; i++)
    expect(positions[i]).toBeLessThanOrEqual(positions[i - 1] + 1);
});

test("the handle can be grabbed again while the sheet settles", async ({
  page,
}) => {
  await openSheetPage(page);
  const dialog = await openSheet(page, "Collections", "Collections");
  const handle = dialog.getByRole("button", { name: /^Dismiss left sheet/ });
  const box = await handle.boundingBox();
  if (!box) throw new Error("Missing handle");
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x - 40, y, { steps: 8 });
  await page.waitForTimeout(150);
  await page.mouse.up();
  // Grab it mid-settle and hold past the settle's own snap restore.
  await page.mouse.down();
  await page.mouse.move(x - 60, y, { steps: 4 });
  await page.waitForTimeout(1100);
  await page.mouse.move(x - 220, y, { steps: 8 });
  await expect
    .poll(async () => (await dialog.boundingBox())?.x ?? 0)
    .toBeLessThan(-150);
  await page.waitForTimeout(150);
  await page.mouse.up();
  await expect(dialog).toHaveCount(0);
});

test("page scroll stays locked until a closing sheet is gone", async ({
  page,
}) => {
  await openSheetPage(page);
  const dialog = await openSheet(page, "View order", "Order summary");
  const stop = await recordFrames(page, () =>
    document.querySelector('[role="dialog"]')
      ? document.documentElement.style.overflow
      : null,
  );
  await dialog.getByRole("button", { name: "Close", exact: true }).click();
  await expect(dialog).toHaveCount(0);
  const locks = (await stop()).filter((overflow) => overflow !== null);
  expect(locks.length).toBeGreaterThan(1);
  expect(new Set(locks)).toEqual(new Set(["hidden"]));
  await expect
    .poll(() => page.evaluate(() => document.documentElement.style.overflow))
    .toBe("");
});

test("side sheet filters use labeled shared checkboxes", async ({ page }) => {
  await openSheetPage(page);
  const dialog = await openSheet(page, "Filter projects", "Filter projects");
  await expect(dialog.getByRole("group", { name: "Status" })).toBeVisible();
  await dialog.getByText("Completed", { exact: true }).click();
  await expect(
    dialog.getByRole("checkbox", { name: "Completed" }),
  ).toBeChecked();
  await dialog.getByRole("button", { name: "Show results" }).click();
  await expect(dialog).toHaveCount(0);
  await openSheet(page, "Filter projects", "Filter projects");
  await expect(
    dialog.getByRole("checkbox", { name: "Completed" }),
  ).toBeChecked();
});

test("the old drawer URL redirects to the sheet page", async ({ page }) => {
  await page.goto("/components/drawer");
  await expect(page).toHaveURL(/\/components\/sheet$/);
});
