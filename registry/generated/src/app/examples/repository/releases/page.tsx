import { connection } from "next/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/vip-ui/accordion";
import { Badge } from "../../../../components/vip-ui/badge";
import { getReleases, pageNumber } from "../data";
import {
  Failure,
  formatDate,
  Heading,
  NoResults,
  PageNavigation,
  Source,
} from "../ui";

export default async function ReleasesPage({
  searchParams,
}: PageProps<"/examples/repository/releases">) {
  await connection();
  const page = pageNumber((await searchParams).page);
  let result: Awaited<ReturnType<typeof getReleases>>;
  try {
    result = await getReleases(page);
  } catch {
    return (
      <>
        <Heading
          title="Releases"
          description="Published versions and their release notes, straight from GitHub."
        />
        <Failure />
      </>
    );
  }
  return (
    <>
      <Heading
        title="Releases"
        description="Published versions and their release notes, straight from GitHub."
      />
      {result.data.length ? (
        <Accordion className="gap-3">
          {result.data.map((release) => (
            <AccordionItem key={release.id} id={String(release.id)}>
              <AccordionTrigger>
                <span className="flex flex-wrap items-center gap-2 text-start">
                  <span>{release.name || release.tag_name}</span>
                  <Badge variant={release.prerelease ? "warning" : "success"}>
                    {release.prerelease ? "Prerelease" : "Published"}
                  </Badge>
                  <span className="text-xs font-normal text-muted-foreground">
                    {formatDate(release.published_at)}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="max-w-3xl">
                  <p className="mb-3 font-mono text-xs text-foreground">
                    {release.tag_name}
                  </p>
                  <p className="whitespace-pre-wrap break-words text-sm leading-6">
                    {release.body
                      ? `${release.body.slice(0, 1200)}${release.body.length > 1200 ? "…" : ""}`
                      : "No release notes provided."}
                  </p>
                  <a
                    className="mt-4 inline-flex min-h-10 items-center text-sm font-medium text-primary underline underline-offset-4"
                    href={release.html_url}
                  >
                    Read full release on GitHub
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <NoResults
          title="No releases on this page"
          description="Try a different page or check the repository on GitHub."
        />
      )}
      <PageNavigation
        base="/examples/repository/releases"
        page={page}
        hasNext={result.hasNext}
      />
      <Source asOf={result.asOf} />
    </>
  );
}
