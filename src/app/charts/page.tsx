import type { Metadata } from "next";
import { ChartGallery } from "@/components/charts/chart-gallery";

export const metadata: Metadata = {
  title: "Charts | vip/ui",
  description:
    "Accessible charts with motion, built with TanStack Charts. Copy the source, then make the chart yours.",
};

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
