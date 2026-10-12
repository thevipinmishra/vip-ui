import type { Metadata } from "next";
import { ChartGallery } from "@/components/charts/chart-gallery";

export const metadata: Metadata = {
  title: "Charts | vip/ui",
  description:
    "Accessible charts, built with TanStack Charts. Add a chart to your app. Change it to suit your data.",
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
