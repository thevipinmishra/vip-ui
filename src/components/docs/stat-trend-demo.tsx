import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/badge";
import { Stat, StatDetail, StatLabel, StatValue } from "@/components/ui/stat";

const stats = [
  { label: "Revenue", value: "$48,200", change: "+12%", isUp: true },
  { label: "New customers", value: "1,284", change: "+8%", isUp: true },
  { label: "Active users", value: "9,630", change: "−3%", isUp: false },
];

export function StatTrendDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <Stat key={stat.label}>
          <StatLabel>{stat.label}</StatLabel>
          <StatValue>{stat.value}</StatValue>
          <StatDetail className="flex flex-wrap items-center gap-2">
            <Badge variant={stat.isUp ? "success" : "error"}>
              {stat.isUp ? (
                <ArrowUpRightIcon size={12} aria-hidden="true" />
              ) : (
                <ArrowDownRightIcon size={12} aria-hidden="true" />
              )}
              {stat.change}
            </Badge>
            From last month
          </StatDetail>
        </Stat>
      ))}
    </div>
  );
}
