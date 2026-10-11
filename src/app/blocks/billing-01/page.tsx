import type { Metadata } from "next";
import { BillingSettings } from "./billing-settings";

export const metadata: Metadata = {
  title: "Billing",
};

export default function BillingPage() {
  return (
    <main className="min-h-svh bg-background px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <BillingSettings />
      </div>
    </main>
  );
}
