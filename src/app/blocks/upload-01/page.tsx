import { blockMetadata } from "@/lib/block-seo";
import { FileUpload } from "./file-upload";

export const metadata = blockMetadata("upload-01");

export default function UploadPage() {
  return (
    <main className="flex min-h-svh items-start justify-center bg-muted/40 p-6 md:p-10">
      <div className="w-full max-w-lg">
        <FileUpload />
      </div>
    </main>
  );
}
