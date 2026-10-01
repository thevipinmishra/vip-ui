import { connection } from "next/server";
import { ArrowRight } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stat, StatDetail, StatLabel, StatValue } from "@/components/ui/stat";
import { repository } from "./config";
import { getCommits, getPulls, getReleases, getRepo } from "./data";
import {
  Failure,
  formatDate,
  GithubLink,
  Heading,
  SectionCard,
  Source,
} from "./ui";

export default async function RepositoryOverview() {
  await connection();
  const [repo, pulls, commits, releases] = await Promise.allSettled([
    getRepo(),
    getPulls("open", 1),
    getCommits(1),
    getReleases(1),
  ]);
  return (
    <>
      <Heading
        title="Overview"
        description={`A view of the public ${repository.owner}/${repository.name} repository. Review what is open, who is contributing, and what shipped recently.`}
        action={<GithubLink />}
      />
      {repo.status === "fulfilled" ? (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat>
              <StatLabel>Stars</StatLabel>
              <StatValue>
                {repo.value.data.stargazers_count.toLocaleString("en-US")}
              </StatValue>
              <StatDetail>People who starred this repository</StatDetail>
            </Stat>
            <Stat>
              <StatLabel>Forks</StatLabel>
              <StatValue>
                {repo.value.data.forks_count.toLocaleString("en-US")}
              </StatValue>
              <StatDetail>Public forks on GitHub</StatDetail>
            </Stat>
            <Stat>
              <StatLabel>Open issues &amp; PRs</StatLabel>
              <StatValue>
                {repo.value.data.open_issues_count.toLocaleString("en-US")}
              </StatValue>
              <StatDetail>GitHub combines both in this count</StatDetail>
            </Stat>
          </div>
          <Source asOf={repo.value.asOf} />
          <Card className="mt-7">
            <CardHeader>
              <CardTitle>About this repository</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm leading-6 text-foreground">
                  {repo.value.data.description || "No description provided."}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Default branch:{" "}
                  <span className="font-mono text-foreground">
                    {repo.value.data.default_branch}
                  </span>{" "}
                  · Repository updated {formatDate(repo.value.data.updated_at)}
                </p>
              </div>
              <Badge variant="success">Public</Badge>
            </CardContent>
          </Card>
        </>
      ) : (
        <Failure />
      )}
      <div className="mt-7 grid gap-4 xl:grid-cols-2">
        <SectionCard
          title="Pull requests awaiting review"
          description="Most recently updated open pull requests"
          href="/examples/repository/pulls"
        >
          {pulls.status === "fulfilled" ? (
            pulls.value.data.length ? (
              <ul className="divide-y divide-border/70">
                {pulls.value.data.slice(0, 4).map((pull) => (
                  <li key={pull.id} className="py-3 first:pt-0 last:pb-0">
                    <a
                      href={pull.html_url}
                      className="block text-sm font-medium leading-5 hover:text-primary hover:underline"
                    >
                      {pull.title}
                    </a>
                    <p className="mt-1 text-xs text-muted-foreground">
                      #{pull.number} · {pull.user?.login ?? "Unknown"} · updated{" "}
                      {formatDate(pull.updated_at)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No open pull requests returned.
              </p>
            )
          ) : (
            <Failure />
          )}
        </SectionCard>
        <SectionCard
          title="Recent commits"
          description="Latest changes to the default branch"
          href="/examples/repository/commits"
        >
          {commits.status === "fulfilled" ? (
            commits.value.data.length ? (
              <ul className="divide-y divide-border/70">
                {commits.value.data.slice(0, 4).map((commit) => (
                  <li key={commit.sha} className="py-3 first:pt-0 last:pb-0">
                    <a
                      href={commit.html_url}
                      className="block text-sm font-medium leading-5 hover:text-primary hover:underline"
                    >
                      {commit.commit.message.split("\n")[0]}
                    </a>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {commit.sha.slice(0, 7)} ·{" "}
                      {commit.author?.login ??
                        commit.commit.author?.name ??
                        "Unknown"}{" "}
                      · {formatDate(commit.commit.author?.date ?? null)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No commits returned.
              </p>
            )
          ) : (
            <Failure />
          )}
        </SectionCard>
      </div>
      <div className="mt-4">
        <SectionCard
          title="Latest release"
          description="The most recently published release"
          href="/examples/repository/releases"
        >
          {releases.status === "fulfilled" ? (
            releases.value.data.length ? (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-base font-semibold">
                    {releases.value.data[0].name ||
                      releases.value.data[0].tag_name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {releases.value.data[0].tag_name} · published{" "}
                    {formatDate(releases.value.data[0].published_at)}
                  </p>
                </div>
                <a
                  href={releases.value.data[0].html_url}
                  className="inline-flex min-h-10 items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Read notes <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No published releases returned.
              </p>
            )
          ) : (
            <Failure />
          )}
        </SectionCard>
      </div>
    </>
  );
}
