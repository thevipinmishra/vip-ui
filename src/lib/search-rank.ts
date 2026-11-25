export interface SearchEntry {
  name: string;
  keywords?: string[];
  group?: string;
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function matchTerm(term: string, query: string) {
  if (term === query) return 3;
  if (term.replaceAll(" ", "") === query.replaceAll(" ", "")) return 3;
  if (term.startsWith(query)) return 2;
  if (` ${term}`.includes(` ${query}`)) return 1;
  return 0;
}

function scorePhrase(entry: SearchEntry, query: string) {
  const name = matchTerm(normalize(entry.name), query);
  const keyword = Math.max(
    0,
    ...(entry.keywords ?? []).map((term) => matchTerm(normalize(term), query)),
  );
  if (name || keyword) return Math.max(name * 20 + 10, keyword * 20);
  if (entry.group && matchTerm(normalize(entry.group), query)) return 10;
  return 0;
}

export function scoreEntry(entry: SearchEntry, rawQuery: string) {
  const query = normalize(rawQuery);
  if (!query) return 1;
  return scorePhrase(entry, query);
}

export function sortByRelevance<T>(
  items: readonly T[],
  query: string,
  toEntry: (item: T) => SearchEntry,
): T[] {
  if (!normalize(query)) return [...items];
  return items
    .map((item, index) => ({
      item,
      index,
      score: scoreEntry(toEntry(item), query),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((result) => result.item);
}
