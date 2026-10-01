import "server-only";
import { repository } from "./config";

// The public example is read-only. A token increases the GitHub API rate limit;
// it is never sent to the browser or included in an installable registry item.
const api = `https://api.github.com/repos/${repository.owner}/${repository.name}`;
const perPage = 15;

export type User = {
  login: string;
  avatar_url: string;
  html_url: string;
};
export type Repo = {
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number; // GitHub includes pull requests in this number.
  default_branch: string;
  updated_at: string;
};
export type Issue = {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  updated_at: string;
  user: User | null;
  labels: { id: number; name: string }[];
  pull_request?: object;
};
export type Pull = Issue & {
  draft: boolean;
  merged_at: string | null;
};
export type Commit = {
  sha: string;
  html_url: string;
  commit: { message: string; author: { name: string; date: string } | null };
  author: User | null;
};
export type Release = {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  published_at: string | null;
  draft: boolean;
  prerelease: boolean;
  author: User;
};
export type Contributor = User & { id: number; contributions: number };
export type Result<T> = { data: T; asOf: string | null };
export type Page<T> = Result<T[]> & { hasNext: boolean; page: number };

export class GitHubUnavailable extends Error {
  constructor() {
    super(
      "GitHub data is unavailable right now. Try again shortly or open the repository on GitHub.",
    );
  }
}

async function request<T>(
  path: string,
): Promise<{ data: T; asOf: string | null; hasNext: boolean }> {
  let response: Response;
  try {
    response = await fetch(`${api}${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new GitHubUnavailable();
  }
  if (!response.ok) throw new GitHubUnavailable();
  try {
    return {
      data: (await response.json()) as T,
      asOf: response.headers.get("date"),
      hasNext: /<[^>]+>;\s*rel="next"/.test(response.headers.get("link") ?? ""),
    };
  } catch {
    throw new GitHubUnavailable();
  }
}

export function pageNumber(value: string | string[] | undefined) {
  const number = Number(value);
  return typeof value === "string" &&
    Number.isSafeInteger(number) &&
    number > 0 &&
    number <= 100
    ? number
    : 1;
}

export function workState(
  value: string | string[] | undefined,
): "open" | "closed" {
  return value === "closed" ? "closed" : "open";
}

async function list<T>(path: string, page: number): Promise<Page<T>> {
  const separator = path.includes("?") ? "&" : "?";
  const result = await request<T[]>(
    `${path}${separator}per_page=${perPage}&page=${page}`,
  );
  if (!Array.isArray(result.data)) throw new GitHubUnavailable();
  return { ...result, page, hasNext: result.hasNext };
}

export async function getRepo(): Promise<Result<Repo>> {
  const result = await request<Repo>("");
  if (!result.data || typeof result.data.stargazers_count !== "number")
    throw new GitHubUnavailable();
  return result;
}

export async function getIssues(
  state: "open" | "closed",
  page: number,
): Promise<Page<Issue>> {
  // GitHub's issues endpoint also returns PRs. Filter them without calling the
  // more heavily rate-limited search endpoint; pagination remains API-backed.
  const result = await list<Issue>(
    `/issues?state=${state}&sort=updated&direction=desc`,
    page,
  );
  return {
    ...result,
    data: result.data
      .filter((issue) => !issue.pull_request)
      .map((issue) => ({
        id: issue.id,
        number: issue.number,
        title: issue.title,
        html_url: issue.html_url,
        state: issue.state,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        user: issue.user && {
          login: issue.user.login,
          avatar_url: issue.user.avatar_url,
          html_url: issue.user.html_url,
        },
        labels: issue.labels.map(({ id, name }) => ({ id, name })),
      })),
  };
}

export async function getPulls(
  state: "open" | "closed",
  page: number,
): Promise<Page<Pull>> {
  const result = await list<Pull>(
    `/pulls?state=${state}&sort=updated&direction=desc`,
    page,
  );
  return {
    ...result,
    data: result.data.map((pull) => ({
      id: pull.id,
      number: pull.number,
      title: pull.title,
      html_url: pull.html_url,
      state: pull.state,
      created_at: pull.created_at,
      updated_at: pull.updated_at,
      user: pull.user && {
        login: pull.user.login,
        avatar_url: pull.user.avatar_url,
        html_url: pull.user.html_url,
      },
      labels: pull.labels.map(({ id, name }) => ({ id, name })),
      draft: pull.draft,
      merged_at: pull.merged_at,
    })),
  };
}

export async function getCommits(page: number): Promise<Page<Commit>> {
  const result = await list<Commit>("/commits", page);
  return {
    ...result,
    data: result.data.map((entry) => ({
      sha: entry.sha,
      html_url: entry.html_url,
      commit: {
        message: entry.commit.message.split("\n")[0],
        author: entry.commit.author,
      },
      author: entry.author && {
        login: entry.author.login,
        avatar_url: entry.author.avatar_url,
        html_url: entry.author.html_url,
      },
    })),
  };
}

export function getReleases(page: number) {
  return list<Release>("/releases", page);
}

export async function getContributors(
  page: number,
): Promise<Page<Contributor>> {
  const result = await list<Contributor>("/contributors", page);
  return {
    ...result,
    data: result.data.map(
      ({ id, login, avatar_url, html_url, contributions }) => ({
        id,
        login,
        avatar_url,
        html_url,
        contributions,
      }),
    ),
  };
}
