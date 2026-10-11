import { Stat, StatDetail, StatLabel, StatValue } from "@/components/ui/stat";

export function StatDemo() {
  return (
    <Stat className="w-full max-w-xs">
      <StatLabel>Active projects</StatLabel>
      <StatValue>24</StatValue>
      <StatDetail>Up 3 from last month</StatDetail>
    </Stat>
  );
}
