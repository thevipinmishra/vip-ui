import { ChartGallery } from "@/components/charts/chart-gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Charts",
  description:
    "Chart examples built on TanStack Charts. Copy the source into your app.",
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
