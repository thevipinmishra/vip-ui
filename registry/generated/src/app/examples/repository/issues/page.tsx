import { connection } from "next/server";
import { getIssues, pageNumber, workState } from "../data";
import { WorkList } from "../lists";
import { Failure, Heading, PageNavigation, Source } from "../ui";

export default async function IssuesPage({
  searchParams,
}: PageProps<"/examples/repository/issues">) {
  await connection();
  const params = await searchParams;
  const state = workState(params.state);
  const page = pageNumber(params.page);
  let result: Awaited<ReturnType<typeof getIssues>>;
  try {
    result = await getIssues(state, page);
  } catch {
    return (
      <>
        <Heading
          title="Issues"
          description="Track reported bugs, requests, and discussions. Open an issue on GitHub to respond."
        />
        <Failure />
      </>
    );
  }
  return (
    <>
      <Heading
        title="Issues"
        description="Track reported bugs, requests, and discussions. Open an issue on GitHub to respond."
      />
      <p className="mb-5 text-xs leading-5 text-muted-foreground">
        GitHub includes pull requests in its issue feed. This view hides them,
        so some pages have fewer rows.
      </p>
      <WorkList
        key={state + page}
        items={result.data}
        kind="issues"
        state={state}
      />
      <PageNavigation
        base="/examples/repository/issues"
        page={page}
        hasNext={result.hasNext}
        state={state}
      />
      <Source asOf={result.asOf} />
    </>
  );
}
