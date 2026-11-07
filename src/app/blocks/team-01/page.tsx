import { blockMetadata } from "@/lib/block-seo";
import { TeamPage } from "./team-page";

export const metadata = blockMetadata("team-01");

export default function Page() {
  return <TeamPage />;
}
