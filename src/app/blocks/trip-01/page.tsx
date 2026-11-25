import { blockMetadata } from "@/lib/block-seo";
import { TripPage } from "./trip-page";

export const metadata = blockMetadata("trip-01");

export default function Page() {
  return <TripPage />;
}
