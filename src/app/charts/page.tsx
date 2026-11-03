import { ChartGallery } from "@/components/charts/chart-gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Charts",
  description:
    "Accessible charts with motion, built with TanStack Charts. Browse live examples, then copy the source and make the chart yours.",
  path: "/charts",
  image: "file",
});

export default async function ChartsPage({
  searchParams,
}: PageProps<"/charts">) {
  const { chart } = await searchParams;
  return (
    <ChartGallery
      initialCategory={typeof chart === "string" ? chart : "area"}
    />
  );
}
