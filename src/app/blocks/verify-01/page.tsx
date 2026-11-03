import { blockMetadata } from "@/lib/block-seo";
import { VerifyScreen } from "./verify-screen";

export const metadata = blockMetadata("verify-01");

export default function VerifyPage() {
  return <VerifyScreen />;
}
