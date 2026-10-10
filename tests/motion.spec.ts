import { expect, test } from "@playwright/test";

test("text reveal keeps each word on one line in character mode", async ({
  page,
}) => {
  await page.goto("/components/text-reveal");
  const reveal = page.locator('#example-characters [data-slot="text-reveal"]');
  await expect(reveal).toBeVisible();

  const lines = await reveal.evaluate((element) => {
    const words = [
      ...element.querySelectorAll<HTMLElement>(
        '[aria-hidden="true"] > span.inline-block',
      ),
    ];
    const widest = Math.max(...words.map((word) => word.offsetWidth));
    (element.parentElement as HTMLElement).style.width = `${widest + 2}px`;
    return words.map(
      (word) =>
        new Set(
          [...word.children].map((character) =>
            Math.round(character.getBoundingClientRect().top),
          ),
        ).size,
    );
  });
  expect(lines).toEqual([1, 1]);
});

test("text scramble shows the first value without a scramble", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const seen: string[] = [];
    (window as unknown as { scrambleTexts: string[] }).scrambleTexts = seen;
    new MutationObserver(() => {
      const visible = document.querySelector(
        '#preview [data-slot="text-scramble"] [aria-hidden="true"]',
      );
      if (visible) seen.push(visible.textContent ?? "");
    }).observe(document, {
      subtree: true,
      childList: true,
      characterData: true,
    });
  });
  await page.goto("/components/text-scramble");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(800);
  const seen = await page.evaluate(
    () => (window as unknown as { scrambleTexts: string[] }).scrambleTexts,
  );
  expect(seen.length).toBeGreaterThan(0);
  expect(new Set(seen)).toEqual(new Set(["STUDIO NOTES"]));
});

test("layout morph keeps outgoing content inside the padding", async ({
  page,
}) => {
  await page.goto("/components/layout-morph");
  const morph = page.locator('#preview [data-slot="layout-morph"]');
  await expect(morph).toBeVisible();

  const offsets = await morph.evaluate(
    (element) =>
      new Promise<number[]>((resolve) => {
        const button = [
          ...document.querySelectorAll<HTMLButtonElement>("#preview button"),
        ].find((candidate) => candidate.textContent === "Next caption");
        const differences: number[] = [];
        const start = performance.now();
        button?.click();
        function sample() {
          const contents = element.querySelectorAll(
            '[data-slot="layout-morph-content"]',
          );
          if (contents.length === 2) {
            differences.push(
              Math.abs(
                contents[0].getBoundingClientRect().left -
                  contents[1].getBoundingClientRect().left,
              ),
            );
          }
          if (performance.now() - start < 300) requestAnimationFrame(sample);
          else resolve(differences);
        }
        requestAnimationFrame(sample);
      }),
  );
  expect(offsets.length).toBeGreaterThan(0);
  expect(Math.max(...offsets)).toBeLessThan(1);
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("marquee wraps so every item stays visible", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/components/marquee");
    const viewport = page
      .locator('#preview [data-slot="marquee"] > div')
      .first();
    await expect(viewport).toBeVisible();
    await expect
      .poll(() =>
        viewport.evaluate((element) => {
          const bounds = element.getBoundingClientRect();
          const items = element.querySelectorAll(
            ":scope > div > div:first-child > *",
          );
          return [...items].every(
            (item) => item.getBoundingClientRect().right <= bounds.right + 0.5,
          );
        }),
      )
      .toBe(true);
    await expect(
      page.locator("#preview").getByRole("button", { name: "Pause motion" }),
    ).toBeHidden();
  });

  test("motion components hydrate without mismatches", async ({ page }) => {
    const mismatches: string[] = [];
    page.on("console", (message) => {
      const text = message.text();
      if (
        message.type() === "error" &&
        text.includes("hydrat") &&
        /data-slot="(text-reveal|stagger-group|stagger-item)"/.test(text)
      )
        mismatches.push(text);
    });
    for (const slug of ["text-reveal", "stagger-group"]) {
      await page.goto(`/components/${slug}`);
      await page.waitForLoadState("networkidle");
    }
    expect(mismatches).toEqual([]);
  });
});
