import { blockMetadata } from "@/lib/block-seo";
import { LandingPage } from "./landing-page";

export const metadata = blockMetadata("landing-01");

export default function TrellisLandingPage() {
  return <LandingPage />;
}
