"use client";

import {
  DownloadSimpleIcon,
  GearSixIcon,
  SignOutIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { Avatar } from "../../vip-ui/avatar";
import { Button } from "../../vip-ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "../../vip-ui/menu";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../vip-ui/sidebar";
import {
  Stat,
  StatDetail,
  StatGroup,
  StatLabel,
  StatTrend,
  StatValue,
} from "../../vip-ui/stat";
import { showToast } from "../../vip-ui/toast";
import { AppSidebar } from "./app-sidebar";
import {
  change,
  changePoints,
  formatCents,
  formatCount,
  formatMoney,
  formatPercent,
  formatRate,
  lastMonth,
  month,
} from "./data";
import { Notifications } from "./notifications";
import { RecentOrders } from "./recent-orders";
import { RevenueChart } from "./revenue-chart";
import { SearchCommand } from "./search-command";
import { FulfillmentCard, SalesByChannel } from "./side-panels";
import { TopProducts } from "./top-products";

const metrics = [
  {
    label: "Net sales",
    value: formatMoney(month.sales),
    change: change(month.sales, lastMonth.sales),
  },
  {
    label: "Orders",
    value: formatCount(month.orders),
    change: change(month.orders, lastMonth.orders),
  },
  {
    label: "Average order value",
    value: formatCents(month.aov),
    change: change(month.aov, lastMonth.aov),
  },
  {
    label: "Conversion rate",
    value: formatRate(month.conversion),
    change: changePoints(month.conversion, lastMonth.conversion),
    points: true,
  },
  {
    label: "Returning customers",
    value: formatPercent(month.returning),
    change: changePoints(month.returning, lastMonth.returning),
    points: true,
  },
  {
    label: "Refund rate",
    value: formatRate(month.refundRate),
    change: changePoints(month.refundRate, lastMonth.refundRate),
    points: true,
    invert: true,
  },
];

function exportReport() {
  showToast({
    title: "Export started",
    description: "We email the CSV file to maya@acme.store.",
    variant: "success",
  });
}

export function Dashboard() {
  return (
    <SidebarProvider className="min-h-svh">
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/70 bg-card/90 px-4 backdrop-blur sm:px-6">
          <SidebarTrigger />
          <SearchCommand onExport={exportReport} />
          <div className="ms-auto flex items-center gap-1">
            <Notifications />
            <MenuTrigger>
              <Button
                variant="ghost"
                iconOnly
                aria-label="Account menu"
                className="rounded-full"
              >
                <Avatar name="Maya Chen" className="size-8" />
              </Button>
              <MenuPopover placement="bottom end">
                <MenuContent aria-label="Account">
                  <MenuItem>
                    <UserIcon size={16} aria-hidden="true" />
                    Profile
                  </MenuItem>
                  <MenuItem>
                    <GearSixIcon size={16} aria-hidden="true" />
                    Settings
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem>
                    <SignOutIcon size={16} aria-hidden="true" />
                    Sign out
                  </MenuItem>
                </MenuContent>
              </MenuPopover>
            </MenuTrigger>
          </div>
        </header>
        <main className="@container grid gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.04em]">
                Overview
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                September 1–30, 2026, compared with August 2–31
              </p>
            </div>
            <Button variant="outline" size="sm" onPress={exportReport}>
              <DownloadSimpleIcon
                data-icon="inline-start"
                size={16}
                aria-hidden="true"
              />
              Export
            </Button>
          </div>
          <StatGroup
            aria-label="Key metrics"
            role="group"
            className="grid-cols-2 @2xl:grid-cols-3 @5xl:grid-cols-6"
          >
            {metrics.map((metric) => (
              <Stat key={metric.label}>
                <StatLabel className="truncate">{metric.label}</StatLabel>
                <StatValue className="text-2xl">{metric.value}</StatValue>
                <StatDetail>
                  <StatTrend
                    direction={
                      metric.change > 0
                        ? "up"
                        : metric.change < 0
                          ? "down"
                          : "neutral"
                    }
                    invert={metric.invert}
                  >
                    {metric.change > 0 ? "+" : metric.change < 0 ? "−" : ""}
                    {Math.abs(metric.change).toFixed(metric.points ? 2 : 1)}
                    {metric.points ? " pts" : "%"}
                  </StatTrend>
                  <span>vs. Aug</span>
                </StatDetail>
              </Stat>
            ))}
          </StatGroup>
          <div className="grid gap-5 @4xl:grid-cols-[minmax(0,1fr)_20rem]">
            <RevenueChart />
            <SalesByChannel />
          </div>
          <div className="grid gap-5 @4xl:grid-cols-[minmax(0,1fr)_20rem] @4xl:items-start">
            <TopProducts />
            <FulfillmentCard />
          </div>
          <RecentOrders />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
