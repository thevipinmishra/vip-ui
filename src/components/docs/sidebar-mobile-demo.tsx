"use client";

import {
  ChartLineUpIcon,
  HouseIcon,
  PackageIcon,
  ReceiptIcon,
  UsersIcon,
} from "@phosphor-icons/react";
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
  { label: "Overview", icon: HouseIcon, current: true },
  { label: "Orders", icon: ReceiptIcon },
  { label: "Customers", icon: UsersIcon },
  { label: "Products", icon: PackageIcon },
  { label: "Reports", icon: ChartLineUpIcon },
];

export function SidebarMobileDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="h-[32rem] w-[360px] max-w-full overflow-hidden rounded-xl ring-1 ring-border/70">
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
                      href="#"
                      icon={<item.icon aria-hidden="true" />}
                      isCurrent={item.current}
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
              <p className="text-sm font-medium">Overview</p>
            </header>
            <div className="grid gap-2 p-4">
              {[
                { id: "#3210", customer: "Olivia Martin", total: "$1,999" },
                { id: "#3209", customer: "Jackson Lee", total: "$39" },
                { id: "#3208", customer: "Isabella Nguyen", total: "$299" },
              ].map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg bg-card px-3 py-2.5 ring-1 ring-border/70"
                >
                  <p className="text-sm font-medium">{order.customer}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {order.id} · {order.total}
                  </p>
                </div>
              ))}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
