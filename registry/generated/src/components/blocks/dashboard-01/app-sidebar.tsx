"use client";

import {
  ChartLineUpIcon,
  GearSixIcon,
  HouseIcon,
  PackageIcon,
  ReceiptIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { Badge } from "../../vip-ui/badge";
import { ProgressBar } from "../../vip-ui/progress-bar";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarMenu,
} from "../../vip-ui/sidebar";

const navigation = [
  { label: "Overview", href: "#", icon: HouseIcon, current: true },
  { label: "Orders", href: "#", icon: ReceiptIcon, count: 12 },
  { label: "Customers", href: "#", icon: UsersIcon },
  { label: "Products", href: "#", icon: PackageIcon },
  { label: "Reports", href: "#", icon: ChartLineUpIcon },
  { label: "Settings", href: "#", icon: GearSixIcon },
];

export function AppSidebar() {
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
          >
            A
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Acme Store</p>
            <p className="truncate text-xs text-muted-foreground">Pro plan</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu aria-label="Main">
            {navigation.map((item) => (
              <SidebarItem
                key={item.label}
                href={item.href}
                icon={<item.icon aria-hidden="true" />}
                isCurrent={item.current}
                badge={
                  item.count ? (
                    <Badge className="min-h-5 px-2 py-0 text-[11px] shadow-none">
                      {item.count}
                      <span className="sr-only"> new</span>
                    </Badge>
                  ) : undefined
                }
              >
                {item.label}
              </SidebarItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="rounded-lg bg-muted/60 p-3 ring-1 ring-border/70">
          <ProgressBar
            label="Storage"
            value={68}
            valueLabel="6.8 of 10 GB"
            className="gap-1.5 **:data-[slot=progress-bar-label]:text-xs **:data-[slot=progress-bar-value]:text-xs"
          />
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Upgrade to get 100 GB.
          </p>
        </div>
      </SidebarFooter>
    </>
  );
}
