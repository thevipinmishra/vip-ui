import { connection } from "next/server";
import { getCommits, pageNumber } from "../data";
import { CommitList } from "../lists";
import { Failure, Heading, PageNavigation, Source } from "../ui";

export default async function CommitsPage({
  searchParams,
}: PageProps<"/examples/repository/commits">) {
  await connection();
  const page = pageNumber((await searchParams).page);
  let result: Awaited<ReturnType<typeof getCommits>>;
  try {
    result = await getCommits(page);
  } catch {
    return (
      <>
        <Heading
          title="Commits"
          description="Recent commits on the default branch. Filter the current page by date or open a commit for details."
        />
        <Failure />
      </>
    );
  }
  return (
    <>
      <Heading
        title="Commits"
        description="Recent commits on the default branch. Filter the current page by date or open a commit for details."
      />
      <CommitList key={page} items={result.data} />
      <PageNavigation
        base="/examples/repository/commits"
        page={page}
        hasNext={result.hasNext}
      />
      <Source asOf={result.asOf} />
    </>
  );
}
