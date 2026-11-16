"use client";

import {
  FolderIcon,
  SquaresFourIcon,
  UsersThreeIcon,
  WalletIcon,
  WrenchIcon,
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
  { label: "Projects", icon: SquaresFourIcon, current: true },
  { label: "Files", icon: FolderIcon },
  { label: "Clients", icon: UsersThreeIcon },
  { label: "Invoices", icon: WalletIcon },
  { label: "Workshop", icon: WrenchIcon },
];

const projects = [
  { name: "Studio North", owner: "Maya Chen", due: "Oct 18" },
  { name: "Atlas", owner: "Sam Rivera", due: "Oct 24" },
  { name: "Field Notes", owner: "Jo Park", due: "Nov 2" },
  { name: "Signal", owner: "Maya Chen", due: "Nov 9" },
];

export function SidebarRailDemo() {
  return (
    <div className="h-[32rem] w-full max-w-[48rem] overflow-hidden rounded-xl ring-1 ring-border/70">
      <SidebarProvider defaultOpen={false} shortcut={false} className="h-full">
        <Sidebar className="h-full">
          <SidebarHeader>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
              >
                N
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  Northwind Studio
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  Design team
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu aria-label="Workspace">
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
            <p className="text-sm font-medium">Projects</p>
          </header>
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.name}
                className="grid gap-1 rounded-lg bg-card p-3 ring-1 ring-border/70"
              >
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-xs text-muted-foreground">{project.owner}</p>
                <p className="text-xs tabular-nums text-muted-foreground">
                  Due {project.due}
                </p>
              </div>
            ))}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
