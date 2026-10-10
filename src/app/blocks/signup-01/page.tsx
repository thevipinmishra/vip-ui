import type { Metadata } from "next";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Create an account",
};

export default function SignupPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 p-6 md:p-10">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </main>
  );
}
