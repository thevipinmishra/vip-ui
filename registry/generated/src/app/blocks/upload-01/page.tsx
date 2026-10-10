import type { Metadata } from "next";
import { FileUpload } from "./file-upload";

export const metadata: Metadata = {
  title: "Upload files",
};

export default function UploadPage() {
  return (
    <main className="flex min-h-svh items-start justify-center bg-muted/40 p-6 md:p-10">
      <div className="w-full max-w-lg">
        <FileUpload />
      </div>
    </main>
  );
}
