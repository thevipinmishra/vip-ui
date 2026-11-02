"use client";

import { areaY, defineChart, stack } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo, useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import {
  Chart,
  ChartAction,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
  ChartValue,
} from "@/components/ui/chart";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const history = [
  { date: "2026-07-15", desktop: 941, mobile: 569 },
  { date: "2026-07-16", desktop: 996, mobile: 589 },
  { date: "2026-07-17", desktop: 969, mobile: 567 },
  { date: "2026-07-18", desktop: 541, mobile: 686 },
  { date: "2026-07-19", desktop: 581, mobile: 820 },
  { date: "2026-07-20", desktop: 1058, mobile: 635 },
  { date: "2026-07-21", desktop: 1028, mobile: 685 },
  { date: "2026-07-22", desktop: 1025, mobile: 589 },
  { date: "2026-07-23", desktop: 955, mobile: 703 },
  { date: "2026-07-24", desktop: 1087, mobile: 698 },
  { date: "2026-07-25", desktop: 567, mobile: 719 },
  { date: "2026-07-26", desktop: 569, mobile: 735 },
  { date: "2026-07-27", desktop: 1103, mobile: 699 },
  { date: "2026-07-28", desktop: 978, mobile: 704 },
  { date: "2026-07-29", desktop: 1033, mobile: 605 },
  { date: "2026-07-30", desktop: 963, mobile: 671 },
  { date: "2026-07-31", desktop: 1102, mobile: 716 },
  { date: "2026-08-01", desktop: 595, mobile: 775 },
  { date: "2026-08-02", desktop: 589, mobile: 829 },
  { date: "2026-08-03", desktop: 1096, mobile: 709 },
  { date: "2026-08-04", desktop: 1147, mobile: 675 },
  { date: "2026-08-05", desktop: 999, mobile: 643 },
  { date: "2026-08-06", desktop: 1063, mobile: 637 },
  { date: "2026-08-07", desktop: 1123, mobile: 704 },
  { date: "2026-08-08", desktop: 623, mobile: 801 },
  { date: "2026-08-09", desktop: 570, mobile: 786 },
  { date: "2026-08-10", desktop: 1005, mobile: 669 },
  { date: "2026-08-11", desktop: 1064, mobile: 758 },
  { date: "2026-08-12", desktop: 1178, mobile: 663 },
  { date: "2026-08-13", desktop: 1167, mobile: 722 },
  { date: "2026-08-14", desktop: 1077, mobile: 687 },
  { date: "2026-08-15", desktop: 574, mobile: 926 },
  { date: "2026-08-16", desktop: 574, mobile: 920 },
  { date: "2026-08-17", desktop: 1173, mobile: 713 },
  { date: "2026-08-18", desktop: 1161, mobile: 697 },
  { date: "2026-08-19", desktop: 1058, mobile: 730 },
  { date: "2026-08-20", desktop: 1062, mobile: 694 },
  { date: "2026-08-21", desktop: 1154, mobile: 764 },
  { date: "2026-08-22", desktop: 626, mobile: 820 },
  { date: "2026-08-23", desktop: 602, mobile: 908 },
  { date: "2026-08-24", desktop: 1218, mobile: 791 },
  { date: "2026-08-25", desktop: 1189, mobile: 798 },
  { date: "2026-08-26", desktop: 1138, mobile: 698 },
  { date: "2026-08-27", desktop: 1091, mobile: 759 },
  { date: "2026-08-28", desktop: 1193, mobile: 830 },
  { date: "2026-08-29", desktop: 635, mobile: 940 },
  { date: "2026-08-30", desktop: 638, mobile: 818 },
  { date: "2026-08-31", desktop: 1098, mobile: 816 },
  { date: "2026-09-01", desktop: 1272, mobile: 815 },
  { date: "2026-09-02", desktop: 1123, mobile: 754 },
  { date: "2026-09-03", desktop: 1149, mobile: 773 },
  { date: "2026-09-04", desktop: 1259, mobile: 842 },
  { date: "2026-09-05", desktop: 627, mobile: 888 },
  { date: "2026-09-06", desktop: 665, mobile: 882 },
  { date: "2026-09-07", desktop: 1188, mobile: 711 },
  { date: "2026-09-08", desktop: 1240, mobile: 769 },
  { date: "2026-09-09", desktop: 1210, mobile: 755 },
  { date: "2026-09-10", desktop: 1238, mobile: 829 },
  { date: "2026-09-11", desktop: 1234, mobile: 816 },
  { date: "2026-09-12", desktop: 646, mobile: 925 },
  { date: "2026-09-13", desktop: 669, mobile: 1034 },
  { date: "2026-09-14", desktop: 1184, mobile: 877 },
  { date: "2026-09-15", desktop: 1330, mobile: 824 },
  { date: "2026-09-16", desktop: 1329, mobile: 738 },
  { date: "2026-09-17", desktop: 1200, mobile: 825 },
  { date: "2026-09-18", desktop: 1253, mobile: 896 },
  { date: "2026-09-19", desktop: 745, mobile: 1013 },
  { date: "2026-09-20", desktop: 729, mobile: 939 },
  { date: "2026-09-21", desktop: 1279, mobile: 862 },
  { date: "2026-09-22", desktop: 1178, mobile: 807 },
  { date: "2026-09-23", desktop: 1266, mobile: 882 },
  { date: "2026-09-24", desktop: 1375, mobile: 763 },
  { date: "2026-09-25", desktop: 1298, mobile: 810 },
  { date: "2026-09-26", desktop: 724, mobile: 1032 },
  { date: "2026-09-27", desktop: 706, mobile: 953 },
  { date: "2026-09-28", desktop: 1341, mobile: 854 },
  { date: "2026-09-29", desktop: 1202, mobile: 915 },
  { date: "2026-09-30", desktop: 1352, mobile: 928 },
  { date: "2026-10-01", desktop: 1358, mobile: 868 },
  { date: "2026-10-02", desktop: 1416, mobile: 948 },
  { date: "2026-10-03", desktop: 738, mobile: 1083 },
  { date: "2026-10-04", desktop: 674, mobile: 1037 },
  { date: "2026-10-05", desktop: 1349, mobile: 830 },
  { date: "2026-10-06", desktop: 1381, mobile: 794 },
  { date: "2026-10-07", desktop: 1427, mobile: 871 },
  { date: "2026-10-08", desktop: 1305, mobile: 897 },
  { date: "2026-10-09", desktop: 1356, mobile: 803 },
  { date: "2026-10-10", desktop: 729, mobile: 1069 },
  { date: "2026-10-11", desktop: 691, mobile: 978 },
  { date: "2026-10-12", desktop: 1269, mobile: 852 },
];

const periods = {
  "7": { label: "7 days", tickEvery: 1 },
  "30": { label: "30 days", tickEvery: 7 },
  "90": { label: "90 days", tickEvery: 14 },
} as const;

type Period = keyof typeof periods;

const devices = [
  { key: "desktop", label: "Desktop", color: "var(--ts-chart-1)" },
  { key: "mobile", label: "Mobile", color: "var(--ts-chart-2)" },
] as const;

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const formatDay = (date: string) => dayFormat.format(new Date(date));
const formatCount = (value: number) => value.toLocaleString("en-US");

export function ChartAreaInteractive() {
  const [period, setPeriod] = useState<Period>("30");
  const days = useMemo(() => history.slice(-Number(period)), [period]);
  const total = days.reduce((sum, day) => sum + day.desktop + day.mobile, 0);
  const definition = useMemo(() => {
    const { tickEvery } = periods[period];
    const ticks = days
      .filter((_, index) => (days.length - 1 - index) % tickEvery === 0)
      .map((day) => day.date);
    const rows = days.flatMap((day) =>
      devices.map((device) => ({
        date: day.date,
        device: device.label,
        visitors: day[device.key],
      })),
    );
    return defineChart({
      marks: [
        areaY(rows, {
          id: "visitors",
          x: "date",
          y: "visitors",
          z: "device",
          color: "device",
          layout: stack(),
          fillOpacity: 0.8,
        }),
      ],
      scales: {
        x: {
          scale: scalePoint,
          axis: { ticks: { values: ticks, format: formatDay } },
        },
        y: {
          scale: scaleLinear().domain([0, 3000]),
          grid: true,
          axis: { ticks: { count: 4, format: formatCount } },
        },
      },
      color: {
        domain: devices.map((device) => device.label),
        range: devices.map((device) => device.color),
      },
      focus: "group-x",
      tooltip: {
        use: tooltip,
        sort: "color-domain",
        content: (points, { primaryPoint }) => ({
          title: formatDay(points[0].datum.date),
          rows: points.map((point) => ({
            label: point.groupLabel,
            value: formatCount(point.datum.visitors),
            color: point.color,
            active: point === primaryPoint,
          })),
        }),
      },
    });
  }, [days, period]);

  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Visitors</ChartTitle>
        <ChartValue>
          <AnimatedNumber value={total} />
        </ChartValue>
      </ChartCaption>
      <ChartAction>
        <ToggleButtonGroup
          aria-label="Period"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[period]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (next === "7" || next === "30" || next === "90") setPeriod(next);
          }}
        >
          {Object.entries(periods).map(([id, { label }]) => (
            <ToggleButton key={id} id={id} variant="segmented">
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </ChartAction>
      <Chart
        definition={definition}
        height={220}
        initialWidth={520}
        ariaLabel={`Daily desktop and mobile visitors for the last ${periods[period].label}, stacked`}
      />
      <ChartLegend>
        {devices.map((item) => (
          <ChartLegendItem key={item.label} color={item.color}>
            {item.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption={`Daily visitors for the last ${periods[period].label}`}
        columns={["Date", "Desktop", "Mobile"]}
        rows={days.map((day) => [formatDay(day.date), day.desktop, day.mobile])}
      />
    </ChartFrame>
  );
}
