import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { componentKeywords } from "../src/lib/search-keywords.ts";
import { sortByRelevance } from "../src/lib/search-rank.ts";

const catalog = JSON.parse(
  readFileSync(new URL("../src/lib/catalog.json", import.meta.url), "utf8"),
);
const components = catalog.groups.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.title })),
);

const fold = (text) =>
  text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();

function matches(component, query) {
  return [
    component.name,
    ...componentKeywords[component.slug],
    component.group,
  ].some((term) => fold(term).includes(fold(query)));
}

function search(query) {
  const matching = components.filter((component) => matches(component, query));
  return sortByRelevance(matching, query, (component) => ({
    name: component.name,
    keywords: componentKeywords[component.slug],
    group: component.group,
  })).map((component) => component.slug);
}

test("every component has search keywords", () => {
  const slugs = new Set(components.map((component) => component.slug));
  for (const slug of slugs) {
    assert.ok(componentKeywords[slug]?.length, `${slug} has no keywords`);
  }
  for (const slug of Object.keys(componentKeywords)) {
    assert.ok(slugs.has(slug), `${slug} is not in the catalog`);
  }
});

test("synonyms rank the matching component first", () => {
  const expected = {
    drawer: "sheet",
    input: "text-field",
    modal: "dialog",
    dropdown: "menu",
    textarea: "text-area",
    combobox: "combo-box",
    snackbar: "toast",
    divider: "separator",
    toggle: "toggle-button",
    button: "button",
    "date range": "range-calendar",
    "file upload": "drop-zone",
  };
  for (const [query, slug] of Object.entries(expected)) {
    assert.equal(
      search(query)[0],
      slug,
      `"${query}" → ${search(query).slice(0, 3)}`,
    );
  }
});

test("empty query keeps catalog order", () => {
  assert.deepEqual(
    search(""),
    components.map((component) => component.slug),
  );
});

test("unmatched query returns nothing", () => {
  assert.deepEqual(search("zzzz"), []);
});
