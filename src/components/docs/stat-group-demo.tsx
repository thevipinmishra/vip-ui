import {
  ClockIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@phosphor-icons/react/ssr";
import {
  Stat,
  StatDetail,
  StatGroup,
  StatIcon,
  StatLabel,
  StatTrend,
  StatValue,
} from "@/components/ui/stat";

export function StatGroupDemo() {
  return (
    <StatGroup className="w-full max-w-3xl">
      <Stat>
        <StatIcon>
          <CurrencyDollarIcon />
        </StatIcon>
        <StatLabel>Revenue</StatLabel>
        <StatValue>$48.2k</StatValue>
        <StatDetail>
          <StatTrend direction="up">+12%</StatTrend>
        </StatDetail>
      </Stat>
      <Stat>
        <StatIcon>
          <ShoppingCartIcon />
        </StatIcon>
        <StatLabel>Orders</StatLabel>
        <StatValue>1,284</StatValue>
        <StatDetail>
          <StatTrend direction="up">+8%</StatTrend>
        </StatDetail>
      </Stat>
      <Stat>
        <StatIcon>
          <UsersIcon />
        </StatIcon>
        <StatLabel>Customers</StatLabel>
        <StatValue>9,630</StatValue>
        <StatDetail>
          <StatTrend direction="neutral">0%</StatTrend>
        </StatDetail>
      </Stat>
      <Stat>
        <StatIcon>
          <ClockIcon />
        </StatIcon>
        <StatLabel>Response time</StatLabel>
        <StatValue>1.4 h</StatValue>
        <StatDetail>
          <StatTrend direction="down" invert>
            −22 min
          </StatTrend>
        </StatDetail>
      </Stat>
    </StatGroup>
  );
}
