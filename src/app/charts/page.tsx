import type { Metadata } from "next";
import { ChartGallery } from "@/components/charts/chart-gallery";

export const metadata: Metadata = {
  title: "Charts | vip/ui",
  description:
    "Browse TanStack chart examples, animated updates, and tooltips, with installation, usage, and API documentation for the vip/ui chart frame.",
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
