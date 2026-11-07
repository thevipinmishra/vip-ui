"use client";

import {
  ArrowCounterClockwiseIcon,
  ArrowUpIcon,
  CreditCardIcon,
  DownloadSimpleIcon,
  GearSixIcon,
  ListIcon,
  ShoppingCartIcon,
  SignOutIcon,
  TrendDownIcon,
  TrendUpIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../vip-ui/card";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "../../vip-ui/menu";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../vip-ui/sheet";
import { Stat, StatDetail, StatLabel, StatValue } from "../../vip-ui/stat";
import {
  Timeline,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "../../vip-ui/timeline";
import { showToast } from "../../vip-ui/toast";
import { AppSidebar } from "./app-sidebar";
import { activity, metrics } from "./data";
import { Notifications } from "./notifications";
import { RecentOrders } from "./recent-orders";
import { RevenueChart } from "./revenue-chart";
import { SearchCommand } from "./search-command";

const activityIcons = {
  payment: CreditCardIcon,
  checkout: ShoppingCartIcon,
  refund: ArrowCounterClockwiseIcon,
  upgrade: ArrowUpIcon,
};

function exportOrders() {
  showToast({
    title: "Export started",
    description: "We email the CSV file to maya@acme.store.",
    variant: "success",
  });
}

export function Dashboard() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-svh bg-background lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="hidden border-e border-border/70 bg-card px-3 pt-3.5 pb-5 lg:sticky lg:top-0 lg:block lg:h-svh lg:overflow-y-auto">
        <AppSidebar />
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/70 bg-card/90 px-4 backdrop-blur sm:px-6">
          <div className="lg:hidden">
            <SheetTrigger isOpen={navOpen} onOpenChange={setNavOpen}>
              <Button variant="ghost" iconOnly aria-label="Open navigation">
                <ListIcon size={20} aria-hidden="true" />
              </Button>
              <Sheet position="left" className="w-72">
                <SheetHeader className="flex justify-end">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <SheetClose />
                </SheetHeader>
                <SheetBody className="pb-6">
                  <AppSidebar onNavigate={() => setNavOpen(false)} />
                </SheetBody>
              </Sheet>
            </SheetTrigger>
          </div>
          <SearchCommand onExport={exportOrders} />
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
        <main className="grid gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.04em]">
                Overview
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Store activity for September 2026
              </p>
            </div>
            <Button variant="outline" size="sm" onPress={exportOrders}>
              <DownloadSimpleIcon size={16} aria-hidden="true" />
              Export
            </Button>
          </div>
          <section
            aria-label="Key metrics"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {metrics.map((metric) => {
              const TrendIcon =
                metric.trend === "up" ? TrendUpIcon : TrendDownIcon;
              return (
                <Stat key={metric.label}>
                  <StatLabel>{metric.label}</StatLabel>
                  <StatValue>{metric.value}</StatValue>
                  <StatDetail className="flex items-center gap-2">
                    <Badge variant="success" className="gap-1 px-2">
                      <TrendIcon size={13} weight="bold" aria-hidden="true" />
                      {metric.change}
                    </Badge>
                    from last month
                  </StatDetail>
                </Stat>
              );
            })}
          </section>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <RevenueChart />
            <Card>
              <CardHeader>
                <CardTitle as="h2">Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline aria-label="Recent activity">
                  {activity.map((event, index) => {
                    const Icon = activityIcons[event.type];
                    return (
                      <TimelineItem
                        key={event.id}
                        status={index === 0 ? "latest" : "complete"}
                        icon={index === 0 ? undefined : <Icon weight="bold" />}
                      >
                        <TimelineTitle className="text-sm font-medium">
                          {event.title}
                        </TimelineTitle>
                        <TimelineTime dateTime={event.dateTime}>
                          {event.time}
                        </TimelineTime>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </CardContent>
            </Card>
          </div>
          <RecentOrders />
        </main>
      </div>
    </div>
  );
}
