import { expect, test } from "@playwright/test";

test("grouped toggles and toolbar preserve selection and keyboard access", async ({
  page,
}) => {
  await page.goto("/components/toggle-button-group");
  const views = page.getByRole("radiogroup", { name: "Calendar view" });
  await expect(views.getByRole("radio", { name: "Week" })).toBeChecked();
  const selectedSurface = await views
    .getByRole("radio", { name: "Week" })
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  const idleSurface = await views
    .getByRole("radio", { name: "Day" })
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(selectedSurface).not.toBe(idleSurface);
  await views.getByRole("radio", { name: "Month" }).click();
  await expect(views.getByRole("radio", { name: "Month" })).toBeChecked();
  await expect(views.getByRole("radio", { name: "Week" })).not.toBeChecked();
  await views.getByRole("radio", { name: "Month" }).press("ArrowLeft");
  await expect(views.getByRole("radio", { name: "Week" })).toBeFocused();
  await views.getByRole("radio", { name: "Week" }).press("Space");
  await expect(views.getByRole("radio", { name: "Week" })).toBeChecked();

  await page.goto("/components/toolbar");
  const toolbar = page.getByRole("toolbar", { name: "Text formatting" });
  await toolbar.getByRole("button", { name: "Italic" }).click();
  await expect(toolbar.getByRole("button", { name: "Italic" })).toHaveAttribute(
    "data-selected",
    "true",
  );
  await toolbar.getByRole("button", { name: "Clear" }).click();
  await expect(
    toolbar.getByRole("button", { name: "Italic" }),
  ).not.toHaveAttribute("data-selected", "true");
});

test("date and time segments share a visible keyboard focus treatment", async ({
  page,
}) => {
  for (const route of [
    "date-field",
    "time-field",
    "date-picker",
    "date-range-picker",
  ]) {
    await page.goto(`/components/${route}`);
    const target = page
      .locator('[data-type="day"], [data-type="hour"]')
      .first();
    await page.keyboard.press("Tab");
    await target.focus();
    await expect(target).toBeFocused();
    const styles = await target.evaluate((element) => ({
      background: getComputedStyle(element).backgroundColor,
      outline: getComputedStyle(element).outlineStyle,
      visible: element.matches(":focus-visible"),
    }));
    expect(styles.background).not.toBe("rgba(0, 0, 0, 0)");
    expect(styles.visible).toBe(true);
    expect(styles.outline).toBe("solid");
  }
});

test("range trail is square in the middle and capped only at its edges", async ({
  page,
}) => {
  for (const route of ["range-calendar", "date-range-picker"]) {
    await page.goto(`/components/${route}`);
    if (route === "date-range-picker") {
      await page
        .getByRole("button", { name: "Choose date range" })
        .first()
        .click();
    }
    const grid =
      route === "date-range-picker"
        ? page.getByRole("dialog").getByRole("grid").first()
        : page.getByRole("grid", { name: /Trip dates/ }).first();
    const calendar = grid
      .locator("[data-selected][data-selection-start]")
      .first();
    const middle = grid
      .locator(
        "[data-selected]:not([data-selection-start]):not([data-selection-end])",
      )
      .first();
    await expect(calendar).toBeVisible();
    await expect(middle).toBeVisible();
    const radii = await middle.evaluate((element) => {
      const style = getComputedStyle(element);
      return [style.borderTopLeftRadius, style.borderTopRightRadius];
    });
    expect(radii).toEqual(["0px", "0px"]);
    const next = grid.locator("td [data-selected]").nth(2);
    const [middleBox, nextBox] = await Promise.all([
      middle.boundingBox(),
      next.boundingBox(),
    ]);
    expect(middleBox && middleBox.x + middleBox.width).toBe(nextBox?.x);
    expect(
      await middle.evaluate(
        (element) => getComputedStyle(element).backgroundColor,
      ),
    ).toBe(
      await next.evaluate(
        (element) => getComputedStyle(element).backgroundColor,
      ),
    );
    expect(
      await calendar.evaluate(
        (element) => getComputedStyle(element).borderTopLeftRadius,
      ),
    ).not.toBe("0px");
    const weekEnd = grid.locator("td:last-child [data-selected]").first();
    const weekStart = grid.locator("td:first-child [data-selected]").first();
    await expect(weekEnd).toBeVisible();
    await expect(weekStart).toBeVisible();
    expect(
      await weekEnd.evaluate(
        (element) => getComputedStyle(element).borderTopRightRadius,
      ),
    ).not.toBe("0px");
    expect(
      await weekStart.evaluate(
        (element) => getComputedStyle(element).borderTopLeftRadius,
      ),
    ).not.toBe("0px");
  }
});

test("drawer primary action keeps a primary hover surface", async ({
  page,
}) => {
  await page.goto("/components/drawer");
  await page.getByRole("button", { name: "Filter results" }).click();
  const action = page.getByRole("button", { name: "Show results" });
  await expect(action).toBeVisible();
  await action.hover();
  const colors = await action.evaluate((element) => {
    const style = getComputedStyle(element);
    const muted = document.createElement("div");
    muted.style.backgroundColor = "var(--muted)";
    document.body.append(muted);
    const mutedColor = getComputedStyle(muted).backgroundColor;
    muted.remove();
    return { background: style.backgroundColor, text: style.color, mutedColor };
  });
  expect(colors.background).not.toBe(colors.mutedColor);
  expect(colors.text).not.toBe(colors.background);
  await action.click();
  await expect(action).not.toBeVisible();
});
