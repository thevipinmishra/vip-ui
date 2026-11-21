import { blockMetadata } from "@/lib/block-seo";
import { SignDocument } from "./sign-document";

export const metadata = blockMetadata("sign-01");

export default function SignBlockPage() {
  return <SignDocument />;
}
