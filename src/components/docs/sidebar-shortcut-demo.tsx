"use client";

import {
  HouseIcon,
  MagnifyingGlassIcon,
  ReceiptIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { useState, useSyncExternalStore } from "react";
import { RouterProvider } from "react-aria-components";
import { Kbd, KbdGroup } from "@/components/ui/kbd-code";
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
];

const subscribe = () => () => {};

export function SidebarShortcutDemo() {
  const [current, setCurrent] = useState("#overview");
  const isMac = useSyncExternalStore(
    subscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => false,
  );
  return (
    <div className="h-[32rem] w-full max-w-[48rem] overflow-hidden rounded-xl ring-1 ring-border/70">
      <RouterProvider navigate={setCurrent}>
        <SidebarProvider className="h-full">
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
              <KbdGroup>
                <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
                <Kbd>B</Kbd>
              </KbdGroup>
              <div className="relative ms-auto w-full max-w-56 min-w-0">
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="search"
                  aria-label="Search orders"
                  placeholder="Search orders"
                  className="h-9 w-full rounded-md border border-border bg-card ps-8 pe-3 text-sm outline-none transition-[border-color,box-shadow] duration-150 ease-out-quint placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
                />
              </div>
            </header>
            <div className="grid content-start gap-3 p-4">
              <p className="text-xs font-medium text-muted-foreground">
                Recent orders
              </p>
              {[
                { id: "#3210", customer: "Olivia Martin", total: "$1,999" },
                { id: "#3209", customer: "Jackson Lee", total: "$39" },
                { id: "#3208", customer: "Isabella Nguyen", total: "$299" },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-3 rounded-lg bg-card px-3 py-2.5 text-sm ring-1 ring-border/70"
                >
                  <span className="min-w-0 flex-1 truncate">
                    {order.customer}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {order.id}
                  </span>
                  <span className="tabular-nums">{order.total}</span>
                </div>
              ))}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </RouterProvider>
    </div>
  );
}
