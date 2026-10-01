import { connection } from "next/server";
import { getPulls, pageNumber, workState } from "../data";
import { WorkList } from "../lists";
import { Failure, Heading, PageNavigation, Source } from "../ui";

export default async function PullsPage({
  searchParams,
}: PageProps<"/examples/repository/pulls">) {
  await connection();
  const params = await searchParams;
  const state = workState(params.state);
  const page = pageNumber(params.page);
  let result: Awaited<ReturnType<typeof getPulls>>;
  try {
    result = await getPulls(state, page);
  } catch {
    return (
      <>
        <Heading
          title="Pull requests"
          description="See proposed changes and their review status. Open a request on GitHub to take action."
        />
        <Failure />
      </>
    );
  }
  return (
    <>
      <Heading
        title="Pull requests"
        description="See proposed changes and their review status. Open a request on GitHub to take action."
      />
      <WorkList
        key={state + page}
        items={result.data}
        kind="pulls"
        state={state}
      />
      <PageNavigation
        base="/examples/repository/pulls"
        page={page}
        hasNext={result.hasNext}
        state={state}
      />
      <Source asOf={result.asOf} />
    </>
  );
}
