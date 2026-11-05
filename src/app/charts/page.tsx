import { ChartGallery } from "@/components/charts/chart-gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Charts",
  description:
    "Customizable React charts built with TanStack Charts. Explore interactive examples and ready-to-use data visualization patterns.",
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
