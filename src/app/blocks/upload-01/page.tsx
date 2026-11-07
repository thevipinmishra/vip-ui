import { blockMetadata } from "@/lib/block-seo";
import { UploadPage } from "./upload-page";

export const metadata = blockMetadata("upload-01");

export default function Page() {
  return <UploadPage />;
}
