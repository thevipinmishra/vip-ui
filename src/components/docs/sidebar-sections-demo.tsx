"use client";

import {
  ChartLineUpIcon,
  CreditCardIcon,
  HouseIcon,
  ReceiptIcon,
  UsersIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { RouterProvider } from "react-aria-components";
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

const sections = [
  {
    label: "Store",
    items: [
      { label: "Overview", href: "#overview", icon: HouseIcon },
      {
        label: "Orders",
        href: "#orders",
        icon: ReceiptIcon,
        badge: (
          <Badge>
            12<span className="sr-only"> new</span>
          </Badge>
        ),
      },
      { label: "Customers", href: "#customers", icon: UsersIcon },
    ],
  },
  {
    label: "Reports",
    items: [
      { label: "Revenue", href: "#revenue", icon: ChartLineUpIcon },
      {
        label: "Payouts",
        href: "#payouts",
        icon: CreditCardIcon,
        badge: <Badge variant="warning">Due</Badge>,
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        label: "Team",
        href: "#team",
        icon: UsersThreeIcon,
        badge: <Badge>3</Badge>,
      },
    ],
  },
];

export function SidebarSectionsDemo() {
  const [current, setCurrent] = useState("#overview");
  const title = sections
    .flatMap((section) => section.items)
    .find((item) => item.href === current)?.label;
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
              {sections.map((section) => (
                <SidebarGroup key={section.label}>
                  <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                  <SidebarMenu aria-label={section.label}>
                    {section.items.map((item) => (
                      <SidebarItem
                        key={item.label}
                        href={item.href}
                        icon={<item.icon aria-hidden="true" />}
                        badge={item.badge}
                        isCurrent={item.href === current}
                      >
                        {item.label}
                      </SidebarItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              ))}
            </SidebarContent>
            <SidebarFooter>
              <p className="px-2.75 text-xs leading-5 text-muted-foreground">
                Signed in as maya@acme.store
              </p>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 items-center gap-2 border-b border-border/70 px-3">
              <SidebarTrigger />
              <p className="text-sm font-medium">{title}</p>
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
      </RouterProvider>
    </div>
  );
}
