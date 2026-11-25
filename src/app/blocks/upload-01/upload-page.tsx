import { FileUpload } from "./file-upload";

export function UploadPage() {
  return (
    <main className="flex min-h-svh items-start justify-center bg-background px-4 py-6 sm:px-6 sm:py-8">
      <div className="w-full max-w-xl">
        <FileUpload />
      </div>
    </main>
  );
}
