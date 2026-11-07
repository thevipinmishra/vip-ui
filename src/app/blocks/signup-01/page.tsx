import { blockMetadata } from "@/lib/block-seo";
import { SignupPage } from "./signup-page";

export const metadata = blockMetadata("signup-01");

export default function Page() {
  return <SignupPage />;
}
