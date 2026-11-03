import { blockMetadata } from "@/lib/block-seo";
import { BillingSettings } from "./billing-settings";

export const metadata = blockMetadata("billing-01");

export default function BillingPage() {
  return (
    <main className="min-h-svh bg-background px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <BillingSettings />
      </div>
    </main>
  );
}
