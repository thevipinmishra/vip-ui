"use client";

import {
  ChartLineUpIcon,
  GearSixIcon,
  HouseIcon,
  ReceiptIcon,
  SidebarSimpleIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { RouterProvider } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { label: "Overview", href: "#overview", icon: HouseIcon },
  { label: "Orders", href: "#orders", icon: ReceiptIcon },
  { label: "Customers", href: "#customers", icon: UsersIcon },
  { label: "Reports", href: "#reports", icon: ChartLineUpIcon },
  { label: "Settings", href: "#settings", icon: GearSixIcon },
];

function StorageCard() {
  const { toggle } = useSidebar();
  return (
    <div className="rounded-lg bg-muted/60 p-3 ring-1 ring-border/70">
      <ProgressBar
        label="Storage"
        value={68}
        valueLabel="6.8 of 10 GB"
        className="gap-1.5 **:data-[slot=progress-bar-label]:text-xs **:data-[slot=progress-bar-value]:text-xs"
      />
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        Upgrade to get 100 GB for receipts and product photos.
      </p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <Button variant="minimal" size="xs" className="-ms-2.5">
          Upgrade plan
        </Button>
        <Button
          variant="minimal"
          size="xs"
          iconOnly
          aria-label="Collapse sidebar"
          onPress={toggle}
        >
          <SidebarSimpleIcon aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

export function SidebarFooterDemo() {
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
            <SidebarFooter>
              <StorageCard />
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 items-center gap-2 border-b border-border/70 px-3">
              <SidebarTrigger />
              <p className="text-sm font-medium">Storage</p>
            </header>
            <div className="grid content-start gap-3 p-4">
              <p className="text-sm text-muted-foreground">
                6.8 GB of 10 GB is in use. Receipts and product photos take the
                most space.
              </p>
              <div className="grid gap-2 rounded-lg bg-card p-3 text-sm ring-1 ring-border/70">
                <p className="font-medium">Largest folders</p>
                <p className="text-muted-foreground">Product photos · 3.4 GB</p>
                <p className="text-muted-foreground">Receipts · 1.8 GB</p>
                <p className="text-muted-foreground">Exports · 900 MB</p>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </RouterProvider>
    </div>
  );
}
