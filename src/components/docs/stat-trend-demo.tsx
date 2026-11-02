import {
  Stat,
  StatDetail,
  StatLabel,
  StatTrend,
  StatValue,
} from "@/components/ui/stat";

const stats = [
  {
    label: "Revenue",
    value: "$48,200",
    change: "+12%",
    direction: "up",
    invert: false,
  },
  {
    label: "Active users",
    value: "9,630",
    change: "−3%",
    direction: "down",
    invert: false,
  },
  {
    label: "Churn rate",
    value: "1.8%",
    change: "−0.4 pt",
    direction: "down",
    invert: true,
  },
] as const;

export function StatTrendDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <Stat key={stat.label}>
          <StatLabel>{stat.label}</StatLabel>
          <StatValue>{stat.value}</StatValue>
          <StatDetail>
            <StatTrend direction={stat.direction} invert={stat.invert}>
              {stat.change}
            </StatTrend>
            From last month
          </StatDetail>
        </Stat>
      ))}
    </div>
  );
}
