import { Stat, StatDetail, StatLabel, StatValue } from "@/components/ui/stat";

export function StatDemo() {
  return (
    <div className="grid w-full max-w-lg gap-3 sm:grid-cols-2">
      <Stat>
        <StatLabel>Active projects</StatLabel>
        <StatValue>24</StatValue>
        <StatDetail>Up 3 from last month</StatDetail>
      </Stat>
      <Stat>
        <StatLabel>Storage used</StatLabel>
        <StatValue>68 GB</StatValue>
        <StatDetail>Of 100 GB available</StatDetail>
      </Stat>
    </div>
  );
}
