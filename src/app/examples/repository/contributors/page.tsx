import { connection } from "next/server";
import { getContributors, pageNumber } from "../data";
import { ContributorList } from "../lists";
import { Failure, Heading, PageNavigation, Source } from "../ui";

export default async function ContributorsPage({
  searchParams,
}: PageProps<"/examples/repository/contributors">) {
  await connection();
  const page = pageNumber((await searchParams).page);
  let result: Awaited<ReturnType<typeof getContributors>>;
  try {
    result = await getContributors(page);
  } catch {
    return (
      <>
        <Heading
          title="Contributors"
          description="Contributions to this repository, as counted by GitHub. Open a profile to see more."
        />
        <Failure />
      </>
    );
  }
  return (
    <>
      <Heading
        title="Contributors"
        description="Contributions to this repository, as counted by GitHub. Open a profile to see more."
      />
      <ContributorList items={result.data} />
      <PageNavigation
        base="/examples/repository/contributors"
        page={page}
        hasNext={result.hasNext}
      />
      <Source asOf={result.asOf} />
    </>
  );
}
