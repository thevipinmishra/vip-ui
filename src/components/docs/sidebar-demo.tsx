"use client";

import {
  ChartLineUpIcon,
  HouseIcon,
  PackageIcon,
  ReceiptIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { RouterProvider } from "react-aria-components";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigation = [
  { label: "Overview", href: "#overview", icon: HouseIcon },
  { label: "Orders", href: "#orders", icon: ReceiptIcon },
  { label: "Customers", href: "#customers", icon: UsersIcon },
  { label: "Products", href: "#products", icon: PackageIcon },
  { label: "Reports", href: "#reports", icon: ChartLineUpIcon },
];

const orders = [
  { id: "#3210", customer: "Olivia Martin", total: "$1,999" },
  { id: "#3209", customer: "Jackson Lee", total: "$39" },
  { id: "#3208", customer: "Isabella Nguyen", total: "$299" },
];

export function SidebarDemo() {
  const [current, setCurrent] = useState("#overview");
  return (
    <div className="h-[32rem] w-full max-w-[48rem] overflow-hidden rounded-xl ring-1 ring-border/70">
      <RouterProvider navigate={setCurrent}>
        <SidebarProvider className="h-full" shortcut={false}>
          <Sidebar className="h-full">
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
                  <p className="truncate text-xs text-muted-foreground">
                    Pro plan
                  </p>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu aria-label="Store">
                  {navigation.map((item) => (
                    <SidebarItem
                      key={item.label}
                      href={item.href}
                      icon={<item.icon aria-hidden="true" />}
                      isCurrent={item.href === current}
                    >
                      {item.label}
                    </SidebarItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 items-center gap-2 border-b border-border/70 px-3">
              <SidebarTrigger />
              <p className="text-sm font-medium">
                {navigation.find((item) => item.href === current)?.label}
              </p>
            </header>
            <div className="grid gap-3 p-4">
              <div className="grid gap-1">
                <p className="text-xs text-muted-foreground">
                  Revenue this month
                </p>
                <p className="text-2xl font-semibold tabular-nums">$48,210</p>
                <p className="text-xs text-success-foreground">
                  +12.4% from August
                </p>
              </div>
              <div className="overflow-hidden rounded-lg bg-card ring-1 ring-border/70">
                <p className="border-b border-border/70 px-3 py-2 text-xs font-medium text-muted-foreground">
                  Latest orders
                </p>
                <ul className="divide-y divide-border/70">
                  {orders.map((order) => (
                    <li
                      key={order.id}
                      className="flex items-center gap-3 px-3 py-2 text-sm"
                    >
                      <span className="min-w-0 flex-1 truncate">
                        {order.customer}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {order.id}
                      </span>
                      <span className="tabular-nums">{order.total}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </RouterProvider>
    </div>
  );
}
