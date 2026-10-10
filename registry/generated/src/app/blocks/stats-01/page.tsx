import type { Metadata } from "next";
import { StatsCards } from "./stats-cards";

export const metadata: Metadata = {
  title: "Metrics",
};

export default function StatsPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-6xl">
        <StatsCards />
      </div>
    </main>
  );
}
