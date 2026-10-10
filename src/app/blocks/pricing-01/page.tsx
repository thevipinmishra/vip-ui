import type { Metadata } from "next";
import { PricingPlans } from "./pricing-plans";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <main className="min-h-svh bg-background px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <PricingPlans />
      </div>
    </main>
  );
}
