"use client";

import {
  ChartLineUpIcon,
  CreditCardIcon,
  HouseIcon,
  ReceiptIcon,
  UsersIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function SidebarSectionsDemo() {
  return (
    <div className="h-[32rem] w-full max-w-[48rem] overflow-hidden rounded-xl ring-1 ring-border/70">
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
              <SidebarGroupLabel>Store</SidebarGroupLabel>
              <SidebarMenu aria-label="Store">
                <SidebarItem
                  href="#"
                  icon={<HouseIcon aria-hidden="true" />}
                  isCurrent
                >
                  Overview
                </SidebarItem>
                <SidebarItem
                  href="#"
                  icon={<ReceiptIcon aria-hidden="true" />}
                  badge={
                    <Badge>
                      12<span className="sr-only"> new</span>
                    </Badge>
                  }
                >
                  Orders
                </SidebarItem>
                <SidebarItem href="#" icon={<UsersIcon aria-hidden="true" />}>
                  Customers
                </SidebarItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Reports</SidebarGroupLabel>
              <SidebarMenu aria-label="Reports">
                <SidebarItem
                  href="#"
                  icon={<ChartLineUpIcon aria-hidden="true" />}
                >
                  Revenue
                </SidebarItem>
                <SidebarItem
                  href="#"
                  icon={<CreditCardIcon aria-hidden="true" />}
                  badge={<Badge variant="warning">Due</Badge>}
                >
                  Payouts
                </SidebarItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarMenu aria-label="Settings">
                <SidebarItem
                  href="#"
                  icon={<UsersThreeIcon aria-hidden="true" />}
                  badge={<Badge>3</Badge>}
                >
                  Team
                </SidebarItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <p className="px-2.5 text-xs leading-5 text-muted-foreground">
              Signed in as maya@acme.store
            </p>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b border-border/70 px-3">
            <SidebarTrigger />
            <p className="text-sm font-medium">Overview</p>
          </header>
          <div className="grid gap-3 p-4">
            <p className="text-xs font-medium text-muted-foreground">Today</p>
            <ul className="grid gap-2">
              {[
                "12 orders need a shipping label",
                "3 payouts are due on Friday",
                "2 customers asked about the return policy",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-card px-3 py-2.5 text-sm ring-1 ring-border/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
