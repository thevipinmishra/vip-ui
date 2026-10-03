import type { ReactNode } from "react";
import { AreaRange, AreaStacked, AreaVisits } from "./area-charts";
import { BarHorizontal, BarOrders, BarStacked, BarUpdates } from "./bar-charts";
import { LineComparison, LineResponse, LineTarget } from "./line-charts";
import { PieDevices, PieDonut, PieRounded } from "./pie-charts";
import { RadarBenchmarks, RadarCompare, RadarProfile } from "./radar-charts";
import { RadialChannels, RadialGoals, RadialProgress } from "./radial-charts";
import { TooltipCustom, TooltipGrouped, TooltipValue } from "./tooltip-charts";

type Example = { name: string; preview: ReactNode };
type Category = {
  slug: string;
  label: string;
  title: string;
  source: string;
  examples: Example[];
};

export const chartCategories: Category[] = [
  {
    slug: "area",
    label: "Area",
    title: "Area charts",
    source: "area-charts.tsx",
    examples: [
      {
        name: "Visitor growth",
        preview: <AreaVisits />,
      },
      {
        name: "Traffic sources",
        preview: <AreaStacked />,
      },
      {
        name: "Forecast range",
        preview: <AreaRange />,
      },
    ],
  },
  {
    slug: "bar",
    label: "Bar",
    title: "Bar charts",
    source: "bar-charts.tsx",
    examples: [
      {
        name: "Monthly orders",
        preview: <BarOrders />,
      },
      {
        name: "Projects by region",
        preview: <BarHorizontal />,
      },
      {
        name: "Support requests",
        preview: <BarStacked />,
      },
      {
        name: "Animated orders",
        preview: <BarUpdates />,
      },
    ],
  },
  {
    slug: "line",
    label: "Line",
    title: "Line charts",
    source: "line-charts.tsx",
    examples: [
      {
        name: "Response time",
        preview: <LineResponse />,
      },
      {
        name: "Retention by plan",
        preview: <LineComparison />,
      },
      {
        name: "Uptime target",
        preview: <LineTarget />,
      },
    ],
  },
  {
    slug: "tooltip",
    label: "Tooltips",
    title: "Chart tooltips",
    source: "tooltip-charts.tsx",
    examples: [
      {
        name: "Single value",
        preview: <TooltipValue />,
      },
      {
        name: "Grouped values",
        preview: <TooltipGrouped />,
      },
      {
        name: "Pinned detail",
        preview: <TooltipCustom />,
      },
    ],
  },
  {
    slug: "pie",
    label: "Pie",
    title: "Pie and donut charts",
    source: "pie-charts.tsx",
    examples: [
      {
        name: "Device mix",
        preview: <PieDevices />,
      },
      {
        name: "Subscriptions",
        preview: <PieDonut />,
      },
      {
        name: "Budget allocation",
        preview: <PieRounded />,
      },
    ],
  },
  {
    slug: "radar",
    label: "Radar",
    title: "Radar charts",
    source: "radar-charts.tsx",
    examples: [
      {
        name: "Team profile",
        preview: <RadarProfile />,
      },
      {
        name: "Score comparison",
        preview: <RadarCompare />,
      },
      {
        name: "Benchmark points",
        preview: <RadarBenchmarks />,
      },
    ],
  },
  {
    slug: "radial",
    label: "Radial",
    title: "Radial charts",
    source: "radial-charts.tsx",
    examples: [
      {
        name: "Onboarding progress",
        preview: <RadialProgress />,
      },
      {
        name: "Campaign reach",
        preview: <RadialChannels />,
      },
      {
        name: "Quarterly goals",
        preview: <RadialGoals />,
      },
    ],
  },
];
