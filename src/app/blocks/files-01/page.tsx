import { blockMetadata } from "@/lib/block-seo";
import { FileManager } from "./file-manager";

export const metadata = blockMetadata("files-01");

export default function FilesBlockPage() {
  return <FileManager />;
}
